phosphor-properties
===================

[![Build Status](https://travis-ci.org/phosphorjs/phosphor-properties.svg)](https://travis-ci.org/phosphorjs/phosphor-properties?branch=master)
[![Coverage Status](https://coveralls.io/repos/phosphorjs/phosphor-properties/badge.svg?branch=master&service=github)](https://coveralls.io/github/phosphorjs/phosphor-properties?branch=master)

A module for attached property descriptors.

[API Docs](http://phosphorjs.github.io/phosphor-properties/api/)


Package Install
---------------

**Prerequisites**
- [node](http://nodejs.org/)

```bash
npm install --save phosphor-properties
```


Source Build
------------

**Prerequisites**
- [git](http://git-scm.com/)
- [node](http://nodejs.org/)

```bash
git clone https://github.com/phosphorjs/phosphor-properties.git
cd phosphor-properties
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

**Raw API:**

Consumers of a class will not typically interact with properties directly.
The following examples demonstrate the Property API which will be used by
class authors to define the behavior of a class's properties. Most classes
will encapsulate property access for the user by exposing the properties
as getters/setters or static methods. See the subsequent sections for
recommended design patterns.

```typescript
import { Property } from 'phosphor-properties';


// Any object can be used as a model.
class Model {
  constructor(public name: string) { }
}

var model1 = new Model('foo');
var model2 = new Model('bar');


// simple number property
var valueProperty = new Property<Model, number>({
  value: 42,
});
valueProperty.get(model1);      // 42
valueProperty.set(model1, 84);  //
valueProperty.get(model1);      // 84
valueProperty.get(model2);      // 42


// default value factory
var listProperty = new Property<Model, number[]>({
  create: model => [1, 2, 3],
});
var l1 = listProperty.get(model1);  // [1, 2, 3]
var l2 = listProperty.get(model2);  // [1, 2, 3]
l1 === l2;                          // false


// coerce value callback
var minValue = 0;
var limitProperty = new Property<Model, number>({
  value: 0,
  coerce: (model, value) => Math.max(minValue, value),
});
limitProperty.set(model1, -10);  //
limitProperty.get(model1);       // 0
limitProperty.set(model1, 42);   //
limitProperty.get(model1);       // 42
minValue = 100;                  //
limitProperty.coerce(model1);    //
limitProperty.get(model1);       // 100


// value changed callback
var loggingProperty = new Property<Model, number>({
  value: 0,
  changed: (model, oldValue, newValue) => {
    console.log('changed:', model.name, oldValue, newValue);
  },
});
loggingProperty.set(model1, 10);  // changed: 'foo' 0 10
loggingProperty.set(model1, 42);  // changed: 'foo' 10 42


// compare values callback (assume a `deepEqual` function exists)
var objectProperty = new Property<Model, any>({
  compare: (oldValue, newValue) => deepEqual(oldValue, newValue),
  changed: (model, oldValue, newValue) => {
    console.log('changed:', oldValue, newValue);
  },
});
loggingProperty.set(model1, { a: 1, b: 2 });  // changed: undefined { a: 1, b: 2 }
loggingProperty.set(model1, { a: 1, b: 2 });  //
loggingProperty.set(model1, [1, 2, 3]);       // changed: { a: 1, b: 2 } [1, 2, 3]
loggingProperty.set(model1, [1, 2, 3]);       //
loggingProperty.set(model1, void 0);          // changed: [1, 2, 3] undefined


// value changed signal
Property.getChanged(model2).connect((sender, args) => {
  if (args.property === valueProperty) {
    console.log('value changed:', sender.name, args.oldValue, args.newValue);
  }
});
valueProperty.set(model2, 0);  // value changed: 'bar' 42 0
```

**Recommended Design Patterns:**

Class authors should strive to maintain consistency in how their classes
expose properties to consumers. The PhosphorJS project has adopted a set
of conventions which cover property naming, behavior, and exposure. It is
recommended for third party libraries to adopt these same conventions in
order to ensure API consistency and maximal compatibility with libraries
and meta tools which rely on these conventions.

When defining a property for use by instances of the **same** class:

  - Define the property as a static member of the class.

  - Ensure the class type is used as the property owner type.

  - Append the suffix `'Property'` to the static member name.

  - Define a public getter/setter which delegates access to the
    static property. The getter/setter should contain no logic
    outside of delegation to the static property.

  - The name of the getter/setter should be the same as the name
    of the static property minus the `'Property'` suffix.

  - Consumers should normally use the getter/setter to access the
    property, but meta tools and code generators are free to use
    the property API directly. This is why the getter/setter must
    be a pure delegate as described above.

```typescript
class MyObject {

  static valueProperty = new Property<MyObject, number>({
    value: 42,
    changed: (owner, old, value) => owner._onValueChanged(old, value),
  });

  get value(): number {
    return MyObject.valueProperty.get(this);
  }

  set value(value: number) {
    MyObject.valueProperty.set(this, value);
  }

  private _onValueChanged(oldValue: number, newValue: number): void {
    // Handle the value change.
  }
}


var obj = new MyObject();
obj.value;       // 42
obj.value = 17;  //
obj.value;       // 17
```

When defining a property for use by instances of a **different** class:

  - Define the property as a static member of the class.

  - Ensure the instance type is used as the property owner type.

  - Append the suffix `'Property'` to the static member name.

  - Define static methods to get and set the value of the property
    for a particular instance of the owner type. These two methods
    should contain no logic outside of delegation to the static
    property.

  - Name the static methods by prepending `'get'` and `'set'` to
    the capitalized property name. Omit the `'Property'` suffix.

  - Consumers should normally use the static methods to access the
    property, but meta tools and code generators are free to use
    the property API directly. This is why the methods must be
    pure delegates as described above.

This pattern is commonly referred to as an *attached property*. The
behavior and semantics of the property are defined by one class, but
the property value belongs to a foreign instance. This pattern is useful
when creating container objects which must associate container data with
child objects in a way which doesn't require polluting the child class
with extraneous data members.

```typescript
import { IChangedArgs } from 'phosphor-properties';


class MyWidget {
  // ...
}


class MyContainer {

  static stretchProperty = new Property<MyWidget, number>({
    value: 0,
    coerce: (owner, value) => Math.max(0, value),
  });

  static getStretch(widget: MyWidget): number {
    return MyContainer.stretchProperty.get(widget);
  }

  static setStretch(widget: MyWidget, value: number): void {
    MyContainer.stretchProperty.set(widget, value);
  }

  addWidget(widget: MyWidget): void {
    this._addWidget(widget, MyContainer.getStretch(widget));
    Property.getChanged(widget).connect(this._onWidgetChanged, this);
  }

  private _addWidget(widget: MyWidget, stretch: number): void {
    // add the widget with the given stretch factor
  }

  private _updateWidget(widget: MyWidget, stretch: number): void {
    // update the widget with the given stretch factor
  }

  private _onWidgetChanged(sender: MyWidget, args: IChangedArgs): void {
    if (args.property === MyContainer.stretchProperty) {
      this._updateWidget(sender, <number>args.newValue);
    }
  }
}


var widget = new MyWidget();
MyContainer.setStretch(widget, 3);

var container = new MyContainer();
container.addWidget(widget);
```
