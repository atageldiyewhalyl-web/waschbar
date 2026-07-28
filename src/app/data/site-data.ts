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
    image: "/images/waschbar-location-heidelberg-premium.png",
    href: "/heidelberg",
    mapsUrl:
      "https://www.google.com/maps/place/Waschbar+Heidelberg+GmbH/@49.4007793,8.6885928,769m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4797c1b59771ab9d:0xbdd656ab9faf321e!8m2!3d49.4007793!4d8.6911677!16s%2Fg%2F11zgwxfcvc",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Waschbar%20Heidelberg%20GmbH%20Rohrbacher%20Str.%2083-85%2069115%20Heidelberg&output=embed",
    angle: "Ideal für Studierende, WGs und große Wochenwäsche.",
    longAngle:
      "Waschbar Heidelberg liegt im Heidelberger Stadtgebiet und ist auf den Alltag von Studierenden und WGs ausgelegt: große Trommeln für den Wäscheberg mehrerer Mitbewohner, geöffnet bis 22 Uhr für alle, die erst nach der Vorlesung oder Schicht dazu kommen. Kein Warten auf einen freien Slot, keine Reservierung nötig.",
    audienceLabel: "Studierende, WGs & Alltagswäsche",
    transitCopy:
      "Der Standort liegt im Heidelberger Stadtgebiet und ist mit Bus und Bahn sowie zu Fuß erreichbar.",
    parkingCopy:
      "Parkmöglichkeiten befinden sich in der näheren Umgebung des Standorts.",
    hasPetStation: true,
    hasCleaningStation: true,
    petStationCopy:
      "Für Tierdecken und Haustiertextilien - praktisch, wenn der WG-Vierbeiner mitzieht.",
    cleaningStationCopy:
      "Für Arbeitskleidung und stark beanspruchte Wäsche neben dem Vorlesungs- oder Schichtalltag.",
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
    image: "/images/waschbar-location-ludwigshafen-premium.png",
    href: "/ludwigshafen",
    mapsUrl:
      "https://www.google.com/maps/place/Waschbar+Ludwigshafen+GmbH/@49.49045,8.4350976,767m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4797cd859c2fece1:0x9942ef2d5e00add5!8m2!3d49.49045!4d8.4376725!16s%2Fg%2F11zh1wgnqd?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D",
    mapEmbedUrl:
      "https://maps.google.com/maps?f=q&source=s_q&hl=de&q=Waschbar%20Ludwigshafen%20GmbH&ll=49.49045,8.4376725&z=17&output=embed",
    angle: "Praktisch für Familien, Pendler und große Textilien.",
    longAngle:
      "Waschbar Ludwigshafen bedient Familien und Pendler in Ludwigshafen am Rhein: praktisch, wenn Bettdecken, Handtücher oder der ganze Wochenwäscheberg anstehen. Moderne Maschinen, klare Preise und tägliche Öffnungszeiten von 06:00 bis 22:00 Uhr machen den Wäschetag planbar, ganz ohne Termin.",
    audienceLabel: "Familien, Pendler & Wochenwäsche",
    transitCopy:
      "Der Standort liegt an der Prinzregentenstraße in Ludwigshafen am Rhein und ist für Besuche aus dem Stadtgebiet gut erreichbar.",
    parkingCopy:
      "Für größere Wäscheladungen kannst du die Route direkt über Google Maps planen und Parkmöglichkeiten in der Umgebung prüfen.",
    hasPetStation: true,
    hasCleaningStation: true,
    petStationCopy:
      "Für Tierdecken und Haustiertextilien der ganzen Familie.",
    cleaningStationCopy:
      "Für Arbeitskleidung von Pendlern und stark beanspruchte Wäsche nach dem Wochenende.",
    reviewProofLine: "Moderne Maschinen für Familien und Pendler in Ludwigshafen.",
    processSteps: [
      {
        title: "Wäsche einsortieren",
        copy: "Wähle je nach Ladung die 15 kg Maschine für den Wochenwäscheberg der Familie oder die 7 kg Maschine für die schnelle Zwischenwäsche nach der Pendelfahrt.",
      },
      {
        title: "Bargeldlos bezahlen",
        copy: "Am Terminal direkt mit Karte zahlen oder die Waschbar Kundenkarte nutzen und dauerhaft 10% auf jeden Waschgang sparen.",
      },
      {
        title: "Waschen & trocknen vor Ort",
        copy: "Während die Maschine läuft, kurz einkaufen oder entspannen - der Standort in der Prinzregentenstraße ist täglich bis 22 Uhr geöffnet, auch nach einer späten Schicht.",
      },
      {
        title: "Sauber mitnehmen",
        copy: "Direkt im Trockner fertig machen, statt zuhause auf freie Kapazität zu warten - ideal für Familien und Pendler, die den Wäschetag in einem Rutsch erledigen wollen.",
      },
    ],
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
  ["Täglich 06-22 Uhr", "clock"],
];

export const machineSizes: Array<[string, string]> = [
  ["15 kg", "Große Maschine"],
  ["7 kg", "Standardmaschine"],
  ["Trockner", "2 € / 10 Min."],
];

