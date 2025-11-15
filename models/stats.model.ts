export interface StatsModel {
  allWords: string;
  time: number;
  typedWord: string;
}
export interface ResultsModel {
  totalWpm: number;
  errors: number;
  typedWord: string;
  totalAccuracy: number;
  totalRaw: number;
}
export interface Errors {
  totalErrors: number;
  missed: number;
  extra: number;
  incorrect: number;
  correct: number;
  total: number;
}
