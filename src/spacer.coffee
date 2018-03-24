module.exports =
class Spacer
  constructor: (width, height) ->
    @width = width
    @height = height
    @lineHeight = height

    @type = 'spacer'