export type PriceItem = {
  title: string;
  subtitle: string;
  price: string;
  meta: string;
  animation: string;
  featured: boolean;
};

export const priceItems: PriceItem[] = [
  {
    title: "Waschmaschine 15 kg",
    subtitle: "Für große Ladungen, Decken und Wochenwäsche",
    price: "ab 9,00 €",
    meta: "pro Waschgang",
    animation: "/animations/washing-machine.json",
    featured: true,
  },
  {
    title: "Waschmaschine 7 kg",
    subtitle: "Für Alltagswäsche und kleinere Ladungen",
    price: "ab 4,50 €",
    meta: "pro Waschgang",
    animation: "/animations/laundry.json",
    featured: false,
  },
  {
    title: "Trockner",
    subtitle: "Direkt vor Ort trocknen und sauber mitnehmen",
    price: "2,00 €",
    meta: "pro 10 Minuten",
    animation: "/animations/laundry-2.json",
    featured: false,
  },
  {
    title: "Kundenkarte",
    subtitle: "Guthaben aufladen und bei jedem Einkauf sparen",
    price: "10%",
    meta: "Rabatt",
    animation: "/animations/credit-card.json",
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
  quote: string;
};

export const reviews: Review[] = [
  {
    name: "ALİ DİLBER",
    initial: "A",
    avatar: "/images/review-avatar-ali.png",
    city: "Heidelberg",
    locationIndex: 0,
    age: "6 days ago",
    quote:
      "Sauberer Waschsalon mit modernen Maschinen. Alles hat problemlos funktioniert und die Wäsche war schnell fertig. Gerne wieder!",
  },
  {
    name: "Mustafa Ulvi",
    initial: "M",
    avatar: "/images/review-avatar-mustafa.png",
    city: "Heidelberg",
    locationIndex: 0,
    age: "6 days ago",
    quote:
      "Sehr sauberer Waschsalon mit modernen Maschinen. Alles funktioniert einwandfrei, absolut empfehlenswert!",
  },
  {
    name: "Kayra Aktas",
    initial: "K",
    avatar: "/images/review-avatar-kayra.png",
    city: "Heidelberg",
    locationIndex: 0,
    age: "a week ago",
    quote:
      "Die Waschmaschinen und Trockner waren neu, und alles war sehr ordentlich und sauber. Die Waschmittel standen kostenlos zur Verfügung. Auch der Preis war im Vergleich zu anderen Anbietern sehr fair.",
  },
];

export function reviewsForLocation(locationIndex: number): Review[] {
  const matches = reviews.filter((review) => review.locationIndex === locationIndex);
  return matches.length > 0 ? matches : reviews;
}

export function buildLocalBusinessJsonLd(location: Location) {
  return {
    "@context": "https://schema.org",
    "@type": ["SelfServiceLaundry", "LocalBusiness"],
    "@id": `${location.href}#business`,
    name: location.name,
    description: `Selbstbedienungs-Waschsalon in ${location.addressLocality}: waschen und trocknen direkt vor Ort an modernen Maschinen. ${location.angle}`,
    url: location.href,
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
        closes: "22:00",
      },
    ],
    priceRange: "€€",
    sameAs: [location.mapsUrl],
  };
}

export const useCases = [
  {
    title: "Bettdecken & große Textilien",
    copy: "Wenn die eigene Maschine zu klein ist: Decken, Kissen, Bettwäsche und Handtücher passen in die großen Trommeln.",
    modifier: "bedding",
  },
  {
    title: "WG- und Studentenwäsche",
    copy: "Mehrere Ladungen schnell hintereinander waschen und trocknen, ohne zuhause auf eine einzelne Maschine zu warten.",
    modifier: "students",
  },
  {
    title: "Sport- und Arbeitskleidung",
    copy: "Für regelmäßig beanspruchte Textilien, die hygienisch und getrennt von Alltagswäsche gewaschen werden sollen.",
    modifier: "sports",
  },
  {
    title: "Haustiertextilien",
    copy: "Die Pet Station ist für Hundedecken, Tierbetten und Textilien gedacht, die du separat waschen möchtest.",
    modifier: "pets",
  },
];

export const mobileUseCaseStories = [
  {
    ...useCases[0],
    image: "/images/waschbar-use-bedding-mobile-v2.jpg",
    icon: "stack",
    shortLabel: "Bettdecken",
  },
  {
    ...useCases[1],
    image: "/images/waschbar-use-students-mobile-v2.jpg",
    icon: "basket",
    shortLabel: "WG-Wäsche",
  },
  {
    ...useCases[2],
    image: "/images/waschbar-use-sports-mobile-v2.jpg",
    icon: "shirt",
    shortLabel: "Sportwäsche",
  },
  {
    ...useCases[3],
    image: "/images/waschbar-use-pets-mobile-v2.jpg",
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
    title: "10% sparen",
    text: "Der Rabatt gilt bei jedem Einkauf mit der Kundenkarte.",
  },
];
