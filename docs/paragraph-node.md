# ParagraphNode
*extends [`Typesettable`](typesettable.md)*

A `ParagraphNode` is a single paragraph containing text and images that will be typeset into lines.

### `new ParagraphNode(``context`: [`Context`](context.md)?, `properties`: Object? `)`

Creates a new `ParagraphNode` with a typesetting context and the specified properties. `properties` should just contain the properties listed below.

## Properties
### `context`: [`Context`](context.md)
*Default: `null`*

The node's typesetting context.

### `indent`: boolean
*Default: `false`*

When true, the paragraph will be indented.

### `double`: boolean
*Default: `false`*

When true, the paragraph will have a top margin.

### `quote`: boolean
*Default: `false`*

When true, the paragraph will have padding around it.

### `separator`: boolean
*Default: `false`*

When true, the paragraph will be marked as a section separator (like `<hr>`). This means that the lines should not be distributed across multiple pages.

### `join`: boolean
*Default: `false`*

When `quote` is true, this determines whether or not this paragraph will be joined with the previous. Effectively, this means that when `join` is `false`, the quote top padding will be added in a line.

### `joinNext`: boolean
*Default: `false`*

This is basically the same as `join`, except this determines whether or not this paragraph will be joined with the next.

### `align`: number
*Default: `0`*

The text align.

- `0`: Justified
- `1`: Left
- `2`: Center
- `3`: Right

### `list`: number
*Default: `0`*

The list type. This is currently not implemented.

- `0`: Disabled
- `1`: Unordered list
- `2`: Ordered list

### `header`: number
*Default: `0`*

The header type. This is currently not implemented.

- `0`: Disabled
- `1`: H1
- `2`: H2
- ...
- `6`: H6

### `split`: boolean
*Default: `false`*

Currently not implemented.

When this is true, this paragraph will be treated as if it were the second part of a paragraph split across two pages, thus disabling double-spacing or indentation.

### `content`: Array

The paragraph content, containing things like TextNodes and ImageNodes.

### `lines`: [`Line`](line.md)[]

After calling `typeset()`, this will be populated with [`Line`](line.md)s.

## Methods
### `copyFrom(``paragraphNode`: ParagraphNode`)`

This will copy all properties from another ParagraphNode to this one.

### `append(``child`: any`)`

This will add a child to the `content`, unless it's a duplicate.

### `typeset()`

This will typeset this ParagraphNode, create Lines, and put them in `lines`.
