import clsx from 'clsx';
import { cloneElement, ReactElement } from 'react';

/**
 * Chakra UI の `IconButton` の移植
 *
 * @url https://chakra-ui.com/docs/components/icon-button
 */
export const IconButton = (props: {
  children: ReactElement;
  type?: 'submit';
  className?: string;
  iconClassName?: string;
  ariaLabel?: string;
  onClick?: () => unknown;
}) => {
  return (
    <button
      type={props.type ?? 'button'}
      className={clsx(
        'w-10 h-10 rounded-md border border-transparent focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-2 transition-colors duration-150 ease-in-out',
        props.className
      )}
      aria-label={props.ariaLabel}
      onClick={props.onClick}
    >
      {cloneElement(props.children, {
        className: clsx('w-5 m-auto dark:text-white', props.iconClassName),
      })}
    </button>
  );
};
