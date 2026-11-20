import { useEffect, useState } from "react";
import {
  Check,
  Clock3,
  Copy,
  LockKeyhole,
  Phone,
  Send,
  Smartphone,
  UserRound,
  X,
} from "lucide-react";
import "./manual-deposit-confirmation.css";

interface ManualDepositConfirmationProps {
  amount: number | string;
  expiresAt: number;
  operatorName: string;
  paymentLink: string | null;
  destinationPhone: string | null;
  accountHolder: string;
  payerPhone: string;
  isEditingPayerPhone: boolean;
  reference: string;
  isSubmitting: boolean;
  isCopied: boolean;
  isAccountHolderCopied: boolean;
  onBack: () => void;
  onCopyDestination: () => void;
  onCopyAccountHolder: () => void;
  onPayerPhoneChange: (value: string) => void;
  onEditPayerPhone: () => void;
  onSavePayerPhone: () => void;
  onReferenceChange: (value: string) => void;
  onSubmit: () => void;
}

export default function ManualDepositConfirmation({
  amount,
  expiresAt,
  operatorName,
  paymentLink,
  destinationPhone,
  accountHolder,
  payerPhone,
  isEditingPayerPhone,
  reference,
  isSubmitting,
  isCopied,
  isAccountHolderCopied,
  onBack,
  onCopyDestination,
  onCopyAccountHolder,
  onPayerPhoneChange,
  onEditPayerPhone,
  onSavePayerPhone,
  onReferenceChange,
  onSubmit,
}: ManualDepositConfirmationProps) {
  const [now, setNow] = useState(() => Date.now());
  const secondsRemaining = Math.max(0, Math.ceil((expiresAt - now) / 1000));
  const isPaymentExpired = secondsRemaining === 0;
  const isTimerUrgent = secondsRemaining <= 60;
  const isTimerWarning = secondsRemaining <= 5 * 60 && !isTimerUrgent;
  const formattedAmount = Number(amount)
    .toLocaleString("fr-FR")
    .replace(/[\u00a0\u202f]/g, " ");
  const timerMinutes = Math.floor(secondsRemaining / 60)
    .toString()
    .padStart(2, "0");
  const timerSeconds = (secondsRemaining % 60).toString().padStart(2, "0");

  useEffect(() => {
    const syncClock = () => setNow(Date.now());
    syncClock();
    const timer = window.setInterval(syncClock, 1000);
    document.addEventListener("visibilitychange", syncClock);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", syncClock);
    };
  }, [expiresAt]);

  return (
    <main className="mdc-page">
      <div className="mdc-shell">
        <header className="mdc-hero">
          <div className="mdc-hero-tools">
            <img className="mdc-platform-logo" src="/scotgold-home/wordmark.png" alt="Scotgold Resources Ltd." />
            <span
              className={`mdc-timer${isTimerUrgent ? " mdc-timer--urgent" : isTimerWarning ? " mdc-timer--warning" : ""}`}
              role="timer"
              aria-label={isPaymentExpired ? "Délai de paiement expiré" : `Temps restant ${timerMinutes}:${timerSeconds}`}
              aria-live="off"
            >
              <Clock3 size={16} aria-hidden="true" />
              {timerMinutes}:{timerSeconds}
            </span>
            <button className="mdc-close" type="button" aria-label="Fermer" onClick={onBack}>
              <X size={23} />
            </button>
          </div>

          <div className="mdc-pay-summary">
            <p>MONTANT À PAYER</p>
            <h1><small>CDF</small>{formattedAmount}</h1>
          </div>
        </header>

        <div className="mdc-content">
          <h2 className="mdc-heading"><Smartphone size={19} /> Instructions de paiement</h2>

          <div className="mdc-recipient">
            <span>Destinataire : <strong>{operatorName}</strong></span>
            <span className="mdc-merchant-badge">COMPTE MARCHAND</span>
          </div>

          <section className="mdc-account-row" aria-label="Numéro du compte destinataire">
            <div className="mdc-account-info">
              <span>{paymentLink ? "Lien du compte" : "Numéro du compte"}</span>
              {paymentLink ? (
                <a href={paymentLink} target="_blank" rel="noreferrer">{paymentLink}</a>
              ) : (
                <strong>{destinationPhone || "Numéro non renseigné"}</strong>
              )}
            </div>
            <button className="mdc-copy-button" type="button" onClick={onCopyDestination}>
              {isCopied ? <Check size={18} /> : <Copy size={18} />}
              {isCopied ? "Copié" : "Copier"}
            </button>
          </section>

          <label className="mdc-field-label">Titulaire du compte</label>
          <div className="mdc-holder-row">
            <UserRound size={21} aria-hidden="true" />
            <strong>{accountHolder || "Titulaire non renseigné"}</strong>
            <button
              className="mdc-holder-copy-button"
              type="button"
              aria-label="Copier le nom du titulaire"
              disabled={!accountHolder.trim()}
              onClick={onCopyAccountHolder}
            >
              {isAccountHolderCopied ? <Check size={16} /> : <Copy size={16} />}
              {isAccountHolderCopied ? "Copié" : "Copier"}
            </button>
          </div>

          <section className="mdc-payer-section">
            <h3><Phone size={20} /> Vérifiez votre numéro</h3>
            <p>Si incorrect, modifiez-le.</p>
            <div className="mdc-payer-row">
              <Phone size={20} aria-hidden="true" />
              {isEditingPayerPhone ? (
                <input
                  aria-label="Modifier votre numéro payeur"
                  autoComplete="tel"
                  className="mdc-payer-input"
                  inputMode="tel"
                  maxLength={16}
                  onChange={(event) => onPayerPhoneChange(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") onSavePayerPhone();
                  }}
                  type="tel"
                  value={payerPhone}
                />
              ) : (
                <span className="mdc-payer-value">{payerPhone || "Numéro non renseigné"}</span>
              )}
              <button
                className="mdc-edit-button"
                type="button"
                onClick={isEditingPayerPhone ? onSavePayerPhone : onEditPayerPhone}
              >
                {isEditingPayerPhone ? "Valider" : "Éditer"}
              </button>
            </div>
          </section>

          <section className="mdc-reference-card">
            <label htmlFor="manual-deposit-reference">
              ID de transaction <strong>*</strong>
            </label>
            <input
              autoComplete="off"
              id="manual-deposit-reference"
              maxLength={120}
              onChange={(event) => onReferenceChange(event.target.value)}
              placeholder="Saisissez l’ID du reçu"
              required
              value={reference}
            />
            <p>Saisissez l’identifiant reçu après le transfert.</p>
          </section>

          <button
            className="mdc-submit-button"
            type="button"
            disabled={isSubmitting || !reference.trim() || isPaymentExpired}
            onClick={onSubmit}
          >
            {isSubmitting
              ? "Envoi en cours..."
              : isPaymentExpired
                ? "Délai de paiement expiré"
                : "J’ai terminé le paiement"}
          </button>

          <p className="mdc-pending-note">
            <LockKeyhole size={17} aria-hidden="true" />
            <span>
              {isPaymentExpired
                ? "Le délai est expiré. Revenez en arrière pour recommencer le dépôt."
                : "Votre dépôt restera en attente jusqu’à sa vérification."}
            </span>
          </p>
        </div>

        <div className="mdc-chat-bubble" aria-hidden="true">
          <img className="mdc-chat-logo" src="/scotgold-icon-192.png" alt="" />
          <span className="mdc-chat-send"><Send size={13} fill="currentColor" /></span>
        </div>
      </div>
    </main>
  );
}
