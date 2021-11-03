export type ZipperList<T> = {
  readonly first: T[];
  readonly current: T;
  readonly rest: T[];
};

export const ZipperList = <T>(first: T[], current: T, rest: T[]) => {
  return { first, current, rest };
};

export const all = <T>(z: ZipperList<T>) => {
  return [...z.first, z.current, ...z.rest];
};

export const next = <T>(z: ZipperList<T>): ZipperList<T> => {
  const [y, ...rest] = z.rest;
  if (y) {
    return {
      first: [...z.first, z.current],
      current: y,
      rest: rest,
    };
  }
  return z;
};

export const prev = <T>(z: ZipperList<T>): ZipperList<T> => {
  const y = z.first[z.first.length - 1];
  if (y) {
    return {
      first: z.first.slice(0, z.first.length - 1),
      current: y,
      rest: [z.current, ...z.rest],
    };
  }
  return z;
};
