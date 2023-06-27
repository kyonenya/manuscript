'use client';

import {
  cloneElement,
  forwardRef,
  ReactElement,
  ComponentProps,
  ForwardedRef,
  useRef,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { IconButton } from './IconButton';

/**
 * Input
 *
 * You can add an icon or button inside the input component.
 * @see https://chakra-ui.com/docs/components/input/usage#add-elements-inside-input
 */
export const Input = forwardRef(function InputComponent(
  {
    inputLeftIcon,
    inputLeftIconButtonIcon,
    onSearch,
    ...props
  }: {
    inputLeftIcon?: ReactElement;
    inputLeftIconButtonIcon?: ReactElement;
    onSearch?: (value: string) => void;
  } & ComponentProps<'input'>,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const internalRef = useRef<HTMLInputElement | null>(null);
  const ref = forwardedRef ?? internalRef;

  return (
    <div className="relative flex items-center rounded-md border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus:outline-none dark:border-gray-500 dark:bg-gray-800">
      <div className="absolute flex h-10 w-10 items-center justify-center text-gray-400 dark:text-gray-400">
        {inputLeftIcon && cloneElement(inputLeftIcon, { className: 'w-5' })}
        {inputLeftIconButtonIcon && (
          <IconButton
            type="submit"
            className="z-10 p-0"
            onClick={() => {
              if (!onSearch || !ref || !('current' in ref) || !ref.current)
                return;
              onSearch(ref.current.value);
            }}
          >
            {cloneElement(inputLeftIconButtonIcon, { className: 'w-5' })}
          </IconButton>
        )}
      </div>
      <input
        {...props}
        className={twMerge(
          'relative w-full rounded-r-md bg-transparent py-2 pl-3 pr-3 text-gray-700 focus:outline-none dark:text-gray-200',
          inputLeftIcon && 'pl-10',
          inputLeftIconButtonIcon && 'pl-11 pr-2',
          props.className
        )}
        ref={ref}
      />
    </div>
  );
});
