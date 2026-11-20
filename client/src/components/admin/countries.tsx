import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus, Pencil, Globe } from "lucide-react";
import type { Country } from "@shared/schema";
import EmptyState from "@/components/empty-state";

interface CountryForm {
  code: string;
  name: string;
  currency: string;
  phonePrefix: string;
  operators: string;
  isActive: boolean;
}

const emptyForm: CountryForm = {
  code: "CD",
  name: "République démocratique du Congo",
  currency: "CDF",
  phonePrefix: "243",
  operators: "",
  isActive: true,
};

export default function AdminCountries() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<CountryForm>(emptyForm);

  const { data: countriesList, isLoading } = useQuery<Country[]>({
    queryKey: ["/api/admin/countries"],
  });

  const saveMutation = useMutation({
    mutationFn: async (data: CountryForm) => {
      const payload = {
        ...data,
        operators: JSON.stringify(
          data.operators.split(",").map(o => o.trim()).filter(Boolean)
        ),
      };
      if (editingId) {
        const res = await apiRequest("PUT", `/api/admin/countries/${editingId}`, payload);
        if (!res.ok) throw new Error((await res.json()).message);
        return res.json();
      } else {
        const res = await apiRequest("POST", "/api/admin/countries", payload);
        if (!res.ok) throw new Error((await res.json()).message);
        return res.json();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/countries"] });
      queryClient.invalidateQueries({ queryKey: ["/api/countries"] });
      toast({ title: editingId ? "Pays mis à jour!" : "Pays ajouté!" });
      setDialogOpen(false);
      setForm(emptyForm);
      setEditingId(null);
    },
    onError: (e: any) => {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    },
  });

  const openEdit = (c: Country) => {
    let operatorsStr = "";
    try { operatorsStr = JSON.parse(c.operators).join(", "); } catch {}
    setForm({
      code: c.code,
      name: c.name,
      currency: "CDF",
      phonePrefix: c.phonePrefix,
      operators: operatorsStr,
      isActive: true,
    });
    setEditingId(c.id);
    setDialogOpen(true);
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(form);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Pays disponibles ({countriesList?.length ?? 0})
        </h2>
        {countriesList && !countriesList.some((country) => country.code.toUpperCase() === "CD") && (
          <Button onClick={openAdd} size="sm" data-testid="button-add-country">
            <Plus className="w-4 h-4 mr-1" />
            Ajouter la RDC
          </Button>
        )}
      </div>

      {isLoading && <p className="text-muted-foreground text-sm">Chargement...</p>}

      <div className="grid gap-3">
        {countriesList?.map((c) => {
          let ops: string[] = [];
          try { ops = JSON.parse(c.operators); } catch {}
          return (
            <Card key={c.id} data-testid={`card-country-${c.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-base">{c.name}</span>
                      <Badge variant="outline" className="text-xs">{c.code}</Badge>
                      <Badge variant="secondary" className="text-xs">CDF</Badge>
                      <Badge variant="outline" className="text-xs">Actif</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Indicatif: +{c.phonePrefix}
                    </p>
                    {ops.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {ops.map((op) => (
                          <Badge key={op} variant="outline" className="text-xs font-normal">{op}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(c)} data-testid={`button-edit-country-${c.id}`}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {countriesList?.length === 0 && (
          <EmptyState className="py-8">Aucun pays configuré</EmptyState>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(v) => { if (!v) { setDialogOpen(false); setEditingId(null); setForm(emptyForm); }}}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Modifier la RDC" : "Ajouter la RDC"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Code pays</Label>
                <Input
                  value={form.code}
                  disabled
                  required
                  data-testid="input-country-code"
                />
              </div>
              <div>
                <Label>Devise</Label>
                <Input
                  value="CDF"
                  disabled
                  required
                  data-testid="input-country-currency"
                />
              </div>
            </div>
            <div>
              <Label>Nom du pays</Label>
              <Input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="République démocratique du Congo"
                required
                data-testid="input-country-name"
              />
            </div>
            <div>
              <Label>Indicatif téléphonique (sans +)</Label>
              <Input
                value={form.phonePrefix}
                onChange={e => setForm({ ...form, phonePrefix: e.target.value })}
                placeholder="243"
                required
                data-testid="input-country-prefix"
              />
            </div>
            <div>
              <Label>Opérateurs (séparés par virgule)</Label>
              <Input
                value={form.operators}
                onChange={e => setForm({ ...form, operators: e.target.value })}
                placeholder="Airtel Money, Orange Money, Vodacom"
                data-testid="input-country-operators"
              />
              <p className="text-xs text-muted-foreground mt-1">Exemple: Airtel Money, Orange Money, Vodacom</p>
            </div>
            <p className="text-xs text-muted-foreground">La RDC reste active et sa devise est le CDF.</p>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => { setDialogOpen(false); setEditingId(null); setForm(emptyForm); }}>
                Annuler
              </Button>
              <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-country">
                {saveMutation.isPending ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
