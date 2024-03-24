import { CalcResultItem, CommonResultItem, ParseResultItem } from "./type";

const DYNAMIC_ACTION = ["$s", "$m", "$h", "$d", "$D", "$w", "$M"];
const TOKEN_EXP = new RegExp(
  `(\\+|\\-)((\\d+[smhdwMQy])|${DYNAMIC_ACTION.map((item) => `(\\${item})`).join(
    "|"
  )})`,
  "g"
);

export function parse(express: string) {
  if (typeof express !== "string") {
    return [];
  }
  if (!express) return [];
  if (express[0] !== "+" && express[0] !== "-") {
    express = `+${express}`;
  }
  const ret: ParseResultItem[] = [];
  TOKEN_EXP.lastIndex = 0;
  while (true) {
    let matches = TOKEN_EXP.exec(express);
    if (!matches) {
      break;
    }
    const opt = matches[1] as ParseResultItem["opt"];
    const action = matches[2];
    if (DYNAMIC_ACTION.includes(action)) {
      ret.push({ opt, type: 1, action: action as CalcResultItem["action"] });
    } else {
      ret.push({
        opt,
        type: 0,
        count: action.slice(0, -1),
        unit: action[action.length - 1] as CommonResultItem["unit"],
      });
    }
  }
  return ret;
}
