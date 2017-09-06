# Dashset
Javascript typesetter.

## Example
```javascript
const dashset = window.dashset // (or require('path/to/dashset'))

let context = new dashset.Context({
  width: 50,                // page width in pixels
  fontFamily: 'sans-serif', // CSS font family
  fontSize: 13              // font size in pixels
})

// create a paragraph
let paragraph = new dashset.ParagraphNode(context)

// add text nodes, each containing atomic strings of text
paragraph.append(new dashset.TextNode(context, { content: 'This' }))
// exceptStart: this will be hidden if it's at the beginning of a line
paragraph.append(new dashset.TextNode(context, { content: ' ', exceptStart: true }))
paragraph.append(new dashset.TextNode(context, { content: 'is' }))
paragraph.append(new dashset.TextNode(context, { content: ' ', exceptStart: true }))
// a hyphen can be appended to this syllable:
paragraph.append(new dashset.TextNode(context, { content: 'hy', hyphen: true }))
paragraph.append(new dashset.TextNode(context, { content: 'phen', hyphen: true }))
paragraph.append(new dashset.TextNode(context, { content: 'a', hyphen: true }))
paragraph.append(new dashset.TextNode(context, { content: 'ted' }))
paragraph.append(new dashset.TextNode(context, { content: ' ', exceptStart: true }))
paragraph.append(new dashset.TextNode(context, { content: 'text.' }))

// typeset the paragraph.
// This part requires a document, able to create a CanvasRenderingContext2D.
// if there is no document, each character will be as wide as the font size.
paragraph.typeset()

// paragraph.lines now contains an array of `Line`s
const exampleParagraph = document.createElement('div')
for (const line of paragraph.lines) {
  const lineElement = document.createElement('div')
  for (const item of line.content) {
    if (item.type === 'spacer') {
      // spacers are whitespace with `width` and `height`
      const spacer = document.createElement('span')
      spacer.style.display = 'inline-block'
      spacer.style.width = `${item.width}px`
      spacer.style.height = `${item.height}px`
      lineElement.append(spacer)
    } else if (item.type === 'text') {
      // text is just a TextNode
      const text = document.createElement('text')
      // (there'd probably be code here applying the text styles)
      text.textContent = item.content
      if (item.hyphenEnabled) {
        // the hyphen is visible!
        text.textContent += '-'
      }
      lineElement.append(text)
    }
  }
  exampleParagraph.append(lineElement)
}

document.body.append(exampleParagraph)
```
