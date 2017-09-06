# Font
A `Font` represents a single font variant at a specific size.

### `new Font()`

This will create a new `Font`.

## Properties
### `style`: string
*Default: `normal`*

The font style; should be any valid CSS `font-style` value.

### `variant`: string
*Default: `normal`*

The font variant; should be any valid CSS `font-variant` value.

### `weight`: number
*Default: 400*

The font weight; should be any valid CSS `font-weight` value.

### `stretch`: string
*Default: `normal`*

The font stretch; should be any valid CSS `font-stretch` value.

### `size`: number
*Default: `16`*

The font size in pixels.

### `family`: string
*Default: `serif`*

The font family; should be any valid CSS `font-family` value.

## Methods
### `toString()`: string

This will combine the font's properties into a single string, to be used with the CSS `font` property (or as a canvas `font`, for that matter).

