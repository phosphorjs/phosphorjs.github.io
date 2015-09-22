phosphor-disposable
===================

[![Build Status](https://travis-ci.org/phosphorjs/phosphor-disposable.svg)](https://travis-ci.org/phosphorjs/phosphor-disposable?branch=master)
[![Coverage Status](https://coveralls.io/repos/phosphorjs/phosphor-disposable/badge.svg?branch=master&service=github)](https://coveralls.io/github/phosphorjs/phosphor-disposable?branch=master)

A module for expressing the disposable object pattern.

[API Docs](http://phosphorjs.github.io/phosphor-disposable/api/)


Package Install
---------------

**Prerequisites**
- [node](http://nodejs.org/)

```bash
npm install --save phosphor-disposable
```


Source Build
------------

**Prerequisites**
- [git](http://git-scm.com/)
- [node](http://nodejs.org/)

```bash
git clone https://github.com/phosphorjs/phosphor-disposable.git
cd phosphor-disposable
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
npm test
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

- Node 0.12.7+
- IE 11+
- Firefox 32+
- Chrome 38+


Bundle for the Browser
----------------------

Follow the package install instructions first.

```bash
npm install --save-dev browserify
browserify myapp.js -o mybundle.js
```


Usage Examples
--------------

**Note:** This module is fully compatible with Node/Babel/ES6/ES5. Simply
omit the type declarations when using a language other than TypeScript.

```typescript
import {
  DisposableDelegate, DisposableSet, IDisposable
} from 'phosphor-disposable';


// Convert a function into a disposable.
var delegate = new DisposableDelegate(() => {
  console.log('disposed');
});

delegate.dispose();  // logs: 'disposed'
delegate.dispose();  // no-op


// Create a collection of disposables.
var d1 = new DisposableDelegate(() => {
  console.log('one');
});

var d2 = new DisposableDelegate(() => {
  console.log('two');
});

var d3 = new DisposableDelegate(() => {
  console.log('three');
});

var set = new DisposableSet([d1, d2, d3]);

set.dispose();  // logs: 'one', 'two', 'three'
set.dispose();  // no-op


// Create a custom disposable.
class MyDisposable implements IDisposable {

  constructor(id: string) {
    this._id = id;
  }

  get isDisposed(): boolean {
    return this._id === null;
  }

  dispose(): void {
    if (this._id !== null) {
      console.log(this._id);
      this._id = null;
    }
  }

  private _id: string;
}

var foo = new MyDisposable('foo');
var bar = new MyDisposable('bar');
var baz = new MyDisposable('baz');

var set = new DisposableSet();
set.add(foo);
set.add(bar);
set.add(baz);

set.dispose();  // logs: 'foo', 'bar', 'baz'
set.dispose();  // no-op
```
