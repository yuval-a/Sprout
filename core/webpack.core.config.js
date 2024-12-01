const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/core/index.js',
  output: {
    filename: 'sprout-core.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    }
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
};
