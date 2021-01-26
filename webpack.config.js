const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const { getEntries } = require('./scripts/utils')
const srcDir = path.resolve(__dirname, 'src')

module.exports = {
  entry: getEntries(srcDir),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    globalObject: 'wx',
  },
  devtool: 'source-map',
  // vendors: {
  //   chunkschunks: 'initial',
  //   name: 'vendors',
  //   test: /[\\/]node_modules[\\/]/,
  //   minChunks: 3,
  //   priority: 20
  // },
  // commons: {
  //   chunks: 'initial',
  //   name: 'commons',
  //   test: /[\\/](utils|libs|services|apis|models|actions|layouts)[\\/]/,
  //   minChunks: 3,
  //   priority: 10
  // }
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: 1,
        },
        vendors: {
          chunks: 'all',
          name: 'vendors',
          // minChunks: 2,
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },

  plugins: [
    new webpack.BannerPlugin({
      raw: true,
      include: 'app.js',
      banner: 'require("./runtime");\nrequire("./commons");\nrequire("./vendors");',
    }),
    // const vendors = require("./vendors");\n
    new CopyPlugin({
      patterns: [
        {
          from: '**/*.wxml',
          toType: 'dir',
          context: srcDir,
        },
        {
          from: '**/*.wxss',
          toType: 'dir',
          context: srcDir,
        },
        {
          from: '**/*.json',
          toType: 'dir',
          context: srcDir,
        },
      ],
    }),
  ],
}
