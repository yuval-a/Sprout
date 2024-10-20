const path = require('path');
const TerserPlugin = require('terser-webpack-plugin'); // Import TerserPlugin

module.exports = {
  mode: 'production',  // Switch to production mode to enable minification
  entry: './src/core/index.js',
  output: {
    filename: 'sprout-core.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            sourceMaps: true
          },
        },
        type: 'javascript/auto',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.mjs'],
  },
  externals: [
    function ({ request }, callback) {
      if (request && request.endsWith('.mjs')) {
        return callback(null, `root ${request}`);
      }
      callback();
    }
  ],
  devtool: 'source-map',  // Use 'source-map' for detailed source maps
  optimization: {
    minimize: true,  // Enable minification
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // Remove comments
          },
          compress: {
            drop_console: false, // Optionally drop console logs in production
          },
        },
        extractComments: false,  // Don't generate a separate comments file
      }),
    ],
  },
};