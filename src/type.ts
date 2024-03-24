export type DynamicAction =
  | "$s"
  | "$m"
  | "$h"
  | "$d"
  | "$D"
  | "$w"
  | "$M";

interface BaseResultItem {
  /**操作符 */
  opt: "+" | "-";
}
export type CalcResultItem = {
  type: 1;
  action: DynamicAction;
};
export type CommonResultItem = {
  type: 0;
  /**数量 */
  count: string;
  /**单位 */
  unit: "s" | "m" | "h" | "d" | "w" | "M" | "Q" | "y";
};

export type ParseResultItem = BaseResultItem &
  (CalcResultItem | CommonResultItem);
