/**
 * Created by Administrator on 2017/5/7.
 */
document.write("success");
import {isEmpty, cpy, getVal, isArray, count, isEqual} from "../util/variable";
let myObjact = {"a":1,"b":{"d":1}};
let b = myObjact;
let c = cpy(myObjact);
let d = isEmpty(myObjact);
myObjact.b.d = 3;
console.log(b);
console.log(c);
console.log(myObjact);
console.log(isArray({}));
console.log(count(["a",screen, d]));
console.log(isEqual([1,2,],{1:1,2:2,}));
document.write(getVal("","空"));