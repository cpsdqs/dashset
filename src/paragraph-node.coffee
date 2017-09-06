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
Line = require './line'
TextNode = require './text-node'
ImageNode = require './image-node'
Spacer = require './spacer'

module.exports =
class ParagraphNode extends Typesettable
  constructor: (context, properties) ->
    super()

    @context = context if context?
    @indent = properties?.indent ? false
    @double = properties?.double ? false
    @quote = properties?.quote ? false
    @separator = properties?.separator ? false
    @join = properties?.join ? false
    @joinNext = properties?.joinNext ? false
    @align = properties?.align ? 0
    @list = properties?.list ? 0
    @header = properties?.header ? 0
    @split = properties?.split ? false
    @content = []
    @lines = []

  copyFrom: (paragraphNode) ->
    for own value, key of paragraphNode
      @[key] = value

  append: (child) ->
    @content.push child if not (child in @content)

  typeset: ->
    line = new Line @context
    line.source = this
    lines = [line]

    width = @context.width

    if @quote and not @join
      width -= @context.quotePadding.left + @context.quotePadding.right
      line.append new Spacer 0, @context.quotePadding.top
      line = new Line @context
      line.source = this
      lines.push line

    if @double
      doubleHeight = @context.doubleHeight * @context.fontSize
      line.append new Spacer 0, doubleHeight
      line = new Line @context
      line.source = this
      lines.push line

    if @indent
      line.append new Spacer @context.indentWidth, @context.fontSize

    newLine = =>
      line = new Line @context
      line.source = this
      lines.push line

    previousNode = null
    for node in @content
      node.typeset()

      if node instanceof ImageNode
        if node.style is 1
          # block style
          if line.length isnt 0
            newLine()
          space = (@context.width - node.width) / 2
          line.append new Spacer space, node.height
          line.append node
          line.append new Spacer space, node.height
        else
          if line.width + node.width > @context.width
            newLine()
          line.append node
      else if node instanceof TextNode
        node.hyphenEnabled = no
        if node.content is '\n'
          newLine()
        else
          if line.width + node.width > @context.width
            if previousNode and previousNode.hyphen
              previousNode.hyphenEnabled = yes

              # typeset again with hyphen
              # while this will increase the line width, it's probably
              # negligible and can be compensated for by shrinking whitespace
              # in the worst case
              previousNode.typeset()
              line.update()

            newLine()
          if line.length isnt 0 or not node.exceptStart
            line.append node

      previousNode = node

    line.lastInParagraph = yes

    if @quote and not @joinNext
      line = new Line @context
      line.source = this
      lines.push line
      line.append new Spacer 0, @context.quotePadding.bottom

    @lines = lines
