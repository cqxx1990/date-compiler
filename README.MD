## Getting Started

### Documentation

解析moment和dayjs的字符串表达式，快捷生成日期

### Installation

```console
npm install date-compiler --save
```

### API

#### 适配moment.js
!!必须安装moment
```
import { execute } from "date-compiler/es/moment";
// 输出以指定时间为基础时间的前一天
execute("-1d", moment("2024-01-02")).format("YYYY-MM-DD") //2024-02-01
```
[详细案例](https://github.com/cqxx1990/date-compiler/blob/master/src/__test__/moment.test.ts)

#### 适配dayjs
!!必须安装dayjs
```
import { execute } from "date-compiler/es/dayjs";
// 输出以指定时间为基础时间的前一天
execute("-1d", dayjs("2024-01-02")).format("YYYY-MM-DD") //2024-02-01
```
[详细案例](https://github.com/cqxx1990/date-compiler/blob/master/src/__test__/dayjs.test.ts)

#### 自定义适配

[参考](./src/moment.ts)

### 字符串规则

!!! 只包含+/-预算
s: 单位秒，+1s = 往后一秒，-5s = 往前5秒
m: 单位分，+1m = 往后一分，-5m = 往前5分
d: 单位小时，同上
d: 单位天，同上
w: 单位周，同上
M: 单位月，同上
Q: 单位季度，同上
y: 单位年，同上

$s: 当前的秒，-$s = 当前秒数置为0
$m: 当前的分，-$s = 当前分数置为0
$h: 当前的小时，同上
$d: 当前的天（一周内）,-$d = 周一
$D: 当前的天（一个月内）,-$d = 当前月1号
$w: 当前的周数（一年内）,-$w = 本年第一周
$M: 当前的月（一年内）,-$M = 本年第一月

## 联系作者

624167284@qq.com