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
    @height = Math.max (node.height for node in @content)...
    @height *= @context.lineHeight

  append: (child) ->
    @content.push child if not (child in @content)
    @update()
