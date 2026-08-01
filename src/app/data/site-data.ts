export type Location = {
  slug: "heidelberg" | "ludwigshafen";
  name: string;
  city: string;
  street: string;
  postalCode: string;
  addressLocality: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  href: string;
  mapsUrl: string;
  mapEmbedUrl: string;
  angle: string;
  longAngle: string;
  audienceLabel: string;
  transitCopy: string;
  parkingCopy: string;
  hasPetStation: boolean;
  hasCleaningStation: boolean;
  petStationCopy: string;
  cleaningStationCopy: string;
  reviewProofLine: string;
  processSteps?: Array<{ title: string; copy: string }>;
};

export const locations: Location[] = [
  {
    slug: "heidelberg",
    name: "Waschbar Heidelberg",
    city: "Heidelberg",
    street: "Rohrbacher Str. 83-85",
    postalCode: "69115",
    addressLocality: "Heidelberg",
    address: "Rohrbacher Str. 83-85, 69115 Heidelberg",
    latitude: 49.4007793,
    longitude: 8.6911677,
    image: "/images/waschbar-location-heidelberg-entry.webp",
    href: "/heidelberg",
    mapsUrl:
      "https://www.google.com/maps/place/Waschbar+Heidelberg+GmbH/@49.4007793,8.6885928,769m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4797c1b59771ab9d:0xbdd656ab9faf321e!8m2!3d49.4007793!4d8.6911677!16s%2Fg%2F11zgwxfcvc",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Waschbar%20Heidelberg%20GmbH%20Rohrbacher%20Str.%2083-85%2069115%20Heidelberg&output=embed",
    angle:
      "Ideal für Studierende, Wohngemeinschaften, Monteure und die wöchentliche Großwäsche für jedermann.",
    longAngle:
      "Waschbar Heidelberg liegt im Heidelberger Stadtgebiet und ist auf den Alltag von Studierenden und WGs ausgelegt: große Trommeln für den Wäscheberg mehrerer Mitbewohner, bis Mitternacht geöffnet für alle, die erst spät nach der Vorlesung oder Schicht dazu kommen. Kein Warten auf einen freien Slot, keine Reservierung nötig.",
    audienceLabel: "Studierende, WGs & Alltagswäsche",
    transitCopy:
      "Der Standort liegt im Heidelberger Stadtgebiet und ist mit Bus und Bahn sowie zu Fuß erreichbar.",
    parkingCopy:
      "Parkmöglichkeiten befinden sich in der näheren Umgebung des Standorts.",
    hasPetStation: true,
    hasCleaningStation: true,
    petStationCopy:
      "Für Tierdecken und Sachen für Haustiere - praktisch, wenn der WG-Vierbeiner mitzieht.",
    cleaningStationCopy:
      "Hier werden Wischmopps, Putztücher und weitere Reinigungsutensilien hygienisch sauber.",
    reviewProofLine: "Moderne Maschinen für Studierende und WGs in Heidelberg.",
  },
  {
    slug: "ludwigshafen",
    name: "Waschbar Ludwigshafen",
    city: "Ludwigshafen",
    street: "Prinzregentenstraße 60",
    postalCode: "67063",
    addressLocality: "Ludwigshafen am Rhein",
    address: "Prinzregentenstraße 60, 67063 Ludwigshafen am Rhein",
    latitude: 49.49045,
    longitude: 8.4376725,
    image: "/images/waschbar-location-ludwigshafen-premium.webp",
    href: "/ludwigshafen",
    mapsUrl:
      "https://www.google.com/maps/place/Waschbar+Ludwigshafen+GmbH/@49.49045,8.4350976,767m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4797cd859c2fece1:0x9942ef2d5e00add5!8m2!3d49.49045!4d8.4376725!16s%2Fg%2F11zh1wgnqd?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D",
    mapEmbedUrl:
      "https://maps.google.com/maps?f=q&source=s_q&hl=de&q=Waschbar%20Ludwigshafen%20GmbH&ll=49.49045,8.4376725&z=17&output=embed",
    angle:
      "Ideal für Studierende, Wohngemeinschaften, Monteure und die wöchentliche Großwäsche für jedermann.",
    longAngle:
      "Waschbar Ludwigshafen bedient Familien und Pendler in Ludwigshafen am Rhein: praktisch, wenn Bettdecken, Handtücher oder der ganze Wochenwäscheberg anstehen. Moderne Maschinen, klare Preise und tägliche Öffnungszeiten von 06:00 bis 24:00 Uhr machen den Wäschetag planbar, ganz ohne Termin.",
    audienceLabel: "Familien, Pendler & Wochenwäsche",
    transitCopy:
      "Der Standort liegt an der Prinzregentenstraße in Ludwigshafen am Rhein und ist für Besuche aus dem Stadtgebiet gut erreichbar.",
    parkingCopy:
      "Für größere Wäscheladungen kannst du die Route direkt über Google Maps planen und Parkmöglichkeiten in der Umgebung prüfen.",
    hasPetStation: true,
    hasCleaningStation: true,
    petStationCopy:
      "Für Tierdecken und Sachen für Haustiere der ganzen Familie.",
    cleaningStationCopy:
      "Hier werden Wischmopps, Putztücher und weitere Reinigungsutensilien hygienisch sauber.",
    reviewProofLine: "Moderne Maschinen für Familien und Pendler in Ludwigshafen.",
  },
];

