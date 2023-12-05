/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Input } from './components/input/Input';
import { inputData, validateValue } from './utils';
import Arrow from './assets/images/icon-arrow.svg';
import { useState } from 'react';
import { RootObject } from './types';

export const App = () => {
  const [information, setInformation] = useState<RootObject>({
    days: {
      value: '',
      isError: {
        error: false,
        message: '',
      },
    },
    months: {
      value: '',
      isError: {
        error: false,
        message: '',
      },
    },
    years: {
      value: '',
      isError: {
        error: false,
        message: '',
      },
    },
  });

  const [age, setage] = useState<{
    months: null | number,
    years: null | number,
    days: null | number,
  }>({
    months: null,
    years: null,
    days: null,
  });

  const handleChange = ({
    type,
    value,
  }: {
    type: 'days' | 'months' | 'years';
    value: React.ChangeEvent<HTMLInputElement>;
  }) => {
    setInformation((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        value: value.target.value,
      },
    }));
  };

  const handleSubmit = () => {
    const validMonth = validateValue({
      type: 'months',
      value: information.months.value,
      state: information,
    });
    const validDay = validateValue({
      type: 'days',
      value: information.days.value,
      state: information,
    });
    const validYear = validateValue({
      type: 'years',
      value: information.years.value,
      state: information,
    });

    const isValidForm =
      !validDay.error && !validYear.error && !validMonth.error;

    setInformation((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        isError: validDay,
      },
      months: {
        ...prev.months,
        isError: validMonth,
      },
      years: {
        ...prev.years,
        isError: validYear,
      },
    }));

    if (isValidForm) {
      const actualDate = new Date().getTime();
      const inputDate = new Date(
        `${information.months.value}/${information.days.value}/${information.years.value}`
      ).getTime();

      const timeDifference = actualDate - inputDate;

      const millisecondsInSecond = 1000;
      const secondsInMinute = 60;
      const minutesInHour = 60;
      const hoursInDay = 24;
      const daysInMonth = 30.44;
      const daysInYear = 365.25;

      const secondsDifference = timeDifference / millisecondsInSecond;
      const minutesDifference = secondsDifference / secondsInMinute;
      const hoursDifference = minutesDifference / minutesInHour;
      const daysDifference = hoursDifference / hoursInDay;
      const yearsDifference = daysDifference / daysInYear;

      const wholeYears = Math.floor(yearsDifference);
      const wholeMonths = Math.floor((yearsDifference - wholeYears) * 12);
      const wholeDays = Math.floor(
        daysDifference - wholeYears * daysInYear - wholeMonths * daysInMonth
      );

      setage({
        days: wholeDays,
        months: wholeMonths,
        years: wholeYears,
      });
    }
  };


  return (
    <main className="bg-primary-lightGrey w-screen h-screen flex justify-center items-center">
      <div className="w-[343px] bg-white min-h-[486px] rounded-3xl rounded-br-[100px] py-12 px-6 flex flex-col gap-8 md:w-[728px] md:rounded-br-[200px] md:h-[680px] md:p-14">
        <div className="flex gap-4">
          {inputData.map((item) => (
            <Input
              key={item.id}
              label={item.id}
              placeholder={item.placeholder}
              maxLength={item.length}
              max={item.length}
              type="text"
              className="md:max-w-[160px]"
              onChange={(e) => handleChange({ type: item.id, value: e })}
              onBlur={(e) => handleChange({ type: item.id, value: e })}
              errorMessage={information[item.id].isError.message}
              isError={information[item.id].isError.error}
            />
          ))}
        </div>
        <div className="relative min-h-[64px] py-8 md:py-12">
          <div className="h-[1px] bg-primary-line w-full"></div>
          <div
            className="absolute top-0 left-[40%] w-16 h-16 bg-primary-purple rounded-[50%] flex items-center justify-center md:left-[90%] md:h-24 md:w-24"
            onClick={handleSubmit}
          >
            <img
              src={Arrow}
              alt="Arrow"
              className="italic w-6 h-6 object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col">
          {inputData.
          // @ts-ignore
          toReversed().map((item) => (
            <div className="flex items-center gap-2" key={item.placeholder}>
              <p className="font-bold text-[56px] leading-[110%] italic tracking-[-1.12px] md:text-[104px] text-primary-purple">
                {age[item.id] !== null ? age[item.id] : '--'}
              </p>
              <strong className="font-bold text-[56px] leading-[110%] italic tracking-[-1.12px] md:text-[104px] text-primary-black">
                {item.id}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
