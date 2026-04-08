const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const commonModule = {
  rules: [
    {
      test: /\.(js|mjs)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          sourceMaps: true,
        },
      },
      type: 'javascript/auto',
    },
  ],
};

const commonResolve = {
  extensions: ['.js', '.mjs'],
};

const commonExternals = [
  function ({ request }, callback) {
    if (request && request.endsWith('.mjs')) {
      return callback(null, `root ${request}`);
    }
    callback();
  },
];

const commonOptimization = {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  },
};

// Non-strict, readable (keeps console.* and dev checks)
const nonStrictReadable = {
  mode: 'development',
  entry: './src/core/index.js',
  output: {
    filename: 'sprout-core.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      STRICT: 'false',
    }),
  ],
  module: commonModule,
  resolve: commonResolve,
  externals: commonExternals,
  devtool: 'source-map',
  optimization: {
    ...commonOptimization,
    usedExports: true,
    concatenateModules: true,
    minimize: false,
  },
};

// Non-strict, minified (keeps console.*, minifies code)
const nonStrictMin = {
  mode: 'production',
  entry: './src/core/index.js',
  output: {
    filename: 'sprout-core.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      STRICT: 'false',
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  module: commonModule,
  resolve: commonResolve,
  externals: commonExternals,
  devtool: 'source-map',
  optimization: {
    ...commonOptimization,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: { comments: false },
          compress: {
            // keep console in non-strict bundles
            drop_console: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};

module.exports = [nonStrictReadable, nonStrictMin];

