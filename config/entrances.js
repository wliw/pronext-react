const resolve = require('../utils/index.js');

module.exports = [
    {
        key: 'index',
        name: 'index.html',
        entry: resolve('src/index.js'),
        template: resolve('src/assets/templates/render.js')
    }
];
