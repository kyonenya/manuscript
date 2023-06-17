import {
  ButtonHTMLAttributes,
  cloneElement,
  ReactElement,
  forwardRef,
  Ref,
} from 'react';
import { twMerge } from 'tailwind-merge';

const IconButtonComponent = (
  props: {
    children: ReactElement;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    className?: string;
    iconClassName?: string;
    ariaLabel?: string;
    onClick?: () => unknown;
  },
  ref: Ref<HTMLButtonElement>
) => {
  return (
    <button
      ref={ref}
      type={props.type ?? 'button'}
      className={twMerge(
        'h-10 w-10 rounded-md border border-transparent bg-[#edf2f7] transition-colors duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:hover:bg-gray-600',
        props.className
      )}
      aria-label={props.ariaLabel}
      onClick={props.onClick}
    >
      {cloneElement(props.children, {
        className: twMerge(
          'w-5 m-auto dark:text-gray-300',
          props.iconClassName
        ),
      })}
    </button>
  );
};

export const IconButton = forwardRef(IconButtonComponent);
