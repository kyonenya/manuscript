'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  cloneElement,
  ReactElement,
  ComponentProps,
  useRef,
  SVGProps,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { IconButton } from './IconButton';

/**
 * Input
 *
 * You can add an icon or button inside the input component.
 * @see https://chakra-ui.com/docs/components/input/usage#add-elements-inside-input
 */
export const Input = (
  props: {
    leftIcon?: ReactElement<SVGProps<SVGSVGElement>>;
    leftIconButtonIcon?: ReactElement<SVGProps<SVGSVGElement>>;
    onSearch?: (value: string) => void;
    children?: undefined; // no children allowed
    ref?: React.Ref<HTMLInputElement>;
  } & ComponentProps<'input'>,
) => {
  const {
    leftIcon,
    leftIconButtonIcon,
    onSearch,
    children: _children,
    ref,
    ...rest
  } = props;

  const pathname = usePathname();

  const internalRef = useRef<HTMLInputElement | null>(null);
  const _ref = ref ?? internalRef;

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
        {...rest}
        className={twMerge(
          'relative w-full rounded-r-md bg-transparent px-3 py-2 text-gray-700 focus:outline-none md:px-10 dark:text-gray-200',
          leftIcon && 'pl-10 md:pl-10.5',
          leftIconButtonIcon && 'pr-2 pl-12 md:pl-12.5',
          props.className,
        )}
        ref={_ref}
      />

      {onSearch && (
        <div className="absolute right-1.5">
          {/* reset all searchParams */}
          <Link href={pathname} passHref>
            <IconButton
              className="h-5 w-5 rounded-full"
              onClick={() => {
                if (!_ref || !('current' in _ref) || !_ref.current) return;
                _ref.current.value = '';
              }}
            >
              <XMarkIcon className="w-4" />
            </IconButton>
          </Link>
        </div>
      )}
    </div>
  );

  return onSearch ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!_ref || !('current' in _ref) || !_ref.current) return;
        onSearch?.(_ref.current.value);
      }}
    >
      {InputComponent}
    </form>
  ) : (
    InputComponent
  );
};
