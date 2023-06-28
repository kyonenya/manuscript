import { PropsWithChildren } from 'react';

export const HeaderContainer = (props: PropsWithChildren) => {
  return (
    <div className="-webkit-sticky z-100 sticky top-0 bg-gray-100 px-2 shadow-md dark:bg-gray-900 md:px-4">
      <div className="flex h-14 items-center justify-between space-x-3 md:h-16">
        {props.children}
      </div>
    </div>
  );
};
