Typesettable = require './typesettable'
Font = require './font'

module.exports =
class TextNode extends Typesettable
  constructor: (context, properties) ->
    super()

    @context = context if context?
    @bold = properties?.bold ? false
    @italic = properties?.italic ? false
    @size = properties?.size ? 1
    @code = properties?.code ? false
    @smallcaps = properties?.smallcaps ? false
    @sup = properties?.sup ? []
    @content = properties?.content ? ''
    @data = {}

    # formatting metadata
    @hyphen = properties?.hyphen ? no
    @hyphenEnabled = properties?.hyphenEnabled ? no
    @exceptStart = properties?.exceptStart ? no

    @type = 'text'

  copyFrom: (textNode) ->
    for own value, key of textNode
      @[key] = prop

  getFont: ->
    font = new Font
    font.weight = @context.boldWeight if @bold
    font.style = 'italic' if @italic
    if not @code
      font.size = @size * @context.fontSize
      font.family = @context.fontFamily
    else
      font.size = @size * @context.codeFontSize
      font.family = @context.codeFontFamily
    font.variant = 'small-caps' if @smallcaps

    font

  typeset: ->
    content = @content
    content += '-' if @hyphenEnabled

    font = @getFont()
    @width = @context.measureText content, font
    @height = font.size
