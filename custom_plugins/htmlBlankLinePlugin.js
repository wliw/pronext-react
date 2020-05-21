const HtmlWebpackPlugin = require('html-webpack-plugin');
const pluginName = 'HtmlBlankLinePlugin';

class HtmlBlankLinePlugin {
    apply (complier) {
        complier.hooks.compilation.tap(pluginName, (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(pluginName, (data, callback) => {
                let html = data.html;

                // 去除多个空换行为一个换行
                html = html.replace(/(\n+)/g, '\n');
                // 去除重复换行多空格为一个换行和多空格
                html = html.replace(/(\n\s+)(\n\s+)/g, '$1');
                // 将head里面的script和ico变换先后位置
                html = html.replace(/<script(.*)script>\n<link(.*)icon">/, '<link$2icon">\n    <script$1script>\n');
                // link加四个空格
                html = html.replace(/(\n<link)/g, '\n    <link');
                // 多个link连在一起改成换行
                html = html.replace(/(><link)/g, '>\n    <link');
                // 多个script换行加多空格
                html = html.replace(/(script>)(<script)/g, '$1\n$2');
                // body结束表情加换行
                html = html.replace(/<\/(body)>/g, '\n</$1>');
                // body开始标签去除第一个子标签的多空格
                html = html.replace(/<body(.*)>(\n\s+)/, '<body$1>\n');

                data.html = html;
                callback && callback(null, data);
            });
        });
    }
}

module.exports = HtmlBlankLinePlugin;
