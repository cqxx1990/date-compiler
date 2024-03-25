import { execute } from "../moment";
import moment from "moment";

test("moment,空值", () => {
  const now = moment();
  expect(execute("").format("YYYYMMDD")).toBe(now.format("YYYYMMDD"));
});
test("moment,原始值格式YYYY-MM-DD", () => {
  expect(execute("2024-01-01").format("YYYYMMDD")).toBe("20240101");
});
test("moment,原始值格式YYYYMMDD", () => {
  expect(execute("20240101").format("YYYYMMDD")).toBe("20240101");
});
test("moment,昨天", () => {
  expect(execute("-1d", moment("2024-01-02")).format("YYYY-MM-DD")).toBe(
    "2024-01-01"
  );
});
test("moment,上个月昨天", () => {
  expect(execute("-1M-1d", moment("2024-02-02")).format("YYYY-MM-DD")).toBe(
    "2024-01-01"
  );
});
test("moment,今天0点", () => {
  expect(execute("-$h-$m-$s", moment("2024-02-02")).format("YYYY-MM-DD HH:mm:ss")).toBe(
    "2024-02-02 00:00:00"
  );
});
test("moment,今天23点59分59秒", () => {
  expect(execute("-$h-$m-$s+1d-1s", moment("2024-02-02")).format("YYYY-MM-DD HH:mm:ss")).toBe(
    "2024-02-02 23:59:59"
  );
});
test("moment,周一", () => {
  expect(execute("-$d").isoWeekday()).toBe(1);
});
test("moment,1号", () => {
  expect(execute("-$D").date()).toBe(1);
});
test("moment,1月1号", () => {
  expect(execute("-$M-$D").format("MMDD")).toBe("0101");
});

test("moment,上周", () => {
  expect(execute("-1w",moment("2024-02-08")).format("MMDD")).toBe("0201");
});
test("moment,本周周日", () => {
  expect(execute("+1w-$d-1d",moment("2024-03-24")).format("MMDD")).toBe("0324");
});
test("moment,本年第一个周六", () => {
  expect(execute("-$w-$d+5d",moment("2024-03-24")).format("YYYYMMDD")).toBe("20240106");
});
