import { Pool } from "pg";
import {
  COUNTRY_LIST_SETTING_KEYS,
  COUNTRY_SPECIFIC_SETTING_PREFIXES,
  DRC_COUNTRY_CODE,
  isNonDrcCountrySettingKey,
  keepOnlyDrcCountryCodes,
} from "../shared/country-policy";

const connectionString = process.env.SUPABASE_DATABASE_URL?.trim();
if (!connectionString) {
  throw new Error("SUPABASE_DATABASE_URL est requis; DATABASE_URL ne sera jamais utilisé pour cette opération.");
}

const applyChanges = process.argv.includes("--apply");
const pool = new Pool({ connectionString, connectionTimeoutMillis: 10_000 });

async function main() {
  const client = await pool.connect();
  try {
    const identity = await client.query<{ database_name: string; schema_name: string }>(
      "SELECT current_database() AS database_name, current_schema() AS schema_name",
    );
    const target = identity.rows[0];
    if (!target?.database_name || !target.schema_name) {
      throw new Error("Impossible de vérifier la base cible.");
    }

    const countryCounts = await client.query<{ non_drc: number; drc: number }>(
      `SELECT
         count(*) FILTER (WHERE upper(trim(code)) <> $1)::int AS non_drc,
         count(*) FILTER (WHERE upper(trim(code)) = $1)::int AS drc
       FROM countries`,
      [DRC_COUNTRY_CODE],
    );
    const paymentCounts = await client.query<{ non_drc: number }>(
      `SELECT count(*)::int AS non_drc
       FROM payment_numbers
       WHERE upper(trim(country)) <> $1`,
      [DRC_COUNTRY_CODE],
    );
    const countryRows = await client.query<{ id: number }>(
      "SELECT id FROM countries WHERE upper(trim(code)) = $1",
      [DRC_COUNTRY_CODE],
    );
    if (countryRows.rows.length > 1) {
      throw new Error("Plusieurs lignes RDC existent; arrêt sans modification pour éviter un choix arbitraire.");
    }

    const settingsRows = await client.query<{ key: string; value: string }>(
      `SELECT key, value
       FROM platform_settings
       WHERE key = ANY($1::text[])
          OR left(key, length($2)) = $2
          OR key = ANY($3::text[])`,
      [
        [...COUNTRY_LIST_SETTING_KEYS],
        COUNTRY_SPECIFIC_SETTING_PREFIXES[0],
        [
          "ppayprosPayinCiConfirmed",
          "ppayprosPayoutTgConfirmed",
          "ppayprosPayoutCiConfirmed",
        ],
      ],
    );
    const prunedListSettings = settingsRows.rows.filter(({ key, value }) =>
      (COUNTRY_LIST_SETTING_KEYS as readonly string[]).includes(key) &&
      keepOnlyDrcCountryCodes(value) !== value,
    );
    const removedCountrySettings = settingsRows.rows.filter(({ key }) =>
      isNonDrcCountrySettingKey(key),
    );

    console.log(`Cible vérifiée : ${target.database_name} / schéma ${target.schema_name}`);
    console.log(`Mode : ${applyChanges ? "application" : "aperçu"}`);
    console.log(`Pays hors RDC à supprimer : ${countryCounts.rows[0]?.non_drc ?? 0}`);
    console.log(`Numéros de paiement hors RDC à supprimer : ${paymentCounts.rows[0]?.non_drc ?? 0}`);
    console.log(`Listes de pays à réduire à CD : ${prunedListSettings.length}`);
    console.log(`Réglages propres aux autres pays à supprimer : ${removedCountrySettings.length}`);
    console.log(`Ligne RDC existante : ${countryRows.rows.length ? "oui" : "non (elle sera créée)"}`);

    if (!applyChanges) {
      console.log("Aucune modification effectuée. Relancer avec --apply pour appliquer ce nettoyage.");
      return;
    }

    await client.query("BEGIN");
    try {
      await client.query(
        "DELETE FROM payment_numbers WHERE upper(trim(country)) <> $1",
        [DRC_COUNTRY_CODE],
      );
      await client.query(
        "DELETE FROM countries WHERE upper(trim(code)) <> $1",
        [DRC_COUNTRY_CODE],
      );
      for (const { key, value } of prunedListSettings) {
        await client.query(
          "UPDATE platform_settings SET value = $1 WHERE key = $2",
          [keepOnlyDrcCountryCodes(value), key],
        );
      }
      for (const { key } of removedCountrySettings) {
        await client.query("DELETE FROM platform_settings WHERE key = $1", [key]);
      }

      if (countryRows.rows[0]) {
        await client.query(
          `UPDATE countries
           SET code = $1, currency = 'CDF', is_active = true
           WHERE id = $2`,
          [DRC_COUNTRY_CODE, countryRows.rows[0].id],
        );
      } else {
        await client.query(
          `INSERT INTO countries (code, name, currency, phone_prefix, operators, is_active)
           VALUES ($1, 'République démocratique du Congo', 'CDF', '243', '[]', true)`,
          [DRC_COUNTRY_CODE],
        );
      }

      const verification = await client.query<{ non_drc_countries: number; non_drc_payment_numbers: number }>(
        `SELECT
           (SELECT count(*)::int FROM countries WHERE upper(trim(code)) <> $1) AS non_drc_countries,
           (SELECT count(*)::int FROM payment_numbers WHERE upper(trim(country)) <> $1) AS non_drc_payment_numbers`,
        [DRC_COUNTRY_CODE],
      );
      if (
        verification.rows[0]?.non_drc_countries !== 0 ||
        verification.rows[0]?.non_drc_payment_numbers !== 0
      ) {
        throw new Error("La vérification après nettoyage a échoué; transaction annulée.");
      }
      await client.query("COMMIT");
      console.log("Nettoyage terminé. Les comptes, soldes, portefeuilles personnels et historiques ont été conservés.");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }
  } finally {
    client.release();
  }
}

main()
  .catch((error) => {
    console.error(`Nettoyage interrompu : ${error instanceof Error ? error.message : "erreur inconnue"}`);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
