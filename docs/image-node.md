# ImageNode
*extends [`Typesettable`](typesettable.md)*

An `ImageNode` represents an image (or, basically, anything with a fixed width and height).

There are three styles:
- `0`: inline-block: The image will be inserted into the text like a TextNode, and may look strange if the image height is much larger than the text size.
- `1`: block: The image will get its own line.
- `2`: emoji-esque: The image will be inserted into the text and be forced to be the same height as the text.

Note that the typesetter will not fetch the image; `imageWidth` and `imageHeight` must be set manually.

### `new ImageNode(``context`: [`Context`](context.md)?, `properties`: Object?`)`

This will create a new ImageNode with the specified context and properties. `properties` should just be an object with keys being the properties listed below.

## Properties
### `context`: [`Context`](context.md)
*Default: `null`*

The node's typesetting context.

### `src`: string

The image source URL. Note that typesetter will not fetch the image and the image size must be set manually.

### `imageWidth`: number, `imageHeight`: number
*Default: `0`, `0`*

The image size in pixels; used for typesetting. This shouldn't necessarily be the original image size but rather the desired image size.

### `style`: number
*Default: `0`*

The `style` must be one of the following:

- `0`: inline-block style: the ImageNode will be inserted into the text like a word would be
- `1`: block style: the ImageNode will get its own line
- `2`: emoji style: the ImageNode will be inserted like an emoji and forced to be the same height as the text (or rather, the context font size)

### `type`: string

The node type. For an image node, this should be `image`.

## Methods
### `copyFrom(``imageNode`: ImageNode`)`

This will copy all properties from another ImageNode to this one.

### `typeset()`

This will typeset this ImageNode.
