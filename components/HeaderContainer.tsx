import { ReactNode } from 'react';

export const HeaderContainer = (props: { children: ReactNode }) => {
  return (
    <div className="px-4 bg-gray-100 dark:bg-gray-900 shadow-md sticky -webkit-sticky top-0 z-100">
      <div className="flex h-14 md:h-16 items-center justify-between">
        {props.children}
      </div>
    </div>
  );
};
