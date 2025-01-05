export enum ShortLanguage {
  EN = "en",
  ES = "es",
  FR = "fr",
  DE = "de",
  RU = "ru",
  IT = "it",
  PT = "pt",
  CH = "ch",
  KO = "ko",
};

export type LanguageKeys = "en" | "es" | "fr" | "de" | "ru" | "it" | "pt" | "ch" | "ko"

export const LanguageName = {
  ch: "中文",
  en: "English",
  es: "Español",
  pt: "Português",
  ru: "Русский",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  ko: "한국어",
};

export const languageRomanji: ("en" | "ru")[] = ["en", "ru"];
export const wordsLang: ("en" | "ru")[] = ["en", "ru"];
export const lessonsLang: ("en" | "ru" | "de" | "es" | "fr" | "it" | "pt" | "ch" | "ko")[] = [
  "en", "ru", "de", "es", "fr", "it", "pt", "ch", "ko"
];

export const enumerationLanguageList = [
  ShortLanguage.CH,
  ShortLanguage.EN,
  ShortLanguage.ES,
  ShortLanguage.PT,
  ShortLanguage.RU,
  ShortLanguage.FR,
  ShortLanguage.DE,
  ShortLanguage.IT,
  ShortLanguage.KO,
];

export const languageList = [
  { title: LanguageName.ch, key: ShortLanguage.CH },
  { title: LanguageName.en, key: ShortLanguage.EN },
  { title: LanguageName.es, key: ShortLanguage.ES },
  { title: LanguageName.pt, key: ShortLanguage.PT },
  { title: LanguageName.ru, key: ShortLanguage.RU },
  { title: LanguageName.fr, key: ShortLanguage.FR },
  { title: LanguageName.de, key: ShortLanguage.DE },
  { title: LanguageName.it, key: ShortLanguage.IT },
  { title: LanguageName.ko, key: ShortLanguage.KO },
];