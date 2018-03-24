/*! dashset 0.2.0 | MIT (https://spdx.org/licenses/MIT) */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var Typesettable;

module.exports = Typesettable = class Typesettable {
  constructor() {
    this.width = 0;
    this.height = 0;
    this.context = null;
  }

  typeset() {
    this.width = 0;
    return this.height = 0;
  }

};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var ctx, customMeasurer;

ctx = null;

if (typeof document !== 'undefined') {
  ctx = document.createElement('canvas').getContext('2d');
}

customMeasurer = null;

module.exports = function(text, font) {
  if (customMeasurer) {
    return customMeasurer(text, font);
  }
  if (!ctx) {
    return text.length;
  }
  ctx.font = font.toString();
  return ctx.measureText(text).width;
};

module.exports.setCustomMeasurer = function(fn) {
  return customMeasurer = fn;
};

module.exports.getCustomMeasurer = function() {
  return customMeasurer;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var Font;

module.exports = Font = class Font {
  constructor() {
    this.style = 'normal';
    this.variant = 'normal';
    this.weight = 400;
    this.stretch = 'normal';
    this.size = 16;
    this.family = 'serif';
  }

  toString() {
    return `${this.style} ${this.variant} ${this.weight} ${this.stretch} ${this.size}px ${this.family}`;
  }

};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var ImageNode, Typesettable,
  hasProp = {}.hasOwnProperty;

Typesettable = __webpack_require__(0);

module.exports = ImageNode = class ImageNode extends Typesettable {
  constructor(context, properties) {
    var ref, ref1, ref2, ref3;
    super();
    if (context != null) {
      this.context = context;
    }
    this.src = (ref = properties != null ? properties.src : void 0) != null ? ref : '';
    this.imageWidth = (ref1 = properties != null ? properties.width : void 0) != null ? ref1 : 0;
    this.imageHeight = (ref2 = properties != null ? properties.height : void 0) != null ? ref2 : 0;
    this.style = (ref3 = properties != null ? properties.style : void 0) != null ? ref3 : 0;
    this.type = 'image';
  }

  copyFrom(imageNode) {
    var key, results, value;
    results = [];
    for (value in imageNode) {
      if (!hasProp.call(imageNode, value)) continue;
      key = imageNode[value];
      results.push(this[key] = value);
    }
    return results;
  }

  typeset() {
    switch (this.style) {
      case 0:
      case 1:
        this.width = this.imageWidth;
        this.height = this.imageHeight;
        if (this.width > this.context.width) {
          this.height *= this.context.width / this.width;
          this.width = this.context.width;
        }
        if (this.height > this.context.height) {
          this.width *= this.context.height / this.height;
          return this.height = this.context.height;
        }
        break;
      case 2:
        this.height = this.context.fontSize;
        return this.width = this.imageWidth * (this.context.fontSize / this.imageHeight);
    }
  }

};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var Line,
  indexOf = [].indexOf;

module.exports = Line = class Line {
  constructor(context) {
    this.context = context;
    this.width = 0;
    this.height = 0;
    this.content = [];
    this.source = null;
    this.lastInParagraph = false;
    this.type = 'line';
    Object.defineProperty(this, 'length', {
      get: function() {
        return this.content.length;
      }
    });
  }

  update() {
    var node;
    this.width = ((function() {
      var i, len, ref, results;
      ref = this.content;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        results.push(node.width);
      }
      return results;
    }).call(this)).reduce((function(a, b) {
      return a + b;
    }), 0);
    this.height = Math.max(...((function() {
      var i, len, ref, results;
      ref = this.content;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        results.push(node.height);
      }
      return results;
    }).call(this)));
    return this.height *= this.context.lineHeight;
  }

  append(child) {
    if (!(indexOf.call(this.content, child) >= 0)) {
      this.content.push(child);
    }
    return this.update();
  }

};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Font, TextNode, Typesettable,
  hasProp = {}.hasOwnProperty;

Typesettable = __webpack_require__(0);

Font = __webpack_require__(2);

