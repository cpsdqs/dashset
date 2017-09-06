const webpack = require('webpack')
const packageInfo = require('./package')
const MinifyPlugin = require("babel-minify-webpack-plugin")

module.exports = function (env) {
  const minify = env === 'minify'

  const plugins = []
  if (minify) plugins.push(new MinifyPlugin())
  plugins.push(new webpack.BannerPlugin({
    banner: `${packageInfo.name} ${packageInfo.version} | ${packageInfo.license} (https://spdx.org/licenses/${packageInfo.license})`
  }))

  return {
    entry: __dirname + '/src/index',
    output: {
      path: __dirname + '/dist',
      filename: minify ? 'dashset.min.js' : 'dashset.js'
    },
    module: {
      loaders: [
        {
          test: /\.coffee$/,
          loader: 'coffee-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.coffee', '.js']
    },
    devtool: 'source-map',
    plugins
  }
}
