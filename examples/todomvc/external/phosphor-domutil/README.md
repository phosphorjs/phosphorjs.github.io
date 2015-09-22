phosphor-domutil
================

[![Build Status](https://travis-ci.org/phosphorjs/phosphor-domutil.svg)](https://travis-ci.org/phosphorjs/phosphor-domutil?branch=master)
[![Coverage Status](https://coveralls.io/repos/phosphorjs/phosphor-domutil/badge.svg?branch=master&service=github)](https://coveralls.io/github/phosphorjs/phosphor-domutil?branch=master)

Utilities for working with the DOM.

[API Docs](http://phosphorjs.github.io/phosphor-domutil/api/)


Package Install
---------------

**Prerequisites**
- [node](http://nodejs.org/)

```bash
npm install --save phosphor-domutil
```


Source Build
------------

**Prerequisites**
- [git](http://git-scm.com/)
- [node](http://nodejs.org/)

```bash
git clone https://github.com/phosphorjs/phosphor-domutil.git
cd phosphor-domutil
npm install
```

**Rebuild**
```bash
npm run clean
npm run build
```


Run Tests
---------

Follow the source build instructions first.

```bash
# run tests in Firefox
npm test

# run tests in Chrome
npm run test:chrome

# run tests in IE
npm run test:ie
```


Build Docs
----------

Follow the source build instructions first.

```bash
npm run docs
```

Navigate to `docs/index.html`.


Supported Runtimes
------------------

The runtime versions which are currently *known to work* are listed below.
Earlier versions may also work, but come with no guarantees.

- IE 11+
- Firefox 32+
- Chrome 38+


Bundle for the Browser
----------------------

Follow the package install instructions first.

```bash
npm install --save-dev browserify browserify-css
browserify myapp.js -o mybundle.js
```


Usage Examples
--------------

**Note:** This module is fully compatible with Node/Babel/ES6/ES5. Simply
omit the type declarations when using a language other than TypeScript.

**overrideCursor**

```typescript
import { overrideCursor } from 'phosphor-domutil';

// force the cursor to be 'wait' for the entire document
var override = overrideCursor('wait');

// clear the override by disposing the return value
override.dispose();
```

**hitTest**

```typescript
import { hitTest } from 'phosphor-domutil';

var div = document.createElement('div');
div.style.position = 'absolute';
div.style.left = '0px';
div.style.top = '0px';
div.style.width = '100px';
div.style.height = '100px';
document.body.appendChild(div);

hitTest(div, 50, 50);   // true
hitTest(div, 150, 150); // false
```

**boxSizing**

```typescript
import { boxSizing } from 'phosphor-domutil';

var div = document.createElement('div');
div.style.borderTop = 'solid 10px black';
document.body.appendChild(div);

var sizing = boxSizing(div);
sizing.borderTop;    // 10
sizing.paddingLeft;  // 0
// etc...
```

**sizeLimits**

```typescript
import { sizeLimits } from 'phosphor-domutil';

var div = document.createElement('div');
div.style.minWidth = '90px';
document.body.appendChild(div);

var limits = sizeLimits(div);
limits.minWidth;   // 90
limits.maxHeight;  // Infinity
// etc...
```
