import { execute } from "../dayjs";
import dayjs from "dayjs";

test("dayjs,空值", () => {
  const now = dayjs();
  expect(execute("").format("YYYYMMDD")).toBe(now.format("YYYYMMDD"));
});
test("dayjs,昨天", () => {
  expect(execute("-1d", dayjs("2024-01-02")).format("YYYY-MM-DD")).toBe(
    "2024-01-01"
  );
});
test("dayjs,上个月昨天", () => {
  expect(execute("-1M-1d", dayjs("2024-02-02")).format("YYYY-MM-DD")).toBe(
    "2024-01-01"
  );
});
test("dayjs,今天0点", () => {
  expect(execute("-$h-$m-$s", dayjs("2024-02-02")).format("YYYY-MM-DD HH:mm:ss")).toBe(
    "2024-02-02 00:00:00"
  );
});
test("dayjs,今天23点59分59秒", () => {
  expect(execute("-$h-$m-$s+1d-1s", dayjs("2024-02-02")).format("YYYY-MM-DD HH:mm:ss")).toBe(
    "2024-02-02 23:59:59"
  );
});
test("dayjs,周一", () => {
  expect(execute("-$d").isoWeekday()).toBe(1);
});
test("dayjs,1号", () => {
  expect(execute("-$D").date()).toBe(1);
});
test("dayjs,1月1号", () => {
  expect(execute("-$M-$D").format("MMDD")).toBe("0101");
});

test("dayjs,上周", () => {
  expect(execute("-1w",dayjs("2024-02-08")).format("MMDD")).toBe("0201");
});
test("dayjs,本周周日", () => {
  expect(execute("+1w-$d-1d",dayjs("2024-03-24")).format("MMDD")).toBe("0324");
});
test("dayjs,本年第一个周六", () => {
  expect(execute("-$w-$d+5d",dayjs("2024-03-24")).format("YYYYMMDD")).toBe("20240106");
});
