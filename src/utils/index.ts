import { RootObject } from '../types';

export const inputData = [
  {
    id: 'days',
    length: 2,
    placeholder: 'DD',
  },
  {
    id: 'months',
    length: 2,
    placeholder: 'MM',
  },
  {
    id: 'years',
    length: 4,
    placeholder: 'YYYY',
  },
];

export const monthsWithMoreThan31Days = [1, 3, 5, 7, 8, 10, 12];
export const monthsWithLessThan31Days = [4, 6, 11, 9];
export const monthsWithLessThan30Days = [2];

export const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const validateDays = (value: string, state: RootObject) => {
  if (parseInt(value) > 31) {
    return true;
  } else if (
    monthsWithMoreThan31Days.indexOf(parseInt(state.months.value)) !== -1
  ) {
    return !(parseInt(value) <= 31);
  } else if (
    monthsWithLessThan31Days.indexOf(parseInt(state.months.value)) !== -1
  ) {
    return !(parseInt(value) <= 30);
  } else if (isLeapYear(parseInt(state.years.value))) {
    return !(parseInt(value) <= 29);
  } else return true;
};

const validateMonth = (value: string, state: RootObject) => {
  return !(
    parseInt(value) <= 12 &&
    !validateDays(state.days.value, {
      ...state,
      months: { ...state.months, value: value },
    })
  );
};
const validateYear = (value: string, state: RootObject) => {
  return !(
    parseInt(state.months.value) <= 12 &&
    !validateDays(state.days.value, {
      ...state,
      years: { ...state.years, value: value },
    })
  ) && !(parseInt(value) < new Date().getFullYear());
};

export const validateValue = ({
  type,
  value,
  state,
}: {
  type: 'days' | 'months' | 'years';
  value: string;
  state: RootObject;
}) => {
  if (parseInt(value) < -1) {
    return true;
  } else if (type === 'days') {
    return validateDays(value, state);
  } else if (type === 'months') {
    return validateMonth(value, state);
  } else {
    return validateYear(value, state);
  }
};
