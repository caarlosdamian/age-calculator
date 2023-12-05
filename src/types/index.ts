export interface RootObject {
  days: Days;
  months: Days;
  years: Days;
}

interface Days {
  value: string;
  isError: boolean;
}