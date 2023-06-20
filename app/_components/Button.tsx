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
 * Button (with Icon)
 *
 * You can add left and right icons to the Button component using the leftIcon and rightIcon props respectively.
 * @see https://chakra-ui.com/docs/components/button#button-with-icon
 */
export const Button = forwardRef(function ButtonComponent(
  props: {
    leftIcon?: ReactElement;
    rightIcon?: ReactElement;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    noButton?: boolean;
    className?: string;
    onClick?: () => void | Promise<void>;
    children?: ReactNode;
  },
  ref: Ref<HTMLButtonElement>
) {
  const className = twMerge(
    'flex w-full items-center justify-center rounded-md bg-[#edf2f7] p-2 transition-colors duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
    props.className
  );
  const buttonChildren = (
    <>
      {props.leftIcon &&
        cloneElement(props.leftIcon, {
          className: 'mr-2 h-5 w-5',
        })}
      {props.children}
      {props.rightIcon &&
        cloneElement(props.rightIcon, {
          className: 'ml-2 h-5 w-5',
        })}
    </>
  );

  if (props.noButton) {
    return (
      <div onClick={props.onClick} className={className}>
        {buttonChildren}
      </div>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      className={className}
      ref={ref}
    >
      {buttonChildren}
    </button>
  );
});
