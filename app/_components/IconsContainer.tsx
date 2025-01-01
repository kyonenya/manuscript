import { PropsWithChildren } from 'react';

export const IconsContainer = (props: PropsWithChildren) => (
  <div className="flex space-x-2 lg:space-x-4">{props.children}</div>
);
