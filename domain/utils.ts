export const splitArray = (items: unknown[], n: number): unknown[][] =>
  items.reduce(
    (acc: unknown[][], _item, i) => (i % n ? acc : [...acc, items.slice(i, i + n)]),
    []
  );
