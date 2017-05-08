/**
 * Created by Administrator on 2017/5/8.
 */
import {isEmpty, cpy, getVal, isArray, count, isEqual, in_array} from "../../util/variable";
console.log(isEmpty({}));
console.log(cpy({"a":1,"b":2}));
console.log(getVal({},"无"));
console.log(isArray({}));
console.log(count("ddd"));
console.log(isEqual({},{}));
console.log(in_array([1],1)); 
