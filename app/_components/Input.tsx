'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
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
export const Input = forwardRef(function _Input(
  {
    leftIcon,
    leftIconButtonIcon,
    onSearch,
    children: _children,
    ...props
  }: {
    leftIcon?: ReactElement;
    leftIconButtonIcon?: ReactElement;
    onSearch?: (value: string) => void;
    children?: undefined; // no children allowed
  } & ComponentProps<'input'>,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const internalRef = useRef<HTMLInputElement | null>(null);
  const ref = forwardedRef ?? internalRef;

  const InputComponent = (
    <div className="relative flex items-center rounded-md border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus:outline-none dark:border-gray-500 dark:bg-gray-800">
      <div className="absolute flex h-10 w-10 items-center justify-center text-gray-400 dark:text-gray-400">
        {leftIcon &&
          cloneElement(leftIcon, {
            className: twMerge('w-5', leftIcon.props.className),
          })}
        {leftIconButtonIcon && (
          <IconButton className="z-10 p-0">
            {cloneElement(leftIconButtonIcon, {
              className: twMerge('w-5', leftIconButtonIcon.props.className),
            })}
          </IconButton>
        )}
      </div>

      <input
        {...props}
        className={twMerge(
          'relative w-full rounded-r-md bg-transparent py-2 pl-3 pr-3 text-gray-700 focus:outline-none dark:text-gray-200',
          leftIcon && 'pl-10',
          leftIconButtonIcon && 'pl-11 pr-2',
          props.className
        )}
        ref={ref}
      />

      {onSearch && (
        <div className="absolute right-1.5">
          <IconButton
            className="h-5 w-5 rounded-full"
            onClick={() => {
              if (!ref || !('current' in ref) || !ref.current) return;
              ref.current.value = '';
            }}
          >
            <XMarkIcon className="w-4" />
          </IconButton>
        </div>
      )}
    </div>
  );

  return onSearch ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!ref || !('current' in ref) || !ref.current) return;
        onSearch?.(ref.current.value);
      }}
    >
      {InputComponent}
    </form>
  ) : (
    InputComponent
  );
});
