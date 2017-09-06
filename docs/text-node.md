# TextNode
*extends [`Typesettable`](typesettable.md)*

A `TextNode` contains a single chunk of indivisible text.

### `new TextNode(``context`: [`Context`](context.md)?, `properties`: Object? `)`

Creates a new `TextNode` with a typesetting context and the specified properties. `properties` should just contain the properties listed below.

## Properties
### `context`: [`Context`](context.md)
*Default: `null`*

The node's typesetting context.

### `bold`: boolean, `italic`: boolean, `underline`: boolean, `strike`: boolean, `code`: boolean, `smallcaps`: boolean, `spoiler`: boolean
*Default: `false`*

When true, the text node will be bold, italic, underlined, struck through, set in the code font, set in small caps, or spoilered (this doesn't actually have any effect on typesetting).

### `sup`: number[]
*Default: `[]`*

Currently not implemented.

This defines the sequence of super/subscript containers using `1` for superscript or `-1` for subscript. For example, `[1, 1, -1, 1]` will yield something akin to `<sup><sup><sub><sup> text </sup></sub></sup></sup>`.

### `color`: number[4]
*Default: `[0, 0, 0, 255]`*

This has no effect on typesetting. The color should be an array of four integers, representing RGBA, from 0 to 255.

### `href`: string
*Default: `''`*

When this is not empty, the text node will act as a link. This has no effect on typesetting.

### `size`: number
*Default: `1`*

The text size in multiples of the base font size.

### `content`: string
*Default: `''`*

The text content.

### `align`: number
*Default: `0`*

### `hyphen`: number
*Default: `false`*

When true, this text node is marked to be a syllable that will have hyphen appended if it's the last item in a line.

### `hyphenEnabled`: number
*Default: `false`*

When true, a hyphen should be appended. This property is set by the typesetter.

### `exceptStart`: boolean
*Default: `false`*

When true, this text node will be hidden if it's at the beginning of a line. Whitespace should have this set to true.

### `type`: string

The node type. For a text node, this is `text`.

## Methods
### `copyFrom(``textNode`: TextNode`)`

This will copy all properties from another TextNode to this one.

### `getFont()`: [`Font`](font.md)

This will return a `Font` as specified by the properties of this text node.

### `typeset()`

This will typeset this TextNode, updating width and height. This will take a `-` hyphen into account if the hyphen is visible.
