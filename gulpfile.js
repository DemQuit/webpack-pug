const { src, dest, series } = require('gulp');
const deleteSync = require('del');
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2woff = require('gulp-ttf2woff-candy');
const config = require('./config/gulp/config');
const consolidate = require('gulp-consolidate');
const iconFont = require('gulp-iconfont');

function fontGenerateWoff() {
  return src('./font-convert/src/*.{ttf,otf}')
    .pipe(ttf2woff()).pipe(dest('font-convert/build/'));
}
function fontGenerateWoff2() {
  return src('./font-convert/src/*.{ttf,otf}')
    .pipe(ttf2woff2()).pipe(dest('font-convert/build/'));
}

function fontClean() {
  return deleteSync([
    'font-convert/build/*.ttf',
    'font-convert/build/*.otf',
  ]);
}

function clean() {
  return deleteSync([
    'dist/**',
    'src/assets/*.js',
    'src/assets/*.css',
    'src/assets/*.map',
  ]);
}

function iconFontGen() {
  const fontName = 'svgfont';
  return src(config.src.svgFont + '*.svg')
    .pipe(iconFont({
      fontName,
      prependUnicode: false,
      formats: ['ttf', 'eot', 'woff', 'woff2'],
      normalize: true,
      fontHeight: 1001,
      fontStyle: 'normal',
      fontWeight: 'normal',
    })).on('glyphs', function(glyphs) {
      console.log(glyphs);
      src(config.src.helpers + 'svgfont.sass')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          fontPath: '/assets/fonts/',
          className: 'if',
        }))
        .pipe(dest(config.src.scss + 'components/'));
    }).pipe(dest(config.dist.root + 'assets/fonts/'));
}

exports.fontGen = series(fontGenerateWoff, fontGenerateWoff2, fontClean);
exports.clean = clean;
exports.iconFontGen = iconFontGen;
