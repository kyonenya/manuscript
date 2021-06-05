import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Stack,
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
        <PopoverBody>
          <Stack direction="column" spacing={4} padding={2}>
            {props.children}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
