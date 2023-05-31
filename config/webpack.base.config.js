const path = require('path');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: path.join(__dirname, '../src/assets/'),
  js: path.join(__dirname, '../src/_app/js'),
  exclude: [
    path.join(__dirname, '../node_modules'),
    path.join(__dirname, '../_files'),
    path.join(__dirname, '../config'),
    path.join(__dirname, '../gulpfile.js'),
  ],
};

const PAGES_DIR = `${PATHS.src}/views/`;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith('.pug'));

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    app: `${PATHS.js}/app.js`,
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: `${PATHS.dist}`,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': PATHS.js,
    },
  },
  module: {
    rules: [
      /**
       * Pug
       */
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      /*
       * Javascript
       * */
      {
        exclude: PATHS.exclude,
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
        ],
      },

      /*
       * Styles
       * */
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
              importLoaders: 3,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      /**
       * Assets
       */
      {
        /* Fonts */
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        /* Images/Icons */
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        /* Video */
        test: /\.(mp4|webm)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        /* Json */
        test: /\.json$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].[chunkhash].css`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.assets}`,
          to: `${PATHS.dist}/assets`,
          noErrorOnMissing: true,
          globOptions: {
            ignore: [`${PATHS.assets}img/svg-font`],
          },
        },
        {
          from: `${PATHS.src}/static`,
          to: `${PATHS.dist}`,
          noErrorOnMissing: true,
        },
      ],
    }),
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `${page.replace(/\.pug/, '.html')}`,
        })
    ),
  ],
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 1e7,
  },
};
