
export enum CardMode {
  hiraganaToKatakana = "hiragana_to_katakana",
  hiraganaToRomaji = "hiragana_to_romaji",
  romajiToHiragana = "romaji_to_hiragana",
  katakanaToHiragana = "katakana_to_hiragana",
  katakanaToRomaji = "katakana_to_romaji",
  romajiToKatakana = "romaji_to_katakana"
}

export enum QuestionMode {
  Choose = "choose",
  Brash = "brash",
  Type = "type",
  Word = "word",
}

export enum PracticeWordMode {
  Choice = "choice",
  WordBuilding = "word_building",
  FindPair = "find_pair",
}

export enum PracticeScreenMode {
  Testing = "testing",
  WordGame = "word_game"
}

export enum Kana {
  Hiragana = "Hiragana",
  Katakana = "Katakana",
  Romanji = "Romanji"
}

export enum KanaAlphabet {
  Hiragana = "hiragana",
  Katakana = "katakana",
}

export enum WordBuildingType {
  Kana = "kana",
  Romanji = "romanji"
}

export enum KanaSection {
  BasicHiragana = "BasicHiragana",
  BasicKatakana = "BasicKatakana",
  DakuonHiragana = "DakuonHiragana",
  DakuonKatakana = "DakuonKatakana",
  HandakuonHiragana = "HandakuonHiragana",
  HandakuonKatakana = "HandakuonKatakana",
  YoonHiragana = "YoonHiragana",
  YoonKatakana = "YoonKatakana",
}

export enum KanaMode {
  Basic = "Basic",
  Dakuon = "Dakuon",
  Handakuon = "Handakuon",
  Yoon = "Yoon",
}

export const LETTERS_COUNT = {
  [KanaAlphabet.Hiragana]: 107,
  [KanaAlphabet.Katakana]: 107,

  [KanaSection.BasicHiragana]: 46,
  [KanaSection.BasicKatakana]: 46,
  
  basic: 46,

  [KanaSection.DakuonHiragana]: 20,
  [KanaSection.DakuonKatakana]: 20,
  
  dakuon: 20,

  [KanaSection.HandakuonHiragana]: 5,
  [KanaSection.HandakuonKatakana]: 5,
  
  handakuon: 5,

  [KanaSection.YoonHiragana]: 36,
  [KanaSection.YoonKatakana]: 36,
  
  yoon: 36,
};

export const TEST_DELAY = 400;

export type Alphabet = "base" | "dakuon" | "handakuon" | "yoon"

export const QuestionTypeChooseLetter = "choose-letter";
export const QuestionTypeChooseWord = "choose-word";
export const QuestionTypeBuildingWord = "building-word";
export const QuestionTypeFindPairWord = "find-pair-word";