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
