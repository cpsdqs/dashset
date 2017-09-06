# Context

A context contains information about the text style, such as the font and the document width.

### `new Context(``options`: Object?`)`

This will create a new `Context` with the `options` specified. `options` should just contain the properties listed below.

## Properties
### `width`: number
*Default: `400`*

The document width in pixels.

### `fontSize`: number
*Default: `13`*

The base font size in pixels.

### `lineHeight`: number
*Default: `1.5`*

The line height in multiples of the font size.

### `indentWidth`: number
*Default: `16`*

The text indent width of an indented paragraph in pixels.

### `doubleHeight`: number
*Default: `1`*

The margin above a double-spaced paragraph in multiples of the font size.

### `boldWeight`: number
*Default: `600`*

The font weight used for bold text.

### `fontFamily`: string
*Default: `Baskerville, serif*

The font family.

### `codeFontSize`: number
*Default: `12`*

The base code font size in pixels.

### `codeFontFamily`: number
*Default: `Inconsolata, monospace`*

The code font family.

### `quotePadding`: Object

Object properties:

- `top`: number, default: `10`
- `left`: number, default: `10`
- `right`: number, default: `10`
- `bottom`: number, default: `10`

The blockquote padding.

## Methods
### `measureText(``text`: string, `font`: [`Font`](font.md)`)`
This will return the text width in pixels; measured using a canvas. If there is no DOM API, this will just return the text length.
