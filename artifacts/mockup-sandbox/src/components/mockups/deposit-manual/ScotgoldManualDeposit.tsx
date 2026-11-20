import { useEffect, useState } from "react";
import "./_group.css";
import { Check, Clock3, Copy, LockKeyhole, Phone, Send, Smartphone, UserRound, X } from "lucide-react";

export function ScotgoldManualDeposit() {
  const [expiresAt] = useState(() => Date.now() + 30 * 60 * 1000);
  const [now, setNow] = useState(() => Date.now());
  const [copied, setCopied] = useState(false);
  const [holderCopied, setHolderCopied] = useState(false);
  const [payerPhone, setPayerPhone] = useState("544***058");
  const [editingPhone, setEditingPhone] = useState(false);
  const [reference, setReference] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const seconds = Math.max(0, Math.ceil((expiresAt - now) / 1000));
  const isExpired = seconds === 0;
  const isUrgent = seconds <= 60;
  const isWarning = seconds <= 5 * 60 && !isUrgent;
  const minutesText = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsText = String(seconds % 60).padStart(2, "0");

  useEffect(() => {
    const syncClock = () => setNow(Date.now());
    syncClock();
    const timer = window.setInterval(syncClock, 1000);
    document.addEventListener("visibilitychange", syncClock);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", syncClock);
    };
  }, []);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText("850 846 9XX");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const copyHolder = async () => {
    try {
      await navigator.clipboard.writeText("A. KON***");
      setHolderCopied(true);
      window.setTimeout(() => setHolderCopied(false), 1800);
    } catch {
      setHolderCopied(false);
    }
  };

  return (
    <main className="rmd-page">
      <style>{`
        .rmd-page { min-height:100dvh; background:#4b91ef; color:#fff; font-family:Arial,Helvetica,sans-serif; }
        .rmd-shell { position:relative; width:100%; max-width:500px; min-height:100dvh; margin:0 auto; overflow:hidden; background:#4b91ef; }
        .rmd-hero { height:172px; padding:12px 18px 18px; background:#4b91ef; color:#fff; }
        .rmd-tools { position:relative; display:flex; height:50px; align-items:flex-start; justify-content:flex-end; gap:9px; }
        .rmd-logo { position:absolute; top:4px; left:50%; width:114px; height:41px; transform:translateX(-50%); object-fit:contain; border:1px solid rgba(255,255,255,.75); border-radius:6px; background:#fff; box-shadow:0 2px 5px rgba(0,0,0,.14); }
        .rmd-timer { display:inline-flex; min-width:88px; height:38px; align-items:center; justify-content:center; gap:6px; margin-top:1px; padding:0 8px; border:1px solid rgba(255,255,255,.75); border-radius:8px; background:#f8faff; color:#183b69; font:700 15px 'Courier New',monospace; letter-spacing:.04em; font-variant-numeric:tabular-nums; box-shadow:0 2px 5px rgba(0,0,0,.12); transition:background .2s,color .2s,border-color .2s; }
        .rmd-timer--warning { border-color:#f0cd70; background:#fff6dc; color:#815d12; }
        .rmd-timer--urgent { border-color:#edb5b5; background:#fff0f0; color:#a32e2e; animation:rmd-timer-pulse 1.4s ease-in-out infinite; }
        @keyframes rmd-timer-pulse { 50% { box-shadow:0 2px 8px rgba(163,46,46,.22); } }
        @media (prefers-reduced-motion:reduce) { .rmd-timer--urgent { animation:none; } }
        .rmd-close { display:grid; width:39px; height:39px; flex:0 0 auto; place-items:center; border:1px solid rgba(255,255,255,.48); border-radius:50%; background:#4385df; color:#fff; }
        .rmd-summary { display:flex; flex-direction:column; align-items:center; margin-top:20px; text-align:center; }
        .rmd-summary p { margin:0; color:#fff; font-size:14px; font-weight:800; letter-spacing:.09em; }
        .rmd-summary h1 { display:flex; align-items:baseline; gap:5px; margin:3px 0 0; color:#fff; font-size:39px; font-weight:900; letter-spacing:-.045em; line-height:1.05; }
        .rmd-summary small { font-size:17px; font-weight:800; letter-spacing:0; }
        .rmd-content { padding:23px 18px 24px; }
        .rmd-heading { display:flex; align-items:center; gap:10px; margin:0; color:#fff; font-size:17px; font-weight:800; }
        .rmd-heading svg { flex:0 0 auto; color:#fff; stroke-width:2.3; }
        .rmd-recipient { display:flex; min-height:30px; align-items:center; gap:10px; margin-top:14px; color:#fff; font-size:15px; }
        .rmd-recipient strong { color:#fff; font-weight:800; }
        .rmd-badge { padding:6px 11px; border-radius:99px; background:#fff; color:#14538a; font-size:10px; font-weight:800; white-space:nowrap; }
        .rmd-account { display:flex; height:68px; align-items:center; margin-top:12px; overflow:hidden; border:1px solid #d8dce1; border-radius:14px; background:#fff; box-shadow:0 2px 8px rgba(39,54,70,.13); }
        .rmd-icon { width:38px; height:38px; flex:0 0 auto; margin-left:10px; border-radius:8px; object-fit:contain; }
        .rmd-account-info { display:flex; min-width:0; flex:1; flex-direction:column; gap:3px; padding:0 11px; }
        .rmd-account-info span { color:#78818d; font-size:12px; font-weight:700; }
        .rmd-account-info strong { color:#203953; font-size:19px; font-weight:800; letter-spacing:.02em; white-space:nowrap; }
        .rmd-copy { display:inline-flex; width:104px; height:68px; flex:0 0 104px; align-items:center; justify-content:center; gap:7px; border:0; border-radius:0 13px 13px 0; background:#14538a; color:#fff; font:800 15px Arial,sans-serif; }
        .rmd-field-label { display:block; margin:19px 0 8px; color:#fff; font-size:15px; font-weight:700; }
        .rmd-holder { display:flex; height:57px; align-items:center; gap:11px; overflow:hidden; padding:0 0 0 15px; border:1px solid #d8dce1; border-radius:14px; background:#fff; box-shadow:0 2px 8px rgba(39,54,70,.12); }
        .rmd-holder>svg { color:#203b5b; }
        .rmd-holder strong { min-width:0; flex:1; overflow:hidden; color:#203953; font-size:17px; font-weight:800; text-overflow:ellipsis; white-space:nowrap; }
        .rmd-holder-copy { display:inline-flex; width:94px; height:57px; flex:0 0 94px; align-items:center; justify-content:center; gap:6px; border:0; border-radius:0 13px 13px 0; background:#14538a; color:#fff; font:800 14px Arial,sans-serif; }
        .rmd-holder-copy svg { color:#fff; }
        .rmd-payer { margin-top:18px; }
        .rmd-payer h2 { display:flex; align-items:center; gap:9px; margin:0; color:#fff; font-size:16px; font-weight:800; }
        .rmd-payer h2 svg { color:#fff; }
        .rmd-phone-row>svg { color:#203b5b; }
        .rmd-payer>p { margin:8px 0 9px; color:rgba(255,255,255,.9); font-size:15px; }
        .rmd-phone-row { display:flex; height:57px; align-items:center; gap:10px; overflow:hidden; padding-left:14px; border:1px solid #d8dce1; border-radius:13px; background:#fff; box-shadow:0 2px 8px rgba(39,54,70,.13); }
        .rmd-phone-value,.rmd-phone-input { min-width:0; flex:1; color:#203953; font:800 17px Arial,sans-serif; }
        .rmd-phone-input { border:0; outline:0; background:transparent; }
        .rmd-edit { display:inline-flex; width:76px; height:57px; flex:0 0 76px; align-items:center; justify-content:center; border:0; border-radius:0 12px 12px 0; background:#14538a; color:#fff; font:800 15px Arial,sans-serif; }
        .rmd-reference { position:relative; margin-top:18px; padding:14px; border:1px solid #d8dce1; border-radius:14px; background:#fff; box-shadow:0 2px 8px rgba(39,54,70,.13); }
        .rmd-reference label { display:flex; align-items:center; gap:4px; margin-bottom:9px; color:#26313d; font-size:15px; font-weight:800; }
        .rmd-reference label strong { color:#d52e2e; }
        .rmd-reference input { box-sizing:border-box; width:100%; height:56px; padding:0 14px; border:1px solid #d4d8dc; border-radius:13px; outline:0; background:#fff; color:#26384d; font:16px Arial,sans-serif; }
        .rmd-reference input:focus { border-color:#4b91ef; box-shadow:0 0 0 3px rgba(75,145,239,.18); }
        .rmd-reference input::placeholder { color:#9ba0a7; }
        .rmd-reference>p { margin:8px 0 0; color:#727983; font-size:13px; line-height:1.4; }
        .rmd-submit { display:flex; width:100%; height:65px; align-items:center; justify-content:center; margin-top:22px; border:0; border-radius:14px; background:#14538a; box-shadow:0 3px 9px rgba(30,60,92,.17); color:#fff; font:800 16px Arial,sans-serif; }
        .rmd-submit:disabled { background:#8ab2e9; }
        .rmd-pending { display:flex; align-items:center; gap:10px; margin:17px 2px 0; color:#fff; font-size:14px; line-height:1.4; }
        .rmd-pending svg { flex:0 0 auto; color:#d7fff0; }
        .rmd-chat { position:fixed; z-index:10; top:69%; right:max(10px,calc((100vw - 500px)/2 + 10px)); display:grid; width:72px; height:76px; place-items:center; border:3px solid #fff; border-radius:50%; background:#fff; box-shadow:0 4px 12px rgba(20,44,70,.22); }
        .rmd-chat-logo { width:44px; height:44px; border-radius:50%; object-fit:cover; }
        .rmd-chat-send { position:absolute; right:-4px; bottom:-3px; display:grid; width:22px; height:22px; place-items:center; border:2px solid #fff; border-radius:50%; background:#14538a; color:#fff; }
        @media (min-width:520px) { .rmd-page { padding:18px; } .rmd-shell { min-height:auto; border:1px solid #d6dbe0; border-radius:18px; box-shadow:0 12px 36px rgba(22,42,64,.12); } .rmd-chat { right:max(22px,calc((100vw - 500px)/2 + 10px)); } }
        @media (max-width:430px) { .rmd-logo { left:0; width:114px; transform:none; } }
        @media (max-width:360px) { .rmd-chat { top:74%; } }
        @media (max-width:360px) { .rmd-content { padding-right:13px; padding-left:13px; } .rmd-badge { padding:5px 7px; font-size:9px; } .rmd-account-info { padding:0 8px; } .rmd-account-info strong { font-size:16px; } .rmd-copy { width:85px; flex-basis:85px; gap:5px; font-size:13px; } }
      `}</style>

      <div className="rmd-shell">
        <header className="rmd-hero">
          <div className="rmd-tools">
            <img className="rmd-logo" src="/__mockup/images/scotgold-platform-wordmark.png" alt="Scotgold Resources Ltd." />
            <span
              className={`rmd-timer${isUrgent ? " rmd-timer--urgent" : isWarning ? " rmd-timer--warning" : ""}`}
              role="timer"
              aria-label={isExpired ? "Délai de paiement expiré" : `Temps restant ${minutesText}:${secondsText}`}
              aria-live="off"
            >
              <Clock3 size={16} aria-hidden="true" />
              {minutesText}:{secondsText}
            </span>
            <button className="rmd-close" aria-label="Fermer" type="button"><X size={23} /></button>
          </div>
          <div className="rmd-summary">
            <p>MONTANT À PAYER</p>
            <h1><small>CDF</small>20 000</h1>
          </div>
        </header>

        <div className="rmd-content">
          <h1 className="rmd-heading"><Smartphone size={19} /> Instructions de paiement</h1>
          <div className="rmd-recipient">
            <span>Destinataire : <strong>Orange money</strong></span>
            <span className="rmd-badge">COMPTE MARCHAND</span>
          </div>

          <section className="rmd-account">
            <img className="rmd-icon" src="/__mockup/images/payment-reference-orange-mark.png" alt="" />
            <div className="rmd-account-info">
              <span>Numéro du compte</span>
              <strong>850 846 9XX</strong>
            </div>
            <button className="rmd-copy" onClick={copyNumber} type="button">
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copié" : "Copier"}
            </button>
          </section>

          <label className="rmd-field-label">Titulaire du compte</label>
          <div className="rmd-holder">
            <UserRound size={21} />
            <strong>A. KON***</strong>
            <button className="rmd-holder-copy" onClick={copyHolder} type="button">
              {holderCopied ? <Check size={16} /> : <Copy size={16} />}
              {holderCopied ? "Copié" : "Copier"}
            </button>
          </div>

          <section className="rmd-payer">
            <h2><Phone size={20} /> Vérifiez votre numéro</h2>
            <p>Si incorrect, modifiez-le.</p>
            <div className="rmd-phone-row">
              <Phone size={20} />
              {editingPhone ? (
                <input className="rmd-phone-input" value={payerPhone} onChange={(event) => setPayerPhone(event.target.value)} />
              ) : (
                <span className="rmd-phone-value">{payerPhone}</span>
              )}
              <button className="rmd-edit" onClick={() => setEditingPhone(!editingPhone)} type="button">
                {editingPhone ? "Valider" : "Éditer"}
              </button>
            </div>
          </section>

          <section className="rmd-reference">
            <label htmlFor="rmd-reference">ID de transaction <strong>*</strong></label>
            <input
              id="rmd-reference"
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              placeholder="Saisissez l’ID du reçu"
            />
            <p>Saisissez l’identifiant reçu après le transfert.</p>
          </section>

          <button
            className="rmd-submit"
            disabled={!reference.trim() || submitted || isExpired}
            onClick={() => { if (!isExpired) setSubmitted(true); }}
            type="button"
          >
            {submitted ? "Paiement soumis" : isExpired ? "Délai de paiement expiré" : "J’ai terminé le paiement"}
          </button>
          <p className="rmd-pending">
            <LockKeyhole size={17} />
            {isExpired
              ? "Le délai est expiré. Revenez en arrière pour recommencer le dépôt."
              : "Votre dépôt restera en attente jusqu’à sa vérification."}
          </p>
        </div>

        <div className="rmd-chat" aria-hidden="true">
          <img className="rmd-chat-logo" src="/__mockup/images/scotgold-platform-icon.png" alt="" />
          <span className="rmd-chat-send"><Send size={13} fill="currentColor" /></span>
        </div>
      </div>
    </main>
  );
}
