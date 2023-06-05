const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'source-map',
  target: 'web',
  devServer: {
    watchFiles: baseWebpackConfig.externals.paths.src,
    port: 8080,
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    ...baseWebpackConfig.externals.paths.pages.map((page) => {
      return new HtmlWebpackPlugin({
        template: `${baseWebpackConfig.externals.paths.pagesDir}/${page}`,
        filename: `${page.replace(/\.pug/, '.html')}`,
        production: false,
      });
    }),
  ],
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
