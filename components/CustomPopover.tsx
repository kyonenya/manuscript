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
}) => {
  return (
    <Popover>
      <PopoverTrigger>{props.triggerButton}</PopoverTrigger>
      <PopoverContent w={{ base: '90vw', md: 'sm' }}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>{props.children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
