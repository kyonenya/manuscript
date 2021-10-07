import { StarIcon } from '@chakra-ui/icons';
import { Container, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Entry } from '../domain/Entry';
import { MarkdownText } from './MarkdownText';
import { Tags } from './Tags';

export const Preview = (props: { entry: Entry }) => {
  return (
    <Container maxW="3xl" px={10} pt={10}>
      <Stack direction="row" mb={3} alignItems="center">
        <Text color="gray.500" fontSize="xl">
          {dayjs(props.entry.createdAt).format('YYYY-MM-DD HH:mm')}
        </Text>
        {props.entry.starred && <StarIcon color="yellow.400" />}
        <Tags tags={props.entry.tags} />
      </Stack>
      <MarkdownText>{props.entry.text}</MarkdownText>
    </Container>
  );
};

export const Previews = (props: { entries: Entry[] }) => {
  return (
    <>
      {props.entries.map((entry) => (
        <Preview entry={entry} key={entry.uuid} />
      ))}
    </>
  );
};
