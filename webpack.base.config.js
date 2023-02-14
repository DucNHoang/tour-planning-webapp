const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin')

const path = require('path')
const pjson = require('./package.json')

const webpackTsconfigPath = path.resolve(__dirname, 'tsconfig.webpack.json')

module.exports = {
  entry: {
    main: './public/app.ts',
  },
  plugins: [
    // Workaround for Buffer being undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new VueLoaderPlugin(),
    // Enables us to use a custom base html file
    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: pjson.name,
      template: './public/base.html',
      filename: 'index.html',
      favicon: './public/assets/favicon.png',
      alwaysWriteToDisk: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // https://github.com/Microsoft/TypeScript-Vue-Starter
            // sass-loader has to be loaded this way as described in the above
            scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
            sass: ['vue-style-loader', 'css-loader', 'sass-loader', 'indentedSyntax'],
          },
        },
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsWebpackPlugin({ configFile: webpackTsconfigPath })],
    extensions: ['.ts', '.js', '.vue', '.json'],
    // Need to use the full build for webpack
    // https://github.com/vuejs/vue-router/issues/713
    // https://stackoverflow.com/questions/49334815/vue-replaces-html-with-comment-when-compiling-with-webpack
    // Cannot use the runtime version -> that's ok
    alias: { vue$: 'vue/dist/vue.esm.js' },
  },
}
