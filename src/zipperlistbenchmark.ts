/* benchmark.js */
import b from "benny";
import { ZipperList, map, mapOld } from "./zipperlist";

const l = Array.from(new Array(1000000)).map((_, i) => i);
const z = ZipperList([], 3, l);

b.suite(
  "Example",

  b.add("Map ZipperList", () => {
    map((x: number) => x * x)(z);
  }),

  b.add("Map ZipperList Old", () => {
    mapOld((x: number) => x * x)(z);
  }),

  b.add("Map Raw List", () => {
    l.map((x: number) => x * x);
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: "reduce", version: "1.0.0" }),
  b.save({ file: "reduce", format: "chart.html" })
);
