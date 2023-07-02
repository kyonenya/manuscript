import {
  ComponentProps,
  ForwardedRef,
  ReactElement,
  cloneElement,
  forwardRef,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { iconButtonClassName } from './IconButton';

export const IconCheckbox = forwardRef(function _IconCheckbox(
  {
    children,
    ...props
  }: {
    children: ReactElement;
  } & ComponentProps<'input'>,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="grid place-items-center">
      <input
        {...props}
        id="icon-checkbox"
        type="checkbox"
        className={twMerge(props.className, 'peer sr-only')}
        ref={ref}
      />
      <label
        htmlFor="icon-checkbox"
        tabIndex={0}
        className={twMerge(
          iconButtonClassName,
          'grid cursor-pointer place-items-center text-gray-300 peer-checked:text-yellow-400'
        )}
      >
        {cloneElement(children, {
          className: twMerge('w-5', children.props.className),
        })}
      </label>
    </div>
  );
});