export const contactInfo = {
  phone: "+49 176 63408783",
  phoneHref: "+4917663408783",
  email: "info@waschbar.eu",
};

export const trustItems: Array<[string, string]> = [
  ["Hygienisch & zuverlässig", "shield"],
  ["Nachhaltig & effizient", "leaf"],
  ["Täglich 06-24 Uhr", "clock"],
];

export const machineSizes: Array<[string, string]> = [
  ["15 kg", "Große Maschine"],
  ["7 kg", "Standardmaschine"],
  ["Trockner", "2 € / 10 Min."],
];

export type PriceItem = {
  badge: string;
  category: string;
  title: string;
  originalPrice: string;
  discountedPrice: string;
  meta: string;
  features: string[];
  footnote: string;
  animation: string;
  featured: boolean;
  programPreview?: {
    image: string;
    alt: string;
    placement: "left" | "right";
  };
};

export const priceItems: PriceItem[] = [
  {
    badge: "Ideal für Alltagswäsche",
    category: "Waschen",
    title: "7 kg Trommel",
    originalPrice: "4,50 €",
    discountedPrice: "3,40 €",
    meta: "pro Waschgang mit Rabattkarte",
    features: ["Kleidung", "Sportbekleidung", "Handtücher"],
    footnote: "Waschgang ca. 35 Minuten",
    animation: "/animations/laundry.json",
    featured: false,
    programPreview: {
      image: "/images/waschbar-program-7kg-cropped.webp",
      alt: "Waschprogramm-Auswahl am Terminal für die 7 kg Waschmaschine",
      placement: "right",
    },
  },
  {
    badge: "XXL · Größte Trommel",
    category: "Waschen",
    title: "15 kg Trommel",
    originalPrice: "9,00 €",
    discountedPrice: "6,75 €",
    meta: "pro Waschgang mit Rabattkarte",
    features: ["Bettwäsche & Decken", "Jacken", "Große Wäschemengen"],
    footnote: "Ideal für große Textilmengen",
    animation: "/animations/washing-machine.json",
    featured: true,
    programPreview: {
      image: "/images/waschbar-program-15kg-cropped.webp",
      alt: "Waschprogramm-Auswahl am Terminal für die 15 kg Waschmaschine",
      placement: "left",
    },
  },
  {
    badge: "Zuverlässig & textilschonend",
    category: "Trocknen",
    title: "Trockner",
    originalPrice: "2,00 €",
    discountedPrice: "1,50 €",
    meta: "pro 10 Minuten mit Rabattkarte",
    features: ["Große Trommeln", "Schonend für Textilien", "Schnelles Trocknen"],
    footnote: "Meist 20-30 Minuten",
    animation: "/animations/washing-machine-2.json",
    featured: false,
  },
];

export type Review = {
  name: string;
  initial: string;
  avatar: string;
  city: string;
  locationIndex: number;
  age: string;
  title: string;
  quote: string;
};

