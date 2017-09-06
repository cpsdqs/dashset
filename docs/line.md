# Line
A `Line` is a vertically atomic slice of the typeset document. Documents can be split into multiple pages by simply filling up pages with lines until it hits the maximum height.

### `new Line(``context`: [`Context`](context.md)`)`

This will create a new line with the specified context. Note that, normally, only the `typeset()` methods should create lines.

##  Properties
### `context`: [`Context`](context.md)

The line's typesetting context.

### `width`: number, `height`: number

The line's width and height in pixels.

### `content`: Array

The line's content. This will contain things like [`TextNode`](text-node.md)s or [`Spacer`](spacer.md)s.

### `source`: Typesettable

The line's creator. This is usually a `ParagraphNode`.

### `lastInParagraph`: boolean

When true, this means that this line is the last in the current paragraph and thus, when the text is justified, that it shouldn't actually justify lest the last line be stretched across the whole context width.

## Methods
### `update()`

This will update the `width` and `height` by adding the contained nodes' widths and finding the node with the greatest height and multiplying that by the line height.

### `append(``child`: any`)`

This will add the `child` to the `content` and update the `width` and `height` accordingly.
