# Typesettable
`Typesettable` is an abstract class, representing something that can be typeset.

## Properties
### `width`: number, `height`: number
*Default: `0`*

The `width` and `height` properties should be set by the `typeset()` method, and report the node size.

### `context`: [`Context`](context.md)

The Typesettable node's typesetting context, which defines things like the base font size or line height.

## Methods
### `typeset()`

When this method is called, the Typesettable node should perform any layout tasks and end up with a `width` and `height`.

