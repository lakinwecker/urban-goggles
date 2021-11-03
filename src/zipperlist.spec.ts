import { ZipperList, all, next, prev } from "./zipperlist";

test("Creation and access", () => {
  const z = ZipperList([], 1, [2, 3, 4, 5]);
  expect(all(z)).toStrictEqual([1, 2, 3, 4, 5]);
});

test("Creation with index 1", () => {
  const z2 = ZipperList([1], 2, [3, 4, 5]);
  expect(all(z2)).toStrictEqual([1, 2, 3, 4, 5]);
  expect(z2.current).toStrictEqual(2);
});

test("Access current element", () => {
  const z = ZipperList([], 1, [2, 3, 4, 5]);
  expect(z.current).toStrictEqual(1);
});

test("Access next element", () => {
  let z = ZipperList([], 1, [2, 3]);
  z = next(z);
  expect(z.current).toStrictEqual(2);
  z = next(z);
  expect(z.current).toStrictEqual(3);
  z = next(z);
  expect(z.current).toStrictEqual(3);
});

test("Access prev element", () => {
  let z = ZipperList([1], 2, [3, 4, 5]);
  z = prev(z);
  expect(z.current).toStrictEqual(1);
});

test("Access prev element 2", () => {
  let z = ZipperList([], 2, [3, 4, 5]);
  z = prev(z);
  expect(z.current).toStrictEqual(2);
});

test("Access prev element with duplicate variable", () => {
  let z = ZipperList([1], 2, [3, 4, 5]);
  const z2 = z;
  z = prev(z);
  expect(z.current).toStrictEqual(1);
  expect(z2.current).toStrictEqual(2);
});

export {};
