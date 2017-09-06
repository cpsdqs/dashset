# Copyright (C) 2017 cpsdqs
#
# This file is part of Dashset.
#
# Dashset is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Dashset is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Dashset. If not, see <http://www.gnu.org/licenses/>.

Typesettable = require './typesettable'
Font = require './font'

module.exports =
class TextNode extends Typesettable
  constructor: (context, properties) ->
    super()

    @context = context if context?
    @bold = properties?.bold ? false
    @italic = properties?.italic ? false
    @underline = properties?.underline ? false
    @strike = properties?.strike ? false
    @size = properties?.size ? 1
    @color = properties?.color ? [0, 0, 0, 0xff]
    @href = properties?.href ? ''
    @code = properties?.code ? false
    @smallcaps = properties?.smallcaps ? false
    @spoiler = properties?.spoiler ? false
    @sup = properties?.sup ? []
    @content = properties?.content ? ''

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
