import { StarIcon } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import { Entry } from '../domain/Entry';
import { MarkdownText } from './MarkdownText';
import { Tags } from './Tags';

export const Preview = (props: { entry: Entry }) => {
  return (
    <div className="mx-auto max-w-3xl px-10 pt-10">
      <div className="mb-3 flex flex-row items-center">
        <p className="mr-3 text-xl text-gray-500">
          {dayjs(props.entry.createdAt).format('YYYY-MM-DD HH:mm')}
        </p>
        {props.entry.starred && <StarIcon />}
        <Tags tags={props.entry.tags} />
      </div>
      <MarkdownText>{props.entry.text}</MarkdownText>
    </div>
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
