export const REFERRAL_SHARE_MESSAGE =
  "Bonjour, je vous invite à découvrir Scotgold Resources Ltd. et ses offres d’investissement. Consultez les informations disponibles et, si cela vous intéresse, créez votre compte à l’aide de mon lien personnel :";

export function buildReferralShareTargets(referralLink: string) {
  const message = REFERRAL_SHARE_MESSAGE;

  return {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${message}\n\n${referralLink}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(message)}`,
  };
}
