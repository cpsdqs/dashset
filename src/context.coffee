measureText = require './measure-text'

module.exports =
class Context
  constructor: (options) ->
    options = {} if not options

    @width = options.width ? 400
    @height = options.height ? 400
    @fontSize = options.fontSize ? 13
    @lineHeight = options.lineHeight ? 1.5
    @indentWidth = options.indentWidth ? 16
    @doubleHeight = options.doubleHeight ? 1
    @boldWeight = options.boldWeight ? 600
    @fontFamily = options.fontFamily ? 'Baskerville, serif'
    @codeFontSize = options.codeFontSize ? 12
    @codeFontFamily = options.codeFontFamily ? 'Inconsolata, monospace'
    @quotePadding =
      top: options.quotePadding?.top ? 10
      left: options.quotePadding?.left ? 10
      right: options.quotePadding?.right ? 10
      bottom: options.quotePadding?.bottom ? 10

  measureText: (args...) ->
    measureText(args...)
