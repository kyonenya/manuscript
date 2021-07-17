import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const HeaderContainer = (props: { children: ReactNode }) => {
  return (
    <Box px={4} bg={useColorModeValue('gray.100', 'gray.900')} boxShadow="md">
      <Flex
        h={{ base: 14, md: 16 }}
        alignItems="center"
        justifyContent="space-between"
      >
        {props.children}
      </Flex>
    </Box>
  );
};
