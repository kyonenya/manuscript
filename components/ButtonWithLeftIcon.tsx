import clsx from 'clsx';
import { ReactElement, ReactNode } from 'react';

export const ButtonWithLeftIcon = (props: {
  leftIcon: ReactElement;
  children: ReactNode;
  className?: string;
  onClick: () => void | Promise<void>;
}) => {
  return (
    <button
      onClick={props.onClick}
      className={clsx(
        'flex items-center justify-center w-full bg-gray-200 dark:bg-gray-600 dark:text-white rounded-md p-2',
        props.className
      )}
    >
      <span className="mr-2 h-5 w-5">{props.leftIcon}</span>
      {props.children}
    </button>
  );
};
