/*
 * @Author: your name
 * @Date: 2020-06-07 10:35:48
 * @LastEditTime: 2020-06-07 20:52:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /pronext-react/src/views/team/index.js
 */

import Team from './Team.jsx';
import { isString, isNumber } from '@/modules/types';

let a = 'abc';
let b = 123;

if (isString(a) !== isNumber(b)) {
    b = 'cba';
}

console.log(233333);

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

let d = new Map();
let e = new Set();
console.log(d, e);

export default Team;
