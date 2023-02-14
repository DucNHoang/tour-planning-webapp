const _ = require('lodash')
const path = require('path')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const baseConfig = require('./webpack.base.config')

const outputPath = path.resolve(__dirname, 'dist')

const devConfig = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: outputPath,
    publicPath: outputPath,
    pathinfo: false,
  },
  cache: {
    type: 'filesystem',
    // https://webpack.js.org/configuration/cache/#cachebuilddependencies
    buildDependencies: {
      config: [__filename],
    },
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
}

const imageModuleRule = {
  test: /\.(png|jpg|gif|svg)$/,
  loader: 'file-loader',
  options: {
    // Locally the hash name needs to be an extension
    // As the filenames on the mounted volumes are not hashed
    // Slash at the beginning because otherwise route is
    // /root/dist${filename} -> need /root/dist/${filename}
    name: '/[name].[ext]?[hash]',
    // Enable commonJS syntax, see https://stackoverflow.com/a/59075858
    esModule: false,
  },
}

const tsLoaderRule = {
  test: /\.tsx?$/,
  loader: 'ts-loader',
  options: {
    transpileOnly: true,
    experimentalWatchApi: true,
    appendTsSuffixTo: [/\.vue$/],
    configFile: 'tsconfig.webpack.json',
  },
}

const config = _.merge({}, devConfig, baseConfig)
config.module.rules.push(tsLoaderRule)
config.module.rules.push(imageModuleRule)

// Type checking is done in a different thread to speed up compilation
// https://github.com/Realytics/fork-ts-checker-webpack-plugin
config.plugins.push(new ForkTsCheckerWebpackPlugin())
config.plugins.push(new HtmlWebpackHarddiskPlugin({ outputPath }))

module.exports = config
