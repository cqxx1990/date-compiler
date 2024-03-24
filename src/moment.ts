import moment from "moment";
import { parse } from "./parse";

/**根据当前时间算出表达式的时间 */
export function execute(express: string, base?: moment.Moment) {
  const list = parse(express);
  const ret = base || moment();
  list.forEach((item) => {
    let value = 0;
    let unit: moment.DurationInputArg2 = "d";
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
      value = isNaN(count) ? 0 : count;
      unit = item.unit;
    }
    if (value === 0) return;
    if (item.opt === "+") {
      ret.add(value, unit);
    } else {
      ret.subtract(value, unit);
    }
  });
  return ret;
}
