import { StarIcon } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import { Entry } from '../domain/Entry';
import { MarkdownText } from './MarkdownText';
import { Tags } from './Tags';

export const Preview = (props: { entry: Entry }) => {
  return (
<div className="max-w-3xl px-10 pt-10">
    <div className="flex flex-row mb-3 items-center">
      <p className="text-gray-500 text-xl">
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
