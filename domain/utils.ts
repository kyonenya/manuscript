import { ReadonlyURLSearchParams } from 'next/navigation';

export const splitArray = <T>(items: T[], each: number): T[][] =>
  items.reduce(
    (acc: T[][], _item, i) =>
      i % each ? acc : [...acc, items.slice(i, i + each)],
    [],
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

/**
 * FileReader Promise wrapper
 *
 * @url https://qiita.com/tronicboy/items/69e4ddb03c10f53ff18c
 */
export const readFileAsText = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result as string);
    reader.onerror = (error) => reject(error);

    reader.readAsText(file);
  });
};
