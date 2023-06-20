import { InputHTMLAttributes } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { twMerge } from 'tailwind-merge';

export const Input = (props: {
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  required?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  inputLeftElement?: ReactElement;
  inputClassName?: string;
}) => {
  return (
    <div className="relative flex items-center rounded-md border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus:outline-none dark:border-gray-500 dark:bg-gray-800">
      <div className="absolute flex h-10 w-10 items-center justify-center text-gray-400 dark:text-gray-400">
        {props.inputLeftElement}
      </div>
      <input
        id={props.id}
        name={props.name}
        required={props.required}
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        className={twMerge(
          'relative w-full rounded-r-md bg-transparent py-2 pl-3 pr-3 text-gray-700 focus:outline-none dark:text-gray-200',
          props.inputLeftElement && 'pl-10',
          props.inputClassName
        )}
      />
    </div>
  );
};
