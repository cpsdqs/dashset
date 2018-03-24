Typesettable = require './typesettable'

module.exports =
class ImageNode extends Typesettable
  constructor: (context, properties) ->
    super()

    @context = context if context?
    @src = properties?.src ? ''
    @imageWidth = properties?.width ? 0
    @imageHeight = properties?.height ? 0
    @style = properties?.style ? 0

    @type = 'image'

  copyFrom: (imageNode) ->
    for own value, key of imageNode
      @[key] = value

  typeset: ->
    switch @style
      when 0, 1
        @width = @imageWidth
        @height = @imageHeight

        if @width > @context.width
          @height *= @context.width / @width
          @width = @context.width

        if @height > @context.height
          @width *= @context.height / @height
          @height = @context.height
      when 2
        @height = @context.fontSize
        @width = @imageWidth * (@context.fontSize / @imageHeight)

    @lineHeight = @context.fontSize
