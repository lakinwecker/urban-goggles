export type ZipperList<T> = {
  readonly first: T[];
  readonly current: T;
  readonly rest: T[];
};

export const ZipperList = <T>(first: T[], current: T, rest: T[]) => {
  return { first, current, rest };
};

export const toArray = <T>(z: ZipperList<T>): Array<T> => {
  return [...z.first, z.current, ...z.rest];
};

export const fromArray = <T>(a: Array<T>, i: number): ZipperList<T> => {
  //  Error cases
  if (a.length === 0)
    throw new Error("Can't construct Zippered list from empty array");

  // If past the end or before the beginning place at end / beginning
  if (i >= a.length) return fromArray(a, a.length - 1);
  if (i < 0) return fromArray(a, 0);

  const current = a[i];
  if (current !== undefined) {
    // Happy path, they passed in parameters that make sense, just construct
    return {
      first: a.slice(0, i),
      rest: a.slice(i + 1, a.length),
      current,
    };
  }

  // Final error to make typescript happy
  throw new Error("Typescript is dumb");
};

export const next = <T>(z: ZipperList<T>): ZipperList<T> => {
  return fromArray(toArray(z), z.first.length + 1);
};

export const prev = <T>(z: ZipperList<T>): ZipperList<T> => {
  return fromArray(toArray(z), z.first.length - 1);
};

export const map =
  <T, T2>(f: (t: T) => T2) =>
  (z: ZipperList<T>): ZipperList<T2> => {
    return fromArray(toArray(z).map(f), z.first.length);
  };

export const filter =
  <T>(f: (t: T) => boolean) =>
  (z: ZipperList<T>): ZipperList<T> => {
    return fromArray(toArray(z).filter(f), z.first.length);
  };

export type HasEquality<T> = {
  equals: (t1: T, t2: T) => boolean;
};

export const includes =
  <T>(proof: HasEquality<T>) =>
  (z: ZipperList<T>, t: T): boolean => {
    return toArray(z).filter((t1) => proof.equals(t, t1)).length > 0;
  };
