import {
  cloneElement,
  ReactElement,
  forwardRef,
  ComponentProps,
  ForwardedRef,
  SVGProps,
} from 'react';
import { twMerge } from 'tailwind-merge';

export const iconButtonClassName =
  'h-10 w-10 rounded-md border border-transparent bg-[#edf2f7] transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 enabled:hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-700 enabled:dark:hover:bg-gray-600';

/**
 * Icon Button
 *
 * An icon within in a button.
 * @see https://chakra-ui.com/docs/components/icon-button
 */
export const IconButton = forwardRef(function _IconButton(
  {
    children,
    ...props
  }: {
    children: ReactElement<SVGProps<SVGSVGElement>>;
  } & ComponentProps<'button'>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const className = twMerge(iconButtonClassName, props.className);

  return (
    <button {...props} className={className} ref={ref}>
      {cloneElement(children, {
        className: twMerge(
          'm-auto w-5 text-gray-700 dark:text-gray-300',
          children.props.className,
        ),
      })}
    </button>
  );
});
