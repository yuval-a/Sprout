const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/build/index.js',
  output: {
    filename: 'sprout-build.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
  externals: (context, request, callback) => {
    if (request.endsWith('.mjs')) {
      return callback(null, `root ${request}`);
    }
    callback();
  },
  devtool: 'source-map',  // Use 'source-map' for detailed source maps

};
