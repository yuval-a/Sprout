const path = require('path');

// Webpack configuration function that accepts env variables
module.exports = (env) => {
  // Use the provided output path or fallback to a default one
  const outputPath = env.outputPath;

  return {
    mode: 'development',
    entry: './src/core/index.js',
    output: {
      filename: 'sprout-core.js',
      path: path.resolve(__dirname, outputPath),  // Output to the dynamic directory
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
        directory: path.join(__dirname, outputPath),  // Serve the dynamic output directory
      },
      compress: true,
      port: 8000,
      hot: true,
      watchFiles: ['src/**/*.js', 'src/**/*.mjs'],  // Watch the src directory for changes
    },
    devtool: 'source-map',  // Use 'source-map' for detailed source maps
  };
};