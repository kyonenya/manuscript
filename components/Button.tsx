import { cloneElement, ReactElement, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Chakra UI の `Button` の `leftIcon` 版の移植
 *
 * @url https://chakra-ui.com/docs/components/button#button-with-icon
 */
export const Button = (props: {
  children: ReactNode;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  className?: string;
  onClick?: () => void | Promise<void>;
}) => {
  return (
    <button
      onClick={props.onClick}
      className={twMerge(
        'flex items-center justify-center w-full rounded-md p-2',
        'bg-[#edf2f7] hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white',
        'focus:outline-none focus:ring-2 transition-colors duration-150 ease-in-out',
        props.className
      )}
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
