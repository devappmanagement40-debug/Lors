import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, ChevronLeft, ChevronRight, History, Loader2, Search } from "lucide-react";

interface AuditLogEntry {
  id: number;
  adminId: number;
  actorName: string;
  actorPhone: string;
  actorCountry: string;
  actorIsAdmin: boolean;
  actorIsBanker: boolean;
  action: string;
  targetUserId: number | null;
  targetName: string | null;
  targetPhone: string | null;
  targetCountry: string | null;
  details: string;
  createdAt: string;
}

interface AuditLogPage {
  items: AuditLogEntry[];
  hasMore: boolean;
  limit: number;
  offset: number;
}

const PAGE_SIZE = 50;

const ACTION_LABELS: Record<string, string> = {
  approve_deposit: "Dépôt approuvé",
  reject_deposit: "Dépôt refusé",
  approve_withdrawal: "Retrait approuvé",
  reject_withdrawal: "Retrait refusé",
  update_balance: "Solde modifié",
  update_withdrawal_wallet: "Compte de retrait modifié",
  send_withdrawal_to_inpay: "Retrait envoyé à InPay",
  send_withdrawal_to_drimpay: "Retrait envoyé à DrimPay",
  send_withdrawal_to_clapay: "Retrait envoyé à ClaPay",
  send_withdrawal_to_ppaypros: "Retrait envoyé à PPayPros",
  reset_password: "Mot de passe réinitialisé",
  ban_user: "Compte suspendu",
  toggle_ban: "Suspension modifiée",
  toggle_withdrawal: "Retraits autorisés modifiés",
  toggle_promoter: "Statut promoteur modifié",
  toggle_must_invite: "Condition de parrainage modifiée",
  toggle_admin: "Rôle administrateur modifié",
  toggle_super_admin: "Rôle super administrateur modifié",
  toggle_banker: "Rôle banquier modifié",
  update_admin_pin: "Code administrateur modifié",
  toggle_password_required: "Mot de passe administrateur requis modifié",
  assign_product: "Produit attribué",
  revoke_product: "Produit révoqué",
  grant_fortune_wheel_spins: "Tours de roue attribués",
  create_product: "Produit créé",
  update_product: "Produit modifié",
  create_channel: "Canal créé",
  update_channel: "Canal modifié",
  delete_channel: "Canal supprimé",
  block_ip: "Adresse IP bloquée",
  unblock_ip: "Adresse IP débloquée",
  update_settings: "Paramètres modifiés",
  reset_stats: "Statistiques réinitialisées",
  create_gift_code: "Code cadeau créé",
  delete_gift_code: "Code cadeau supprimé",
};

function getActionLabel(action: string) {
  return ACTION_LABELS[action] || action.replace(/[_-]+/g, " ");
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date inconnue"
    : date.toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });
}

export default function AdminAuditLog() {
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const { data, isLoading, isError, error } = useQuery<AuditLogPage>({
    queryKey: ["/api/admin/audit-logs", offset, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(offset),
        search,
      });
      const response = await apiRequest("GET", `/api/admin/audit-logs?${params}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Le journal n’a pas pu être chargé.");
      return result as AuditLogPage;
    },
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <div>
              <h2 className="font-semibold">Journal des actions administratives</h2>
              <p className="text-sm text-muted-foreground">
                Seules les actions des administrateurs et banquiers non super administrateurs apparaissent ici.
              </p>
            </div>
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setOffset(0);
              }}
              placeholder="Rechercher un nom, numéro, action ou référence"
              className="pl-9"
              aria-label="Rechercher dans le journal"
            />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-12 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Chargement du journal…
        </div>
      ) : isError ? (
        <Card>
          <CardContent className="flex items-center gap-2 p-4 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error instanceof Error ? error.message : "Erreur lors du chargement du journal."}
          </CardContent>
        </Card>
      ) : data?.items.length ? (
        <>
          <div className="space-y-3">
            {data.items.map((entry) => (
              <Card key={entry.id} data-testid={`audit-log-entry-${entry.id}`}>
                <CardContent className="space-y-3 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="secondary">{getActionLabel(entry.action)}</Badge>
                    <time className="text-xs text-muted-foreground" dateTime={entry.createdAt}>
                      {formatDate(entry.createdAt)}
                    </time>
                  </div>
                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Action effectuée par</p>
                      <p className="break-words font-semibold">{entry.actorName}</p>
                      <p className="break-all text-muted-foreground">
                        {entry.actorPhone} · {entry.actorCountry}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {entry.actorIsAdmin ? "Administrateur" : entry.actorIsBanker ? "Banquier" : "Personnel"}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Compte concerné</p>
                      {entry.targetUserId === null ? (
                        <p className="text-muted-foreground">Action générale sur la plateforme</p>
                      ) : (
                        <>
                          <p className="break-words font-medium">{entry.targetName || `Utilisateur #${entry.targetUserId}`}</p>
                          <p className="break-all text-muted-foreground">
                            {entry.targetPhone || "Téléphone non renseigné"}
                            {entry.targetCountry ? ` · ${entry.targetCountry}` : ""}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="rounded-md bg-muted/60 p-3 text-sm">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Détails</p>
                    <p className="break-words whitespace-pre-wrap">{entry.details}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground">
              Page {Math.floor(offset / PAGE_SIZE) + 1} · {data.items.length} action(s)
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOffset((current) => Math.max(current - PAGE_SIZE, 0))}
                disabled={offset === 0}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Précédent
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOffset((current) => current + PAGE_SIZE)}
                disabled={!data.hasMore}
              >
                Suivant
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            {search ? "Aucune action ne correspond à cette recherche." : "Aucune action enregistrée pour les administrateurs non super administrateurs."}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
