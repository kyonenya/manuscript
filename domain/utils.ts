export const splitArray = <T>(items: T[], each: number): T[][] =>
  items.reduce(
    (acc: T[][], _item, i) =>
      i % each ? acc : [...acc, items.slice(i, i + each)],
    []
  );
