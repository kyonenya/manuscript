import { ReadonlyURLSearchParams } from 'next/navigation';

export const splitArray = <T>(items: T[], each: number): T[][] =>
  items.reduce(
    (acc: T[][], _item, i) =>
      i % each ? acc : [...acc, items.slice(i, i + each)],
    []
  );

export const updateSearchParams = (props: {
  searchParams: ReadonlyURLSearchParams;
  pathname?: string;
  append?: { name: string; value: string };
  remove?: { name: string; value?: unknown };
}): string => {
  const params = new URLSearchParams(props.searchParams.toString()); // mutable clone
  if (props.append) {
    params.set(props.append.name, props.append.value);
  }
  if (props.remove) {
    params.delete(props.remove.name);
  }

  return props.pathname
    ? `${props.pathname}?${params.toString()}`
    : params.toString();
};
