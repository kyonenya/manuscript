import { cloneElement, ReactElement, ReactNode } from 'react';

export const ButtonWithLeftIcon = (props: {
  leftIcon: ReactElement;
  children: ReactNode;
  onClick: () => void | Promise<void>;
}) => {
  return (
    <button
      onClick={props.onClick}
      className="flex items-center justify-center w-full bg-gray-200 rounded-md p-2"
    >
      {cloneElement(props.leftIcon, {
        className: 'mr-2 h-5 w-5',
      })}
      {props.children}
    </button>
  );
};
