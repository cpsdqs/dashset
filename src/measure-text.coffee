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

ctx = null

if typeof document isnt 'undefined'
  ctx = document.createElement('canvas').getContext '2d'

module.exports = (text, font) ->
  return text.length if not ctx
  ctx.font = font.toString()
  return ctx.measureText(text).width