export const reviews: Review[] = [
  {
    name: "Ali Yilmaz",
    initial: "A",
    avatar: "/images/review-avatar-ali.webp",
    city: "Heidelberg-Bergheim",
    locationIndex: 0,
    age: "Student",
    title: "Sehr sauber und unkompliziert",
    quote:
      "Ich komme meistens nach der Uni vorbei. Die Maschinen sind sauber, die Bedienung ist einfach und auch große Wäsche ist schnell erledigt.",
  },
  {
    name: "Mustafa Ulvi",
    initial: "M",
    avatar: "/images/review-avatar-mustafa.webp",
    city: "Heidelberg-Rohrbach",
    locationIndex: 0,
    age: "Monteur",
    title: "Gut für Arbeitskleidung",
    quote:
      "Für meine Arbeitskleidung ist Waschbar praktisch. Abends noch geöffnet, klare Preise und die Wäsche wird zuverlässig sauber.",
  },
  {
    name: "Kayra Aktas",
    initial: "K",
    avatar: "/images/review-avatar-kayra.webp",
    city: "Heidelberg-Weststadt",
    locationIndex: 0,
    age: "WG",
    title: "Perfekt für die WG-Wäsche",
    quote:
      "Wir waschen hier oft mehrere Ladungen auf einmal. Das spart zuhause viel Zeit und die großen Trommeln sind genau richtig für Bettwäsche.",
  },
  {
    name: "Meryem Sahin",
    initial: "M",
    avatar: "/images/review-avatar-ali.webp",
    city: "Heidelberg-Handschuhsheim",
    locationIndex: 0,
    age: "Familie",
    title: "Bettdecken endlich ohne Stress",
    quote:
      "Unsere Bettdecken passen zuhause nicht gut in die Maschine. Hier geht es schnell, alles ist hell und man findet sich sofort zurecht.",
  },
  {
    name: "Nour Al-Khatib",
    initial: "N",
    avatar: "/images/review-avatar-mustafa.webp",
    city: "Heidelberg-Altstadt",
    locationIndex: 0,
    age: "Alltagswäsche",
    title: "Spät am Abend noch offen",
    quote:
      "Ich arbeite oft lange und finde es super, dass ich danach noch waschen kann. Der Salon wirkt gepflegt und die Trockner sind stark.",
  },
  {
    name: "Johanna Becker",
    initial: "J",
    avatar: "/images/review-avatar-kayra.webp",
    city: "Heidelberg-Kirchheim",
    locationIndex: 0,
    age: "Haustiere",
    title: "Gut für Hundedecken",
    quote:
      "Für Hundedecken und Körbchen nutze ich gerne die Pet Station. Danach ist alles frisch und ich muss es nicht zuhause waschen.",
  },
  {
    name: "Emre Demir",
    initial: "E",
    avatar: "/images/review-avatar-ali.webp",
    city: "Ludwigshafen-Mitte",
    locationIndex: 1,
    age: "Pendler",
    title: "Schnell vor dem Feierabend",
    quote:
      "Ich erledige hier oft meine Wochenwäsche direkt nach der Arbeit. Maschinen frei, Zahlung unkompliziert und der Standort ist gut erreichbar.",
  },
  {
    name: "Aylin Korkmaz",
    initial: "A",
    avatar: "/images/review-avatar-mustafa.webp",
    city: "Ludwigshafen-Friesenheim",
    locationIndex: 1,
    age: "Familie",
    title: "Große Ladungen kein Problem",
    quote:
      "Mit Kindern sammelt sich schnell viel Wäsche. In der großen Maschine ist alles auf einmal drin und danach direkt in den Trockner.",
  },
  {
    name: "Samir Haddad",
    initial: "S",
    avatar: "/images/review-avatar-kayra.webp",
    city: "Ludwigshafen-Hemshof",
    locationIndex: 1,
    age: "Reinigung",
    title: "Praktisch für Mopps",
    quote:
      "Für Wischmopps und Putztücher ist die Cleaning Station genau richtig. Man kann solche Sachen sauber getrennt waschen.",
  },
  {
    name: "Claudia Schneider",
    initial: "C",
    avatar: "/images/review-avatar-ali.webp",
    city: "Ludwigshafen-Oggersheim",
    locationIndex: 1,
    age: "Große Wäsche",
    title: "Sehr ordentlicher Salon",
    quote:
      "Ich war mit Decken und Handtüchern dort. Alles war ordentlich, die Maschinen machen einen modernen Eindruck und es ging schneller als erwartet.",
  },
  {
    name: "Yusuf Karaca",
    initial: "Y",
    avatar: "/images/review-avatar-mustafa.webp",
    city: "Ludwigshafen-Süd",
    locationIndex: 1,
    age: "Monteur",
    title: "Nach der Schicht ideal",
    quote:
      "Für mich passt vor allem die lange Öffnungszeit. Nach der Schicht kann ich noch waschen und nehme die Sachen trocken wieder mit.",
  },
  {
    name: "Mina Alami",
    initial: "M",
    avatar: "/images/review-avatar-kayra.webp",
    city: "Ludwigshafen-Mundenheim",
    locationIndex: 1,
    age: "Alltag",
    title: "Einfach und zuverlässig",
    quote:
      "Keine komplizierte Anmeldung, einfach Maschine wählen und loslegen. Für meine wöchentliche Großwäsche ist das sehr angenehm.",
  },
];

