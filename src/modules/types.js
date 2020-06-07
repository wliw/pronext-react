const toString = Object.prototype.toString;

const is = (type) => (value) => toString.call(value).slice(8, -1) === type;

export const isString = is('String');
export const isNumber = is('Number');
export const isBoolean = is('Boolean');
