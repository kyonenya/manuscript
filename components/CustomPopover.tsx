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
      className="w-11/12 md:w-80 bg-white dark:bg-gray-800 border border-gray-200 rounded shadow-lg transition duration-200 ease-in-out transform-gpu"
    >
      <Close className="absolute top-1 right-1 cursor-pointer">
        <IconButton className="w-5 h-5" iconClassName="w-4">
          <XMarkIcon />
        </IconButton>
      </Close>
      <div className="p-5 space-y-4">{children}</div>
    </Content>
  </Root>
);