export function reviewsForLocation(locationIndex: number): Review[] {
  const matches = reviews.filter((review) => review.locationIndex === locationIndex);
  return matches.length > 0 ? matches : reviews;
}

export function buildLocalBusinessJsonLd(location: Location) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://waschbar.eu").replace(/\/$/, "");

  return {
    "@context": "https://schema.org",
    "@type": ["SelfServiceLaundry", "LocalBusiness"],
    "@id": `${siteUrl}${location.href}#business`,
    name: location.name,
    description: `Selbstbedienungs-Waschsalon in ${location.addressLocality}: waschen und trocknen direkt vor Ort an modernen Maschinen. ${location.angle}`,
    url: `${siteUrl}${location.href}`,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    image: location.image,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.street,
      postalCode: location.postalCode,
      addressLocality: location.addressLocality,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.latitude,
      longitude: location.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "06:00",
        closes: "24:00",
      },
    ],
    priceRange: "€€",
    sameAs: [location.mapsUrl],
  };
}

export const useCases = [
  {
    title: "Bettdecken & große Wäsche",
    copy: "Wenn die eigene Maschine zu klein ist: Decken, Kissen, Bettwäsche und Handtücher passen in die großen Trommeln.",
    modifier: "bedding",
  },
  {
    title: "WG- und Studentenwäsche",
    copy: "Mehrere Ladungen schnell hintereinander waschen und trocknen, ohne zuhause auf eine einzelne Maschine zu warten.",
    modifier: "students",
  },
  {
    title: "Reinigungsutensilien",
    copy: "Hier werden Wischmopps, Putztücher und weitere Reinigungsutensilien hygienisch sauber.",
    modifier: "cleaning",
  },
  {
    title: "Sachen für Haustiere",
    copy: "Die Pet Station ist für Hundedecken, Tierbetten und andere Sachen gedacht, die du separat waschen möchtest.",
    modifier: "pets",
  },
];

export const mobileUseCaseStories = [
  {
    ...useCases[0],
    image: "/images/waschbar-use-bedding-mobile-blue.webp",
    icon: "stack",
    shortLabel: "Bettdecken",
  },
  {
    ...useCases[1],
    image: "/images/waschbar-use-students-mobile-blue.webp",
    icon: "basket",
    shortLabel: "WG-Wäsche",
  },
  {
    ...useCases[2],
    image: "/images/waschbar-use-cleaning-mobile-blue.webp",
    icon: "shirt",
    shortLabel: "Reinigung",
  },
  {
    ...useCases[3],
    image: "/images/waschbar-use-pets-mobile-blue.webp",
    icon: "paw",
    shortLabel: "Haustiere",
  },
];

export const mobilePriceTeasers = [
  {
    label: "7 kg",
    prefix: "ab",
    value: "4,50 €",
    animation: "/animations/laundry.json",
  },
  {
    label: "15 kg",
    prefix: "ab",
    value: "9,00 €",
    animation: "/animations/washing-machine.json",
  },
  {
    label: "Trockner",
    prefix: "",
    value: "2 €",
    meta: "/ 10 Min.",
    animation: "/animations/laundry-2.json",
  },
];

export const mobileKundenkarteBenefits = [
  {
    animation: "/animations/credit-card-2.json",
    title: "Bargeldlos zahlen",
    text: "Karte am Terminal nutzen und ohne Münzgeld waschen.",
  },
  {
    animation: "/animations/wallet.json",
    title: "Guthaben laden",
    text: "Vor Ort aufladen und direkt für Waschmaschine oder Trockner einsetzen.",
  },
  {
    animation: "/animations/price-tag.json",
    title: "Bis zu 25% Bonus",
    text: "Je nach Ladebetrag bekommst du automatisch Bonusguthaben.",
  },
];

export const faqs = [
  {
    question: "Ist Waschbar ein SB Waschsalon?",
    answer:
      "Ja. Waschbar ist ein Selbstbedienungs-Waschsalon. Du wäschst und trocknest deine Wäsche direkt vor Ort an modernen Maschinen.",
  },
  {
    question: "Kann ich große Wäsche waschen?",
    answer:
      "Ja. Die großen Maschinen eignen sich für größere Wäschestücke wie Decken, Bettwäsche, Handtücher oder Arbeitskleidung.",
  },
  {
    question: "Gibt es eine Waschbar Rabattkarte?",
    answer:
      "Ja. Mit der Rabattkarte lädst du Guthaben auf und erhältst je nach Ladebetrag bis zu 25% Bonusguthaben.",
  },
];
