'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { Root, Trigger, Content, Close } from '@radix-ui/react-popover';
import { IconButton } from '../app/_components/IconButton';

type Placement = 'top' | 'right' | 'bottom' | 'left';

type CustomPopoverProps = {
  triggerElement: React.ReactNode;
  children: React.ReactNode;
  placement?: Placement;
};

export const CustomPopover = ({
  triggerElement,
  children,
  placement,
}: CustomPopoverProps) => (
  <Root>
    <Trigger className="cursor-pointer">{triggerElement}</Trigger>
    <Content
      side={placement}
      className="transform-gpu rounded border border-gray-200 bg-white p-1 shadow-lg transition duration-200 ease-in-out dark:border-gray-600 dark:bg-gray-800"
    >
      <Close className="absolute right-0.5 top-0.5 cursor-pointer">
        <IconButton
          noButton
          className="h-6 w-6 rounded-full"
          iconClassName="w-5"
        >
          <XMarkIcon />
        </IconButton>
      </Close>
      <div className="space-y-4 p-5">{children}</div>
    </Content>
  </Root>
);
