'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import {
  Root,
  Trigger,
  Content,
  Close,
  PopperContentProps,
} from '@radix-ui/react-popover';
import { ReactElement, ReactNode } from 'react';
import { IconButton } from './IconButton';

export const Popover = (props: {
  triggerButton: ReactElement<any>;
  side?: PopperContentProps['side'];
  children?: ReactNode;
}) => (
  <Root>
    <Trigger asChild>{props.triggerButton}</Trigger>
    <Content
      side={props.side}
      className="transform-gpu rounded border border-gray-200 bg-white p-1 shadow-lg transition duration-200 ease-in-out dark:border-gray-600 dark:bg-gray-800"
    >
      <Close className="absolute right-0.5 top-0.5" asChild>
        <IconButton className="h-6 w-6 rounded-full">
          <XMarkIcon />
        </IconButton>
      </Close>
      <div className="space-y-4 p-5">{props.children}</div>
    </Content>
  </Root>
);
