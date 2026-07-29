// Centralized image references — cinematic luxury photography from Pexels.
// Full-res variants used for large backgrounds; compressed variants for cards.

const base = (id: string, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const IMAGES = {
  hero: base('27823587', 1920), // NYC skyline night, dramatic
  heroPortrait: base('29080962', 1100), // woman red gown dark backdrop
  talent: base('38290951', 1100), // B&W fashion woman magazine
  mediaCompanies: base('23384400', 1100), // cameraman moody backlit
  premiumContent: base('10681031', 1100), // elegant woman pearls jewelry
  brandPartnerships: base('8569572', 1100), // woman blazer magazine studio
  whatWeBring: base('6949494', 1400), // senior executives boardroom
  whatWeBringAlt: base('8847198', 900), // woman corporate boardroom
  partnershipTalent: base('4123586', 1100), // film crew neon
  partnershipBrands: base('17315404', 1100), // elegant table setting event
  partnershipEvents: base('38302968', 1100), // lavish decorated venue
  capabilitiesTall: base('34927992', 900), // elegant woman black dress dark
  contact: base('593840', 1600), // aerial city lights night
  dinner: base('6715103', 1100), // dimly lit dining room candles
  podcast: base('7301210', 1100), // studio microphone dark
} as const;
