export const splitArray = <T>(items: T[], each: number): T[][] =>
  items.reduce(
    (acc: T[][], _item, i) =>
      i % each ? acc : [...acc, items.slice(i, i + each)],
    []
  );

export const appendSearchParams = (props: {
  searchParams: URLSearchParams;
  name: string;
  value: string;
}): string => {
  const params = new URLSearchParams(props.searchParams); // mutable clone
  params.set(props.name, props.value);

  return params.toString();
};

export const removeSearchParams = (props: {
  searchParams: URLSearchParams;
  name: string;
}): string => {
  const params = new URLSearchParams(props.searchParams); // mutable clone
  params.delete(props.name);

  return params.toString();
};
