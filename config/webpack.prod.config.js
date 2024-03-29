const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    ...baseWebpackConfig.externals.paths.pages.map((page) => {
      return new HtmlWebpackPlugin({
        template: `${baseWebpackConfig.externals.paths.pagesDir}/${page}`,
        filename: `${page.replace(/\.pug/, '.html')}`,
        production: true,
      });
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({}),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              ['svgo', { name: 'preset-default' }],
            ],
          },
        },
      }),
    ],
  },
});

module.exports = new Promise((resolve, reject) => {
  resolve(prodWebpackConfig);
});
