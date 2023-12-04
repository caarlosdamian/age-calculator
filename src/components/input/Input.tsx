import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, id,className, ...props }: Props) => {
  return (
    <label
      htmlFor={id}
      className="flex flex-col gap-1 text-xs font-bold tracking-[3px] text-primary-grey"
    >
      {label.toUpperCase()}
      <input
        type="text"
        {...props}
        className={`py-3 px-4 outline-none rounded-lg border ring-primary-line w-full text-xl md:text-[32px] font-bold text-primary-black placeholder:opacity-50 ${className}`}
      />
    </label>
  );
};
