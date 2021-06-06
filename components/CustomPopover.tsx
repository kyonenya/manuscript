import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { ReactElement, ReactNode } from 'react';

export const CustomPopover = (props: {
  triggerButton: ReactElement;
  children: ReactNode;
  placement?: string;
}) => {
  return (
    <Popover placement={props.placement}>
      <PopoverTrigger>{props.triggerButton}</PopoverTrigger>
      <PopoverContent w={{ base: '90vw', md: 'sm' }}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>{props.children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
