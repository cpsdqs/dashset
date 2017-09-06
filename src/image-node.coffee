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
      when 0 or 1
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