module.exports = TextNode = class TextNode extends Typesettable {
  constructor(context, properties) {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
    super();
    if (context != null) {
      this.context = context;
    }
    this.bold = (ref = properties != null ? properties.bold : void 0) != null ? ref : false;
    this.italic = (ref1 = properties != null ? properties.italic : void 0) != null ? ref1 : false;
    this.size = (ref2 = properties != null ? properties.size : void 0) != null ? ref2 : 1;
    this.code = (ref3 = properties != null ? properties.code : void 0) != null ? ref3 : false;
    this.smallcaps = (ref4 = properties != null ? properties.smallcaps : void 0) != null ? ref4 : false;
    this.sup = (ref5 = properties != null ? properties.sup : void 0) != null ? ref5 : [];
    this.content = (ref6 = properties != null ? properties.content : void 0) != null ? ref6 : '';
    this.data = {};
    // formatting metadata
    this.hyphen = (ref7 = properties != null ? properties.hyphen : void 0) != null ? ref7 : false;
    this.hyphenEnabled = (ref8 = properties != null ? properties.hyphenEnabled : void 0) != null ? ref8 : false;
    this.exceptStart = (ref9 = properties != null ? properties.exceptStart : void 0) != null ? ref9 : false;
    this.type = 'text';
  }

  copyFrom(textNode) {
    var key, results, value;
    results = [];
    for (value in textNode) {
      if (!hasProp.call(textNode, value)) continue;
      key = textNode[value];
      results.push(this[key] = prop);
    }
    return results;
  }

  getFont() {
    var font;
    font = new Font;
    if (this.bold) {
      font.weight = this.context.boldWeight;
    }
    if (this.italic) {
      font.style = 'italic';
    }
    if (!this.code) {
      font.size = this.size * this.context.fontSize;
      font.family = this.context.fontFamily;
    } else {
      font.size = this.size * this.context.codeFontSize;
      font.family = this.context.codeFontFamily;
    }
    if (this.smallcaps) {
      font.variant = 'small-caps';
    }
    return font;
  }

  typeset() {
    var content, font;
    content = this.content;
    if (this.hyphenEnabled) {
      content += '-';
    }
    font = this.getFont();
    this.width = this.context.measureText(content, font);
    return this.height = font.size;
  }

};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var Spacer;

module.exports = Spacer = class Spacer {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.type = 'spacer';
  }

};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  Context: __webpack_require__(8),
  Font: __webpack_require__(2),
  ImageNode: __webpack_require__(3),
  Line: __webpack_require__(4),
  measureText: __webpack_require__(1),
  ParagraphNode: __webpack_require__(9),
  Spacer: __webpack_require__(6),
  TextNode: __webpack_require__(5),
  Typesettable: __webpack_require__(0)
};

