import {
  cloneElement,
  ComponentProps,
  forwardRef,
  ReactElement,
  Ref,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { tv, VariantProps } from 'tailwind-variants';

const button = (disabled?: boolean) =>
  tv({
    base: [
      'flex w-full items-center justify-center rounded-md p-2 transition-colors duration-300 ease-in-out ',
      disabled ? '' : 'focus:outline-none focus:ring-2',
    ],
    variants: {
      color: {
        default: [
          'bg-[#edf2f7] hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 ',
          disabled
            ? 'cursor-not-allowed opacity-60'
            : 'hover:bg-gray-200 dark:hover:bg-gray-600',
        ],
        warning: [
          'bg-[#edf2f7] font-semibold text-red-500 dark:bg-gray-700 dark:text-rose-500',
          disabled
            ? 'cursor-not-allowed opacity-60'
            : 'hover:bg-gray-200 dark:hover:bg-gray-600',
        ],
        emerald: [
          'bg-emerald-500 text-white dark:bg-emerald-600',
          disabled
            ? 'cursor-not-allowed opacity-40'
            : 'hover:bg-emerald-600 hover:dark:bg-emerald-500',
        ],
        danger: [
          'bg-red-500 text-white dark:bg-red-600',
          disabled
            ? 'cursor-not-allowed opacity-40'
            : 'hover:bg-red-600 dark:hover:bg-red-500',
        ],
      },
    },
    defaultVariants: {
      color: 'default',
    },
  });

/**
 * Button (with Icon)
 *
 * You can add left and right icons to the Button component using the leftIcon and rightIcon props respectively.
 * @see https://chakra-ui.com/docs/components/button#button-with-icon
 */
export const Button = forwardRef(function ButtonComponent(
  {
    variant,
    noButton,
    leftIcon,
    rightIcon,
    children,
    ...props
  }: {
    variant?: VariantProps<ReturnType<typeof button>>;
    noButton?: boolean;
    leftIcon?: ReactElement;
    rightIcon?: ReactElement;
  } & ComponentProps<'button'>,
  ref: Ref<HTMLButtonElement>
) {
  const className = twMerge(button(props.disabled)(variant), props.className);
  const buttonChildren = (
    <>
      {leftIcon && cloneElement(leftIcon, { className: 'mr-2 h-5 w-5' })}
      {children}
      {rightIcon && cloneElement(rightIcon, { className: 'ml-2 h-5 w-5' })}
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
