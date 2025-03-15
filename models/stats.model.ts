export interface StatsModel {
  allWords: string;
  time: number;
  typedWord: string;
}
export interface ResultsModel {
  totalWpm: number;
  allErrors: number;
  errors: number;
  typedWord: string;
  raw: number;
  totalAccuracy: number;
  totalRaw: number;
}
