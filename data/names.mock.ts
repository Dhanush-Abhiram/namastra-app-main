// Mock dataset for development - replace with real database later
export const THEMES = ["Virtue", "Nature", "Royal", "Modern", "Traditional", "Scholarly", "Warrior", "Music"] as const;
export const DEITIES = ["None", "Vishnu", "Shiva", "Devi", "Ganesha", "Murugan", "Rama", "Krishna", "Multiple"] as const;
export const SOURCES = ["Vedas", "Upanishads", "Puranas", "Epics", "Sahasranama", "Regional", "Sanskrit", "None"] as const;
export const SCRIPTS = ["Latin", "Devanagari", "Tamil", "Telugu", "Kannada", "Malayalam", "Gujarati", "Gurmukhi", "Bengali-Assamese"] as const;
export const GENDERS = ["boy", "girl", "unisex"] as const;

export type Theme = typeof THEMES[number];
export type Deity = typeof DEITIES[number];
export type Source = typeof SOURCES[number];
export type Script = typeof SCRIPTS[number];
export type Gender = typeof GENDERS[number];

export type NameRecord = {
  id: string;
  name: string;
  gender: Gender;
  scripts: Partial<Record<Script, string>>;
  syllables: number;
  phoneticStart: string; // e.g., "Va", "Vi"
  deityAffinity: Deity | "Multiple" | "None";
  sources: Source[];
  meaning: string;
  language: string; // Sanskrit/Tamil/etc.
  regionTags: string[];
  modernity: 1 | 2 | 3 | 4 | 5;
  globalPronounce: 1 | 2 | 3 | 4 | 5;
  nicknames: string[];
  related: string[];
  popularity?: "rare" | "uncommon" | "common";
  slug?: string; // For URL-friendly names
};

export const MOCK_NAMES: NameRecord[] = [
  {
    id: "1",
    name: "Vihaan",
    slug: "vihaan",
    gender: "boy",
    scripts: { Latin: "Vihaan", Devanagari: "विहान" },
    syllables: 2,
    phoneticStart: "Vi",
    deityAffinity: "Vishnu",
    sources: ["Sahasranama", "Puranas"],
    meaning: "Dawn; the first ray of sun",
    language: "Sanskrit",
    regionTags: ["Pan-India"],
    modernity: 4,
    globalPronounce: 4,
    nicknames: ["Vii", "Han"],
    related: ["Vivaan", "Vihan"],
    popularity: "common",
  },
  {
    id: "2",
    name: "Vedant",
    slug: "vedant",
    gender: "boy",
    scripts: { Latin: "Vedant", Devanagari: "वेदान्त" },
    syllables: 2,
    phoneticStart: "Ve",
    deityAffinity: "None",
    sources: ["Upanishads"],
    meaning: "The end/culmination of the Veda; knowledge of the Self",
    language: "Sanskrit",
    regionTags: ["Pan-India"],
    modernity: 3,
    globalPronounce: 3,
    nicknames: ["Ved"],
    related: ["Vedanta", "Vedan"],
    popularity: "common",
  },
  {
    id: "3",
    name: "Vasu",
    slug: "vasu",
    gender: "boy",
    scripts: { Latin: "Vasu", Devanagari: "वसु" },
    syllables: 2,
    phoneticStart: "Va",
    deityAffinity: "Vishnu",
    sources: ["Sahasranama", "Puranas"],
    meaning: "Wealthy; one of the eight Vasus; an epithet of Vishnu",
    language: "Sanskrit",
    regionTags: ["North", "South"],
    modernity: 3,
    globalPronounce: 4,
    nicknames: ["Vas"],
    related: ["Vasudev", "Vasuman"],
    popularity: "uncommon",
  },
  {
    id: "4",
    name: "Hriday",
    slug: "hriday",
    gender: "boy",
    scripts: { Latin: "Hriday", Devanagari: "हृदय" },
    syllables: 2,
    phoneticStart: "Hri/Hr",
    deityAffinity: "None",
    sources: ["Sanskrit"],
    meaning: "Heart; core",
    language: "Sanskrit",
    regionTags: ["Pan-India"],
    modernity: 3,
    globalPronounce: 2,
    nicknames: ["Hri"],
    related: ["Hridaya"],
    popularity: "uncommon",
  },
  {
    id: "5",
    name: "Harish",
    slug: "harish",
    gender: "boy",
    scripts: { Latin: "Harish", Devanagari: "हरीश" },
    syllables: 2,
    phoneticStart: "Ha",
    deityAffinity: "Vishnu",
    sources: ["Puranas"],
    meaning: "Lord Vishnu; lord of Hari",
    language: "Sanskrit",
    regionTags: ["Pan-India"],
    modernity: 2,
    globalPronounce: 4,
    nicknames: ["Hari"],
    related: ["Harishchandra", "Haridas"],
    popularity: "common",
  },
  // Add more names for better testing
  {
    id: "6",
    name: "Lakshmi",
    slug: "lakshmi",
    gender: "girl",
    scripts: { Latin: "Lakshmi", Devanagari: "लक्ष्मी" },
    syllables: 2,
    phoneticStart: "Lak",
    deityAffinity: "Devi",
    sources: ["Puranas", "Sahasranama"],
    meaning: "Goddess of wealth and prosperity",
    language: "Sanskrit",
    regionTags: ["Pan-India"],
    modernity: 4,
    globalPronounce: 4,
    nicknames: ["Laksh", "Laxmi"],
    related: ["Lakshmipriya", "Lakshmidevi"],
    popularity: "common",
  },
  {
    id: "7",
    name: "Arjun",
    slug: "arjun",
    gender: "boy",
    scripts: { Latin: "Arjun", Devanagari: "अर्जुन" },
    syllables: 2,
    phoneticStart: "Ar",
    deityAffinity: "Krishna",
    sources: ["Epics", "Puranas"],
    meaning: "Bright, shining; one of the Pandavas",
    language: "Sanskrit",
    regionTags: ["Pan-India"],
    modernity: 4,
    globalPronounce: 4,
    nicknames: ["Arj", "Arju"],
    related: ["Arjuna", "Arjun"],
    popularity: "common",
  },
  {
    id: "8",
    name: "Priya",
    slug: "priya",
    gender: "girl",
    scripts: { Latin: "Priya", Devanagari: "प्रिया" },
    syllables: 2,
    phoneticStart: "Pri",
    deityAffinity: "None",
    sources: ["Sanskrit"],
    meaning: "Beloved, dear one",
    language: "Sanskrit",
    regionTags: ["Pan-India"],
    modernity: 4,
    globalPronounce: 4,
    nicknames: ["Pri", "Pree"],
    related: ["Priyanka", "Priyadarshini"],
    popularity: "common",
  },
];

