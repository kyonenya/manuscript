import { ReactNode } from 'react';

export const HeaderContainer = (props: { children: ReactNode }) => {
  return (
    <div className="-webkit-sticky z-100 sticky top-0 bg-gray-100 px-4 shadow-md dark:bg-gray-900">
      <div className="flex h-14 items-center justify-between md:h-16">
        {props.children}
      </div>
    </div>
  );
};
