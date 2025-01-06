const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/core/index.js',
  output: {
    filename: 'sprout-core.js',
    path: path.resolve(__dirname, 'demos/todo-list-singles-build/lib'),  // Output to the demo directory
    sourceMapFilename: '[file].map'
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
            sourceMaps: true,
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
  devServer: {
    static: {
      directory: path.join(__dirname, 'demos/todo-list-singles-build'),  // Serve the demo directory
    },
    compress: true,
    port: 8000,
    hot: true,
    watchFiles: ['src/**/*.js', 'src/**/*.mjs'],  // Watch the src directory for changes
  },
  devtool: 'source-map',  // Use 'source-map' for detailed source maps,
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
    }),
  ],

};