import {
  cloneElement,
  ReactElement,
  forwardRef,
  ComponentProps,
  ForwardedRef,
} from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Icon Button
 *
 * An icon within in a button.
 * @see https://chakra-ui.com/docs/components/icon-button
 */
export const IconButton = forwardRef(function _IconButton(
  {
    noButton,
    children,
    ...props
  }: {
    noButton?: boolean;
    children: ReactElement;
  } & ComponentProps<'button'>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const className = twMerge(
    'h-10 w-10 rounded-md border border-transparent bg-[#edf2f7] transition-colors duration-200 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-700 dark:hover:bg-gray-600',
    props.className
  );
  const icon = cloneElement(children, {
    className: twMerge(
      'm-auto w-5 text-gray-700 dark:text-gray-300',
      children.props.className
    ),
  });

  if (noButton) {
    return (
      <div className={twMerge('flex items-center justify-center', className)}>
        {icon}
      </div>
    );
  }

  return (
    <button {...props} className={className} ref={ref}>
      {icon}
    </button>
  );
});
