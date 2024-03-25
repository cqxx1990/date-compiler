import dayjs, { ManipulateType } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);
import dayOfYear from "dayjs/plugin/dayOfYear";
dayjs.extend(dayOfYear);
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);
import { parse } from "./parse";

/**
 * 根据当前时间算出表达式的时间
 * @param express 日期表达式，如 -2d-$s-$m-$h
 * @param base 基础日期，默认为当前时间
 * @returns
 */
export function execute(express: string, base?: dayjs.Dayjs) {
  const list = parse(express);
  // 如果表达式有长度，但是解析结果没有
  let ret =
    base ||
    dayjs(express.length > 0 && list.length === 0 ? express : undefined);
    
  list.forEach((item) => {
    let value = 0;
    let unit: ManipulateType = "d";
    if (item.type === 1) {
      switch (item.action) {
        case "$s":
          value = ret.second();
          unit = "s";
          break;
        case "$m":
          value = ret.minute();
          unit = "m";
          break;
        case "$h":
          value = ret.hour();
          unit = "h";
          break;
        case "$d":
          value = ret.isoWeekday() - 1;
          unit = "d";
          break;
        case "$D":
          value = ret.date() - 1;
          unit = "d";
          break;
        case "$w":
          value = ret.isoWeek() - 1;
          unit = "w";
          break;
        case "$M":
          value = ret.month();
          unit = "M";
          break;

        default:
          break;
      }
    } else {
      const count = Number(item.count);
      if (item.unit === "Q") {
        value = isNaN(count) ? 0 : count * 3;
        unit = "M";
      } else {
        value = isNaN(count) ? 0 : count;
        unit = item.unit;
      }
    }
    if (value === 0) return;
    if (item.opt === "+") {
      ret = ret.add(value, unit);
    } else {
      ret = ret.subtract(value, unit);
    }
  });
  return ret;
}
