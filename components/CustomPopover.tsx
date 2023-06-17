import { XMarkIcon } from '@heroicons/react/24/solid';
import { Root, Trigger, Content, Close } from '@radix-ui/react-popover';
import { IconButton } from './IconButton';

type Placement = 'top' | 'right' | 'bottom' | 'left';

type CustomPopoverProps = {
  triggerButton: React.ReactNode;
  children: React.ReactNode;
  placement?: Placement;
};

export const CustomPopover = ({
  triggerButton,
  children,
  placement,
}: CustomPopoverProps) => (
  <Root>
    <Trigger className="cursor-pointer">{triggerButton}</Trigger>
    <Content
      side={placement}
      className="w-11/12 transform-gpu rounded border border-gray-200 bg-white shadow-lg transition duration-200 ease-in-out dark:bg-gray-800 md:w-80"
    >
      <Close className="absolute right-1 top-1 cursor-pointer">
        <IconButton className="h-5 w-5" iconClassName="w-4">
          <XMarkIcon />
        </IconButton>
      </Close>
      <div className="space-y-4 p-5">{children}</div>
    </Content>
  </Root>
);
