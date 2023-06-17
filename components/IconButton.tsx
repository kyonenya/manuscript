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
        'w-10 h-10 rounded-md border border-transparent',
        'bg-[#edf2f7] hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600',
        'focus:outline-none focus:ring-2 transition-colors duration-150 ease-in-out',
        props.className
      )}
      aria-label={props.ariaLabel}
      onClick={props.onClick}
    >
      {cloneElement(props.children, {
        className: twMerge('w-5 m-auto dark:text-white', props.iconClassName),
      })}
    </button>
  );
};

export const IconButton = forwardRef(IconButtonComponent);
