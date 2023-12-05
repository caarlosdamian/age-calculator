import { Error, RootObject } from '../types';

interface Data {
  id: 'days' | 'months' | 'years';
  length: number;
  placeholder: string;
}

export const inputData: Data[] = [
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

const validateDays = (value: string, state: RootObject): Error => {
  const month = state.months.value !== '' ? parseInt(state.months.value) : '';
  if (month === '') {
    return {
      message: parseInt(value) >= 32 ? 'Must be a valid day' : '',
      error: parseInt(value) >= 32,
    };
  } else if (monthsWithMoreThan31Days.indexOf(month) !== -1) {
    return {
      message: !(parseInt(value) <= 31) ? 'Must be a valid day' : '',
      error: !(parseInt(value) <= 31),
    };
  } else if (monthsWithLessThan31Days.indexOf(month) !== -1) {
    return {
      message: !(parseInt(value) <= 30) ? 'Must be a valid day' : '',
      error: !(parseInt(value) <= 30),
    };
  } else if (monthsWithLessThan30Days.indexOf(month) !== -1) {
    if (isLeapYear(parseInt(state.years.value))) {
      return {
        message: !(parseInt(value) <= 29) ? 'Must be a valid day' : '',
        error: !(parseInt(value) <= 29),
      };
    } else
      return {
        message: !(parseInt(value) <= 28) ? 'Must be a valid day' : '',
        error: !(parseInt(value) <= 28),
      };
  }
  return {
    message: '',
    error: false,
  };
};

const validateMonth = (value: string, state: RootObject) => {
  const validateDay = validateDays(state.days.value, {
    ...state,
    months: { ...state.months, value: value },
  });
  const monthValid = parseInt(value) >= 13 && validateDay.error;
  if (value.length !== 0) {
    return {
      message: monthValid ? 'Must be a valid month' : '',
      error: monthValid,
    };
  }
  return {
    message: 'This field is required',
    error: true,
  };
};
const validateYear = (value: string) => {
  if (value.length !== 0) {
    if (parseInt(value) < 1800) {
      return {
        message: 'Must be a valid year',
        error: true,
      };
    } else {
      const validYear = !(parseInt(value) <= new Date().getFullYear());
      return {
        message: validYear ? 'Must be in the past' : '',
        error: validYear,
      };
    }
  }
  return {
    message: 'This field is required',
    error: true,
  };
};

export const validateValue = ({
  type,
  value,
  state,
}: {
  type: 'days' | 'months' | 'years';
  value: string;
  state: RootObject;
}): Error => {
  if (value === '') {
    return {
      message: 'This field is required',
      error: true,
    };
  } else if (type === 'days') {
    return validateDays(value, state);
  } else if (type === 'months') {
    return validateMonth(value, state);
  } else {
    return validateYear(value);
  }
};