// Helper function to get name by slug
export function getNameBySlug(slug: string): NameRecord | undefined {
  return MOCK_NAMES.find(name => name.slug === slug);
}

// Helper function to get names by deity
export function getNamesByDeity(deity: Deity): NameRecord[] {
  return MOCK_NAMES.filter(name => name.deityAffinity === deity || name.deityAffinity === "Multiple");
}

// Helper function to get names by gender
export function getNamesByGender(gender: Gender): NameRecord[] {
  return MOCK_NAMES.filter(name => name.gender === gender || name.gender === "unisex");
}

// Search function for filtering names
export function searchNames(filters: Partial<{
  gender: Gender;
  syllables?: number;
  script?: Script;
  deity?: Deity;
  sources?: Source[];
  startLetters?: string[];
  vibe?: "soft" | "strong" | "any";
  lengthMax?: number | null;
  globalPronounce?: boolean;
  query?: string;
}>, limit?: number): NameRecord[] {
  let results = [...MOCK_NAMES];

  // Filter by gender
  if (filters.gender && filters.gender !== "any") {
    results = results.filter(name => 
      name.gender === filters.gender || name.gender === "unisex"
    );
  }

  // Filter by syllables
  if (filters.syllables) {
    results = results.filter(name => name.syllables === filters.syllables);
  }

  // Filter by deity
  if (filters.deity && filters.deity !== "None") {
    results = results.filter(name => 
      name.deityAffinity === filters.deity || name.deityAffinity === "Multiple"
    );
  }

  // Filter by sources
  if (filters.sources && filters.sources.length > 0) {
    results = results.filter(name => 
      filters.sources!.some(source => name.sources.includes(source))
    );
  }

  // Filter by start letters
  if (filters.startLetters && filters.startLetters.length > 0) {
    results = results.filter(name => 
      filters.startLetters!.some(letter => 
        name.phoneticStart.toLowerCase().startsWith(letter.toLowerCase())
      )
    );
  }

  // Filter by length
  if (filters.lengthMax) {
    results = results.filter(name => name.name.length <= filters.lengthMax!);
  }

  // Filter by global pronunciation
  if (filters.globalPronounce) {
    results = results.filter(name => name.globalPronounce >= 3);
  }

  // Filter by text query
  if (filters.query) {
    const query = filters.query.toLowerCase();
    results = results.filter(name => 
      name.name.toLowerCase().includes(query) ||
      name.meaning.toLowerCase().includes(query) ||
      name.language.toLowerCase().includes(query)
    );
  }

  // Sort by popularity and modernity
  results.sort((a, b) => {
    const aPop = a.popularity === "common" ? 3 : a.popularity === "uncommon" ? 2 : 1;
    const bPop = b.popularity === "common" ? 3 : b.popularity === "uncommon" ? 2 : 1;
    return bPop - aPop || b.modernity - a.modernity;
  });

  // Apply limit
  if (limit) {
    results = results.slice(0, limit);
  }

  return results;
}
