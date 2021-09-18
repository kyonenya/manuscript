import {
  Box,
  Button,
  Center,
  chakra,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { JsonImport } from './JsonImport';

export const SettingsPage = () => {
  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')}>
      <Container maxW="4xl">
        <Box py={10}>
          <Box>
            <Box px={[4, 0]} mb={4}>
              <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                エクスポート
              </Heading>
            </Box>
            <chakra.form method="POST" shadow="base" rounded={[null, 'md']}>
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg={useColorModeValue('white', 'gray.700')}
                spacing={6}
              >
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  spacing={{ base: 2 }}
                >
                  <FormControl>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Since
                    </FormLabel>
                    <Input
                      type="datetime-local"
                      name="beginAt"
                      mt={1}
                      rounded="md"
                      shadow="sm"
                      w="full"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Until
                    </FormLabel>
                    <Input
                      type="datetime-local"
                      name="endAt"
                      mt={1}
                      rounded="md"
                      shadow="sm"
                      w="full"
                    />
                  </FormControl>
                </Stack>
                <FormControl>
                  <Checkbox colorScheme="blue" rounded="md">
                    <Text fontSize="sm">Select All</Text>
                  </Checkbox>
                </FormControl>
                <FormControl>
                  <FormLabel
                    for="state"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}
                  >
                    Previous Entries (JSON)
                  </FormLabel>
                  <Input type="file" accept="application/json" maxWidth="md" />
                </FormControl>
                <Center>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    _focus={{ shadow: '' }}
                    fontWeight="md"
                  >
                    Export
                  </Button>
                </Center>
              </Stack>
            </chakra.form>
          </Box>

          <Divider my={10} colorScheme="gray" />

          <Box>
            <Box px={[4, 0]} mb={4}>
              <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                インポート
              </Heading>
            </Box>
            <chakra.form
              method="POST"
              shadow="base"
              rounded={[null, 'md']}
              overflow={{ sm: 'hidden' }}
            >
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg={useColorModeValue('white', 'gray.700')}
                spacing={6}
              >
                <JsonImport />
              </Stack>
            </chakra.form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
