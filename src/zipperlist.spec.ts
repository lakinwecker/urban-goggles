import {
  ZipperList,
  toArray,
  next,
  prev,
  map,
  filter,
  fromArray,
  includes,
} from "./zipperlist";

test("Creation and access", () => {
  const z = ZipperList([], 1, [2, 3, 4, 5]);
  expect(toArray(z)).toStrictEqual([1, 2, 3, 4, 5]);
});

test("Creation with index 1", () => {
  const z2 = ZipperList([1], 2, [3, 4, 5]);
  expect(toArray(z2)).toStrictEqual([1, 2, 3, 4, 5]);
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

test("map", () => {
  let z = ZipperList([1], 2, [3, 4, 5]);
  const z2 = map((t: number) => t * t)(z);
  expect(z2.first).toStrictEqual([1]);
  expect(z2.current).toStrictEqual(4);
  expect(z2.rest).toStrictEqual([9, 16, 25]);
});

test("filter", () => {
  let z = ZipperList([1], 2, [3, 4, 5]);
  const z2 = filter((t: number) => t > 3)(z);
  console.log(z2);
  expect(z2.first).toStrictEqual([4]);
  expect(z2.current).toStrictEqual(5);
  expect(z2.rest).toStrictEqual([]);
});

test("fromArray 1", () => {
  let z = fromArray([1, 3, 4, 5], 1);
  expect(z.first).toStrictEqual([1]);
  expect(z.current).toStrictEqual(3);
  expect(z.rest).toStrictEqual([4, 5]);
});

test("fromArray 2", () => {
  let z = fromArray([1], 1);
  expect(z.first).toStrictEqual([]);
  expect(z.current).toStrictEqual(1);
  expect(z.rest).toStrictEqual([]);
});

test("fromArray 3", () => {
  let z = fromArray([1], 0);
  expect(z.first).toStrictEqual([]);
  expect(z.current).toStrictEqual(1);
  expect(z.rest).toStrictEqual([]);
});

test("fromArray 4", () => {
  let z = fromArray([1, 2, 3, 4], 3);
  expect(z.first).toStrictEqual([1, 2, 3]);
  expect(z.current).toStrictEqual(4);
  expect(z.rest).toStrictEqual([]);
});

test("filter all true ", () => {
  let z = ZipperList([1], 2, [3, 4, 5]);
  const z2 = filter(() => true)(z);
  expect(z2.first).toStrictEqual([1]);
  expect(z2.current).toStrictEqual(2);
  expect(z2.rest).toStrictEqual([3, 4, 5]);
});

/*test("filter all true ", () => {
  let z = ZipperList([1], 2, [3, 4, 5]);
  const z2 = filter(() => false)(z);
  expect(z2.first).toStrictEqual([1]);
  expect(z2.current).toStrictEqual(2);
  expect(z2.rest).toStrictEqual([3, 4, 5]);
});*/

test("includes", () => {
  let z = ZipperList([1], 2, [3, 4, 5]);
  expect(includes(z, 1)).toBeTruthy();
  expect(includes(z, 1000)).toBeFalsy();
});

test("includes 2", () => {
  let z = ZipperList([{ name: "ummer" }], { name: "ben" }, []);
  expect(includes(z, { name: "ummer" })).toBeTruthy();
  expect(includes(z, { name: "lakin" })).toBeFalsy();
});

export {};
