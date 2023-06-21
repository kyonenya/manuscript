import {
  cloneElement,
  ComponentProps,
  forwardRef,
  ReactElement,
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
  {
    leftIcon,
    rightIcon,
    noButton,
    children,
    ...props
  }: {
    leftIcon?: ReactElement;
    rightIcon?: ReactElement;
    noButton?: boolean;
  } & ComponentProps<'button'>,
  ref: Ref<HTMLButtonElement>
) {
  const className = twMerge(
    'flex w-full items-center justify-center rounded-md bg-[#edf2f7] p-2 transition-colors duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
    props.className
  );
  const buttonChildren = (
    <>
      {leftIcon &&
        cloneElement(leftIcon, {
          className: 'mr-2 h-5 w-5',
        })}
      {children}
      {rightIcon &&
        cloneElement(rightIcon, {
          className: 'ml-2 h-5 w-5',
        })}
    </>
  );

  if (noButton) {
    return <div className={className}>{buttonChildren}</div>;
  }

  return (
    <button {...props} className={className} ref={ref}>
      {buttonChildren}
    </button>
  );
});
