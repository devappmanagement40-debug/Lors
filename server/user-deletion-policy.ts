export function validateUserDeletion(
  actor: { id: number; isAdmin: boolean; isSuperAdmin: boolean; isBanned: boolean } | undefined,
  target: { id: number; isSuperAdmin: boolean; phone: string } | undefined,
  confirmation: unknown,
): void {
  if (!actor?.isAdmin || !actor.isSuperAdmin || actor.isBanned) {
    throw new Error("Suppression réservée aux super administrateurs.");
  }
  if (!target) throw new Error("Utilisateur introuvable.");
  if (target.id === actor.id || target.isSuperAdmin) {
    throw new Error("La suppression de votre compte ou d'un super administrateur est interdite.");
  }
  if (confirmation !== target.phone) {
    throw new Error("Saisissez le numéro exact du compte pour confirmer la suppression.");
  }
}
