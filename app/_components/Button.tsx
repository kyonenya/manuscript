import {
  cloneElement,
  ComponentProps,
  forwardRef,
  ReactElement,
  Ref,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
  base: [
    'flex w-full items-center justify-center rounded-md p-2 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2',
  ],
  variants: {
    color: {
      default:
        'bg-[#edf2f7] hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
      warning:
        'bg-[#edf2f7] font-semibold text-red-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-rose-500 dark:hover:bg-gray-600',
      emerald:
        'bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-600 hover:dark:bg-emerald-500',
      danger:
        'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500',
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
    leftIcon,
    rightIcon,
    noButton,
    children,
    variant,
    className,
    ...props
  }: {
    leftIcon?: ReactElement;
    rightIcon?: ReactElement;
    variant?: VariantProps<typeof button>;
    noButton?: boolean;
  } & ComponentProps<'button'>,
  ref: Ref<HTMLButtonElement>
) {
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
    return (
      <div className={twMerge(button(variant), className)}>
        {buttonChildren}
      </div>
    );
  }

  return (
    <button
      {...props}
      className={twMerge(button(variant), className)}
      ref={ref}
    >
      {buttonChildren}
    </button>
  );
});
