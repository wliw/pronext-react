/*
 * @Author: your name
 * @Date: 2020-06-06 11:30:51
 * @LastEditTime: 2020-06-07 20:51:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /pronext-react/src/views/about/index.js
 */
import About from './About.jsx';
import { isString, isNumber } from '@/modules/types';

let a = 'abc';
let b = 123;

if (isString(a) !== isNumber(b)) {
    b = 'cba';
}

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

export default About;
