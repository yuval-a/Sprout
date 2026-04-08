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

// Strict, readable (drops console.*, prunes if (!STRICT) blocks, but keeps code formatted)
const strictReadable = {
  mode: 'production',
  entry: './src/core/index.js',
  output: {
    filename: 'sprout-core.strict.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      STRICT: 'true',
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
          format: { beautify: true, comments: false },
          mangle: false,
          keep_fnames: true,
          keep_classnames: true,
          compress: {
            drop_console: true,
            passes: 2,
          },
        },
        extractComments: false,
      }),
    ],
  },
};

// Strict, minified (fully minified with dropped console.*)
const strictMin = {
  mode: 'production',
  entry: './src/core/index.js',
  output: {
    filename: 'sprout-core.strict.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      STRICT: 'true',
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
            drop_console: true,
          },
        },
        extractComments: false,
      }),
    ],
  },
};

module.exports = [strictReadable, strictMin];

