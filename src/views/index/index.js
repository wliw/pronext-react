/*
 * @Author: your name
 * @Date: 2020-05-25 21:33:58
 * @LastEditTime: 2020-06-07 20:21:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /pronext-react/src/views/index/index.js
 */
import Index from './Index.jsx';
import { isString, isNumber, isBoolean } from '@/modules/types';

let a = 'abc';
let b = 123;
let c = true;

if (isString(a) !== isNumber(b)) {
    b = 'cba';
}

console.log(isBoolean(c));

let promise = new Promise(resolve => {
    let handler = setTimeout(() => {
        handler && clearTimeout(handler);
        handler = null;

        resolve(1);
    }, 1000);
});

promise.then(result => {
    console.log(result);
});

export default Index;
