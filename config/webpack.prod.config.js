const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  imageMinimizerWithoutGenerateWebp,
  imageMinimizerWithGenerateWebp,
  GENERATE_WEBP,
} = require('./image-minimizer.config');

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
      new ImageMinimizerPlugin(
        GENERATE_WEBP
          ? imageMinimizerWithGenerateWebp
          : imageMinimizerWithoutGenerateWebp
      ),
    ],
  },
});

module.exports = new Promise((resolve, reject) => {
  resolve(prodWebpackConfig);
});
