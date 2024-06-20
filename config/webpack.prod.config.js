const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  imageMinimizerConfigLossy,
  imageGenerateWebp,
  imageMinimizerConfigLossless,
} = require('./image-minimizer.config');

/*
  Если true, то изображения будут сжаты с потерей качества
 */
const LOSSY = true;
/*
  Если true, то будет генерироваться WEBP
 */
const GENERATE_WEBP = false;

const GENERATOR = [];

if (GENERATE_WEBP) {
  GENERATOR.push(imageGenerateWebp);
}

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
        minimizer: LOSSY
          ? imageMinimizerConfigLossy
          : imageMinimizerConfigLossless,
        generator: GENERATOR,
        deleteOriginalAssets: false,
      }),
    ],
  },
});

module.exports = new Promise((resolve, reject) => {
  resolve(prodWebpackConfig);
});
