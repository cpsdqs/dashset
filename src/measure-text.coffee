ctx = null

if typeof document isnt 'undefined'
  ctx = document.createElement('canvas').getContext '2d'

customMeasurer = null

module.exports = (text, font) ->
  return customMeasurer(text, font) if customMeasurer
  return text.length if not ctx
  ctx.font = font.toString()
  return ctx.measureText(text).width

module.exports.setCustomMeasurer = (fn) ->
  customMeasurer = fn

module.exports.getCustomMeasurer = () -> customMeasurer
