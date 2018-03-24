module.exports =
class Line
  constructor: (context) ->
    @context = context
    @width = 0
    @height = 0
    @content = []
    @source = null
    @lastInParagraph = no

    @type = 'line'

    Object.defineProperty this, 'length',
      get: -> @content.length

  update: ->
    @width = (node.width for node in @content).reduce ((a, b) -> a + b), 0
    @height = Math.max (node.height + node.lineHeight * (@context.lineHeight - 1) for node in @content)...

  append: (child) ->
    @content.push child if not (child in @content)
    @update()
