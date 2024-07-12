const path = require('path');
const { globSync } = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PAGES_DIR = path.join(__dirname, '../src/views/pages');

const PAGES = globSync(PAGES_DIR + '/**/*.pug').map((item) =>
  path.relative(PAGES_DIR, item)
);

console.log(PAGES);

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: path.join(__dirname, '../src/assets/'),
  js: path.join(__dirname, '../src/js'),
  exclude: [
    path.join(__dirname, '../node_modules'),
    path.join(__dirname, '../_files'),
    path.join(__dirname, '../config'),
    path.join(__dirname, '../gulpfile.js'),
  ],
  pagesDir: path.join(__dirname, '../src/views/pages'),
  pages: PAGES,
  views: path.join(__dirname, '../src/views'),
};

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
  resolve: {
    alias: {
      Assets: PATHS.assets,
    },
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
  module: {
    rules: [
      /**
       * Pug
       */
      {
        test: /\.pug$/,
        loader: '@webdiscus/pug-loader',
        options: {
          self: true,
          basedir: PATHS.views,
        },
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
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset',
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
            ignore: [`${PATHS.assets}img/svg-font`, '**/.gitkeep'],
          },
        },
        {
          from: `${PATHS.src}/static`,
          to: `${PATHS.dist}`,
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['**/.gitkeep'],
          },
        },
      ],
    }),
  ],
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 1e7,
  },
};
