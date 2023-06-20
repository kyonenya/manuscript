import {
  ButtonHTMLAttributes,
  cloneElement,
  ReactElement,
  forwardRef,
  Ref,
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
    children: ReactElement;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    noButton?: boolean;
    className?: string;
    iconClassName?: string;
    ariaLabel?: string;
    onClick?: () => unknown;
  },
  ref: Ref<HTMLButtonElement>
) {
  const className = twMerge(
    'h-10 w-10 rounded-md border border-transparent bg-[#edf2f7] transition-colors duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:hover:bg-gray-600',
    props.className
  );
  const icon = cloneElement(props.children, {
    className: twMerge('w-5 m-auto dark:text-gray-300', props.iconClassName),
  });

  if (props.noButton) {
    return (
      <div
        className={twMerge('flex items-center justify-center', className)}
        aria-label={props.ariaLabel}
        onClick={props.onClick}
      >
        {icon}
      </div>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      className={className}
      aria-label={props.ariaLabel}
      onClick={props.onClick}
      ref={ref}
    >
      {icon}
    </button>
  );
});
