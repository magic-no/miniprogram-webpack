const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const { ESBuildPlugin } = require('esbuild-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { getEntries } = require('./scripts/utils')

const srcDir = path.resolve(__dirname, 'src')
const distDir = path.resolve(__dirname, 'dist')

module.exports = {
  entry: getEntries(srcDir),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    globalObject: 'wx',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'esbuild-loader',
          options: {
            loader: 'ts',
            target: 'es2015',
          },
        },
      },
      {
        test: /\.(wxss|less)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      raw: true,
      include: 'app.js',
      banner: 'require("./runtime");\nrequire("./commons");\nrequire("./vendors");',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].wxss',
    }),
    new ESBuildPlugin(),
    // const vendors = require("./vendors");\n
    new CopyPlugin({
      patterns: [
        {
          from: '**/*.wxml',
          toType: 'dir',
          context: srcDir,
        },
        // {
        //   from: '**/*.less',
        //   toType: 'dir',
        //   context: srcDir,
        //   transform: {
        //     transformer(content, path) {
        //       return postcss([autoprefixer]).process(content.toString(), { syntax: less })
        //     },
        //   },
        // },
        {
          from: '**/*.json',
          toType: 'dir',
          context: srcDir,
        },
      ],
    }),
  ],
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
}
