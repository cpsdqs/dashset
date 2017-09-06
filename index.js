{
  const { Context, ParagraphNode, TextNode } = dashset

  let context = new Context({
    width: 250,
    fontFamily: 'Baskerville, Palatino, CMU Serif, serif',
    fontSize: 15
  })

  let paragraphs = []
  {
    let par = new ParagraphNode(context, { align: 2 })
    par.append(new TextNode(context, {
      bold: true,
      size: 2,
      content: 'cat'
    }))
    paragraphs.push(par)
  }
  {
    let par = new ParagraphNode(context, { indent: true })
    par.append(new TextNode(context, { content: 'noun' }))
    paragraphs.push(par)
  }
  {
    let par = new ParagraphNode(context, { double: true })
    let text = 'A small do|mes|ti|ca|ted car|ni|vo|rous mam|mal with soft ' +
      'fur, a short snout, and re|trac|ta|ble claws. It is wide|ly kept as ' +
      'a pet or for cat|ching mice, and ma|ny breeds have been de|ve|loped.'

    let words = []
    let match
    while ((match = text.match(/\s+/))) {
      words.push(text.substr(0, match.index))
      words.push(text.substr(match.index, match[0].length))
      text = text.substr(match.index + match[0].length)
    }
    if (text) words.push(text)
    for (let word of words) {
      let parts = word.split('|')
      for (let i in parts) {
        let part = parts[i]
        par.append(new TextNode(context, {
          content: part,
          hyphen: i < parts.length - 1
        }))
      }
    }
    paragraphs.push(par)
  }
  {
    let par = new ParagraphNode(context, { align: 3, double: true })
    par.append(new TextNode(context, { italic: true, size: 0.7, content: 'From' }))
    par.append(new TextNode(context, { italic: true, size: 0.7, content: ' ' }))
    par.append(new TextNode(context, { italic: true, size: 0.7, content: 'the' }))
    par.append(new TextNode(context, { italic: true, size: 0.7, content: ' ' }))
    par.append(new TextNode(context, {
      content: 'OED',
      size: 0.7,
      italic: true,
      href: 'http://oed.com'
    }))
    paragraphs.push(par)
  }

  const nodeFigure = document.querySelector('#node-figure')
  let nodeFromObject = function (obj) {
    let node = document.createElement('div')
    node.classList.add('figure-node')
    node.innerHTML = `<div class="node-name"></div>
    <ul class="node-properties"></ul>`
    node.querySelector('.node-name').textContent = obj.name
    let properties = node.querySelector('.node-properties')

    for (let key in obj.properties) {

      let li = document.createElement('li')
      let name = document.createElement('span')
      name.classList.add('name')
      let value = document.createElement('span')
      value.classList.add('value')
      li.appendChild(name)
      li.appendChild(new Text(': '))
      li.appendChild(value)
      name.textContent = key
      value.textContent = obj.properties[key]
      properties.appendChild(li)
    }

    return node
  }
  let nodeFromParagraph = function (par) {
    let properties = {}
    let defaultTemplate = new ParagraphNode()
    for (let key in defaultTemplate) {
      if (['context', 'content', 'lines'].includes(key)) continue
      if (defaultTemplate.hasOwnProperty(key)) {
        if (par[key] !== defaultTemplate[key]) {
          properties[key] = par[key]
        }
      }
    }

    let paragraph = nodeFromObject({
      name: 'ParagraphNode',
      properties
    })
    paragraph.classList.add('paragraph-node')

    for (let item of par.content) {
      let name = item.type === 'text' ? 'TextNode' : 'Typesettable'

      let properties = {}
      let defaultTemplate = new TextNode()
      for (let key in defaultTemplate) {
        if (['context', 'content', 'color', 'sup'].includes(key)) continue
        if (defaultTemplate.hasOwnProperty(key)) {
          if (item[key] !== defaultTemplate[key]) properties[key] = item[key]
        }
      }

      let node = nodeFromObject({ name, properties })
      node.classList.add('text-node')
      let textContent = document.createElement('div')
      textContent.classList.add('text-content')
      node.appendChild(textContent)
      textContent.textContent = item.content
      paragraph.appendChild(node)
    }

    return paragraph
  }

  for (let par of paragraphs) nodeFigure.appendChild(nodeFromParagraph(par))

  let resultContainer = document.querySelector('#result-figure-container')
  resultContainer.style.fontFamily = context.fontFamily
  let resultTime = document.querySelector('#result-typeset-time')

  let updateResultContainer = function () {
    resultContainer.innerHTML = ''

    let startTime = Date.now()
    let lines = []
    for (let par of paragraphs) {
      par.typeset()
      lines.push(...par.lines)
    }
    let endTime = Date.now()
    resultTime.textContent = `${endTime - startTime}ms`

    for (let line of lines) {
      let node = document.createElement('div')
      node.classList.add('line')
      node.style.lineHeight = node.style.height = `${line.height}px`
      if (line.source.align === 2) {
        node.style.textAlign = node.style.textAlignLast = 'center'
      } else if (line.source.align === 0 && line.width > context.width * 0.8) {
        node.style.textAlign = node.style.textAlignLast = 'justify'
      } else if (line.source.align === 3) {
        node.style.textAlign = node.style.textAlignLast = 'right'
      }
      resultContainer.appendChild(node)

      for (let item of line.content) {
        if (item.type === 'spacer') {
          let span = document.createElement('span')
          span.classList.add('spacer')
          span.style.width = `${item.width}px`
          span.style.height = `${item.height}px`
          node.appendChild(span)
        } else if (item.type === 'text') {
          let span = document.createElement('span')
          span.classList.add('text')
          if (item.hyphenEnabled) span.classList.add('hyphen')
          span.textContent = item.content
          span.style.fontSize = `${item.size}em`
          span.style.fontWeight = item.bold
            ? item.context.boldWeight
            : item.context.fontWeight
          span.style.fontStyle = item.italic ? 'italic' : ''

          if (item.href) {
            let anchor = document.createElement('a')
            anchor.href = item.href
            anchor.append(span)
            span = anchor
          }
          node.appendChild(span)
        }
      }
    }
  }
  updateResultContainer()

  let resultWidthInput = document.querySelector('#result-width-input')
  let updateResultWidth = function () {
    context.width = +resultWidthInput.value
    resultContainer.style.width = `${context.width}px`
    updateResultContainer()
  }
  resultWidthInput.addEventListener('input', updateResultWidth)
}
