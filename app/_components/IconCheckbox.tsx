import { ComponentProps, ReactElement, SVGProps, cloneElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { iconButtonClassName } from './IconButton';

export const IconCheckbox = (
  props: {
    children: ReactElement<SVGProps<SVGSVGElement>>;
    ref?: React.Ref<HTMLInputElement>;
  } & ComponentProps<'input'>,
) => {
  const { children, ref, ...rest } = props;

  return (
    <div className="grid place-items-center">
      <input
        {...rest}
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
          'grid cursor-pointer place-items-center text-gray-300 peer-checked:text-yellow-400 dark:text-gray-400 dark:peer-checked:dark:text-yellow-500',
        )}
      >
        {cloneElement(children, {
          className: twMerge('w-5', children.props.className),
        })}
      </label>
    </div>
  );
};
