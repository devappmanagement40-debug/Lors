export type ManualDepositProofResult =
  | { valid: true }
  | { valid: false; message: string };

export function validateManualDepositProof(reference: string): ManualDepositProofResult {
  return reference.trim().length > 0
    ? { valid: true }
    : { valid: false, message: "L’ID de transaction est obligatoire pour confirmer ce dépôt." };
}