if (document && window) {
  window.dashset = module.exports;
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Context, measureText;

measureText = __webpack_require__(1);

module.exports = Context = class Context {
  constructor(options) {
    var ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
    if (!options) {
      options = {};
    }
    this.width = (ref = options.width) != null ? ref : 400;
    this.height = (ref1 = options.height) != null ? ref1 : 400;
    this.fontSize = (ref2 = options.fontSize) != null ? ref2 : 13;
    this.lineHeight = (ref3 = options.lineHeight) != null ? ref3 : 1.5;
    this.indentWidth = (ref4 = options.indentWidth) != null ? ref4 : 16;
    this.doubleHeight = (ref5 = options.doubleHeight) != null ? ref5 : 1;
    this.boldWeight = (ref6 = options.boldWeight) != null ? ref6 : 600;
    this.fontFamily = (ref7 = options.fontFamily) != null ? ref7 : 'Baskerville, serif';
    this.codeFontSize = (ref8 = options.codeFontSize) != null ? ref8 : 12;
    this.codeFontFamily = (ref9 = options.codeFontFamily) != null ? ref9 : 'Inconsolata, monospace';
    this.quotePadding = {
      top: (ref10 = (ref11 = options.quotePadding) != null ? ref11.top : void 0) != null ? ref10 : 10,
      left: (ref12 = (ref13 = options.quotePadding) != null ? ref13.left : void 0) != null ? ref12 : 10,
      right: (ref14 = (ref15 = options.quotePadding) != null ? ref15.right : void 0) != null ? ref14 : 10,
      bottom: (ref16 = (ref17 = options.quotePadding) != null ? ref17.bottom : void 0) != null ? ref16 : 10
    };
  }

  measureText(...args) {
    return measureText(...args);
  }

};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var ImageNode, Line, ParagraphNode, Spacer, TextNode, Typesettable,
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf;

Typesettable = __webpack_require__(0);

Line = __webpack_require__(4);

TextNode = __webpack_require__(5);

ImageNode = __webpack_require__(3);

Spacer = __webpack_require__(6);

module.exports = ParagraphNode = class ParagraphNode extends Typesettable {
  constructor(context, properties) {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
    super();
    if (context != null) {
      this.context = context;
    }
    this.indent = (ref = properties != null ? properties.indent : void 0) != null ? ref : false;
    this.double = (ref1 = properties != null ? properties.double : void 0) != null ? ref1 : false;
    this.quote = (ref2 = properties != null ? properties.quote : void 0) != null ? ref2 : false;
    this.separator = (ref3 = properties != null ? properties.separator : void 0) != null ? ref3 : false;
    this.join = (ref4 = properties != null ? properties.join : void 0) != null ? ref4 : false;
    this.joinNext = (ref5 = properties != null ? properties.joinNext : void 0) != null ? ref5 : false;
    this.align = (ref6 = properties != null ? properties.align : void 0) != null ? ref6 : 0;
    this.list = (ref7 = properties != null ? properties.list : void 0) != null ? ref7 : 0;
    this.header = (ref8 = properties != null ? properties.header : void 0) != null ? ref8 : 0;
    this.split = (ref9 = properties != null ? properties.split : void 0) != null ? ref9 : false;
    this.content = [];
    this.lines = [];
  }

  copyFrom(paragraphNode) {
    var key, results, value;
    results = [];
    for (value in paragraphNode) {
      if (!hasProp.call(paragraphNode, value)) continue;
      key = paragraphNode[value];
      results.push(this[key] = value);
    }
    return results;
  }

  append(child) {
    if (!(indexOf.call(this.content, child) >= 0)) {
      return this.content.push(child);
    }
  }

  typeset() {
    var doubleHeight, i, len, line, lines, newLine, node, previousNode, ref, space, width;
    line = new Line(this.context);
    line.source = this;
    lines = [line];
    width = this.context.width;
    if (this.quote && !this.join) {
      width -= this.context.quotePadding.left + this.context.quotePadding.right;
      line.append(new Spacer(0, this.context.quotePadding.top));
      line = new Line(this.context);
      line.source = this;
      lines.push(line);
    }
    if (this.double) {
      doubleHeight = this.context.doubleHeight * this.context.fontSize;
      line.append(new Spacer(0, doubleHeight));
      line = new Line(this.context);
      line.source = this;
      lines.push(line);
    }
    if (this.indent) {
      line.append(new Spacer(this.context.indentWidth, this.context.fontSize));
    }
    newLine = () => {
      line = new Line(this.context);
      line.source = this;
      return lines.push(line);
    };
    previousNode = null;
    ref = this.content;
    for (i = 0, len = ref.length; i < len; i++) {
      node = ref[i];
      if (node instanceof TextNode) {
        node.hyphenEnabled = false;
      }
      node.typeset();
      if (node instanceof ImageNode) {
        if (node.style === 1) {
          // block style
          if (line.length !== 0) {
            newLine();
          }
          space = (this.context.width - node.width) / 2;
          line.append(new Spacer(space, node.height));
          line.append(node);
          line.append(new Spacer(space, node.height));
        } else {
          if (line.width + node.width > this.context.width) {
            newLine();
          }
          line.append(node);
        }
      } else if (node instanceof TextNode) {
        if (node.content === '\n') {
          newLine();
        } else {
          if (line.width + node.width > this.context.width) {
            if (previousNode && previousNode.hyphen) {
              previousNode.hyphenEnabled = true;
              // typeset again with hyphen
              // while this will increase the line width, it's probably
              // negligible and can be compensated for by shrinking whitespace
              // in the worst case
              previousNode.typeset();
              line.update();
            }
            newLine();
          }
          if (line.length !== 0 || !node.exceptStart) {
            line.append(node);
          }
        }
      }
      previousNode = node;
    }
    line.lastInParagraph = true;
    if (this.quote && !this.joinNext) {
      line = new Line(this.context);
      line.source = this;
      lines.push(line);
      line.append(new Spacer(0, this.context.quotePadding.bottom));
    }
    return this.lines = lines;
  }

};


/***/ })
/******/ ]);
//# sourceMappingURL=dashset.js.map