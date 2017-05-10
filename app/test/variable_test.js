/**
 * Created by Administrator on 2017/5/8.
 */
import {isEmpty, cpy, getVal, isArray, count, isEqual, in_array, array_remove, key_arr, s_max, replaceAll, format_str} from "../../util/variable";
console.log(isEmpty({}));
console.log(cpy({"a":1,"b":2}));
console.log(getVal({},"无"));
console.log(isArray({}));
console.log(count("ddd"));
console.log(isEqual({},{}));
console.log(in_array(1,[1]));
console.log(array_remove(1,[1,2,3,4]));
console.log(key_arr({"a":1,"b":2,"c":3}));
console.log(s_max([1,2,3,4,5]));
console.log(replaceAll("2222",'2','3'));
console.log(format_str("sdf  sdfgsdfg  dfg  "));
