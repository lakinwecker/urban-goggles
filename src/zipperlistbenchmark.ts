/* benchmark.js */
import b from "benny";
import { ZipperList, map } from "./zipperlist";

const z = ZipperList([1, 2], 3, [4, 5]);
const l = [1, 2, 3, 4, 5];

b.suite(
  "Example",

  b.add("Map ZipperList", () => {
    map((x: number) => x * x)(z);
  }),

  b.add("Map Raw List", () => {
    l.map((x: number) => x * x);
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: "reduce", version: "1.0.0" }),
  b.save({ file: "reduce", format: "chart.html" })
);
