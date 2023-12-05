export interface RootObject {
  days: Days;
  months: Days;
  years: Days;
}


export interface Error {
  message: string;
  error: boolean;
}
interface Days {
  value: string;
  isError: Error;
}