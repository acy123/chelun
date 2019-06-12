import { autorun } from "mobx";
// 引入模块
import Count from './modules/count';

const count = new Count();

// 追踪数据变化
autorun(() => {
    console.log('count触发了改变....', count.count);
});

export default {
    count,
}