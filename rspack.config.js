const { rspack } = require('@rspack/core');
const path = require('path');
module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.js',
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './src/index.html',
    }),
    new rspack.CopyRspackPlugin({
      patterns: [{ from: 'manifest.json' }],
    }),
  ],
};
