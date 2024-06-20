const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

/*
  Конфиг без потерь качества
 */
const imageMinimizerConfigLossless = {
  implementation: ImageMinimizerPlugin.imageminMinify,
  options: {
    plugins: [
      'imagemin-gifsicle',
      'imagemin-jpegtran',
      'imagemin-optipng',
      'imagemin-svgo',
    ],
  },
};

/*
  Конфиг с потерями качества
 */
const imageMinimizerConfigLossy = {
  implementation: ImageMinimizerPlugin.imageminMinify,
  options: {
    plugins: [
      'imagemin-gifsicle',
      'imagemin-mozjpeg',
      'imagemin-pngquant',
      'imagemin-svgo',
    ],
  },
};

/*
  Конфиг генерации webp
 */
const imageGenerateWebp = {
  type: 'asset',
  implementation: ImageMinimizerPlugin.imageminGenerate,
  options: {
    plugins: ['imagemin-webp'],
  },
};

module.exports = {
  imageMinimizerConfigLossless,
  imageMinimizerConfigLossy,
  imageGenerateWebp,
};
