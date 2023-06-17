import {
  cloneElement,
  forwardRef,
  ForwardRefRenderFunction,
  ReactElement,
  ReactNode,
  RefObject,
} from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  className?: string;
  onClick?: () => void | Promise<void>;
  children: ReactNode;
};

/**
 * Chakra UI の `Button` の `leftIcon` 版の移植
 *
 * @url https://chakra-ui.com/docs/components/button#button-with-icon
 */
const ButtonComponent: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (
  props: {
    leftIcon?: ReactElement;
    rightIcon?: ReactElement;
    className?: string;
    onClick?: () => void | Promise<void>;
    children: ReactNode;
  },
  ref
) => {
  return (
    <button
      onClick={props.onClick}
      className={twMerge(
        'flex items-center justify-center w-full rounded-md p-2',
        'bg-[#edf2f7] hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
        'focus:outline-none focus:ring-2 transition-colors duration-150 ease-in-out',
        props.className
      )}
      ref={ref}
    >
      {props.leftIcon &&
        cloneElement(props.leftIcon, {
          className: 'mr-2 h-5 w-5',
        })}
      {props.children}
      {props.rightIcon &&
        cloneElement(props.rightIcon, {
          className: 'mr-2 h-5 w-5',
        })}
    </button>
  );
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ButtonComponent
);
