import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Placement,
  Stack,
} from '@chakra-ui/react';
import { ReactElement, ReactNode } from 'react';

export const CustomPopover = (props: {
  triggerButton: ReactElement;
  children: ReactNode;
  placement?: Placement;
}) => {
  return (
    <Popover placement={props.placement}>
      <PopoverTrigger>{props.triggerButton}</PopoverTrigger>
      <PopoverContent w={{ base: '90vw', md: 'sm' }}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Stack direction="column" spacing={4} px={2} py={4}>
            {props.children}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
