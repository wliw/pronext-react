const HtmlWebpackPlugin = require('html-webpack-plugin');
const pluginName = 'HtmlFaviconPlugin';

class HtmlFaviconPlugin {
    apply (complier) {
        complier.hooks.compilation.tap(pluginName, (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(pluginName, (data, callback) => {
                const headTags = data.headTags || [];

                headTags.forEach(node => {
                    if (node.tagName === 'link' && node.attributes.rel && node.attributes.rel.indexOf('icon') > -1) {
                        const { href, rel } = node.attributes;

                        node.attributes = {
                            href,
                            rel,
                            type: 'image/x-icon'
                        };
                    }
                });

                callback && callback(null, data);
            });
        });
    }
}

module.exports = HtmlFaviconPlugin;
