import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage: string;
  isError: boolean;
}

export const Input = ({
  label,
  id,
  className,
  isError,
  errorMessage,
  ...props
}: Props) => {
  return (
    <label
      htmlFor={id}
      className={`flex flex-col gap-1 text-xs font-bold tracking-[3px] ${
        isError ? 'text-[#FF5959]' : 'text-primary-grey'
      } `}
    >
      {label.toUpperCase()} <span></span>
      <input
        type="text"
        {...props}
        className={`py-3 px-4 outline-none rounded-lg border w-full text-xl md:text-[32px] font-bold text-primary-black placeholder:opacity-50 ${
          isError ? 'border-[#FF5959]' : 'border-primary-line'
        } ${className}`}
      />
      {errorMessage && <span>{errorMessage}</span>}
    </label>
  );
};
