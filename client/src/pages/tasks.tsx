import { useMemo, useState } from "react";
import { Link2 } from "lucide-react";
import { FaFacebookF, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { buildReferralLink } from "@/lib/referral-link";
import { buildReferralShareTargets } from "@/lib/referral-share";
import "./tasks.css";

type CopyKind = "code" | "link";

export default function TasksPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [copied, setCopied] = useState<CopyKind | null>(null);

  const invitationLink = useMemo(() => {
    if (!user?.referralCode || typeof window === "undefined") return "";
    return buildReferralLink(window.location.origin, user.referralCode);
  }, [user?.referralCode]);
  const shareTargets = useMemo(
    () => invitationLink ? buildReferralShareTargets(invitationLink) : null,
    [invitationLink],
  );

  if (!user) return null;

  const copyInvitationValue = async (value: string, kind: CopyKind) => {
    try {
      try {
        if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
        await navigator.clipboard.writeText(value);
      } catch {
        const field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        const copiedSuccessfully = document.execCommand("copy");
        field.remove();
        if (!copiedSuccessfully) throw new Error("Copy failed");
      }

      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1300);
      toast({
        title: "Copie réussie",
        description: kind === "code"
          ? "Code d’invitation copié."
          : "Lien d’invitation copié.",
      });
    } catch {
      toast({
        title: "Copie impossible",
        description: "Veuillez sélectionner et copier le texte manuellement.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="invite-reference-preview invite-page">
      <div className="invite-reference-scroll">
        <header className="invite-reference-header">
          <span className="invite-reference-brand">SCOTGOLD</span>
          <h1>Mon invitation</h1>

          <section className="invite-reference-code-panel" aria-label="Informations d'invitation">
            <div className="invite-reference-code-row">
              <div className="invite-reference-code-copy">
                <span className="invite-reference-label">Code d&apos;invitation</span>
                <strong>{user.referralCode}</strong>
              </div>
              <button
                className="invite-reference-copy-button"
                type="button"
                onClick={() => void copyInvitationValue(user.referralCode, "code")}
                aria-label="Copier le code d'invitation"
              >
                {copied === "code" ? "Copié" : "Copier"}
              </button>
            </div>
            <div className="invite-reference-link-section">
              <div className="invite-reference-code-copy">
                <span className="invite-reference-label">Lien d&apos;invitation</span>
              </div>
              <div className="invite-reference-link-line">
                <Link2 aria-hidden="true" />
                <strong className="invite-reference-url">{invitationLink || "Lien indisponible"}</strong>
              </div>
              <button
                className="invite-reference-link-button"
                type="button"
                onClick={() => invitationLink && void copyInvitationValue(invitationLink, "link")}
                disabled={!invitationLink}
                aria-label="Copier le lien d'invitation"
              >
                <Link2 aria-hidden="true" />
                {copied === "link" ? "Lien copié" : "Copier le lien d’invitation"}
              </button>
            </div>
            <div className="invite-reference-share" aria-label="Partager mon invitation">
              <p className="invite-reference-share-title">Partager via</p>
              {shareTargets ? (
                <div className="invite-reference-social-grid">
                  <a
                    className="invite-reference-social-link"
                    href={shareTargets.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Partager mon invitation sur WhatsApp"
                  >
                    <span className="invite-reference-social-icon is-whatsapp"><FaWhatsapp aria-hidden="true" /></span>
                    <span>WhatsApp</span>
                  </a>
                  <a
                    className="invite-reference-social-link"
                    href={shareTargets.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Partager mon invitation sur Telegram"
                  >
                    <span className="invite-reference-social-icon is-telegram"><FaTelegramPlane aria-hidden="true" /></span>
                    <span>Telegram</span>
                  </a>
                  <a
                    className="invite-reference-social-link"
                    href={shareTargets.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Partager mon invitation sur Facebook"
                  >
                    <span className="invite-reference-social-icon is-facebook"><FaFacebookF aria-hidden="true" /></span>
                    <span>Facebook</span>
                  </a>
                </div>
              ) : (
                <p className="invite-reference-share-unavailable">Lien de partage indisponible.</p>
              )}
            </div>
          </section>
        </header>

      </div>
    </main>
  );
}
