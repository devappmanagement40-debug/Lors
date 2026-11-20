import { useState } from "react";
import "./_group.css";
import { Check, Copy, ExternalLink, Phone } from "lucide-react";

function Stepper({ step }: { step: number }) {
  return (
    <div className="mb-7 flex items-center justify-between">
      {["Numéro de téléphone", "Informations de confirmation", "Paiement terminé"].map((label, index) => (
        <div key={label} className="flex flex-1 items-center last:flex-none">
          <div className={`flex flex-col items-center text-center ${index <= step ? "text-[#1877d2]" : "text-gray-400"}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold ${index <= step ? "border-[#8fc4d8] bg-[#eef9fc]" : "border-gray-300 bg-white"}`}>
              {index < step ? <Check className="h-5 w-5" /> : index + 1}
            </div>
            <span className="mt-1 w-24 text-[11px] leading-tight">{label}</span>
          </div>
          {index < 2 && <div className={`mx-1 mt-[-18px] h-px flex-1 ${index < step ? "bg-[#8fc4d8]" : "bg-gray-300"}`} />}
        </div>
      ))}
    </div>
  );
}

export function Current() {
  const amount = 20_000;
  const currency = "CDF";
  const phonePrefix = "243";
  const operator = {
    name: "Airtel Money",
    manualNumber: {
      phone: "+243 9XX XXX XXX",
      paymentLink: "",
      logoUrl: "",
    },
  };
  const [copied, setCopied] = useState(false);
  const [phone, setPhone] = useState("");
  const [paymentProof, setPaymentProof] = useState("");

  return (
    <main className="min-h-screen bg-[#4b91ef] p-3 sm:p-6">
      <div className="mx-auto max-w-xl">
        <div className="px-5 pb-6 pt-4 text-white">
          <p className="text-xl">Montant:</p>
          <p className="text-4xl font-bold">
            {amount.toLocaleString()} <span className="text-2xl font-normal">{currency}</span>
          </p>
        </div>

        <section className="rounded-xl bg-white p-5 shadow-xl sm:p-8">
          <Stepper step={0} />
          <div className="space-y-5">
            <div className="bg-[#ffe0a0] px-3 py-2 text-sm leading-tight text-[#e65b28]">
              Veuillez sélectionner la même option que votre méthode de transfert.
            </div>

            {operator.manualNumber && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-left">
                {operator.manualNumber.paymentLink ? (
                  <>
                    <p className="text-xs text-gray-500">Lien de paiement</p>
                    <a
                      href={operator.manualNumber.paymentLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 flex items-center justify-center gap-2 rounded-md bg-[#00CC2C] px-3 py-3 text-sm font-semibold text-white"
                    >
                      <ExternalLink className="h-4 w-4" /> Ouvrir le lien de paiement
                    </a>
                    <button
                      onClick={() => setCopied(true)}
                      className="mt-2 flex w-full items-center justify-center gap-1 rounded-md border border-[#00CC2C] px-3 py-2 text-sm font-semibold text-[#008f20]"
                      type="button"
                    >
                      <Copy className="h-4 w-4" /> Copier le lien
                    </button>
                    <p className="mt-2 text-xs text-gray-600">
                      Effectuez le paiement via ce lien, puis saisissez la référence ou le message reçu.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-gray-500">Numéro de paiement</p>
                    <div className="mt-1 flex items-center gap-2">
                      {operator.manualNumber.logoUrl && (
                        <img src={operator.manualNumber.logoUrl} alt="" className="h-9 w-9 rounded object-contain" />
                      )}
                      <p className="flex-1 font-mono text-lg font-bold text-[#008f20]">
                        {operator.manualNumber.phone}
                      </p>
                      <button
                        onClick={() => {
                          setCopied(true);
                          window.setTimeout(() => setCopied(false), 1400);
                        }}
                        className="flex shrink-0 items-center gap-1 rounded-md bg-[#00CC2C] px-3 py-2 text-sm font-semibold text-white"
                        type="button"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copié" : "Copier"}
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-gray-600">
                      Effectuez le paiement sur ce numéro, puis saisissez la référence ou le message reçu.
                    </p>
                  </>
                )}
              </div>
            )}

            <label className="block text-sm font-semibold">
              Veuillez entrer votre numéro de téléphone:
            </label>
            <div className="flex items-center rounded-lg border border-gray-300 px-3">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="shrink-0 border-r border-gray-200 pr-2 text-gray-600">+{phonePrefix}</span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 12))}
                type="tel"
                inputMode="numeric"
                placeholder="Numéro de téléphone"
                className="w-full px-3 py-3 outline-none"
              />
            </div>
            <p className="text-sm font-semibold">Choisissez la méthode de transfert</p>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="h-4 w-4 rounded-full border-[4px] border-[#1686e8] ring-1 ring-[#1686e8]" />
              <span>{operator.name}</span>
            </div>

            {operator.manualNumber && (
              <div className="space-y-4 border-t border-gray-200 pt-4 text-left">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Référence ou message de confirmation reçu <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={paymentProof}
                    onChange={(event) => setPaymentProof(event.target.value)}
                    rows={4}
                    maxLength={2000}
                    placeholder="Saisissez la référence ou collez le message reçu après le paiement..."
                    className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm outline-none"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Un seul champ suffit : entrez la référence ou le message de confirmation.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-5 pt-3">
              <button className="w-[43%] rounded-md bg-[#78b9df] py-3 font-semibold text-white shadow-sm" type="button">
                &lt; Retour
              </button>
              <button
                disabled={!phone.trim() || !paymentProof.trim()}
                className="w-[43%] rounded-md bg-[#078ee8] py-3 font-semibold text-white shadow-sm disabled:opacity-50"
                type="button"
              >
                Envoyer la demande
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
