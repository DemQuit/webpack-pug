const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

/*
  Если true, то изображения будут сжаты с потерей качества
 */
const LOSSY = true;
/*
  Если true, то будет генерироваться WEBP
 */
const GENERATE_WEBP = true;

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

const imageMinimizerWithGenerateWebp = {
  minimizer: LOSSY ? imageMinimizerConfigLossy : imageMinimizerConfigLossless,
  generator: [imageGenerateWebp],
  deleteOriginalAssets: false,
};

const imageMinimizerWithoutGenerateWebp = {
  minimizer: LOSSY ? imageMinimizerConfigLossy : imageMinimizerConfigLossless,
  deleteOriginalAssets: false,
};

module.exports = {
  GENERATE_WEBP,
  imageMinimizerWithGenerateWebp,
  imageMinimizerWithoutGenerateWebp,
};
