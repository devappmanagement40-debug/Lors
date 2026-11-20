import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlertCircle, Loader2, Package, Plus, Save, Trash2, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  DEFAULT_FORTUNE_WHEEL_CONFIG,
  MAX_FORTUNE_WHEEL_PRIZES,
  type FortuneWheelConfig,
  type FortuneWheelPrize,
} from "@shared/fortune-wheel";

type WheelProductOption = {
  id: number;
  name: string;
  price: string;
  productType: "stable" | "activity";
  isActive: boolean;
};

type AdminWheelData = {
  config: FortuneWheelConfig;
  products: WheelProductOption[];
};

function cloneConfig(config: FortuneWheelConfig): FortuneWheelConfig {
  return {
    lossProbabilityPercent: config.lossProbabilityPercent,
    prizes: config.prizes.map((prize) => ({ ...prize })),
  };
}

function makePrizeId() {
  return `prize-${window.crypto.randomUUID()}`;
}

function numberInputValue(value: string) {
  if (!value.trim()) return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, Math.trunc(parsed)) : 0;
}

export default function AdminFortuneWheel() {
  const { toast } = useToast();
  const [draft, setDraft] = useState<FortuneWheelConfig>(
    cloneConfig(DEFAULT_FORTUNE_WHEEL_CONFIG),
  );
  const [hasLoadedConfig, setHasLoadedConfig] = useState(false);

  const configQuery = useQuery<AdminWheelData>({
    queryKey: ["/api/admin/fortune-wheel/config"],
  });

  useEffect(() => {
    if (!configQuery.data || hasLoadedConfig) return;
    setDraft(cloneConfig(configQuery.data.config));
    setHasLoadedConfig(true);
  }, [configQuery.data, hasLoadedConfig]);

  const enabledProbability = useMemo(
    () => draft.prizes.reduce(
      (sum, prize) => sum + (prize.enabled ? prize.probabilityPercent : 0),
      0,
    ),
    [draft.prizes],
  );
  const totalProbability = enabledProbability + draft.lossProbabilityPercent;
  const missingProduct = draft.prizes.some(
    (prize) => prize.type === "product" &&
      !configQuery.data?.products.some((product) => product.id === prize.productId),
  );
  const invalidPrizeValues = draft.lossProbabilityPercent < 0 ||
    draft.lossProbabilityPercent > 100 ||
    draft.prizes.some((prize) =>
      prize.probabilityPercent < 0 ||
      prize.probabilityPercent > 100 ||
      (prize.type === "cash" && (
        !Number.isSafeInteger(prize.amount) ||
        prize.amount < 1 ||
        prize.amount > 2_147_483_647
      )),
    );
  const canSave = totalProbability === 100 &&
    !missingProduct && !invalidPrizeValues && draft.prizes.length > 0;

  const saveMutation = useMutation({
    mutationFn: async (config: FortuneWheelConfig) => {
      const response = await apiRequest("PUT", "/api/admin/fortune-wheel/config", config);
      return response.json() as Promise<{ config: FortuneWheelConfig }>;
    },
    onSuccess: (result) => {
      setDraft(cloneConfig(result.config));
      setHasLoadedConfig(true);
      void queryClient.invalidateQueries({ queryKey: ["/api/admin/fortune-wheel/config"] });
      void queryClient.invalidateQueries({ queryKey: ["/api/fortune-wheel/status"] });
      toast({ title: "Roue mise à jour", description: "Les nouveaux gains sont enregistrés." });
    },
    onError: (error: Error) => {
      toast({ title: "Enregistrement impossible", description: error.message, variant: "destructive" });
    },
  });

  function updatePrize(index: number, patch: Partial<FortuneWheelPrize>) {
    setDraft((current) => ({
      ...current,
      prizes: current.prizes.map((prize, prizeIndex) =>
        prizeIndex === index ? { ...prize, ...patch } as FortuneWheelPrize : prize,
      ),
    }));
  }

  function addCashPrize() {
    setDraft((current) => ({
      ...current,
      prizes: [
        ...current.prizes,
        {
          id: makePrizeId(),
          type: "cash",
          amount: 100,
          probabilityPercent: 0,
          enabled: false,
        },
      ],
    }));
  }

  function addProductPrize() {
    const firstProduct = configQuery.data?.products[0];
    if (!firstProduct) {
      toast({
        title: "Aucun produit disponible",
        description: "Ajoutez d’abord un produit actif au catalogue.",
        variant: "destructive",
      });
      return;
    }
    setDraft((current) => ({
      ...current,
      prizes: [
        ...current.prizes,
        {
          id: makePrizeId(),
          type: "product",
          productId: firstProduct.id,
          probabilityPercent: 0,
          enabled: false,
        },
      ],
    }));
  }

  function removePrize(index: number) {
    setDraft((current) => ({
      ...current,
      prizes: current.prizes.filter((_, prizeIndex) => prizeIndex !== index),
    }));
  }

  if (configQuery.isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Chargement des réglages de la roue…</div>;
  }

  if (configQuery.isError || !configQuery.data) {
    return (
      <Card>
        <CardContent className="flex items-center gap-3 p-6 text-sm text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          Impossible de charger la configuration de la roue. Actualisez la page et réessayez.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Gains de la roue</CardTitle>
          <CardDescription>
            Modifiez les montants, ajoutez des produits et définissez les probabilités de chaque résultat.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
            Les probabilités des gains actifs et de la perte doivent totaliser exactement 100 %. Un produit gagné est
            attribué automatiquement au compte, sans débit du solde.
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="wheel-loss-probability">Probabilité de ne rien gagner (%)</Label>
              <Input
                id="wheel-loss-probability"
                type="number"
                min={0}
                max={100}
                step={1}
                value={draft.lossProbabilityPercent}
                onChange={(event) => setDraft((current) => ({
                  ...current,
                  lossProbabilityPercent: numberInputValue(event.target.value),
                }))}
              />
            </div>
            <div className="flex items-end">
              <div className={`w-full rounded-lg border p-3 text-sm ${
                totalProbability === 100 ? "border-emerald-500/40 bg-emerald-500/5" : "border-amber-500/40 bg-amber-500/5"
              }`}>
                Total configuré : <strong>{totalProbability} %</strong>
                {totalProbability !== 100 && (
                  <span className="ml-2 text-muted-foreground">— il faut atteindre 100 %.</span>
                )}
                {draft.lossProbabilityPercent === 100 && (
                  <span className="mt-1 block text-amber-700 dark:text-amber-300">
                    Tous les tours configurés seront perdants.
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={addCashPrize} disabled={draft.prizes.length >= MAX_FORTUNE_WHEEL_PRIZES}>
              <Plus className="h-4 w-4" />
              Ajouter un montant en CDF
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={addProductPrize}
              disabled={draft.prizes.length >= MAX_FORTUNE_WHEEL_PRIZES || configQuery.data.products.length === 0}
            >
              <Plus className="h-4 w-4" />
              Ajouter un produit
            </Button>
            <span className="self-center text-xs text-muted-foreground">
              Maximum {MAX_FORTUNE_WHEEL_PRIZES} segments sur la roue.
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 lg:grid-cols-2">
        {draft.prizes.map((prize, index) => (
          <Card key={prize.id} className={!prize.enabled ? "opacity-80" : undefined}>
            <CardContent className="space-y-4 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-semibold">
                  {prize.type === "cash"
                    ? <WalletCards className="h-4 w-4 text-primary" />
                    : <Package className="h-4 w-4 text-primary" />}
                  <span>{prize.type === "cash" ? "Gain en argent" : "Gain en produit"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Label htmlFor={`wheel-enabled-${prize.id}`} className="text-xs text-muted-foreground">
                    {prize.enabled ? "Activé" : "Désactivé"}
                  </Label>
                  <Switch
                    id={`wheel-enabled-${prize.id}`}
                    checked={prize.enabled}
                    onCheckedChange={(enabled) => updatePrize(index, {
                      enabled,
                      probabilityPercent: enabled ? prize.probabilityPercent : 0,
                    })}
                    aria-label={prize.enabled ? "Désactiver ce gain" : "Activer ce gain"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removePrize(index)}
                    aria-label="Supprimer ce gain"
                    disabled={draft.prizes.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {prize.type === "cash" ? (
                <div className="space-y-2">
                  <Label htmlFor={`wheel-amount-${prize.id}`}>Montant du gain (CDF)</Label>
                  <Input
                    id={`wheel-amount-${prize.id}`}
                    type="number"
                    min={1}
                    step={1}
                    value={prize.amount}
                    onChange={(event) => updatePrize(index, { amount: numberInputValue(event.target.value) })}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor={`wheel-product-${prize.id}`}>Produit attribué</Label>
                  <select
                    id={`wheel-product-${prize.id}`}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={prize.productId}
                    onChange={(event) => updatePrize(index, { productId: Number(event.target.value) })}
                  >
                    {configQuery.data.products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} — {Number(product.price).toLocaleString("fr-FR")} CDF
                        {product.isActive ? "" : " (inactif du catalogue)"}
                      </option>
                    ))}
                  </select>
                  {missingProduct && (
                    <p className="text-xs text-destructive">Choisissez un produit actif du catalogue.</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor={`wheel-probability-${prize.id}`}>Probabilité de ce gain (%)</Label>
                <Input
                  id={`wheel-probability-${prize.id}`}
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  value={prize.probabilityPercent}
                  disabled={!prize.enabled}
                  onChange={(event) => updatePrize(index, {
                    probabilityPercent: numberInputValue(event.target.value),
                  })}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {!canSave && (
          <p className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            Vérifiez les probabilités, le produit sélectionné et le total avant d’enregistrer.
          </p>
        )}
        <Button
          type="button"
          className="sm:ml-auto"
          disabled={!canSave || saveMutation.isPending}
          onClick={() => saveMutation.mutate(draft)}
        >
          {saveMutation.isPending
            ? <Loader2 className="h-4 w-4 animate-spin" />
            : <Save className="h-4 w-4" />}
          Enregistrer la roue
        </Button>
      </div>
    </div>
  );
}
