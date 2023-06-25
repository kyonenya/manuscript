import {
  ButtonHTMLAttributes,
  cloneElement,
  ReactElement,
  forwardRef,
  Ref,
  ComponentProps,
} from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Icon Button
 *
 * An icon within in a button.
 * @see https://chakra-ui.com/docs/components/icon-button
 */
export const IconButton = forwardRef(function IconButtonComponent(
  props: {
    noButton?: boolean;
    onClick?: () => unknown;
    children: ReactElement;
  } & ComponentProps<'button'>,
  ref: Ref<HTMLButtonElement>
) {
  const className = twMerge(
    'h-10 w-10 rounded-md border border-transparent bg-[#edf2f7] transition-colors duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:hover:bg-gray-600',
    props.className
  );
  const icon = cloneElement(props.children, {
    className: twMerge('m-auto w-5 text-gray-700 dark:text-gray-300'),
  });

  if (props.noButton) {
    return (
      <div
        className={twMerge('flex items-center justify-center', className)}
        onClick={props.onClick}
      >
        {icon}
      </div>
    );
  }

  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      className={className}
      onClick={props.onClick}
      ref={ref}
    >
      {icon}
    </button>
  );
});
