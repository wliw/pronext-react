/*
 * @Author: your name
 * @Date: 2020-05-25 21:33:58
 * @LastEditTime: 2020-06-07 20:50:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /pronext-react/src/index.js
 */
import 'core-js/es/map';
import 'core-js/es/set';
import ReactDOM from 'react-dom';
import App from './App.jsx';

window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        App(),
        document.getElementById('app')
    );
}, false);
