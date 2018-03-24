module.exports =
class Font
  constructor: ->
    @style = 'normal'
    @variant = 'normal'
    @weight = 400
    @stretch = 'normal'
    @size = 16
    @family = 'serif'

  toString: ->
    "#{@style} #{@variant} #{@weight} #{@stretch} #{@size}px #{@family}"
