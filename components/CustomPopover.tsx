import { Root, Trigger, Content, Close } from '@radix-ui/react-popover'

type Placement = 'top' | 'right' | 'bottom' | 'left';

type CustomPopoverProps = {
  triggerButton: React.ReactNode
  children: React.ReactNode
  placement?: Placement
}

export const CustomPopover = ({ triggerButton, children, placement }: CustomPopoverProps) => (
      <Root className="z-[5000]">
    <Trigger className="cursor-pointer">{triggerButton}</Trigger>
    <Content 
      side={placement}
      className="w-11/12 md:w-64 bg-white border border-gray-200 rounded shadow-lg transition duration-200 ease-in-out transform-gpu z-[5000]"
    >
      <Close className="absolute top-2 right-2 cursor-pointer">Close</Close>
      <div className="p-4 space-y-4 z-[5000]">{children}</div>
    </Content>
  </Root>
)
