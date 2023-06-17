import {
  ButtonHTMLAttributes,
  cloneElement,
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Chakra UI の `Button` の移植
 *
 * @url https://chakra-ui.com/docs/components/button#button-with-icon
 */
const ButtonComponent = (
  props: {
    leftIcon?: ReactElement;
    rightIcon?: ReactElement;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    className?: string;
    onClick?: () => void | Promise<void>;
    children?: ReactNode;
  },
  ref: Ref<HTMLButtonElement>
) => {
  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      className={twMerge(
        'flex w-full items-center justify-center rounded-md bg-[#edf2f7] p-2 transition-colors duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
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
          className: 'ml-2 h-5 w-5',
        })}
    </button>
  );
};

export const Button = forwardRef(ButtonComponent);
