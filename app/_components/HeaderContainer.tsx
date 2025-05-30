import { PropsWithChildren } from 'react';

export const HeaderContainer = (props: PropsWithChildren) => {
  return (
    <div className="-webkit-sticky sticky top-0 z-100 bg-gray-100 px-2 shadow-md md:px-4 dark:bg-gray-900">
      <div className="flex h-14 items-center justify-between space-x-3 md:h-16">
        {props.children}
      </div>
    </div>
  );
};
