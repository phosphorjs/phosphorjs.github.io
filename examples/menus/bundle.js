(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\n| Copyright (c) 2014-2015, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\nbody {\n  font-family: sans-serif;\n  margin: 0;\n  padding: 0;\n}\n#main {\n  position: absolute;\n  top: 35px;\n  left: 10px;\n  right: 10px;\n  bottom: 10px;\n}\n.ContextArea {\n  padding-left: 10px;\n}\n.p-TabBar {\n  min-height: 24px;\n}\n.p-TabBar-content {\n  bottom: 1px;\n  align-items: flex-end;\n}\n.p-TabBar-content > .p-Tab {\n  flex-basis: 125px;\n  max-height: 21px;\n  margin-left: -1px;\n  border: 1px solid #C0C0C0;\n  border-bottom: none;\n  padding: 0px 10px;\n  background: #E5E5E5;\n  font: 12px Helvetica, Arial, sans-serif;\n}\n.p-TabBar-content > .p-Tab.p-mod-first {\n  margin-left: 0;\n}\n.p-TabBar-content > .p-Tab.p-mod-selected {\n  min-height: 24px;\n  background: white;\n  transform: translateY(1px);\n}\n.p-TabBar-content > .p-Tab:hover:not(.p-mod-selected) {\n  background: #F0F0F0;\n}\n.p-TabBar-content > .p-Tab > span {\n  line-height: 21px;\n}\n.p-TabBar-footer {\n  display: block;\n  height: 1px;\n  background: #C0C0C0;\n}\n.p-TabPanel > .p-StackedPanel {\n  background: white;\n  border: 1px solid #C0C0C0;\n  border-top: none;\n}\n.p-Menu {\n  background: white;\n  color: rgba(0, 0, 0, 0.87);\n  border: 1px solid #C0C0C0;\n  font: 12px Helvetica, Arial, sans-serif;\n  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.2);\n}\n.p-Menu-item.p-mod-active {\n  background: #E5E5E5;\n}\n.p-Menu-item.p-mod-disabled {\n  color: rgba(0, 0, 0, 0.26);\n}\n.p-Menu-item.p-mod-separator-type > span::after {\n  border-top: 1px solid #DDDDDD;\n}\n.p-Menu-item-icon::before,\n.p-Menu-item-submenu-icon::before {\n  font-family: FontAwesome;\n}\n.p-Menu-item.p-mod-check-type.p-mod-checked > .p-Menu-item-icon::before {\n  content: '\\f00c';\n}\n.p-Menu-item.p-mod-has-submenu > .p-Menu-item-submenu-icon::before {\n  content: '\\f0da';\n}\n.p-Menu-item.copy > .p-Menu-item-icon::before {\n  content: '\\f0c5';\n}\n.p-Menu-item.cut > .p-Menu-item-icon::before {\n  content: '\\f0c4';\n}\n.p-Menu-item.paste > .p-Menu-item-icon::before {\n  content: '\\f0ea';\n}\n.p-Menu-item.close > .p-Menu-item-icon::before {\n  content: '\\f00d';\n}\n.p-Menu-item.undo > .p-Menu-item-icon::before {\n  content: '\\f0e2';\n}\n.p-Menu-item.repeat > .p-Menu-item-icon::before {\n  content: '\\f01e';\n}\n.p-MenuBar {\n  min-height: 24px;\n  padding-left: 5px;\n  background: #FEFEFE;\n  color: rgba(0, 0, 0, 0.87);\n  border-bottom: 1px solid #DDDDDD;\n  font: 13px Helvetica, Arial, sans-serif;\n}\n.p-MenuBar-menu {\n  transform: translateY(-1px);\n}\n.p-MenuBar-item {\n  padding: 4px 8px;\n  border-left: 1px solid transparent;\n  border-right: 1px solid transparent;\n}\n.p-MenuBar-item.p-mod-active {\n  background: #E5E5E5;\n}\n.p-MenuBar-item.p-mod-disabled {\n  color: rgba(0, 0, 0, 0.26);\n}\n.p-MenuBar-item.p-mod-separator-type {\n  margin: 2px;\n  padding: 0;\n  border: none;\n  border-left: 1px solid #DDDDDD;\n}\n.p-MenuBar.p-mod-active > .p-MenuBar-content > .p-MenuBar-item.p-mod-active {\n  z-index: 1000000;\n  background: white;\n  border-left: 1px solid #C0C0C0;\n  border-right: 1px solid #C0C0C0;\n  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);\n}\n"; (require("browserify-css").createStyle(css, { "href": "index.css"})); module.exports = css;
},{"browserify-css":3}],2:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_menus_1 = require('phosphor-menus');
var phosphor_tabs_1 = require('phosphor-tabs');
var phosphor_widget_1 = require('phosphor-widget');
require('./index.css');
/**
 * A widget which hosts a CodeMirror editor.
 */
var CodeMirrorWidget = (function (_super) {
    __extends(CodeMirrorWidget, _super);
    function CodeMirrorWidget(config) {
        _super.call(this);
        this.addClass('CodeMirrorWidget');
        this._editor = CodeMirror(this.node, config);
    }
    Object.defineProperty(CodeMirrorWidget.prototype, "editor", {
        get: function () {
            return this._editor;
        },
        enumerable: true,
        configurable: true
    });
    CodeMirrorWidget.prototype.loadTarget = function (target) {
        var doc = this._editor.getDoc();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', target);
        xhr.onreadystatechange = function () { return doc.setValue(xhr.responseText); };
        xhr.send();
    };
    CodeMirrorWidget.prototype.onAfterAttach = function (msg) {
        this._editor.refresh();
    };
    CodeMirrorWidget.prototype.onResize = function (msg) {
        if (msg.width < 0 || msg.height < 0) {
            this._editor.refresh();
        }
        else {
            this._editor.setSize(msg.width, msg.height);
        }
    };
    return CodeMirrorWidget;
})(phosphor_widget_1.Widget);
/**
 * Log a message to the log element.
 */
function log(value) {
    var node = document.getElementById('log-span');
    node.textContent = value;
}
/**
 * Log the text of a menu item to the log element.
 */
function logItem(item) {
    log(item.text.replace(/&/g, ''));
}
/**
 * The template for the application menu bar.
 */
var MENU_BAR_TEMPLATE = [
    {
        text: 'File',
        submenu: [
            {
                text: 'New File',
                shortcut: 'Ctrl+N',
                handler: logItem
            },
            {
                text: 'Open File',
                shortcut: 'Ctrl+O',
                handler: logItem
            },
            {
                text: 'Save File',
                shortcut: 'Ctrl+S',
                handler: logItem
            },
            {
                text: 'Save As...',
                shortcut: 'Ctrl+Shift+S',
                handler: logItem
            },
            {
                type: 'separator'
            },
            {
                text: 'Close File',
                shortcut: 'Ctrl+W',
                handler: logItem
            },
            {
                text: 'Close All Files',
                handler: logItem
            },
            {
                type: 'separator'
            },
            {
                text: 'More...',
                submenu: [
                    {
                        text: 'One',
                        handler: logItem
                    },
                    {
                        text: 'Two',
                        handler: logItem
                    },
                    {
                        text: 'Three',
                        handler: logItem
                    },
                    {
                        text: 'Four',
                        handler: logItem
                    }
                ]
            },
            {
                type: 'separator'
            },
            {
                text: 'Exit',
                handler: logItem
            }
        ]
    },
    {
        text: 'Edit',
        submenu: [
            {
                text: '&Undo',
                shortcut: 'Ctrl+Z',
                className: 'undo',
                handler: logItem
            },
            {
                text: '&Repeat',
                shortcut: 'Ctrl+Y',
                className: 'repeat',
                handler: logItem
            },
            {
                type: 'separator'
            },
            {
                text: '&Copy',
                shortcut: 'Ctrl+C',
                className: 'copy',
                handler: logItem
            },
            {
                text: 'Cu&t',
                shortcut: 'Ctrl+X',
                className: 'cut',
                handler: logItem
            },
            {
                text: '&Paste',
                shortcut: 'Ctrl+V',
                className: 'paste',
                handler: logItem
            }
        ]
    },
    {
        text: 'Find',
        submenu: [
            {
                text: 'Find...',
                shortcut: 'Ctrl+F',
                handler: logItem
            },
            {
                text: 'Find Next',
                shortcut: 'F3',
                handler: logItem
            },
            {
                text: 'Find Previous',
                shortcut: 'Shift+F3',
                handler: logItem
            },
            {
                type: 'separator'
            },
            {
                text: 'Replace...',
                shortcut: 'Ctrl+H',
                handler: logItem
            },
            {
                text: 'Replace Next',
                shortcut: 'Ctrl+Shift+H',
                handler: logItem
            }
        ]
    },
    {
        text: 'View',
        disabled: true
    },
    {
        type: 'separator'
    },
    {
        text: 'Help',
        submenu: [
            {
                text: 'Documentation',
                handler: logItem
            },
            {
                text: 'About',
                handler: logItem
            }
        ]
    }
];
/**
 * The template for the application context menu.
 */
var CONTEXT_MENU_TEMPLATE = [
    {
        text: '&Copy',
        shortcut: 'Ctrl+C',
        className: 'copy',
        handler: logItem
    },
    {
        text: 'Cu&t',
        shortcut: 'Ctrl+X',
        className: 'cut',
        handler: logItem
    },
    {
        text: '&Paste',
        shortcut: 'Ctrl+V',
        className: 'paste',
        handler: logItem
    },
    {
        type: 'separator'
    },
    {
        text: '&New Tab',
        handler: logItem
    },
    {
        text: '&Close Tab',
        handler: logItem
    },
    {
        type: 'check',
        checked: true,
        text: '&Save On Exit',
        handler: function (item) {
            item.checked = !item.checked;
            log('Save On Exit - ' + item.checked);
        }
    },
    {
        type: 'separator'
    },
    {
        text: 'Task Manager',
        disabled: true
    },
    {
        type: 'separator'
    },
    {
        text: 'More...',
        submenu: [
            {
                text: 'One',
                handler: logItem
            },
            {
                text: 'Two',
                handler: logItem
            },
            {
                text: 'Three',
                handler: logItem
            },
            {
                text: 'Four',
                handler: logItem
            }
        ]
    },
    {
        type: 'separator'
    },
    {
        text: 'Close',
        className: 'close',
        handler: logItem
    }
];
/**
 * The main application entry point.
 */
function main() {
    var contextArea = new phosphor_widget_1.Widget();
    contextArea.addClass('ContextArea');
    contextArea.node.innerHTML = ('<h2>Notice the menu bar at the top of the document.' +
        '<h2>Right click this panel for a context menu.</h2>' +
        '<h3>Clicked Item: <span id="log-span"></span></h3>');
    var cmSource = new CodeMirrorWidget({
        mode: 'text/javascript',
        lineNumbers: true,
        tabSize: 2,
    });
    cmSource.loadTarget('./index.ts');
    var cmCss = new CodeMirrorWidget({
        mode: 'text/css',
        lineNumbers: true,
        tabSize: 2,
    });
    cmCss.loadTarget('./index.css');
    phosphor_tabs_1.TabPanel.setTab(contextArea, new phosphor_tabs_1.Tab('Demo'));
    phosphor_tabs_1.TabPanel.setTab(cmSource, new phosphor_tabs_1.Tab('Source'));
    phosphor_tabs_1.TabPanel.setTab(cmCss, new phosphor_tabs_1.Tab('CSS'));
    var contextMenu = phosphor_menus_1.Menu.fromTemplate(CONTEXT_MENU_TEMPLATE);
    contextArea.node.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        var x = event.clientX;
        var y = event.clientY;
        contextMenu.popup(x, y);
    });
    var menuBar = phosphor_menus_1.MenuBar.fromTemplate(MENU_BAR_TEMPLATE);
    var panel = new phosphor_tabs_1.TabPanel();
    panel.id = 'main';
    panel.widgets = [contextArea, cmSource, cmCss];
    phosphor_widget_1.attachWidget(menuBar, document.body);
    phosphor_widget_1.attachWidget(panel, document.body);
    window.onresize = function () { return panel.update(); };
}
window.onload = main;

},{"./index.css":1,"phosphor-menus":9,"phosphor-tabs":20,"phosphor-widget":30}],3:[function(require,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }
        
        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            head.appendChild(style);
        } else if (style.styleSheet) { // for IE8 and below
            head.appendChild(style);
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            head.appendChild(style);
        }
    }
};

},{}],4:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * Execute a callback for each element in an array.
 *
 * @param array - The array of values to iterate.
 *
 * @param callback - The callback to invoke for the array elements.
 *
 * @param fromIndex - The starting index for iteration.
 *
 * @param wrap - Whether iteration wraps around at the end of the array.
 *
 * @returns The first value returned by `callback` which is not
 *   equal to `undefined`, or `undefined` if the callback does
 *   not return a value or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function logger(value: number): void {
 *   console.log(value);
 * }
 *
 * var data = [1, 2, 3, 4];
 * arrays.forEach(data, logger);           // logs 1, 2, 3, 4
 * arrays.forEach(data, logger, 2);        // logs 3, 4
 * arrays.forEach(data, logger, 2, true);  // logs 3, 4, 1, 2
 * arrays.forEach(data, (v, i) => {        // 2
 *   if (v === 3) return i;
 * });
 * ```
 *
 * **See also** [[rforEach]]
 */
function forEach(array, callback, fromIndex, wrap) {
    if (fromIndex === void 0) { fromIndex = 0; }
    if (wrap === void 0) { wrap = false; }
    var start = fromIndex | 0;
    if (start < 0 || start >= array.length) {
        return void 0;
    }
    if (wrap) {
        for (var i = 0, n = array.length; i < n; ++i) {
            var j = (start + i) % n;
            var result = callback(array[j], j);
            if (result !== void 0)
                return result;
        }
    }
    else {
        for (var i = start, n = array.length; i < n; ++i) {
            var result = callback(array[i], i);
            if (result !== void 0)
                return result;
        }
    }
    return void 0;
}
exports.forEach = forEach;
/**
 * Execute a callback for each element in an array, in reverse.
 *
 * @param array - The array of values to iterate.
 *
 * @param callback - The callback to invoke for the array elements.
 *
 * @param fromIndex - The starting index for iteration.
 *
 * @param wrap - Whether iteration wraps around at the end of the array.
 *
 * @returns The first value returned by `callback` which is not
 *   equal to `undefined`, or `undefined` if the callback does
 *   not return a value or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function logger(value: number): void {
 *   console.log(value);
 * }
 *
 * var data = [1, 2, 3, 4];
 * arrays.rforEach(data, logger);           // logs 4, 3, 2, 1
 * arrays.rforEach(data, logger, 2);        // logs 3, 2, 1
 * arrays.rforEach(data, logger, 2, true);  // logs 3, 2, 1, 4
 * arrays.rforEach(data, (v, i) => {        // 2
 *   if (v === 3) return i;
 * });
 * ```
 * **See also** [[forEach]]
 */
function rforEach(array, callback, fromIndex, wrap) {
    if (fromIndex === void 0) { fromIndex = array.length - 1; }
    if (wrap === void 0) { wrap = false; }
    var start = fromIndex | 0;
    if (start < 0 || start >= array.length) {
        return void 0;
    }
    if (wrap) {
        for (var i = 0, n = array.length; i < n; ++i) {
            var j = (start - i + n) % n;
            var result = callback(array[j], j);
            if (result !== void 0)
                return result;
        }
    }
    else {
        for (var i = start; i >= 0; --i) {
            var result = callback(array[i], i);
            if (result !== void 0)
                return result;
        }
    }
    return void 0;
}
exports.rforEach = rforEach;
/**
 * Find the index of the first value which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search.
 *
 * @param wrap - Whether the search wraps around at the end of the array.
 *
 * @returns The index of the first matching value, or `-1` if no value
 *   matches the predicate or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * var data = [1, 2, 3, 4, 3, 2, 1];
 * arrays.findIndex(data, isEven);           // 1
 * arrays.findIndex(data, isEven, 4);        // 5
 * arrays.findIndex(data, isEven, 6);        // -1
 * arrays.findIndex(data, isEven, 6, true);  // 1
 * ```
 *
 * **See also** [[rfindIndex]].
 */
function findIndex(array, pred, fromIndex, wrap) {
    if (fromIndex === void 0) { fromIndex = 0; }
    if (wrap === void 0) { wrap = false; }
    var start = fromIndex | 0;
    if (start < 0 || start >= array.length) {
        return -1;
    }
    if (wrap) {
        for (var i = 0, n = array.length; i < n; ++i) {
            var j = (start + i) % n;
            if (pred(array[j], j))
                return j;
        }
    }
    else {
        for (var i = start, n = array.length; i < n; ++i) {
            if (pred(array[i], i))
                return i;
        }
    }
    return -1;
}
exports.findIndex = findIndex;
/**
 * Find the index of the last value which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search.
 *
 * @param wrap - Whether the search wraps around at the front of the array.
 *
 * @returns The index of the last matching value, or `-1` if no value
 *   matches the predicate or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * var data = [1, 2, 3, 4, 3, 2, 1];
 * arrays.rfindIndex(data, isEven);           // 5
 * arrays.rfindIndex(data, isEven, 4);        // 3
 * arrays.rfindIndex(data, isEven, 0);        // -1
 * arrays.rfindIndex(data, isEven, 0, true);  // 5
 * ```
 *
 * **See also** [[findIndex]].
 */
function rfindIndex(array, pred, fromIndex, wrap) {
    if (fromIndex === void 0) { fromIndex = array.length - 1; }
    if (wrap === void 0) { wrap = false; }
    var start = fromIndex | 0;
    if (start < 0 || start >= array.length) {
        return -1;
    }
    if (wrap) {
        for (var i = 0, n = array.length; i < n; ++i) {
            var j = (start - i + n) % n;
            if (pred(array[j], j))
                return j;
        }
    }
    else {
        for (var i = start; i >= 0; --i) {
            if (pred(array[i], i))
                return i;
        }
    }
    return -1;
}
exports.rfindIndex = rfindIndex;
/**
 * Find the first value which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search.
 *
 * @param wrap - Whether the search wraps around at the end of the array.
 *
 * @returns The first matching value, or `undefined` if no value matches
 *   the predicate or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * var data = [1, 2, 3, 4, 3, 2, 1];
 * arrays.find(data, isEven);           // 2
 * arrays.find(data, isEven, 4);        // 2
 * arrays.find(data, isEven, 6);        // undefined
 * arrays.find(data, isEven, 6, true);  // 2
 * ```
 *
 * **See also** [[rfind]].
 */
function find(array, pred, fromIndex, wrap) {
    var i = findIndex(array, pred, fromIndex, wrap);
    return i !== -1 ? array[i] : void 0;
}
exports.find = find;
/**
 * Find the last value which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search.
 *
 * @param wrap - Whether the search wraps around at the front of the array.
 *
 * @returns The last matching value, or `undefined` if no value matches
 *   the predicate or if the start index is out of range.
 *
 * #### Notes
 * The range of visited indices is set before the first invocation of
 * `pred`. It is not safe for `pred` to change the length of `array`.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * var data = [1, 2, 3, 4, 3, 2, 1];
 * arrays.rfind(data, isEven);           // 2
 * arrays.rfind(data, isEven, 4);        // 4
 * arrays.rfind(data, isEven, 0);        // undefined
 * arrays.rfind(data, isEven, 0, true);  // 2
 * ```
 *
 * **See also** [[find]].
 */
function rfind(array, pred, fromIndex, wrap) {
    var i = rfindIndex(array, pred, fromIndex, wrap);
    return i !== -1 ? array[i] : void 0;
}
exports.rfind = rfind;
/**
 * Insert an element into an array at a specified index.
 *
 * @param array - The array of values to modify.
 *
 * @param index - The index at which to insert the value. This value
 *   is clamped to the bounds of the array.
 *
 * @param value - The value to insert into the array.
 *
 * @returns The index at which the value was inserted.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.insert(data, 0, 12);  // 0
 * arrays.insert(data, 3, 42);  // 3
 * arrays.insert(data, -9, 9);  // 0
 * arrays.insert(data, 12, 8);  // 8
 * console.log(data);           // [9, 12, 0, 1, 42, 2, 3, 4, 8]
 * ```
 *
 * **See also** [[removeAt]] and [[remove]]
 */
function insert(array, index, value) {
    var j = Math.max(0, Math.min(index | 0, array.length));
    for (var i = array.length; i > j; --i) {
        array[i] = array[i - 1];
    }
    array[j] = value;
    return j;
}
exports.insert = insert;
/**
 * Move an element in an array from one index to another.
 *
 * @param array - The array of values to modify.
 *
 * @param fromIndex - The index of the element to move.
 *
 * @param toIndex - The target index of the element.
 *
 * @returns `true` if the element was moved, or `false` if either
 *   index is out of range.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.move(data, 1, 2);   // true
 * arrays.move(data, -1, 0);  // false
 * arrays.move(data, 4, 2);   // true
 * arrays.move(data, 10, 0);  // false
 * console.log(data);         // [0, 2, 4, 1, 3]
 * ```
 */
function move(array, fromIndex, toIndex) {
    var j = fromIndex | 0;
    if (j < 0 || j >= array.length) {
        return false;
    }
    var k = toIndex | 0;
    if (k < 0 || k >= array.length) {
        return false;
    }
    var value = array[j];
    if (j > k) {
        for (var i = j; i > k; --i) {
            array[i] = array[i - 1];
        }
    }
    else if (j < k) {
        for (var i = j; i < k; ++i) {
            array[i] = array[i + 1];
        }
    }
    array[k] = value;
    return true;
}
exports.move = move;
/**
 * Remove an element from an array at a specified index.
 *
 * @param array - The array of values to modify.
 *
 * @param index - The index of the element to remove.
 *
 * @returns The removed value, or `undefined` if the index is out
 *   of range.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.removeAt(data, 1);   // 1
 * arrays.removeAt(data, 3);   // 4
 * arrays.removeAt(data, 10);  // undefined
 * console.log(data);          // [0, 2, 3]
 * ```
 *
 * **See also** [[remove]] and [[insert]]
 */
function removeAt(array, index) {
    var j = index | 0;
    if (j < 0 || j >= array.length) {
        return void 0;
    }
    var value = array[j];
    for (var i = j + 1, n = array.length; i < n; ++i) {
        array[i - 1] = array[i];
    }
    array.length -= 1;
    return value;
}
exports.removeAt = removeAt;
/**
 * Remove the first occurrence of a value from an array.
 *
 * @param array - The array of values to modify.
 *
 * @param value - The value to remove from the array.
 *
 * @returns The index where the value was located, or `-1` if the
 *   value is not the array.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.remove(data, 1);  // 1
 * arrays.remove(data, 3);  // 2
 * arrays.remove(data, 7);  // -1
 * console.log(data);       // [0, 2, 4]
 * ```
 *
 * **See also** [[removeAt]] and [[insert]]
 */
function remove(array, value) {
    var j = -1;
    for (var i = 0, n = array.length; i < n; ++i) {
        if (array[i] === value) {
            j = i;
            break;
        }
    }
    if (j === -1) {
        return -1;
    }
    for (var i = j + 1, n = array.length; i < n; ++i) {
        array[i - 1] = array[i];
    }
    array.length -= 1;
    return j;
}
exports.remove = remove;
/**
 * Reverse an array in-place subject to an optional range.
 *
 * @param array - The array to reverse.
 *
 * @param fromIndex - The index of the first element of the range.
 *   This value will be clamped to the array bounds.
 *
 * @param toIndex - The index of the last element of the range.
 *   This value will be clamped to the array bounds.
 *
 * @returns A reference to the original array.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.reverse(data, 1, 3);    // [0, 3, 2, 1, 4]
 * arrays.reverse(data, 3);       // [0, 3, 2, 4, 1]
 * arrays.reverse(data);          // [1, 4, 2, 3, 0]
 * ```
 *
 * **See also** [[rotate]]
 */
function reverse(array, fromIndex, toIndex) {
    if (fromIndex === void 0) { fromIndex = 0; }
    if (toIndex === void 0) { toIndex = array.length; }
    var i = Math.max(0, Math.min(fromIndex | 0, array.length - 1));
    var j = Math.max(0, Math.min(toIndex | 0, array.length - 1));
    if (j < i)
        i = j + (j = i, 0);
    while (i < j) {
        var tmpval = array[i];
        array[i++] = array[j];
        array[j--] = tmpval;
    }
    return array;
}
exports.reverse = reverse;
/**
 * Rotate the elements of an array by a positive or negative delta.
 *
 * @param array - The array to rotate.
 *
 * @param delta - The amount of rotation to apply to the elements. A
 *   positive delta will shift the elements to the left. A negative
 *   delta will shift the elements to the right.
 *
 * @returns A reference to the original array.
 *
 * #### Notes
 * This executes in `O(n)` time and `O(1)` space.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.rotate(data, 2);    // [2, 3, 4, 0, 1]
 * arrays.rotate(data, -2);   // [0, 1, 2, 3, 4]
 * arrays.rotate(data, 10);   // [0, 1, 2, 3, 4]
 * arrays.rotate(data, 9);    // [4, 0, 1, 2, 3]
 * ```
 *
 * **See also** [[reverse]]
 */
function rotate(array, delta) {
    var n = array.length;
    if (n <= 1) {
        return array;
    }
    var d = delta | 0;
    if (d > 0) {
        d = d % n;
    }
    else if (d < 0) {
        d = ((d % n) + n) % n;
    }
    if (d === 0) {
        return array;
    }
    reverse(array, 0, d - 1);
    reverse(array, d, n - 1);
    reverse(array, 0, n - 1);
    return array;
}
exports.rotate = rotate;
/**
 * Using a binary search, find the index of the first element in an
 * array which compares `>=` to a value.
 *
 * @param array - The array of values to be searched. It must be sorted
 *   in ascending order.
 *
 * @param value - The value to locate in the array.
 *
 * @param cmp - The comparison function which returns `true` if an
 *   array element is less than the given value.
 *
 * @returns The index of the first element in `array` which compares
 *   `>=` to `value`, or `array.length` if there is no such element.
 *
 * #### Notes
 * It is not safe for the comparison function to modify the array.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function numberCmp(a: number, b: number): boolean {
 *   return a < b;
 * }
 *
 * var data = [0, 3, 4, 7, 7, 9];
 * arrays.lowerBound(data, 0, numberCmp);   // 0
 * arrays.lowerBound(data, 6, numberCmp);   // 3
 * arrays.lowerBound(data, 7, numberCmp);   // 3
 * arrays.lowerBound(data, -1, numberCmp);  // 0
 * arrays.lowerBound(data, 10, numberCmp);  // 6
 * ```
 *
 * **See also** [[upperBound]]
 */
function lowerBound(array, value, cmp) {
    var begin = 0;
    var half;
    var middle;
    var n = array.length;
    while (n > 0) {
        half = n >> 1;
        middle = begin + half;
        if (cmp(array[middle], value)) {
            begin = middle + 1;
            n -= half + 1;
        }
        else {
            n = half;
        }
    }
    return begin;
}
exports.lowerBound = lowerBound;
/**
 * Using a binary search, find the index of the first element in an
 * array which compares `>` than a value.
 *
 * @param array - The array of values to be searched. It must be sorted
 *   in ascending order.
 *
 * @param value - The value to locate in the array.
 *
 * @param cmp - The comparison function which returns `true` if the
 *   the given value is less than an array element.
 *
 * @returns The index of the first element in `array` which compares
 *   `>` than `value`, or `array.length` if there is no such element.
 *
 * #### Notes
 * It is not safe for the comparison function to modify the array.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function numberCmp(a: number, b: number): number {
 *   return a < b;
 * }
 *
 * var data = [0, 3, 4, 7, 7, 9];
 * arrays.upperBound(data, 0, numberCmp);   // 1
 * arrays.upperBound(data, 6, numberCmp);   // 3
 * arrays.upperBound(data, 7, numberCmp);   // 5
 * arrays.upperBound(data, -1, numberCmp);  // 0
 * arrays.upperBound(data, 10, numberCmp);  // 6
 * ```
 *
 * **See also** [[lowerBound]]
 */
function upperBound(array, value, cmp) {
    var begin = 0;
    var half;
    var middle;
    var n = array.length;
    while (n > 0) {
        half = n >> 1;
        middle = begin + half;
        if (cmp(value, array[middle])) {
            n = half;
        }
        else {
            begin = middle + 1;
            n -= half + 1;
        }
    }
    return begin;
}
exports.upperBound = upperBound;

},{}],5:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * A disposable object which delegates to a callback.
 */
var DisposableDelegate = (function () {
    /**
     * Construct a new disposable delegate.
     *
     * @param callback - The function to invoke when the delegate is
     *   disposed.
     */
    function DisposableDelegate(callback) {
        this._callback = callback;
    }
    Object.defineProperty(DisposableDelegate.prototype, "isDisposed", {
        /**
         * Test whether the delegate has been disposed.
         *
         * #### Notes
         * This is a read-only property which is always safe to access.
         */
        get: function () {
            return !this._callback;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose of the delegate and invoke its callback.
     *
     * #### Notes
     * If this method is called more than once, all calls made after the
     * first will be a no-op.
     */
    DisposableDelegate.prototype.dispose = function () {
        var callback = this._callback;
        this._callback = null;
        if (callback)
            callback();
    };
    return DisposableDelegate;
})();
exports.DisposableDelegate = DisposableDelegate;
/**
 * An object which manages a collection of disposable items.
 */
var DisposableSet = (function () {
    /**
     * Construct a new disposable set.
     *
     * @param items - The initial disposable items for the set.
     */
    function DisposableSet(items) {
        var _this = this;
        this._set = new Set();
        if (items)
            items.forEach(function (item) { return _this._set.add(item); });
    }
    Object.defineProperty(DisposableSet.prototype, "isDisposed", {
        /**
         * Test whether the set has been disposed.
         *
         * #### Notes
         * This is a read-only property which is always safe to access.
         */
        get: function () {
            return !this._set;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose of the set and dispose the items it contains.
     *
     * #### Notes
     * Items are disposed in the order they are added to the set.
     *
     * It is unsafe to use the set after it has been disposed.
     *
     * If this method is called more than once, all calls made after the
     * first will be a no-op.
     */
    DisposableSet.prototype.dispose = function () {
        var set = this._set;
        this._set = null;
        if (set)
            set.forEach(function (item) { return item.dispose(); });
    };
    /**
     * Add a disposable item to the set.
     *
     * @param item - The disposable item to add to the set. If the item
     *   is already contained in the set, this is a no-op.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    DisposableSet.prototype.add = function (item) {
        if (!this._set) {
            throw new Error('object is disposed');
        }
        this._set.add(item);
    };
    /**
     * Remove a disposable item from the set.
     *
     * @param item - The disposable item to remove from the set. If the
     *   item does not exist in the set, this is a no-op.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    DisposableSet.prototype.remove = function (item) {
        if (!this._set) {
            throw new Error('object is disposed');
        }
        this._set.delete(item);
    };
    /**
     * Clear all disposable items from the set.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    DisposableSet.prototype.clear = function () {
        if (!this._set) {
            throw new Error('object is disposed');
        }
        this._set.clear();
    };
    return DisposableSet;
})();
exports.DisposableSet = DisposableSet;

},{}],6:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\n| Copyright (c) 2014-2015, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\nbody.p-mod-override-cursor * {\n  cursor: inherit !important;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-domutil/lib/index.css"})); module.exports = css;
},{"browserify-css":3}],7:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var phosphor_disposable_1 = require('phosphor-disposable');
require('./index.css');
/**
 * `p-mod-override-cursor`: the class name added to the document body
 *   during cursor override.
 */
exports.OVERRIDE_CURSOR_CLASS = 'p-mod-override-cursor';
/**
 * The id for the active cursor override.
 */
var overrideID = 0;
/**
 * Override the cursor for the entire document.
 *
 * @param cursor - The string representing the cursor style.
 *
 * @returns A disposable which will clear the override when disposed.
 *
 * #### Notes
 * The most recent call to `overrideCursor` takes precendence. Disposing
 * an old override is a no-op and will not effect the current override.
 *
 * #### Example
 * ```typescript
 * import { overrideCursor } from 'phosphor-domutil';
 *
 * // force the cursor to be 'wait' for the entire document
 * var override = overrideCursor('wait');
 *
 * // clear the override by disposing the return value
 * override.dispose();
 * ```
 */
function overrideCursor(cursor) {
    var id = ++overrideID;
    var body = document.body;
    body.style.cursor = cursor;
    body.classList.add(exports.OVERRIDE_CURSOR_CLASS);
    return new phosphor_disposable_1.DisposableDelegate(function () {
        if (id === overrideID) {
            body.style.cursor = '';
            body.classList.remove(exports.OVERRIDE_CURSOR_CLASS);
        }
    });
}
exports.overrideCursor = overrideCursor;
/**
 * Test whether a client position lies within a node.
 *
 * @param node - The DOM node of interest.
 *
 * @param clientX - The client X coordinate of interest.
 *
 * @param clientY - The client Y coordinate of interest.
 *
 * @returns `true` if the node covers the position, `false` otherwise.
 *
 * #### Example
 * ```typescript
 * import { hitTest } from 'phosphor-domutil';
 *
 * var div = document.createElement('div');
 * div.style.position = 'absolute';
 * div.style.left = '0px';
 * div.style.top = '0px';
 * div.style.width = '100px';
 * div.style.height = '100px';
 * document.body.appendChild(div);
 *
 * hitTest(div, 50, 50);   // true
 * hitTest(div, 150, 150); // false
 * ```
 */
function hitTest(node, clientX, clientY) {
    var rect = node.getBoundingClientRect();
    return (clientX >= rect.left &&
        clientX < rect.right &&
        clientY >= rect.top &&
        clientY < rect.bottom);
}
exports.hitTest = hitTest;
/**
 * Compute the box sizing for a DOM node.
 *
 * @param node - The DOM node for which to compute the box sizing.
 *
 * @returns The box sizing data for the specified DOM node.
 *
 * #### Example
 * ```typescript
 * import { boxSizing } from 'phosphor-domutil';
 *
 * var div = document.createElement('div');
 * div.style.borderTop = 'solid 10px black';
 * document.body.appendChild(div);
 *
 * var sizing = boxSizing(div);
 * sizing.borderTop;    // 10
 * sizing.paddingLeft;  // 0
 * // etc...
 * ```
 */
function boxSizing(node) {
    var cstyle = window.getComputedStyle(node);
    var bt = parseInt(cstyle.borderTopWidth, 10) || 0;
    var bl = parseInt(cstyle.borderLeftWidth, 10) || 0;
    var br = parseInt(cstyle.borderRightWidth, 10) || 0;
    var bb = parseInt(cstyle.borderBottomWidth, 10) || 0;
    var pt = parseInt(cstyle.paddingTop, 10) || 0;
    var pl = parseInt(cstyle.paddingLeft, 10) || 0;
    var pr = parseInt(cstyle.paddingRight, 10) || 0;
    var pb = parseInt(cstyle.paddingBottom, 10) || 0;
    var hs = bl + pl + pr + br;
    var vs = bt + pt + pb + bb;
    return {
        borderTop: bt,
        borderLeft: bl,
        borderRight: br,
        borderBottom: bb,
        paddingTop: pt,
        paddingLeft: pl,
        paddingRight: pr,
        paddingBottom: pb,
        horizontalSum: hs,
        verticalSum: vs,
    };
}
exports.boxSizing = boxSizing;
/**
 * Compute the size limits for a DOM node.
 *
 * @param node - The node for which to compute the size limits.
 *
 * @returns The size limit data for the specified DOM node.
 *
 * #### Example
 * ```typescript
 * import { sizeLimits } from 'phosphor-domutil';
 *
 * var div = document.createElement('div');
 * div.style.minWidth = '90px';
 * document.body.appendChild(div);
 *
 * var limits = sizeLimits(div);
 * limits.minWidth;   // 90
 * limits.maxHeight;  // Infinity
 * // etc...
 * ```
 */
function sizeLimits(node) {
    var cstyle = window.getComputedStyle(node);
    return {
        minWidth: parseInt(cstyle.minWidth, 10) || 0,
        minHeight: parseInt(cstyle.minHeight, 10) || 0,
        maxWidth: parseInt(cstyle.maxWidth, 10) || Infinity,
        maxHeight: parseInt(cstyle.maxHeight, 10) || Infinity,
    };
}
exports.sizeLimits = sizeLimits;

},{"./index.css":6,"phosphor-disposable":5}],8:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\n| Copyright (c) 2014-2015, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n.p-Menu {\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 0;\n  padding: 3px 0px;\n  white-space: nowrap;\n  overflow-x: hidden;\n  overflow-y: auto;\n  z-index: 100000;\n}\n.p-Menu-content {\n  display: table;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  border-spacing: 0;\n}\n.p-Menu-item {\n  display: table-row;\n}\n.p-Menu-item.p-mod-hidden,\n.p-Menu-item.p-mod-force-hidden {\n  display: none;\n}\n.p-Menu-item > span {\n  display: table-cell;\n  padding-top: 4px;\n  padding-bottom: 4px;\n}\n.p-Menu-item-icon {\n  width: 21px;\n  padding-left: 2px;\n  padding-right: 2px;\n  text-align: center;\n}\n.p-Menu-item-text {\n  padding-left: 2px;\n  padding-right: 35px;\n}\n.p-Menu-item-shortcut {\n  text-align: right;\n}\n.p-Menu-item-submenu-icon {\n  width: 16px;\n  text-align: center;\n}\n.p-Menu-item.p-mod-separator-type > span {\n  padding: 0;\n  height: 9px;\n  line-height: 0;\n  text-indent: 100%;\n  overflow: hidden;\n  whitespace: nowrap;\n  vertical-align: top;\n  /* https://bugzilla.mozilla.org/show_bug.cgi?id=634489 */\n}\n.p-Menu-item.p-mod-separator-type > span::after {\n  content: '';\n  display: block;\n  position: relative;\n  top: 4px;\n}\n.p-MenuBar-content {\n  display: flex;\n  flex-direction: row;\n}\n.p-MenuBar-item {\n  box-sizing: border-box;\n}\n.p-MenuBar-item.p-mod-hidden,\n.p-MenuBar-item.p-mod-force-hidden {\n  display: none;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-menus/lib/index.css"})); module.exports = css;
},{"browserify-css":3}],9:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./menu'));
__export(require('./menubar'));
__export(require('./menubase'));
__export(require('./menuitem'));
require('./index.css');

},{"./index.css":8,"./menu":10,"./menubar":11,"./menubase":12,"./menuitem":13}],10:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_domutil_1 = require('phosphor-domutil');
var phosphor_signaling_1 = require('phosphor-signaling');
var phosphor_widget_1 = require('phosphor-widget');
var menubase_1 = require('./menubase');
var menuitem_1 = require('./menuitem');
/**
 * `p-Menu`: the class name added to Menu instances.
 */
exports.MENU_CLASS = 'p-Menu';
/**
 * `p-Menu-content`: the class name added to a menu content node.
 */
exports.CONTENT_CLASS = 'p-Menu-content';
/**
 * `p-Menu-item`: the class name assigned to a menu item.
 */
exports.MENU_ITEM_CLASS = 'p-Menu-item';
/**
 * `p-Menu-item-icon`: the class name added to a menu item icon cell.
 */
exports.ICON_CLASS = 'p-Menu-item-icon';
/**
 * `p-Menu-item-text`: the class name added to a menu item text cell.
 */
exports.TEXT_CLASS = 'p-Menu-item-text';
/**
 * `p-Menu-item-shortcut`: the class name added to a menu item shortcut cell.
 */
exports.SHORTCUT_CLASS = 'p-Menu-item-shortcut';
/**
 * `p-Menu-item-submenu-icon`: the class name added to a menu item submenu icon cell.
 */
exports.SUBMENU_ICON_CLASS = 'p-Menu-item-submenu-icon';
/**
 * `p-mod`: the class name added to a check type menu item.
 */
exports.CHECK_TYPE_CLASS = 'p-mod-check-type';
/**
 * `p-mod`: the class name added to a separator type menu item.
 */
exports.SEPARATOR_TYPE_CLASS = 'p-mod-separator-type';
/**
 * `p-mod`: the class name added to active menu items.
 */
exports.ACTIVE_CLASS = 'p-mod-active';
/**
 * `p-mod`: the class name added to a disabled menu item.
 */
exports.DISABLED_CLASS = 'p-mod-disabled';
/**
 * `p-mod`: the class name added to a hidden menu item.
 */
exports.HIDDEN_CLASS = 'p-mod-hidden';
/**
 * `p-mod`: the class name added to a force hidden menu item.
 */
exports.FORCE_HIDDEN_CLASS = 'p-mod-force-hidden';
/**
 * `p-mod`: the class name added to a checked menu item.
 */
exports.CHECKED_CLASS = 'p-mod-checked';
/**
 * `p-mod`: the class name added to a menu item with a submenu.
 */
exports.HAS_SUBMENU_CLASS = 'p-mod-has-submenu';
/**
 * The delay, in ms, for opening a submenu.
 */
var OPEN_DELAY = 300;
/**
 * The delay, in ms, for closing a submenu.
 */
var CLOSE_DELAY = 300;
/**
 * The horizontal overlap to use for submenus.
 */
var SUBMENU_OVERLAP = 3;
/**
 * A widget which displays menu items as a popup menu.
 *
 * #### Notes
 * A `Menu` widget does not support child widgets. Adding children
 * to a `Menu` will result in undefined behavior.
 */
var Menu = (function (_super) {
    __extends(Menu, _super);
    /**
     * Construct a new menu.
     */
    function Menu() {
        _super.call(this);
        this._openTimerId = 0;
        this._closeTimerId = 0;
        this._parentMenu = null;
        this._childMenu = null;
        this._childItem = null;
        this.addClass(exports.MENU_CLASS);
    }
    /**
     * Create the DOM node for a menu.
     */
    Menu.createNode = function () {
        var node = document.createElement('div');
        var content = document.createElement('div');
        content.className = exports.CONTENT_CLASS;
        node.appendChild(content);
        return node;
    };
    /**
     * A convenience method to create a menu from a template.
     *
     * @param array - The menu item templates for the menu.
     *
     * @returns A new menu created from the menu item templates.
     *
     * #### Notes
     * Submenu templates will be recursively created using the
     * `Menu.fromTemplate` method. If custom menus or menu items
     * are required, use the relevant constructors directly.
     */
    Menu.fromTemplate = function (array) {
        var menu = new Menu();
        menu.items = array.map(createMenuItem);
        return menu;
    };
    /**
     * Dispose of the resources held by the menu.
     */
    Menu.prototype.dispose = function () {
        this.close(true);
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(Menu.prototype, "closed", {
        /**
         * A signal emitted when the menu item is closed.
         *
         * #### Notes
         * This is a pure delegate to the [[closedSignal]].
         */
        get: function () {
            return Menu.closedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "parentMenu", {
        /**
         * Get the parent menu of the menu.
         *
         * #### Notes
         * This will be null if the menu is not an open submenu.
         */
        get: function () {
            return this._parentMenu;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "childMenu", {
        /**
         * Get the child menu of the menu.
         *
         * #### Notes
         * This will be null if the menu does not have an open submenu.
         */
        get: function () {
            return this._childMenu;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "rootMenu", {
        /**
         * Find the root menu of this menu hierarchy.
         */
        get: function () {
            var menu = this;
            while (menu._parentMenu) {
                menu = menu._parentMenu;
            }
            return menu;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "leafMenu", {
        /**
         * Find the leaf menu of this menu hierarchy.
         */
        get: function () {
            var menu = this;
            while (menu._childMenu) {
                menu = menu._childMenu;
            }
            return menu;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Popup the menu at the specified location.
     *
     * The menu will be opened at the given location unless it will not
     * fully fit on the screen. If it will not fit, it will be adjusted
     * to fit naturally on the screen. The last two optional parameters
     * control whether the provided coordinate value must be obeyed.
     *
     * When the menu is opened as a popup menu, it will handle all key
     * events related to menu navigation as well as closing the menu
     * when the mouse is pressed outside of the menu hierarchy. To
     * prevent these actions, use the 'open' method instead.
     *
     * @param x - The client X coordinate of the popup location.
     *
     * @param y - The client Y coordinate of the popup location.
     *
     * @param forceX - Whether the X coordinate must be obeyed.
     *
     * @param forceY - Whether the Y coordinate must be obeyed.
     *
     * **See also:** [[open]]
     */
    Menu.prototype.popup = function (x, y, forceX, forceY) {
        if (forceX === void 0) { forceX = false; }
        if (forceY === void 0) { forceY = false; }
        if (!this.isAttached) {
            this.update(true);
            document.addEventListener('keydown', this, true);
            document.addEventListener('keypress', this, true);
            document.addEventListener('mousedown', this, true);
            openRootMenu(this, x, y, forceX, forceY);
        }
    };
    /**
     * Open the menu at the specified location.
     *
     * The menu will be opened at the given location unless it will not
     * fully fit on the screen. If it will not fit, it will be adjusted
     * to fit naturally on the screen. The last two optional parameters
     * control whether the provided coordinate value must be obeyed.
     *
     * When the menu is opened with this method, it will not handle key
     * events for navigation, nor will it close itself when the mouse is
     * pressed outside the menu hierarchy. This is useful when using the
     * menu from a menubar, where this menubar should handle these tasks.
     * Use the `popup` method for the alternative behavior.
     *
     * @param x - The client X coordinate of the popup location.
     *
     * @param y - The client Y coordinate of the popup location.
     *
     * @param forceX - Whether the X coordinate must be obeyed.
     *
     * @param forceY - Whether the Y coordinate must be obeyed.
     *
     * **See also:** [[popup]]
     */
    Menu.prototype.open = function (x, y, forceX, forceY) {
        if (forceX === void 0) { forceX = false; }
        if (forceY === void 0) { forceY = false; }
        if (!this.isAttached) {
            this.update(true);
            openRootMenu(this, x, y, forceX, forceY);
        }
    };
    /**
     * Handle the DOM events for the menu.
     *
     * @param event - The DOM event sent to the menu.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the menu's DOM nodes. It should
     * not be called directly by user code.
     */
    Menu.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'mouseenter':
                this._evtMouseEnter(event);
                break;
            case 'mouseleave':
                this._evtMouseLeave(event);
                break;
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'mouseup':
                this._evtMouseUp(event);
                break;
            case 'contextmenu':
                this._evtContextMenu(event);
                break;
            case 'keydown':
                this._evtKeyDown(event);
                break;
            case 'keypress':
                this._evtKeyPress(event);
                break;
        }
    };
    /**
     * A method invoked when the menu items change.
     */
    Menu.prototype.onItemsChanged = function (old, items) {
        this.close(true);
    };
    /**
     * A method invoked when the active index changes.
     */
    Menu.prototype.onActiveIndexChanged = function (old, index) {
        var oldNode = this._itemNodeAt(old);
        var newNode = this._itemNodeAt(index);
        if (oldNode)
            oldNode.classList.remove(exports.ACTIVE_CLASS);
        if (newNode)
            newNode.classList.add(exports.ACTIVE_CLASS);
    };
    /**
     * A method invoked when a menu item should be opened.
     */
    Menu.prototype.onOpenItem = function (index, item) {
        var node = this._itemNodeAt(index) || this.node;
        this._openChildMenu(item, node, false);
        this._childMenu.activateNextItem();
    };
    /**
     * A method invoked when a menu item should be triggered.
     */
    Menu.prototype.onTriggerItem = function (index, item) {
        this.rootMenu.close();
        var handler = item.handler;
        if (handler)
            handler(item);
    };
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    Menu.prototype.onAfterAttach = function (msg) {
        this.node.addEventListener('mouseup', this);
        this.node.addEventListener('mouseleave', this);
        this.node.addEventListener('contextmenu', this);
    };
    /**
     * A message handler invoked on a `'before-detach'` message.
     */
    Menu.prototype.onBeforeDetach = function (msg) {
        this.node.removeEventListener('mouseup', this);
        this.node.removeEventListener('mouseleave', this);
        this.node.removeEventListener('contextmenu', this);
        document.removeEventListener('keydown', this, true);
        document.removeEventListener('keypress', this, true);
        document.removeEventListener('mousedown', this, true);
    };
    /**
     * A handler invoked on an `'update-request'` message.
     */
    Menu.prototype.onUpdateRequest = function (msg) {
        // Create the nodes for the menu.
        var items = this.items;
        var count = items.length;
        var nodes = new Array(count);
        for (var i = 0; i < count; ++i) {
            var node = createItemNode(items[i]);
            node.addEventListener('mouseenter', this);
            nodes[i] = node;
        }
        // Force hide the leading visible separators.
        for (var k1 = 0; k1 < count; ++k1) {
            if (items[k1].hidden) {
                continue;
            }
            if (!items[k1].isSeparatorType) {
                break;
            }
            nodes[k1].classList.add(exports.FORCE_HIDDEN_CLASS);
        }
        // Force hide the trailing visible separators.
        for (var k2 = count - 1; k2 >= 0; --k2) {
            if (items[k2].hidden) {
                continue;
            }
            if (!items[k2].isSeparatorType) {
                break;
            }
            nodes[k2].classList.add(exports.FORCE_HIDDEN_CLASS);
        }
        // Force hide the remaining consecutive visible separators.
        var hide = false;
        while (++k1 < k2) {
            if (items[k1].hidden) {
                continue;
            }
            if (hide && items[k1].isSeparatorType) {
                nodes[k1].classList.add(exports.FORCE_HIDDEN_CLASS);
            }
            else {
                hide = items[k1].isSeparatorType;
            }
        }
        // Fetch the content node.
        var content = this.node.firstChild;
        // Refresh the content node's content.
        content.textContent = '';
        for (var i = 0; i < count; ++i) {
            content.appendChild(nodes[i]);
        }
    };
    /**
     * A message handler invoked on a `'close-request'` message.
     */
    Menu.prototype.onCloseRequest = function (msg) {
        // Reset the menu state.
        this._cancelPendingOpen();
        this._cancelPendingClose();
        this.activeIndex = -1;
        // Close any open child menu.
        var childMenu = this._childMenu;
        if (childMenu) {
            this._childMenu = null;
            this._childItem = null;
            childMenu.close(true);
        }
        // Remove this menu from any parent.
        var parentMenu = this._parentMenu;
        if (parentMenu) {
            this._parentMenu = null;
            parentMenu._cancelPendingOpen();
            parentMenu._cancelPendingClose();
            parentMenu._childMenu = null;
            parentMenu._childItem = null;
        }
        // Ensure this menu is detached.
        if (this.parent) {
            this.parent = null;
            this.closed.emit(void 0);
        }
        else if (this.isAttached) {
            phosphor_widget_1.detachWidget(this);
            this.closed.emit(void 0);
        }
        // Clear the content node.
        this.node.firstChild.textContent = '';
    };
    /**
     * Handle the `'mouseenter'` event for the menu.
     *
     * This event listener is attached to the child item nodes.
     */
    Menu.prototype._evtMouseEnter = function (event) {
        this._syncAncestors();
        this._closeChildMenu();
        this._cancelPendingOpen();
        var node = event.currentTarget;
        this.activeIndex = this._itemNodeIndex(node);
        var item = this.items[this.activeIndex];
        if (item && item.submenu) {
            if (item === this._childItem) {
                this._cancelPendingClose();
            }
            else {
                this._openChildMenu(item, node, true);
            }
        }
    };
    /**
     * Handle the `'mouseleave'` event for the menu.
     *
     * This event listener is only attached to the menu node.
     */
    Menu.prototype._evtMouseLeave = function (event) {
        this._cancelPendingOpen();
        var child = this._childMenu;
        if (!child || !phosphor_domutil_1.hitTest(child.node, event.clientX, event.clientY)) {
            this.activeIndex = -1;
            this._closeChildMenu();
        }
    };
    /**
     * Handle the `'mouseup'` event for the menu.
     *
     * This event listener is attached to the menu node.
     */
    Menu.prototype._evtMouseUp = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.button !== 0) {
            return;
        }
        var node = this._itemNodeAt(this.activeIndex);
        if (node && node.contains(event.target)) {
            this.triggerActiveItem();
        }
    };
    /**
     * Handle the `'contextmenu'` event for the menu bar.
     */
    Menu.prototype._evtContextMenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    /**
     * Handle the `'mousedown'` event for the menu.
     *
     * This event listener is attached to the document for a popup menu.
     */
    Menu.prototype._evtMouseDown = function (event) {
        var menu = this;
        var hit = false;
        var x = event.clientX;
        var y = event.clientY;
        while (!hit && menu) {
            hit = phosphor_domutil_1.hitTest(menu.node, x, y);
            menu = menu._childMenu;
        }
        if (!hit)
            this.close(true);
    };
    /**
     * Handle the `'keydown'` event for the menu.
     *
     * This event listener is attached to the document for a popup menu.
     */
    Menu.prototype._evtKeyDown = function (event) {
        event.stopPropagation();
        var leaf = this.leafMenu;
        switch (event.keyCode) {
            case 13:
                event.preventDefault();
                leaf.triggerActiveItem();
                break;
            case 27:
                event.preventDefault();
                leaf.close(true);
                break;
            case 37:
                event.preventDefault();
                if (leaf !== this)
                    leaf.close(true);
                break;
            case 38:
                event.preventDefault();
                leaf.activatePreviousItem();
                break;
            case 39:
                event.preventDefault();
                leaf.openActiveItem();
                break;
            case 40:
                event.preventDefault();
                leaf.activateNextItem();
                break;
        }
    };
    /**
     * Handle the `'keypress'` event for the menu.
     *
     * This event listener is attached to the document for a popup menu.
     */
    Menu.prototype._evtKeyPress = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.leafMenu.activateMnemonicItem(String.fromCharCode(event.charCode));
    };
    /**
     * Synchronize the active item hierarchy starting with the parent.
     *
     * This ensures that the proper child items are activated for the
     * ancestor menu hierarchy and that any pending open or close
     * tasks are cleared.
     */
    Menu.prototype._syncAncestors = function () {
        var menu = this._parentMenu;
        while (menu) {
            menu._syncChildItem();
            menu = menu._parentMenu;
        }
    };
    /**
     * Synchronize the active index with the current child item.
     */
    Menu.prototype._syncChildItem = function () {
        this._cancelPendingOpen();
        this._cancelPendingClose();
        this.activeIndex = this.items.indexOf(this._childItem);
    };
    /**
     * Open the menu item's submenu using the node for location.
     *
     * If the given item is already open, this is a no-op.
     *
     * Any pending open operation will be cancelled before opening
     * the menu or queueing the delayed task to open the menu.
     */
    Menu.prototype._openChildMenu = function (item, node, delayed) {
        var _this = this;
        if (item === this._childItem) {
            return;
        }
        this._cancelPendingOpen();
        if (delayed) {
            this._openTimerId = setTimeout(function () {
                var menu = item.submenu;
                _this._openTimerId = 0;
                _this._childItem = item;
                _this._childMenu = menu;
                menu._parentMenu = _this;
                menu.update(true);
                openSubmenu(menu, node);
            }, OPEN_DELAY);
        }
        else {
            var menu = item.submenu;
            this._childItem = item;
            this._childMenu = menu;
            menu._parentMenu = this;
            menu.update(true);
            openSubmenu(menu, node);
        }
    };
    /**
     * Close the currently open child menu using a delayed task.
     *
     * If a task is pending or if there is no child menu, this is a no-op.
     */
    Menu.prototype._closeChildMenu = function () {
        var _this = this;
        if (this._closeTimerId || !this._childMenu) {
            return;
        }
        this._closeTimerId = setTimeout(function () {
            _this._closeTimerId = 0;
            if (_this._childMenu) {
                _this._childMenu.close(true);
                _this._childMenu = null;
                _this._childItem = null;
            }
        }, CLOSE_DELAY);
    };
    /**
     * Cancel any pending child menu open task.
     */
    Menu.prototype._cancelPendingOpen = function () {
        if (this._openTimerId) {
            clearTimeout(this._openTimerId);
            this._openTimerId = 0;
        }
    };
    /**
     * Cancel any pending child menu close task.
     */
    Menu.prototype._cancelPendingClose = function () {
        if (this._closeTimerId) {
            clearTimeout(this._closeTimerId);
            this._closeTimerId = 0;
        }
    };
    /**
     * Get the menu item node at the given index.
     *
     * This will return `undefined` if the index is out of range.
     */
    Menu.prototype._itemNodeAt = function (index) {
        var content = this.node.firstChild;
        return content.children[index];
    };
    /**
     * Get the index of the given menu item node.
     *
     * This will return `-1` if the menu item node is not found.
     */
    Menu.prototype._itemNodeIndex = function (node) {
        var content = this.node.firstChild;
        return Array.prototype.indexOf.call(content.children, node);
    };
    /**
     * A signal emitted when the menu is closed.
     *
     * **See also:** [[closed]]
     */
    Menu.closedSignal = new phosphor_signaling_1.Signal();
    return Menu;
})(menubase_1.MenuBase);
exports.Menu = Menu;
/**
 * Create a menu item from a template.
 */
function createMenuItem(template) {
    return menuitem_1.MenuItem.fromTemplate(template);
}
/**
 * Create the complete DOM node class name for a MenuItem.
 */
function createItemClassName(item) {
    var parts = [exports.MENU_ITEM_CLASS];
    if (item.isCheckType) {
        parts.push(exports.CHECK_TYPE_CLASS);
    }
    else if (item.isSeparatorType) {
        parts.push(exports.SEPARATOR_TYPE_CLASS);
    }
    if (item.checked) {
        parts.push(exports.CHECKED_CLASS);
    }
    if (item.disabled) {
        parts.push(exports.DISABLED_CLASS);
    }
    if (item.hidden) {
        parts.push(exports.HIDDEN_CLASS);
    }
    if (item.submenu) {
        parts.push(exports.HAS_SUBMENU_CLASS);
    }
    if (item.className) {
        parts.push(item.className);
    }
    return parts.join(' ');
}
/**
 * Create the DOM node for a MenuItem.
 */
function createItemNode(item) {
    var node = document.createElement('div');
    var icon = document.createElement('span');
    var text = document.createElement('span');
    var shortcut = document.createElement('span');
    var submenu = document.createElement('span');
    node.className = createItemClassName(item);
    icon.className = exports.ICON_CLASS;
    text.className = exports.TEXT_CLASS;
    shortcut.className = exports.SHORTCUT_CLASS;
    submenu.className = exports.SUBMENU_ICON_CLASS;
    if (!item.isSeparatorType) {
        text.textContent = item.text.replace(/&/g, '');
        shortcut.textContent = item.shortcut;
    }
    node.appendChild(icon);
    node.appendChild(text);
    node.appendChild(shortcut);
    node.appendChild(submenu);
    return node;
}
/**
 * Get the currently visible viewport rect in page coordinates.
 */
function clientViewportRect() {
    var elem = document.documentElement;
    var x = window.pageXOffset;
    var y = window.pageYOffset;
    var width = elem.clientWidth;
    var height = elem.clientHeight;
    return { x: x, y: y, width: width, height: height };
}
/**
 * Mount the menu as hidden and compute its optimal size.
 *
 * If the vertical scrollbar become visible, the menu will be expanded
 * by the scrollbar width to prevent clipping the contents of the menu.
 */
function mountAndMeasure(menu, maxHeight) {
    var node = menu.node;
    var style = node.style;
    style.top = '';
    style.left = '';
    style.width = '';
    style.height = '';
    style.visibility = 'hidden';
    style.maxHeight = maxHeight + 'px';
    phosphor_widget_1.attachWidget(menu, document.body);
    if (node.scrollHeight > maxHeight) {
        style.width = 2 * node.offsetWidth - node.clientWidth + 'px';
    }
    var rect = node.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
}
/**
 * Show the menu at the specified position.
 */
function showMenu(menu, x, y) {
    var style = menu.node.style;
    style.top = Math.max(0, y) + 'px';
    style.left = Math.max(0, x) + 'px';
    style.visibility = '';
}
/**
 * Open the menu as a root menu at the target location.
 */
function openRootMenu(menu, x, y, forceX, forceY) {
    var rect = clientViewportRect();
    var size = mountAndMeasure(menu, rect.height - (forceY ? y : 0));
    if (!forceX && (x + size.width > rect.x + rect.width)) {
        x = rect.x + rect.width - size.width;
    }
    if (!forceY && (y + size.height > rect.y + rect.height)) {
        if (y > rect.y + rect.height) {
            y = rect.y + rect.height - size.height;
        }
        else {
            y = y - size.height;
        }
    }
    showMenu(menu, x, y);
}
/**
 * Open a the menu as a submenu using the item node for positioning.
 */
function openSubmenu(menu, item) {
    var rect = clientViewportRect();
    var size = mountAndMeasure(menu, rect.height);
    var box = phosphor_domutil_1.boxSizing(menu.node);
    var itemRect = item.getBoundingClientRect();
    var x = itemRect.right - SUBMENU_OVERLAP;
    var y = itemRect.top - box.borderTop - box.paddingTop;
    if (x + size.width > rect.x + rect.width) {
        x = itemRect.left + SUBMENU_OVERLAP - size.width;
    }
    if (y + size.height > rect.y + rect.height) {
        y = itemRect.bottom + box.borderBottom + box.paddingBottom - size.height;
    }
    showMenu(menu, x, y);
}

},{"./menubase":12,"./menuitem":13,"phosphor-domutil":7,"phosphor-signaling":18,"phosphor-widget":30}],11:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_domutil_1 = require('phosphor-domutil');
var phosphor_properties_1 = require('phosphor-properties');
var menubase_1 = require('./menubase');
var menuitem_1 = require('./menuitem');
/**
 * `p-MenuBar`: the class name added to a menu bar widget.
 */
exports.MENU_BAR_CLASS = 'p-MenuBar';
/**
 * `p-MenuBar-content`: the class name assigned to a content node.
 */
exports.CONTENT_CLASS = 'p-MenuBar-content';
/**
 * `p-MenuBar-menu`: the class name added to an open menu.
 */
exports.MENU_CLASS = 'p-MenuBar-menu';
/**
 * `p-MenuBar-item`: the class name assigned to a menu item.
 */
exports.MENU_ITEM_CLASS = 'p-MenuBar-item';
/**
 * `p-MenuBar-item-icon`: the class name added to an item icon cell.
 */
exports.ICON_CLASS = 'p-MenuBar-item-icon';
/**
 * `p-MenuBar-item-text`: the class name added to an item text cell.
 */
exports.TEXT_CLASS = 'p-MenuBar-item-text';
/**
 * `p-mod-separator-type`: the class name added to a separator item.
 */
exports.SEPARATOR_TYPE_CLASS = 'p-mod-separator-type';
/**
 * `p-mod-active`: the class name added to an active menu bar and item.
 */
exports.ACTIVE_CLASS = 'p-mod-active';
/**
 * `p-mod-disabled`: the class name added to a disabled item.
 */
exports.DISABLED_CLASS = 'p-mod-disabled';
/**
 * `p-mod-hidden`: the class name added to a hidden item.
 */
exports.HIDDEN_CLASS = 'p-mod-hidden';
/**
 * `p-mod-force-hidden`: the class name added to a force hidden item.
 */
exports.FORCE_HIDDEN_CLASS = 'p-mod-force-hidden';
/**
 * A widget which displays menu items as a menu bar.
 *
 * #### Notes
 * A `MenuBar` widget does not support child widgets. Adding children
 * to a `MenuBar` will result in undefined behavior.
 */
var MenuBar = (function (_super) {
    __extends(MenuBar, _super);
    /**
     * Construct a new menu bar.
     */
    function MenuBar() {
        _super.call(this);
        this._active = false;
        this._childMenu = null;
        this.addClass(exports.MENU_BAR_CLASS);
    }
    /**
     * Create the DOM node for a menu bar.
     */
    MenuBar.createNode = function () {
        var node = document.createElement('div');
        var content = document.createElement('div');
        content.className = exports.CONTENT_CLASS;
        node.appendChild(content);
        return node;
    };
    /**
     * A convenience method to create a menu bar from a template.
     *
     * @param array - The menu item templates for the menu bar.
     *
     * @returns A new menu bar created from the menu item templates.
     *
     * #### Notes
     * Submenu templates will be recursively created using the
     * `Menu.fromTemplate` method. If custom menus or menu items
     * are required, use the relevant constructors directly.
     */
    MenuBar.fromTemplate = function (array) {
        var bar = new MenuBar();
        bar.items = array.map(createMenuItem);
        return bar;
    };
    /**
     * Dispose of the resources held by the panel.
     */
    MenuBar.prototype.dispose = function () {
        this._reset();
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(MenuBar.prototype, "childMenu", {
        /**
         * Get the child menu of the menu bar.
         *
         * #### Notes
         * This will be `null` if the menu bar does not have an open menu.
         */
        get: function () {
            return this._childMenu;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handle the DOM events for the menu bar.
     *
     * @param event - The DOM event sent to the menu bar.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the menu's DOM nodes. It should
     * not be called directly by user code.
     */
    MenuBar.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'mousemove':
                this._evtMouseMove(event);
                break;
            case 'mouseleave':
                this._evtMouseLeave(event);
                break;
            case 'contextmenu':
                this._evtContextMenu(event);
                break;
            case 'keydown':
                this._evtKeyDown(event);
                break;
            case 'keypress':
                this._evtKeyPress(event);
                break;
        }
    };
    /**
     * A method invoked when the menu items change.
     */
    MenuBar.prototype.onItemsChanged = function (old, items) {
        for (var i = 0, n = old.length; i < n; ++i) {
            phosphor_properties_1.Property.getChanged(old[i]).disconnect(this._onItemChanged, this);
        }
        for (var i = 0, n = items.length; i < n; ++i) {
            phosphor_properties_1.Property.getChanged(items[i]).connect(this._onItemChanged, this);
        }
        this.update(true);
    };
    /**
     * A method invoked when the active index changes.
     */
    MenuBar.prototype.onActiveIndexChanged = function (old, index) {
        var oldNode = this._itemNodeAt(old);
        var newNode = this._itemNodeAt(index);
        if (oldNode)
            oldNode.classList.remove(exports.ACTIVE_CLASS);
        if (newNode)
            newNode.classList.add(exports.ACTIVE_CLASS);
    };
    /**
     * A method invoked when a menu item should be opened.
     */
    MenuBar.prototype.onOpenItem = function (index, item) {
        var node = this._itemNodeAt(index) || this.node;
        this._activate();
        this._closeChildMenu();
        this._openChildMenu(item.submenu, node);
    };
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    MenuBar.prototype.onAfterAttach = function (msg) {
        this.node.addEventListener('mousedown', this);
        this.node.addEventListener('mousemove', this);
        this.node.addEventListener('mouseleave', this);
        this.node.addEventListener('contextmenu', this);
    };
    /**
     * A message handler invoked on a `'before-detach'` message.
     */
    MenuBar.prototype.onBeforeDetach = function (msg) {
        this.node.removeEventListener('mousedown', this);
        this.node.removeEventListener('mousemove', this);
        this.node.removeEventListener('mouseleave', this);
        this.node.removeEventListener('contextmenu', this);
    };
    /**
     * A handler invoked on an `'update-request'` message.
     */
    MenuBar.prototype.onUpdateRequest = function (msg) {
        // Reset the state of the menu bar.
        this._reset();
        // Create the nodes for the menu bar.
        var items = this.items;
        var count = items.length;
        var nodes = new Array(count);
        for (var i = 0; i < count; ++i) {
            nodes[i] = createItemNode(items[i]);
        }
        // Force hide the leading visible separators.
        for (var k1 = 0; k1 < count; ++k1) {
            if (items[k1].hidden) {
                continue;
            }
            if (!items[k1].isSeparatorType) {
                break;
            }
            nodes[k1].classList.add(exports.FORCE_HIDDEN_CLASS);
        }
        // Force hide the trailing visible separators.
        for (var k2 = count - 1; k2 >= 0; --k2) {
            if (items[k2].hidden) {
                continue;
            }
            if (!items[k2].isSeparatorType) {
                break;
            }
            nodes[k2].classList.add(exports.FORCE_HIDDEN_CLASS);
        }
        // Force hide the remaining consecutive visible separators.
        var hide = false;
        while (++k1 < k2) {
            if (items[k1].hidden) {
                continue;
            }
            if (hide && items[k1].isSeparatorType) {
                nodes[k1].classList.add(exports.FORCE_HIDDEN_CLASS);
            }
            else {
                hide = items[k1].isSeparatorType;
            }
        }
        // Fetch the content node.
        var content = this.node.firstChild;
        // Refresh the content node's content.
        content.textContent = '';
        for (var i = 0; i < count; ++i) {
            content.appendChild(nodes[i]);
        }
    };
    /**
     * A message handler invoked on a `'close-request'` message.
     */
    MenuBar.prototype.onCloseRequest = function (msg) {
        this._reset();
        _super.prototype.onCloseRequest.call(this, msg);
    };
    /**
     * Handle the `'mousedown'` event for the menu bar.
     */
    MenuBar.prototype._evtMouseDown = function (event) {
        var x = event.clientX;
        var y = event.clientY;
        // If the bar is active and the mouse press is on an open menu,
        // let that menu handle the press. The bar will reset when the
        // menu emits its `closed` signal.
        if (this._active && hitTestMenus(this._childMenu, x, y)) {
            return;
        }
        // Check if the mouse was pressed on one of the menu items.
        var i = this._hitTestItemNodes(x, y);
        // If the bar is active, deactivate it and close the child menu.
        // The active index is updated to reflect the mouse press, which
        // is either valid, or `-1`.
        if (this._active) {
            this._deactivate();
            this._closeChildMenu();
            this.activeIndex = i;
            return;
        }
        // At this point, the bar is not active. If the mouse press
        // was not on a menu item, clear the active index and return.
        if (i === -1) {
            this.activeIndex = -1;
            return;
        }
        // Otherwise, the press was on a menu item. Activate the bar,
        // update the active index, and open the menu item if possible.
        this._activate();
        this.activeIndex = i;
        this.openActiveItem();
    };
    /**
     * Handle the `'mousemove'` event for the menu bar.
     */
    MenuBar.prototype._evtMouseMove = function (event) {
        var x = event.clientX;
        var y = event.clientY;
        // Check if the mouse is over one of the menu items.
        var i = this._hitTestItemNodes(x, y);
        // Bail early if the active index will not change.
        if (i === this.activeIndex) {
            return;
        }
        // Bail early if the bar is active and the mouse is not over an
        // item. This allows the leading and trailing menus to be kept
        // open when the mouse is over the empty part of the menu bar.
        if (i === -1 && this._active) {
            return;
        }
        // Update the active index to the hovered item.
        this.activeIndex = i;
        // If the bar is not active, there's nothing more to do.
        if (!this._active) {
            return;
        }
        // Otherwise, close the current child menu and open the new one.
        this._closeChildMenu();
        this.openActiveItem();
    };
    /**
     * Handle the `'mouseleave'` event for the menu bar.
     */
    MenuBar.prototype._evtMouseLeave = function (event) {
        if (!this._active)
            this.activeIndex = -1;
    };
    /**
     * Handle the `'contextmenu'` event for the menu bar.
     */
    MenuBar.prototype._evtContextMenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    /**
     * Handle the `'keydown'` event for the menu bar.
     */
    MenuBar.prototype._evtKeyDown = function (event) {
        event.stopPropagation();
        var menu = this._childMenu;
        var leaf = menu && menu.leafMenu;
        switch (event.keyCode) {
            case 13:
                event.preventDefault();
                if (leaf)
                    leaf.triggerActiveItem();
                break;
            case 27:
                event.preventDefault();
                if (leaf)
                    leaf.close(true);
                break;
            case 37:
                event.preventDefault();
                if (leaf && leaf !== menu) {
                    leaf.close(true);
                }
                else {
                    this._closeChildMenu();
                    this.activatePreviousItem();
                    this.openActiveItem();
                }
                break;
            case 38:
                event.preventDefault();
                if (leaf)
                    leaf.activatePreviousItem();
                break;
            case 39:
                event.preventDefault();
                if (leaf && activeHasMenu(leaf)) {
                    leaf.openActiveItem();
                }
                else {
                    this._closeChildMenu();
                    this.activateNextItem();
                    this.openActiveItem();
                }
                break;
            case 40:
                event.preventDefault();
                if (leaf)
                    leaf.activateNextItem();
                break;
        }
    };
    /**
     * Handle the `'keypress'` event for the menu bar.
     */
    MenuBar.prototype._evtKeyPress = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var str = String.fromCharCode(event.charCode);
        (this._childMenu || this).activateMnemonicItem(str);
    };
    /**
     * Open the child menu using the given item node for location.
     */
    MenuBar.prototype._openChildMenu = function (menu, node) {
        var rect = node.getBoundingClientRect();
        this._childMenu = menu;
        menu.addClass(exports.MENU_CLASS);
        menu.open(rect.left, rect.bottom, false, true);
        menu.closed.connect(this._onMenuClosed, this);
    };
    /**
     * Close the current child menu, if one exists.
     */
    MenuBar.prototype._closeChildMenu = function () {
        var menu = this._childMenu;
        if (menu) {
            this._childMenu = null;
            menu.closed.disconnect(this._onMenuClosed, this);
            menu.removeClass(exports.MENU_CLASS);
            menu.close(true);
        }
    };
    /**
     * Activate the menu bar and switch the mouse listeners to global.
     *
     * The listeners are switched after the current event dispatch is
     * complete. Otherwise, duplicate event notifications could occur.
     */
    MenuBar.prototype._activate = function () {
        var _this = this;
        if (this._active) {
            return;
        }
        this._active = true;
        this.addClass(exports.ACTIVE_CLASS);
        setTimeout(function () {
            _this.node.removeEventListener('mousedown', _this);
            document.addEventListener('mousedown', _this, true);
            document.addEventListener('keydown', _this, true);
            document.addEventListener('keypress', _this, true);
        }, 0);
    };
    /**
     * Deactivate the menu bar switch the mouse listeners to local.
     *
     * The listeners are switched after the current event dispatch is
     * complete. Otherwise, duplicate event notifications could occur.
     */
    MenuBar.prototype._deactivate = function () {
        var _this = this;
        if (!this._active) {
            return;
        }
        this._active = false;
        this.removeClass(exports.ACTIVE_CLASS);
        setTimeout(function () {
            _this.node.addEventListener('mousedown', _this);
            document.removeEventListener('mousedown', _this, true);
            document.removeEventListener('keydown', _this, true);
            document.removeEventListener('keypress', _this, true);
        }, 0);
    };
    /**
     * Reset the menu bar to its default state.
     */
    MenuBar.prototype._reset = function () {
        this._deactivate();
        this._closeChildMenu();
        this.activeIndex = -1;
    };
    /**
     * Get the menu item node at the given index.
     *
     * This will return `undefined` if the index is out of range.
     */
    MenuBar.prototype._itemNodeAt = function (index) {
        var content = this.node.firstChild;
        return content.children[index];
    };
    /**
     * Get the index of the menu item node at a client position.
     *
     * This will return `-1` if the menu item node is not found.
     */
    MenuBar.prototype._hitTestItemNodes = function (x, y) {
        var nodes = this.node.firstChild.children;
        for (var i = 0, n = nodes.length; i < n; ++i) {
            if (phosphor_domutil_1.hitTest(nodes[i], x, y))
                return i;
        }
        return -1;
    };
    /**
     * Handle the `closed` signal from the child menu.
     */
    MenuBar.prototype._onMenuClosed = function (sender) {
        sender.closed.disconnect(this._onMenuClosed, this);
        sender.removeClass(exports.MENU_CLASS);
        this._childMenu = null;
        this._reset();
    };
    /**
     * Handle the property changed signal from a menu item.
     */
    MenuBar.prototype._onItemChanged = function (sender) {
        this.update();
    };
    return MenuBar;
})(menubase_1.MenuBase);
exports.MenuBar = MenuBar;
/**
 * Create a menu item from a template.
 */
function createMenuItem(template) {
    return menuitem_1.MenuItem.fromTemplate(template);
}
/**
 * Create the complete DOM node class name for a MenuItem.
 */
function createItemClassName(item) {
    var parts = [exports.MENU_ITEM_CLASS];
    if (item.isSeparatorType) {
        parts.push(exports.SEPARATOR_TYPE_CLASS);
    }
    if (item.disabled) {
        parts.push(exports.DISABLED_CLASS);
    }
    if (item.hidden) {
        parts.push(exports.HIDDEN_CLASS);
    }
    if (item.className) {
        parts.push(item.className);
    }
    return parts.join(' ');
}
/**
 * Create the DOM node for a MenuItem.
 */
function createItemNode(item) {
    var node = document.createElement('div');
    var icon = document.createElement('span');
    var text = document.createElement('span');
    node.className = createItemClassName(item);
    icon.className = exports.ICON_CLASS;
    text.className = exports.TEXT_CLASS;
    if (!item.isSeparatorType) {
        text.textContent = item.text.replace(/&/g, '');
    }
    node.appendChild(icon);
    node.appendChild(text);
    return node;
}
/**
 * Test whether a menu's active item has a submenu.
 */
function activeHasMenu(menu) {
    var item = menu.items[menu.activeIndex];
    return !!(item && item.submenu);
}
/**
 * Hit test the chain menus for the given client position.
 */
function hitTestMenus(menu, x, y) {
    while (menu) {
        if (phosphor_domutil_1.hitTest(menu.node, x, y)) {
            return true;
        }
        menu = menu.childMenu;
    }
    return false;
}

},{"./menubase":12,"./menuitem":13,"phosphor-domutil":7,"phosphor-properties":16}],12:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var arrays = require('phosphor-arrays');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_widget_1 = require('phosphor-widget');
/**
 * A base class for implementing widgets which display menu items.
 */
var MenuBase = (function (_super) {
    __extends(MenuBase, _super);
    function MenuBase() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(MenuBase.prototype, "items", {
        /**
         * Get the array of menu items.
         *
         * #### Notes
         * This is a pure delegate to the [[itemsProperty]].
         */
        get: function () {
            return MenuBase.itemsProperty.get(this);
        },
        /**
         * Set the array of menu items.
         *
         * #### Notes
         * This is a pure delegate to the [[itemsProperty]].
         */
        set: function (value) {
            MenuBase.itemsProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuBase.prototype, "activeIndex", {
        /**
         * Get index of the active menu item.
         *
         * #### Notes
         * This is a pure delegate to the [[activeIndexProperty]].
         */
        get: function () {
            return MenuBase.activeIndexProperty.get(this);
        },
        /**
         * Set index of the active menu item.
         *
         * #### Notes
         * This is a pure delegate to the [[activeIndexProperty]].
         */
        set: function (value) {
            MenuBase.activeIndexProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Activate the next selectable menu item.
     *
     * #### Notes
     * The search starts with the currently active item, and progresses
     * forward until the next selectable item is found. The search will
     * wrap around at the end of the menu.
     */
    MenuBase.prototype.activateNextItem = function () {
        var k = this.activeIndex + 1;
        var i = k >= this.items.length ? 0 : k;
        this.activeIndex = arrays.findIndex(this.items, isSelectable, i, true);
    };
    /**
     * Activate the previous selectable menu item.
     *
     * #### Notes
     * The search starts with the currently active item, and progresses
     * backward until the next selectable item is found. The search will
     * wrap around at the front of the menu.
     */
    MenuBase.prototype.activatePreviousItem = function () {
        var k = this.activeIndex;
        var i = k <= 0 ? this.items.length - 1 : k - 1;
        this.activeIndex = arrays.rfindIndex(this.items, isSelectable, i, true);
    };
    /**
     * Activate the next selectable menu item with the given mnemonic.
     *
     * #### Notes
     * The search starts with the currently active item, and progresses
     * forward until the next selectable item with the given mnemonic is
     * found. The search will wrap around at the end of the menu, and the
     * mnemonic matching is case-insensitive.
     */
    MenuBase.prototype.activateMnemonicItem = function (char) {
        var c = char.toUpperCase();
        var k = this.activeIndex + 1;
        var i = k >= this.items.length ? 0 : k;
        this.activeIndex = arrays.findIndex(this.items, function (item) {
            if (!isSelectable(item)) {
                return false;
            }
            var match = item.text.match(/&\w/);
            if (!match) {
                return false;
            }
            return match[0][1].toUpperCase() === c;
        }, i, true);
    };
    /**
     * Open the active menu item.
     *
     * #### Notes
     * This is a no-op if there is no active menu item, or if the active
     * menu item does not have a submenu.
     */
    MenuBase.prototype.openActiveItem = function () {
        var i = this.activeIndex;
        var item = this.items[i];
        if (item && item.submenu) {
            this.onOpenItem(i, item);
        }
    };
    /**
     * Trigger the active menu item.
     *
     * #### Notes
     * This is a no-op if there is no active menu item. If the active
     * menu item has a submenu, this is equivalent to `openActiveItem`.
     */
    MenuBase.prototype.triggerActiveItem = function () {
        var i = this.activeIndex;
        var item = this.items[i];
        if (item && item.submenu) {
            this.onOpenItem(i, item);
        }
        else if (item) {
            this.onTriggerItem(i, item);
        }
    };
    /**
     * The coerce handler for the [[activeIndexProperty]].
     *
     * #### Notes
     * Subclasses may reimplement this method as needed.
     */
    MenuBase.prototype.coerceActiveIndex = function (index) {
        var i = index | 0;
        var item = this.items[i];
        return (item && isSelectable(item)) ? i : -1;
    };
    /**
     * A method invoked when the menu items change.
     *
     * The default implementation of this method is a no-op.
     */
    MenuBase.prototype.onItemsChanged = function (old, items) { };
    /**
     * A method invoked when the active index changes.
     *
     * The default implementation of this method is a no-op.
     */
    MenuBase.prototype.onActiveIndexChanged = function (old, index) { };
    /**
     * A method invoked when a menu item should be opened.
     *
     * The default implementation of this handler is a no-op.
     */
    MenuBase.prototype.onOpenItem = function (index, item) { };
    /**
     * A method invoked when a menu item should be triggered.
     *
     * The default implementation of this handler is a no-op.
     */
    MenuBase.prototype.onTriggerItem = function (index, item) { };
    /**
     * The property descriptor for the menu items.
     *
     * This controls the items which are contained in the menu.
     *
     * #### Notes
     * In-place modifications to the array are not allowed.
     *
     * **See also:** [[items]]
     */
    MenuBase.itemsProperty = new phosphor_properties_1.Property({
        value: Object.freeze([]),
        coerce: function (owner, value) { return Object.freeze(value ? value.slice() : []); },
        changed: function (owner, old, value) { return owner.onItemsChanged(old, value); },
    });
    /**
     * The property descriptor for the active index.
     *
     * This controls which menu item is the active item.
     *
     * **See also:** [[activeIndex]]
     */
    MenuBase.activeIndexProperty = new phosphor_properties_1.Property({
        value: -1,
        coerce: function (owner, index) { return owner.coerceActiveIndex(index); },
        changed: function (owner, old, index) { return owner.onActiveIndexChanged(old, index); },
    });
    return MenuBase;
})(phosphor_widget_1.Widget);
exports.MenuBase = MenuBase;
/**
 * Test whether a menu item is selectable.
 */
function isSelectable(item) {
    return !item.hidden && !item.disabled && !item.isSeparatorType;
}

},{"phosphor-arrays":4,"phosphor-properties":16,"phosphor-widget":30}],13:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var phosphor_properties_1 = require('phosphor-properties');
var menu_1 = require('./menu');
/**
 * An item which can be added to a menu or menu bar.
 */
var MenuItem = (function () {
    /**
     * Construct a new menu item.
     *
     * @param options - The initialization options for the menu item.
     */
    function MenuItem(options) {
        if (options)
            initFromOptions(this, options);
    }
    /**
     * Create a menu item from a template.
     *
     * @param template - The template object for the menu item.
     *
     * @returns A new menu item created from the template.
     *
     * #### Notes
     * If a submenu template is provided, the submenu will be created
     * by calling `Menu.fromTemplate`. If a custom menu is necessary,
     * use the `MenuItem` constructor directly.
     */
    MenuItem.fromTemplate = function (template) {
        var item = new MenuItem();
        initFromTemplate(item, template);
        return item;
    };
    Object.defineProperty(MenuItem.prototype, "type", {
        /**
         * Get the type of the menu item.
         *
         * #### Notes
         * This is a pure delegate to the [[typeProperty]].
         *
         * **See also:** [[isNormalType]], [[isCheckType]], [[isSeparatorType]]
         */
        get: function () {
            return MenuItem.typeProperty.get(this);
        },
        /**
         * Set the type of the menu item.
         *
         * #### Notes
         * This is a pure delegate to the [[typeProperty]].
         */
        set: function (value) {
            MenuItem.typeProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "text", {
        /**
         * Get the text for the menu item.
         *
         * #### Notes
         * This is a pure delegate to the [[textProperty]].
         */
        get: function () {
            return MenuItem.textProperty.get(this);
        },
        /**
         * Set the text for the menu item.
         *
         * #### Notes
         * This is a pure delegate to the [[textProperty]].
         */
        set: function (value) {
            MenuItem.textProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "shortcut", {
        /**
         * Get the shortcut key for the menu item (decoration only).
         *
         * #### Notes
         * This is a pure delegate to the [[shortcutProperty]].
         */
        get: function () {
            return MenuItem.shortcutProperty.get(this);
        },
        /**
         * Set the shortcut key for the menu item (decoration only).
         *
         * #### Notes
         * This is a pure delegate to the [[shortcutProperty]].
         */
        set: function (value) {
            MenuItem.shortcutProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "disabled", {
        /**
         * Get whether the menu item is disabled.
         *
         * #### Notes
         * This is a pure delegate to the [[disabledProperty]].
         */
        get: function () {
            return MenuItem.disabledProperty.get(this);
        },
        /**
         * Set whether the menu item is disabled.
         *
         * #### Notes
         * This is a pure delegate to the [[disabledProperty]].
         */
        set: function (value) {
            MenuItem.disabledProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "hidden", {
        /**
         * Get whether the menu item is hidden.
         *
         * #### Notes
         * This is a pure delegate to the [[hiddenProperty]].
         */
        get: function () {
            return MenuItem.hiddenProperty.get(this);
        },
        /**
         * Set whether the menu item is hidden.
         *
         * #### Notes
         * This is a pure delegate to the [[hiddenProperty]].
         */
        set: function (value) {
            MenuItem.hiddenProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "checked", {
        /**
         * Get whether the menu item is checked.
         *
         * #### Notes
         * This is a pure delegate to the [[checkedProperty]].
         */
        get: function () {
            return MenuItem.checkedProperty.get(this);
        },
        /**
         * Set whether the menu item is checked.
         *
         * #### Notes
         * This is a pure delegate to the [[checkedProperty]].
         */
        set: function (value) {
            MenuItem.checkedProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "className", {
        /**
         * Get the extra class name for the menu item.
         *
         * #### Notes
         * This is a pure delegate to the [[classNameProperty]].
         */
        get: function () {
            return MenuItem.classNameProperty.get(this);
        },
        /**
         * Set the extra class name for the menu item.
         *
         * #### Notes
         * This is a pure delegate to the [[classNameProperty]].
         */
        set: function (value) {
            MenuItem.classNameProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "handler", {
        /**
         * Get the handler for the menu item.
         *
         * #### Notes
         * This is a pure delegate to the [[handlerProperty]].
         */
        get: function () {
            return MenuItem.handlerProperty.get(this);
        },
        /**
         * Set the handler for the menu item.
         *
         * #### Notes
         * This is a pure delegate to the [[handlerProperty]].
         */
        set: function (value) {
            MenuItem.handlerProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "submenu", {
        /**
         * Get the submenu for the menu item.
         *
         * #### Notes
         * This is a pure delegate to the [[submenuProperty]].
         */
        get: function () {
            return MenuItem.submenuProperty.get(this);
        },
        /**
         * Set the submenu for the menu item.
         *
         * #### Notes
         * This is a pure delegate to the [[submenuProperty]].
         */
        set: function (value) {
            MenuItem.submenuProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "isNormalType", {
        /**
         * Test whether the menu item is a `'normal'` type.
         *
         * #### Notes
         * This is a read-only property.
         *
         * **See also:** [[type]], [[isCheckType]], [[isSeparatorType]]
         */
        get: function () {
            return this.type === 'normal';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "isCheckType", {
        /**
         * Test whether the menu item is a `'check'` type.
         *
         * #### Notes
         * This is a read-only property.
         *
         * **See also:** [[type]], [[isNormalType]], [[isSeparatorType]]
         */
        get: function () {
            return this.type === 'check';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "isSeparatorType", {
        /**
         * Test whether the menu item is a `'separator'` type.
         *
         * #### Notes
         * This is a read-only property.
         *
         * **See also:** [[type]], [[isNormalType]], [[isCheckType]]
         */
        get: function () {
            return this.type === 'separator';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The property descriptor for the menu item type.
     *
     * Valid types are: `'normal'`, `'check'`, and `'separator'`.
     *
     * #### Notes
     * If an invalid type is provided, a warning will be logged and a
     * `'normal'` type will be used instead.
     *
     * The default value is `'normal'`.
     *
     * Using a string for this value instead of an enum makes it easier
     * to create menu items from a JSON specification. For the type-safe
     * crowd, read-only getters are provided to assert the item type.
     *
     * **See also:** [[type]]
     */
    MenuItem.typeProperty = new phosphor_properties_1.Property({
        value: 'normal',
        coerce: coerceMenuItemType,
        changed: function (owner) { return MenuItem.checkedProperty.coerce(owner); },
    });
    /**
     * The property descriptor for the menu item text.
     *
     * The text may have an ampersand `&` before the character
     * to use as the mnemonic for the menu item.
     *
     * **See also:** [[text]]
     */
    MenuItem.textProperty = new phosphor_properties_1.Property({
        value: '',
    });
    /**
     * The property descriptor for the menu item shortcut.
     *
     * **See also:** [[shortcut]]
     */
    MenuItem.shortcutProperty = new phosphor_properties_1.Property({
        value: '',
    });
    /**
     * The property descriptor controlling the menu item disabled state.
     *
     * **See also:** [[disabled]]
     */
    MenuItem.disabledProperty = new phosphor_properties_1.Property({
        value: false,
    });
    /**
     * The property descriptor controlling the menu item hidden state.
     *
     * **See also:** [[hidden]]
     */
    MenuItem.hiddenProperty = new phosphor_properties_1.Property({
        value: false,
    });
    /**
     * The property descriptor controlling the menu item checked state.
     *
     * #### Notes
     * Only a `'check'` type menu item can be checked.
     *
     * **See also:** [[checked]]
     */
    MenuItem.checkedProperty = new phosphor_properties_1.Property({
        value: false,
        coerce: function (owner, val) { return owner.type === 'check' ? val : false; },
    });
    /**
     * The property descriptor for the menu item class name.
     *
     * This is an extra class name which item renderers will add to
     * the DOM node which represents the menu item.
     *
     * **See also:** [[className]]
     */
    MenuItem.classNameProperty = new phosphor_properties_1.Property({
        value: '',
    });
    /**
     * The property descriptor for the item handler.
     *
     * This callback will be invoked when the menu item is triggered.
     *
     * **See also:** [[handler]]
     */
    MenuItem.handlerProperty = new phosphor_properties_1.Property({
        value: null,
        coerce: function (owner, value) { return value || null; },
    });
    /**
     * The property descriptor for the menu item submenu.
     *
     * **See also:** [[submenu]]
     */
    MenuItem.submenuProperty = new phosphor_properties_1.Property({
        value: null,
        coerce: function (owner, value) { return value || null; },
    });
    return MenuItem;
})();
exports.MenuItem = MenuItem;
/**
 * Initialize a menu item from a common options object.
 */
function initFromCommon(item, common) {
    if (common.type !== void 0) {
        item.type = common.type;
    }
    if (common.text !== void 0) {
        item.text = common.text;
    }
    if (common.shortcut !== void 0) {
        item.shortcut = common.shortcut;
    }
    if (common.disabled !== void 0) {
        item.disabled = common.disabled;
    }
    if (common.hidden !== void 0) {
        item.hidden = common.hidden;
    }
    if (common.checked !== void 0) {
        item.checked = common.checked;
    }
    if (common.className !== void 0) {
        item.className = common.className;
    }
    if (common.handler !== void 0) {
        item.handler = common.handler;
    }
}
/**
 * Initialize a menu item from a template object.
 */
function initFromTemplate(item, template) {
    initFromCommon(item, template);
    if (template.submenu !== void 0) {
        item.submenu = menu_1.Menu.fromTemplate(template.submenu);
    }
}
/**
 * Initialize a menu item from an options object.
 */
function initFromOptions(item, options) {
    initFromCommon(item, options);
    if (options.submenu !== void 0) {
        item.submenu = options.submenu;
    }
}
/**
 * The coerce handler for the menu item type.
 */
function coerceMenuItemType(item, value) {
    if (value === 'normal' || value === 'check' || value === 'separator') {
        return value;
    }
    console.warn('invalid menu item type:', value);
    return 'normal';
}

},{"./menu":10,"phosphor-properties":16}],14:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var phosphor_queue_1 = require('phosphor-queue');
/**
 * A mesage which can be sent or posted to a message handler.
 *
 * #### Notes
 * This class may be subclassed to create complex message types.
 *
 * **See Also** [[postMessage]] and [[sendMessage]].
 */
var Message = (function () {
    /**
     * Construct a new message.
     *
     * @param type - The type of the message. Consumers of a message will
     *   use this value to cast the message to the appropriately derived
     *   message type.
     */
    function Message(type) {
        this._type = type;
    }
    Object.defineProperty(Message.prototype, "type", {
        /**
         * Get the type of the message.
         */
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return Message;
})();
exports.Message = Message;
/**
 * Send a message to the message handler to process immediately.
 *
 * @param handler - The handler which should process the message.
 *
 * @param msg - The message to send to the handler.
 *
 * #### Notes
 * Unlike [[postMessage]], [[sendMessage]] delivers the message to
 * the handler immediately. The handler will not have the opportunity
 * to compress the message, however the message will still be sent
 * through any installed message filters.
 *
 * **See Also** [[postMessage]].
 */
function sendMessage(handler, msg) {
    getDispatcher(handler).sendMessage(handler, msg);
}
exports.sendMessage = sendMessage;
/**
 * Post a message to the message handler to process in the future.
 *
 * @param handler - The handler which should process the message.
 *
 * @param msg - The message to post to the handler.
 *
 * #### Notes
 * Unlike [[sendMessage]], [[postMessage]] will schedule the deliver of
 * the message for the next cycle of the event loop. The handler will
 * have the opportunity to compress the message in order to optimize
 * its handling of similar messages. The message will be sent through
 * any installed message filters before being delivered to the handler.
 *
 * **See Also** [[sendMessage]].
 */
function postMessage(handler, msg) {
    getDispatcher(handler).postMessage(handler, msg);
}
exports.postMessage = postMessage;
/**
 * Test whether a message handler has posted messages pending delivery.
 *
 * @param handler - The message handler of interest.
 *
 * @returns `true` if the handler has pending posted messages, `false`
 *   otherwise.
 *
 * **See Also** [[sendPendingMessage]].
 */
function hasPendingMessages(handler) {
    return getDispatcher(handler).hasPendingMessages();
}
exports.hasPendingMessages = hasPendingMessages;
/**
 * Send the first pending posted message to the message handler.
 *
 * @param handler - The message handler of interest.
 *
 * #### Notes
 * If the handler has no pending messages, this is a no-op.
 *
 * **See Also** [[hasPendingMessages]].
 */
function sendPendingMessage(handler) {
    getDispatcher(handler).sendPendingMessage(handler);
}
exports.sendPendingMessage = sendPendingMessage;
/**
 * Install a message filter for a message handler.
 *
 * A message filter is invoked before the message handler processes a
 * message. If the filter returns `true` from its [[filterMessage]] method,
 * no other filters will be invoked, and the message will not be delivered.
 *
 * The most recently installed message filter is executed first.
 *
 * @param handler - The handler whose messages should be filtered.
 *
 * @param filter - The filter to install for the handler.
 *
 * #### Notes
 * It is possible to install the same filter multiple times. If the
 * filter should be unique, call [[removeMessageFilter]] first.
 *
 * **See Also** [[removeMessageFilter]].
 */
function installMessageFilter(handler, filter) {
    getDispatcher(handler).installMessageFilter(filter);
}
exports.installMessageFilter = installMessageFilter;
/**
 * Remove a previously installed message filter for a message handler.
 *
 * @param handler - The handler for which the filter is installed.
 *
 * @param filter - The filter to remove.
 *
 * #### Notes
 * This will remove **all** occurrences of the filter. If the filter is
 * not installed, this is a no-op.
 *
 * It is safe to call this function while the filter is executing.
 *
 * **See Also** [[installMessageFilter]].
 */
function removeMessageFilter(handler, filter) {
    getDispatcher(handler).removeMessageFilter(filter);
}
exports.removeMessageFilter = removeMessageFilter;
/**
 * Clear all message data associated with the message handler.
 *
 * @param handler - The message handler for which to clear the data.
 *
 * #### Notes
 * This will remove all pending messages and filters for the handler.
 */
function clearMessageData(handler) {
    var dispatcher = dispatcherMap.get(handler);
    if (dispatcher)
        dispatcher.clear();
    dispatchQueue.removeAll(handler);
}
exports.clearMessageData = clearMessageData;
/**
 * The internal mapping of message handler to message dispatcher
 */
var dispatcherMap = new WeakMap();
/**
 * The internal queue of pending message handlers.
 */
var dispatchQueue = new phosphor_queue_1.Queue();
/**
 * The internal animation frame id for the message loop wake up call.
 */
var frameId = void 0;
/**
 * A local reference to an event loop hook.
 */
var raf;
if (typeof requestAnimationFrame === 'function') {
    raf = requestAnimationFrame;
}
else {
    raf = setImmediate;
}
/**
 * Get or create the message dispatcher for a message handler.
 */
function getDispatcher(handler) {
    var dispatcher = dispatcherMap.get(handler);
    if (dispatcher)
        return dispatcher;
    dispatcher = new MessageDispatcher();
    dispatcherMap.set(handler, dispatcher);
    return dispatcher;
}
/**
 * Wake up the message loop to process any pending dispatchers.
 *
 * This is a no-op if a wake up is not needed or is already pending.
 */
function wakeUpMessageLoop() {
    if (frameId === void 0 && !dispatchQueue.empty) {
        frameId = raf(runMessageLoop);
    }
}
/**
 * Run an iteration of the message loop.
 *
 * This will process all pending dispatchers in the queue. Dispatchers
 * which are added to the queue while the message loop is running will
 * be processed on the next message loop cycle.
 */
function runMessageLoop() {
    // Clear the frame id so the next wake up call can be scheduled.
    frameId = void 0;
    // If the queue is empty, there is nothing else to do.
    if (dispatchQueue.empty) {
        return;
    }
    // Add a null sentinel value to the end of the queue. The queue
    // will only be processed up to the first null value. This means
    // that messages posted during this cycle will execute on the next
    // cycle of the loop. If the last value in the array is null, it
    // means that an exception was thrown by a message handler and the
    // loop had to be restarted.
    if (dispatchQueue.back !== null) {
        dispatchQueue.push(null);
    }
    // The message dispatch loop. If the dispatcher is the null sentinel,
    // the processing of the current block of messages is complete and
    // another loop is scheduled. Otherwise, the pending message is
    // dispatched to the message handler.
    while (!dispatchQueue.empty) {
        var handler = dispatchQueue.pop();
        if (handler === null) {
            wakeUpMessageLoop();
            return;
        }
        dispatchMessage(dispatcherMap.get(handler), handler);
    }
}
/**
 * Safely process the pending handler message.
 *
 * If the message handler throws an exception, the message loop will
 * be restarted and the exception will be rethrown.
 */
function dispatchMessage(dispatcher, handler) {
    try {
        dispatcher.sendPendingMessage(handler);
    }
    catch (ex) {
        wakeUpMessageLoop();
        throw ex;
    }
}
/**
 * An internal class which manages message dispatching for a handler.
 */
var MessageDispatcher = (function () {
    function MessageDispatcher() {
        this._filters = null;
        this._messages = null;
    }
    /**
     * Send a message to the handler immediately.
     *
     * The message will first be sent through installed filters.
     */
    MessageDispatcher.prototype.sendMessage = function (handler, msg) {
        if (!this._filterMessage(handler, msg)) {
            handler.processMessage(msg);
        }
    };
    /**
     * Post a message for delivery in the future.
     *
     * The message will first be compressed if possible.
     */
    MessageDispatcher.prototype.postMessage = function (handler, msg) {
        if (!this._compressMessage(handler, msg)) {
            this._enqueueMessage(handler, msg);
        }
    };
    /**
     * Test whether the dispatcher has messages pending delivery.
     */
    MessageDispatcher.prototype.hasPendingMessages = function () {
        return !!(this._messages && !this._messages.empty);
    };
    /**
     * Send the first pending message to the message handler.
     */
    MessageDispatcher.prototype.sendPendingMessage = function (handler) {
        if (this._messages && !this._messages.empty) {
            this.sendMessage(handler, this._messages.pop());
        }
    };
    /**
     * Install a message filter for the dispatcher.
     */
    MessageDispatcher.prototype.installMessageFilter = function (filter) {
        this._filters = { next: this._filters, filter: filter };
    };
    /**
     * Remove all occurrences of a message filter from the dispatcher.
     */
    MessageDispatcher.prototype.removeMessageFilter = function (filter) {
        var link = this._filters;
        var prev = null;
        while (link !== null) {
            if (link.filter === filter) {
                link.filter = null;
            }
            else if (prev === null) {
                this._filters = link;
                prev = link;
            }
            else {
                prev.next = link;
                prev = link;
            }
            link = link.next;
        }
        if (!prev) {
            this._filters = null;
        }
        else {
            prev.next = null;
        }
    };
    /**
     * Clear all messages and filters from the dispatcher.
     */
    MessageDispatcher.prototype.clear = function () {
        if (this._messages) {
            this._messages.clear();
        }
        for (var link = this._filters; link !== null; link = link.next) {
            link.filter = null;
        }
        this._filters = null;
    };
    /**
     * Run the installed message filters for the handler.
     *
     * Returns `true` if the message was filtered, `false` otherwise.
     */
    MessageDispatcher.prototype._filterMessage = function (handler, msg) {
        for (var link = this._filters; link !== null; link = link.next) {
            if (link.filter && link.filter.filterMessage(handler, msg)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Compress the mssage for the given handler.
     *
     * Returns `true` if the message was compressed, `false` otherwise.
     */
    MessageDispatcher.prototype._compressMessage = function (handler, msg) {
        if (!handler.compressMessage) {
            return false;
        }
        if (!this._messages || this._messages.empty) {
            return false;
        }
        return handler.compressMessage(msg, this._messages);
    };
    /**
     * Enqueue the message for future delivery to the handler.
     */
    MessageDispatcher.prototype._enqueueMessage = function (handler, msg) {
        (this._messages || (this._messages = new phosphor_queue_1.Queue())).push(msg);
        dispatchQueue.push(handler);
        wakeUpMessageLoop();
    };
    return MessageDispatcher;
})();

},{"phosphor-queue":17}],15:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * A base class for creating objects which wrap a DOM node.
 */
var NodeWrapper = (function () {
    function NodeWrapper() {
        this._node = this.constructor.createNode();
    }
    /**
     * Create the DOM node for a new node wrapper instance.
     *
     * @returns The DOM node to use with the node wrapper instance.
     *
     * #### Notes
     * The default implementation creates an empty `<div>`.
     *
     * This may be reimplemented by a subclass to create a custom node.
     */
    NodeWrapper.createNode = function () {
        return document.createElement('div');
    };
    Object.defineProperty(NodeWrapper.prototype, "node", {
        /**
         * Get the DOM node managed by the wrapper.
         *
         * #### Notes
         * This property is read-only.
         */
        get: function () {
            return this._node;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeWrapper.prototype, "id", {
        /**
         * Get the id of the wrapper's DOM node.
         */
        get: function () {
            return this._node.id;
        },
        /**
         * Set the id of the wrapper's DOM node.
         */
        set: function (value) {
            this._node.id = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Test whether the wrapper's DOM node has the given class name.
     *
     * @param name - The class name of interest.
     *
     * @returns `true` if the node has the class, `false` otherwise.
     */
    NodeWrapper.prototype.hasClass = function (name) {
        return this._node.classList.contains(name);
    };
    /**
     * Add a class name to the wrapper's DOM node.
     *
     * @param name - The class name to add to the node.
     *
     * #### Notes
     * If the class name is already added to the node, this is a no-op.
     */
    NodeWrapper.prototype.addClass = function (name) {
        this._node.classList.add(name);
    };
    /**
     * Remove a class name from the wrapper's DOM node.
     *
     * @param name - The class name to remove from the node.
     *
     * #### Notes
     * If the class name is not yet added to the node, this is a no-op.
     */
    NodeWrapper.prototype.removeClass = function (name) {
        this._node.classList.remove(name);
    };
    /**
     * Toggle a class name on the wrapper's DOM node.
     *
     * @param name - The class name to toggle on the node.
     *
     * @param force - Whether to force add the class (`true`) or force
     *   remove the class (`false`). If not provided, the presence of
     *   the class will be toggled from its current state.
     *
     * @returns `true` if the class is now present, `false` otherwise.
     */
    NodeWrapper.prototype.toggleClass = function (name, force) {
        var present;
        if (force === true) {
            this.addClass(name);
            present = true;
        }
        else if (force === false) {
            this.removeClass(name);
            present = false;
        }
        else if (this.hasClass(name)) {
            this.removeClass(name);
            present = false;
        }
        else {
            this.addClass(name);
            present = true;
        }
        return present;
    };
    return NodeWrapper;
})();
exports.NodeWrapper = NodeWrapper;

},{}],16:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var phosphor_signaling_1 = require('phosphor-signaling');
/**
 * A property descriptor for a property on an object.
 *
 * Properties descriptors can be used to expose a rich interface for an
 * object which encapsulates value creation, coercion, and notification.
 * They can also be used to extend the state of an object with semantic
 * data from another class.
 *
 * #### Example
 * ```typescript
 * import { Property } from 'phosphor-properties';
 *
 * class MyClass {
 *
 *   static myValueProperty = new Property<MyClass, number>({
 *      value: 0,
 *      coerce: (owner, value) => Math.max(0, value),
 *      changed: (owner, oldValue, newValue) => { console.log(newValue); },
 *   });
 *
 *   get myValue(): number {
 *     return MyClass.myValueProperty.get(this);
 *   }
 *
 *   set myValue(value: number) {
 *     MyClass.myValueProperty.set(this, value);
 *   }
 * }
 * ```
 */
var Property = (function () {
    /**
     * Construct a new property descriptor.
     *
     * @param options - The options for initializing the property.
     */
    function Property(options) {
        if (options === void 0) { options = {}; }
        this._pid = nextPID();
        this._value = options.value;
        this._create = options.create;
        this._coerce = options.coerce;
        this._compare = options.compare;
        this._changed = options.changed;
    }
    /**
     * Get a bound [[changedSignal]] for a given property owner.
     *
     * @param owner - The object to bind to the changed signal.
     *
     * @returns The bound changed signal for the owner.
     *
     * #### Notes
     * This signal will be emitted whenever any property value
     * for the specified owner is changed.
     */
    Property.getChanged = function (owner) {
        return Property.changedSignal.bind(owner);
    };
    /**
     * Get the current value of the property for a given owner.
     *
     * @param owner - The property owner of interest.
     *
     * @returns The current value of the property.
     *
     * #### Notes
     * If the value has not yet been set, the default value will be
     * computed and assigned as the current value of the property.
     */
    Property.prototype.get = function (owner) {
        var value;
        var hash = lookupHash(owner);
        if (this._pid in hash) {
            value = hash[this._pid];
        }
        else {
            value = hash[this._pid] = this._createValue(owner);
        }
        return value;
    };
    /**
     * Set the current value of the property for a given owner.
     *
     * @param owner - The property owner of interest.
     *
     * @param value - The value for the property.
     *
     * #### Notes
     * If this operation causes the property value to change, the
     * [[changedSignal]] will be emitted with the owner as sender.
     *
     * If the value has not yet been set, the default value will be
     * computed and used as the previous value for the comparison.
     */
    Property.prototype.set = function (owner, value) {
        var oldValue;
        var hash = lookupHash(owner);
        if (this._pid in hash) {
            oldValue = hash[this._pid];
        }
        else {
            oldValue = hash[this._pid] = this._createValue(owner);
        }
        var newValue = this._coerceValue(owner, value);
        this._maybeNotify(owner, oldValue, hash[this._pid] = newValue);
    };
    /**
     * Explicitly coerce the current property value for a given owner.
     *
     * @param owner - The property owner of interest.
     *
     * #### Notes
     * If this operation causes the property value to change, the
     * [[changedSignal]] will be emitted with the owner as sender.
     *
     * If the value has not yet been set, the default value will be
     * computed and used as the previous value for the comparison.
     */
    Property.prototype.coerce = function (owner) {
        var oldValue;
        var hash = lookupHash(owner);
        if (this._pid in hash) {
            oldValue = hash[this._pid];
        }
        else {
            oldValue = hash[this._pid] = this._createValue(owner);
        }
        var newValue = this._coerceValue(owner, oldValue);
        this._maybeNotify(owner, oldValue, hash[this._pid] = newValue);
    };
    /**
     * Get or create the default value for the given owner.
     */
    Property.prototype._createValue = function (owner) {
        var create = this._create;
        return create ? create(owner) : this._value;
    };
    /**
     * Coerce the value for the given owner.
     */
    Property.prototype._coerceValue = function (owner, value) {
        var coerce = this._coerce;
        return coerce ? coerce(owner, value) : value;
    };
    /**
     * Compare the old value and new value for equality.
     */
    Property.prototype._compareValue = function (oldValue, newValue) {
        var compare = this._compare;
        return compare ? compare(oldValue, newValue) : oldValue === newValue;
    };
    /**
     * Run the change notification if the given values are different.
     */
    Property.prototype._maybeNotify = function (owner, oldValue, newValue) {
        if (!this._compareValue(oldValue, newValue)) {
            var changed = this._changed;
            if (changed)
                changed(owner, oldValue, newValue);
            Property.getChanged(owner).emit(changedArgs(this, oldValue, newValue));
        }
    };
    /**
     * A signal emitted when a property value changes.
     *
     * #### Notes
     * This is an attached signal which will be emitted using the
     * owner of the property value as the sender.
     *
     * **See also:** [[getChanged]]
     */
    Property.changedSignal = new phosphor_signaling_1.Signal();
    return Property;
})();
exports.Property = Property;
/**
 * Clear the stored property data for the given property owner.
 *
 * @param owner - The property owner of interest.
 *
 * #### Notes
 * This will clear all property values for the owner, but it will
 * **not** emit any change notifications.
 */
function clearPropertyData(owner) {
    ownerData.delete(owner);
}
exports.clearPropertyData = clearPropertyData;
/**
 * A weak mapping of property owner to property hash.
 */
var ownerData = new WeakMap();
/**
 * A function which computes successive unique property ids.
 */
var nextPID = (function () { var id = 0; return function () { return 'pid-' + id++; }; })();
/**
 * Create the changed args for the given property and values.
 */
function changedArgs(property, oldValue, newValue) {
    return { property: property, oldValue: oldValue, newValue: newValue };
}
/**
 * Lookup the data hash for the property owner.
 *
 * This will create the hash if one does not already exist.
 */
function lookupHash(owner) {
    var hash = ownerData.get(owner);
    if (hash !== void 0)
        return hash;
    hash = Object.create(null);
    ownerData.set(owner, hash);
    return hash;
}

},{"phosphor-signaling":18}],17:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * A generic FIFO queue data structure.
 *
 * #### Notes
 * This queue is implemented internally using a singly linked list and
 * can grow to arbitrary size.
 *
 * #### Example
 * ```typescript
 * var q = new Queue<number>([0, 1, 2]);
 * q.size;      // 3
 * q.empty;     // false
 * q.pop();     // 0
 * q.pop();     // 1
 * q.push(42);  // undefined
 * q.size;      // 2
 * q.pop();     // 2
 * q.pop();     // 42
 * q.pop();     // undefined
 * q.size;      // 0
 * q.empty;     // true
 * ```
 */
var Queue = (function () {
    /**
     * Construct a new queue.
     *
     * @param items - The initial items for the queue.
     */
    function Queue(items) {
        var _this = this;
        this._size = 0;
        this._front = null;
        this._back = null;
        if (items)
            items.forEach(function (item) { return _this.push(item); });
    }
    Object.defineProperty(Queue.prototype, "size", {
        /**
         * Get the number of elements in the queue.
         *
         * #### Notes
         * This has `O(1)` complexity.
         */
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "empty", {
        /**
         * Test whether the queue is empty.
         *
         * #### Notes
         * This has `O(1)` complexity.
         */
        get: function () {
            return this._size === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "front", {
        /**
         * Get the value at the front of the queue.
         *
         * #### Notes
         * This has `O(1)` complexity.
         *
         * If the queue is empty, this value will be `undefined`.
         */
        get: function () {
            return this._front !== null ? this._front.value : void 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "back", {
        /**
         * Get the value at the back of the queue.
         *
         * #### Notes
         * This has `O(1)` complexity.
         *
         * If the queue is empty, this value will be `undefined`.
         */
        get: function () {
            return this._back !== null ? this._back.value : void 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Push a value onto the back of the queue.
     *
     * @param value - The value to add to the queue.
     *
     * #### Notes
     * This has `O(1)` complexity.
     */
    Queue.prototype.push = function (value) {
        var link = { next: null, value: value };
        if (this._back === null) {
            this._front = link;
            this._back = link;
        }
        else {
            this._back.next = link;
            this._back = link;
        }
        this._size++;
    };
    /**
     * Pop and return the value at the front of the queue.
     *
     * @returns The value at the front of the queue.
     *
     * #### Notes
     * This has `O(1)` complexity.
     *
     * If the queue is empty, the return value will be `undefined`.
     */
    Queue.prototype.pop = function () {
        var link = this._front;
        if (link === null) {
            return void 0;
        }
        if (link.next === null) {
            this._front = null;
            this._back = null;
        }
        else {
            this._front = link.next;
        }
        this._size--;
        return link.value;
    };
    /**
     * Remove the first occurrence of a value from the queue.
     *
     * @param value - The value to remove from the queue.
     *
     * @returns `true` on success, `false` otherwise.
     *
     * #### Notes
     * This has `O(N)` complexity.
     */
    Queue.prototype.remove = function (value) {
        var link = this._front;
        var prev = null;
        while (link !== null) {
            if (link.value === value) {
                if (prev === null) {
                    this._front = link.next;
                }
                else {
                    prev.next = link.next;
                }
                if (link.next === null) {
                    this._back = prev;
                }
                this._size--;
                return true;
            }
            prev = link;
            link = link.next;
        }
        return false;
    };
    /**
     * Remove all occurrences of a value from the queue.
     *
     * @param value - The value to remove from the queue.
     *
     * @returns The number of occurrences removed.
     *
     * #### Notes
     * This has `O(N)` complexity.
     */
    Queue.prototype.removeAll = function (value) {
        var count = 0;
        var link = this._front;
        var prev = null;
        while (link !== null) {
            if (link.value === value) {
                count++;
                this._size--;
            }
            else if (prev === null) {
                this._front = link;
                prev = link;
            }
            else {
                prev.next = link;
                prev = link;
            }
            link = link.next;
        }
        if (!prev) {
            this._front = null;
            this._back = null;
        }
        else {
            prev.next = null;
            this._back = prev;
        }
        return count;
    };
    /**
     * Remove all values from the queue.
     *
     * #### Notes
     * This has `O(1)` complexity.
     */
    Queue.prototype.clear = function () {
        this._size = 0;
        this._front = null;
        this._back = null;
    };
    /**
     * Create an array from the values in the queue.
     *
     * @returns An array of all values in the queue.
     *
     * #### Notes
     * This has `O(N)` complexity.
     */
    Queue.prototype.toArray = function () {
        var result = new Array(this._size);
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            result[i] = link.value;
        }
        return result;
    };
    /**
     * Test whether any value in the queue passes a predicate function.
     *
     * @param pred - The predicate to apply to the values.
     *
     * @returns `true` if any value in the queue passes the predicate,
     *   or `false` otherwise.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * It is **not** safe for the predicate to modify the queue while
     * iterating.
     */
    Queue.prototype.some = function (pred) {
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            if (pred(link.value, i))
                return true;
        }
        return false;
    };
    /**
     * Test whether all values in the queue pass a predicate function.
     *
     * @param pred - The predicate to apply to the values.
     *
     * @returns `true` if all values in the queue pass the predicate,
     *   or `false` otherwise.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * It is **not** safe for the predicate to modify the queue while
     * iterating.
     */
    Queue.prototype.every = function (pred) {
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            if (!pred(link.value, i))
                return false;
        }
        return true;
    };
    /**
     * Create an array of the values which pass a predicate function.
     *
     * @param pred - The predicate to apply to the values.
     *
     * @returns The array of values which pass the predicate.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * It is **not** safe for the predicate to modify the queue while
     * iterating.
     */
    Queue.prototype.filter = function (pred) {
        var result = [];
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            if (pred(link.value, i))
                result.push(link.value);
        }
        return result;
    };
    /**
     * Create an array of mapped values for the values in the queue.
     *
     * @param callback - The map function to apply to the values.
     *
     * @returns The array of values returned by the map function.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * It is **not** safe for the callback to modify the queue while
     * iterating.
     */
    Queue.prototype.map = function (callback) {
        var result = new Array(this._size);
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            result[i] = callback(link.value, i);
        }
        return result;
    };
    /**
     * Execute a callback for each value in the queue.
     *
     * @param callback - The function to apply to the values.
     *
     * @returns The first value returned by the callback which is not
     *   `undefined`.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * Iteration will terminate immediately if the callback returns any
     * value other than `undefined`.
     *
     * It is **not** safe for the callback to modify the queue while
     * iterating.
     */
    Queue.prototype.forEach = function (callback) {
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            var result = callback(link.value, i);
            if (result !== void 0)
                return result;
        }
        return void 0;
    };
    return Queue;
})();
exports.Queue = Queue;

},{}],18:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * An object used for type-safe inter-object communication.
 *
 * Signals provide a type-safe implementation of the publish-subscribe
 * pattern. An object (publisher) declares which signals it will emit,
 * and consumers connect callbacks (subscribers) to those signals. The
 * subscribers are invoked whenever the publisher emits the signal.
 *
 * A `Signal` object must be bound to a sender in order to be useful.
 * A common pattern is to declare a `Signal` object as a static class
 * member, along with a convenience getter which binds the signal to
 * the `this` instance on-demand.
 *
 * #### Example
 * ```typescript
 * import { ISignal, Signal } from 'phosphor-signaling';
 *
 * class MyClass {
 *
 *   static valueChangedSignal = new Signal<MyClass, number>();
 *
 *   constructor(name: string) {
 *     this._name = name;
 *   }
 *
 *   get valueChanged(): ISignal<MyClass, number> {
 *     return MyClass.valueChangedSignal.bind(this);
 *   }
 *
 *   get name(): string {
 *     return this._name;
 *   }
 *
 *   get value(): number {
 *     return this._value;
 *   }
 *
 *   set value(value: number) {
 *     if (value !== this._value) {
 *       this._value = value;
 *       this.valueChanged.emit(value);
 *     }
 *   }
 *
 *   private _name: string;
 *   private _value = 0;
 * }
 *
 * function logger(sender: MyClass, value: number): void {
 *   console.log(sender.name, value);
 * }
 *
 * var m1 = new MyClass('foo');
 * var m2 = new MyClass('bar');
 *
 * m1.valueChanged.connect(logger);
 * m2.valueChanged.connect(logger);
 *
 * m1.value = 42;  // logs: foo 42
 * m2.value = 17;  // logs: bar 17
 * ```
 */
var Signal = (function () {
    function Signal() {
    }
    /**
     * Bind the signal to a specific sender.
     *
     * @param sender - The sender object to bind to the signal.
     *
     * @returns The bound signal object which can be used for connecting,
     *   disconnecting, and emitting the signal.
     */
    Signal.prototype.bind = function (sender) {
        return new BoundSignal(this, sender);
    };
    return Signal;
})();
exports.Signal = Signal;
/**
 * Remove all connections where the given object is the sender.
 *
 * @param sender - The sender object of interest.
 *
 * #### Example
 * ```typescript
 * disconnectSender(someObject);
 * ```
 */
function disconnectSender(sender) {
    var list = senderMap.get(sender);
    if (!list) {
        return;
    }
    var conn = list.first;
    while (conn !== null) {
        removeFromSendersList(conn);
        conn.callback = null;
        conn.thisArg = null;
        conn = conn.nextReceiver;
    }
    senderMap.delete(sender);
}
exports.disconnectSender = disconnectSender;
/**
 * Remove all connections where the given object is the receiver.
 *
 * @param receiver - The receiver object of interest.
 *
 * #### Notes
 * If a `thisArg` is provided when connecting a signal, that object
 * is considered the receiver. Otherwise, the `callback` is used as
 * the receiver.
 *
 * #### Example
 * ```typescript
 * // disconnect a regular object receiver
 * disconnectReceiver(myObject);
 *
 * // disconnect a plain callback receiver
 * disconnectReceiver(myCallback);
 * ```
 */
function disconnectReceiver(receiver) {
    var conn = receiverMap.get(receiver);
    if (!conn) {
        return;
    }
    while (conn !== null) {
        var next = conn.nextSender;
        conn.callback = null;
        conn.thisArg = null;
        conn.prevSender = null;
        conn.nextSender = null;
        conn = next;
    }
    receiverMap.delete(receiver);
}
exports.disconnectReceiver = disconnectReceiver;
/**
 * Clear all signal data associated with the given object.
 *
 * @param obj - The object for which the signal data should be cleared.
 *
 * #### Notes
 * This removes all signal connections where the object is used as
 * either the sender or the receiver.
 *
 * #### Example
 * ```typescript
 * clearSignalData(someObject);
 * ```
 */
function clearSignalData(obj) {
    disconnectSender(obj);
    disconnectReceiver(obj);
}
exports.clearSignalData = clearSignalData;
/**
 * A concrete implementation of ISignal.
 */
var BoundSignal = (function () {
    /**
     * Construct a new bound signal.
     */
    function BoundSignal(signal, sender) {
        this._signal = signal;
        this._sender = sender;
    }
    /**
     * Connect a callback to the signal.
     */
    BoundSignal.prototype.connect = function (callback, thisArg) {
        return connect(this._sender, this._signal, callback, thisArg);
    };
    /**
     * Disconnect a callback from the signal.
     */
    BoundSignal.prototype.disconnect = function (callback, thisArg) {
        return disconnect(this._sender, this._signal, callback, thisArg);
    };
    /**
     * Emit the signal and invoke the connected callbacks.
     */
    BoundSignal.prototype.emit = function (args) {
        emit(this._sender, this._signal, args);
    };
    return BoundSignal;
})();
/**
 * A struct which holds connection data.
 */
var Connection = (function () {
    function Connection() {
        /**
         * The signal for the connection.
         */
        this.signal = null;
        /**
         * The callback connected to the signal.
         */
        this.callback = null;
        /**
         * The `this` context for the callback.
         */
        this.thisArg = null;
        /**
         * The next connection in the singly linked receivers list.
         */
        this.nextReceiver = null;
        /**
         * The next connection in the doubly linked senders list.
         */
        this.nextSender = null;
        /**
         * The previous connection in the doubly linked senders list.
         */
        this.prevSender = null;
    }
    return Connection;
})();
/**
 * The list of receiver connections for a specific sender.
 */
var ConnectionList = (function () {
    function ConnectionList() {
        /**
         * The ref count for the list.
         */
        this.refs = 0;
        /**
         * The first connection in the list.
         */
        this.first = null;
        /**
         * The last connection in the list.
         */
        this.last = null;
    }
    return ConnectionList;
})();
/**
 * A mapping of sender object to its receiver connection list.
 */
var senderMap = new WeakMap();
/**
 * A mapping of receiver object to its sender connection list.
 */
var receiverMap = new WeakMap();
/**
 * Create a connection between a sender, signal, and callback.
 */
function connect(sender, signal, callback, thisArg) {
    // Coerce a `null` thisArg to `undefined`.
    thisArg = thisArg || void 0;
    // Search for an equivalent connection and bail if one exists.
    var list = senderMap.get(sender);
    if (list && findConnection(list, signal, callback, thisArg)) {
        return false;
    }
    // Create a new connection.
    var conn = new Connection();
    conn.signal = signal;
    conn.callback = callback;
    conn.thisArg = thisArg;
    // Add the connection to the receivers list.
    if (!list) {
        list = new ConnectionList();
        list.first = conn;
        list.last = conn;
        senderMap.set(sender, list);
    }
    else if (list.last === null) {
        list.first = conn;
        list.last = conn;
    }
    else {
        list.last.nextReceiver = conn;
        list.last = conn;
    }
    // Add the connection to the senders list.
    var receiver = thisArg || callback;
    var head = receiverMap.get(receiver);
    if (head) {
        head.prevSender = conn;
        conn.nextSender = head;
    }
    receiverMap.set(receiver, conn);
    return true;
}
/**
 * Break the connection between a sender, signal, and callback.
 */
function disconnect(sender, signal, callback, thisArg) {
    // Coerce a `null` thisArg to `undefined`.
    thisArg = thisArg || void 0;
    // Search for an equivalent connection and bail if none exists.
    var list = senderMap.get(sender);
    if (!list) {
        return false;
    }
    var conn = findConnection(list, signal, callback, thisArg);
    if (!conn) {
        return false;
    }
    // Remove the connection from the senders list. It will be removed
    // from the receivers list the next time the signal is emitted.
    removeFromSendersList(conn);
    // Clear the connection data so it becomes a dead connection.
    conn.callback = null;
    conn.thisArg = null;
    return true;
}
/**
 * Emit a signal and invoke the connected callbacks.
 */
function emit(sender, signal, args) {
    var list = senderMap.get(sender);
    if (!list) {
        return;
    }
    list.refs++;
    try {
        var dirty = invokeList(list, sender, signal, args);
    }
    finally {
        list.refs--;
    }
    if (dirty && list.refs === 0) {
        cleanList(list);
    }
}
/**
 * Find a matching connection in the given connection list.
 *
 * Returns `null` if no matching connection is found.
 */
function findConnection(list, signal, callback, thisArg) {
    var conn = list.first;
    while (conn !== null) {
        if (conn.signal === signal &&
            conn.callback === callback &&
            conn.thisArg === thisArg) {
            return conn;
        }
        conn = conn.nextReceiver;
    }
    return null;
}
/**
 * Invoke the callbacks for the matching signals in the list.
 *
 * Connections added during dispatch will not be invoked. This returns
 * `true` if there are dead connections in the list, `false` otherwise.
 */
function invokeList(list, sender, signal, args) {
    var dirty = false;
    var last = list.last;
    var conn = list.first;
    while (conn !== null) {
        if (!conn.callback) {
            dirty = true;
        }
        else if (conn.signal === signal) {
            conn.callback.call(conn.thisArg, sender, args);
        }
        if (conn === last) {
            break;
        }
        conn = conn.nextReceiver;
    }
    return dirty;
}
/**
 * Remove the dead connections from the given connection list.
 */
function cleanList(list) {
    var prev;
    var conn = list.first;
    while (conn !== null) {
        var next = conn.nextReceiver;
        if (!conn.callback) {
            conn.nextReceiver = null;
        }
        else if (!prev) {
            list.first = conn;
            prev = conn;
        }
        else {
            prev.nextReceiver = conn;
            prev = conn;
        }
        conn = next;
    }
    if (!prev) {
        list.first = null;
        list.last = null;
    }
    else {
        prev.nextReceiver = null;
        list.last = prev;
    }
}
/**
 * Remove a connection from the doubly linked list of senders.
 */
function removeFromSendersList(conn) {
    var receiver = conn.thisArg || conn.callback;
    var prev = conn.prevSender;
    var next = conn.nextSender;
    if (prev === null && next === null) {
        receiverMap.delete(receiver);
    }
    else if (prev === null) {
        receiverMap.set(receiver, next);
        next.prevSender = null;
    }
    else if (next === null) {
        prev.nextSender = null;
    }
    else {
        prev.nextSender = next;
        next.prevSender = prev;
    }
    conn.prevSender = null;
    conn.nextSender = null;
}

},{}],19:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\n.p-TabBar {\n  position: relative;\n}\n.p-TabBar-header {\n  display: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 0;\n}\n.p-TabBar-content {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 2;\n  display: flex;\n  flex-direction: row;\n}\n.p-TabBar-footer {\n  display: none;\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 1;\n}\n.p-Tab {\n  display: flex;\n  flex-direction: row;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.p-Tab-icon,\n.p-Tab-close-icon {\n  flex: 0 0 auto;\n}\n.p-Tab-text {\n  flex: 1 1 auto;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.p-TabBar.p-mod-dragging > .p-TabBar-content > .p-Tab {\n  position: relative;\n  left: 0;\n  transition: left 150ms ease;\n}\n.p-TabBar.p-mod-dragging > .p-TabBar-content > .p-Tab.p-mod-active {\n  transition: none;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-tabs/lib/index.css"})); module.exports = css;
},{"browserify-css":3}],20:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./tab'));
__export(require('./tabbar'));
__export(require('./tabpanel'));
require('./index.css');

},{"./index.css":19,"./tab":21,"./tabbar":22,"./tabpanel":23}],21:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_nodewrapper_1 = require('phosphor-nodewrapper');
/**
 * `p-Tab`: the class name added to Tab instances.
 */
exports.TAB_CLASS = 'p-Tab';
/**
 * `p-Tab-text`: the class name assigned to a tab text node.
 */
exports.TEXT_CLASS = 'p-Tab-text';
/**
 * `p-Tab-icon`: the class name assigned to a tab icon node.
 */
exports.ICON_CLASS = 'p-Tab-icon';
/**
 * `p-Tab-close-icon`: the class name assigned to a tab close icon node.
 */
exports.CLOSE_ICON_CLASS = 'p-Tab-close-icon';
/**
 * `p-mod-selected`: the class name added to a selected tab.
 */
exports.SELECTED_CLASS = 'p-mod-selected';
/**
 * `p-mod-closable`: the class name added to a closable tab.
 */
exports.CLOSABLE_CLASS = 'p-mod-closable';
/**
 * An object which manages a node for a tab bar.
 */
var Tab = (function (_super) {
    __extends(Tab, _super);
    /**
     * Construct a new tab.
     *
     * @param text - The initial text for the tab.
     */
    function Tab(text) {
        _super.call(this);
        this.addClass(exports.TAB_CLASS);
        if (text)
            this.text = text;
    }
    /**
     * Create the DOM node for a tab.
     */
    Tab.createNode = function () {
        var node = document.createElement('div');
        var icon = document.createElement('span');
        var text = document.createElement('span');
        var closeIcon = document.createElement('span');
        icon.className = exports.ICON_CLASS;
        text.className = exports.TEXT_CLASS;
        closeIcon.className = exports.CLOSE_ICON_CLASS;
        node.appendChild(icon);
        node.appendChild(text);
        node.appendChild(closeIcon);
        return node;
    };
    Object.defineProperty(Tab.prototype, "text", {
        /**
         * Get the text for the tab.
         */
        get: function () {
            return this.node.children[1].textContent;
        },
        /**
         * Set the text for the tab.
         */
        set: function (text) {
            this.node.children[1].textContent = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "selected", {
        /**
         * Get whether the tab is selected.
         */
        get: function () {
            return this.hasClass(exports.SELECTED_CLASS);
        },
        /**
         * Set whether the tab is selected.
         */
        set: function (selected) {
            this.toggleClass(exports.SELECTED_CLASS, selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "closable", {
        /**
         * Get whether the tab is closable.
         */
        get: function () {
            return this.hasClass(exports.CLOSABLE_CLASS);
        },
        /**
         * Set whether the tab is closable.
         */
        set: function (closable) {
            this.toggleClass(exports.CLOSABLE_CLASS, closable);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "closeIconNode", {
        /**
         * Get the DOM node for the tab close icon.
         */
        get: function () {
            return this.node.lastChild;
        },
        enumerable: true,
        configurable: true
    });
    return Tab;
})(phosphor_nodewrapper_1.NodeWrapper);
exports.Tab = Tab;

},{"phosphor-nodewrapper":15}],22:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var arrays = require('phosphor-arrays');
var phosphor_domutil_1 = require('phosphor-domutil');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_signaling_1 = require('phosphor-signaling');
var phosphor_widget_1 = require('phosphor-widget');
/**
 * `p-TabBar`: the class name added to TabBar instances.
 */
exports.TAB_BAR_CLASS = 'p-TabBar';
/**
 * `p-TabBar-header`: the class name added to the tab bar header div.
 */
exports.HEADER_CLASS = 'p-TabBar-header';
/**
 * `p-TabBar-content`: the class name added to the tab bar content div.
 */
exports.CONTENT_CLASS = 'p-TabBar-content';
/**
 * `p-TabBar-footer`: the class name added to the tab bar footer div.
 */
exports.FOOTER_CLASS = 'p-TabBar-footer';
/**
 * `p-mod-dragging`: a class name added to the tab bar when dragging.
 */
exports.DRAGGING_CLASS = 'p-mod-dragging';
/**
 * `p-mod-active`: a class name added to the active drag tab.
 */
exports.ACTIVE_CLASS = 'p-mod-active';
/**
 * `p-mod-first`: a class name added to the first tab in the tab bar.
 */
exports.FIRST_CLASS = 'p-mod-first';
/**
 * `p-mod-last`: a class name adde to the last tab in the tab bar.
 */
exports.LAST_CLASS = 'p-mod-last';
/**
 * The start drag distance threshold.
 */
var DRAG_THRESHOLD = 5;
/**
 * The detach distance threshold.
 */
var DETACH_THRESHOLD = 20;
/**
 * The tab transition duration. Keep in sync with CSS.
 */
var TRANSITION_DURATION = 150;
/**
 * A widget which displays a row of tabs.
 *
 * #### Notes
 * A `TabBar` widget does not support child widgets. Adding children
 * to a `TabBar` will result in undefined behavior.
 */
var TabBar = (function (_super) {
    __extends(TabBar, _super);
    /**
     * Construct a new tab bar.
     */
    function TabBar() {
        _super.call(this);
        this._tabs = [];
        this._previousTab = null;
        this._dragData = null;
        this.addClass(exports.TAB_BAR_CLASS);
    }
    /**
     * Create the DOM node for a tab bar.
     */
    TabBar.createNode = function () {
        var node = document.createElement('div');
        var header = document.createElement('div');
        var content = document.createElement('div');
        var footer = document.createElement('div');
        header.className = exports.HEADER_CLASS;
        content.className = exports.CONTENT_CLASS;
        footer.className = exports.FOOTER_CLASS;
        node.appendChild(header);
        node.appendChild(content);
        node.appendChild(footer);
        return node;
    };
    /**
     * Dispose of the resources held by the widget.
     */
    TabBar.prototype.dispose = function () {
        this._releaseMouse();
        this._previousTab = null;
        this._tabs.length = 0;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(TabBar.prototype, "tabMoved", {
        /**
         * A signal emitted when a tab is moved.
         *
         * #### Notes
         * This is a pure delegate to the [[tabMovedSignal]].
         */
        get: function () {
            return TabBar.tabMovedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabSelected", {
        /**
         * A signal emitted when a tab is selected.
         *
         * #### Notes
         * This is a pure delegate to the [[tabSelectedSignal]].
         */
        get: function () {
            return TabBar.tabSelectedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabCloseRequested", {
        /**
         * A signal emitted when the user clicks a tab close icon.
         *
         * #### Notes
         * This is a pure delegate to the [[tabCloseRequestedSignal]].
         */
        get: function () {
            return TabBar.tabCloseRequestedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabDetachRequested", {
        /**
         * A signal emitted when a tab is dragged beyond the detach threshold.
         *
         * #### Notes
         * This is a pure delegate to the [[tabDetachRequestedSignal]].
         */
        get: function () {
            return TabBar.tabDetachRequestedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "previousTab", {
        /**
         * Get the previously selected tab.
         *
         * #### Notes
         * This is a read-only property.
         *
         * This will be `null` if there is no valid previous tab.
         */
        get: function () {
            return this._previousTab;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "selectedTab", {
        /**
         * Get the selected tab.
         *
         * #### Notes
         * This is a pure delegate to the [[selectedTabProperty]].
         */
        get: function () {
            return TabBar.selectedTabProperty.get(this);
        },
        /**
         * Set the selected tab.
         *
         * #### Notes
         * This is a pure delegate to the [[selectedTabProperty]].
         */
        set: function (value) {
            TabBar.selectedTabProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabsMovable", {
        /**
         * Get whether the tabs are movable by the user.
         *
         * #### Notes
         * This is a pure delegate to the [[tabsMovableProperty]].
         */
        get: function () {
            return TabBar.tabsMovableProperty.get(this);
        },
        /**
         * Set whether the tabs are movable by the user.
         *
         * #### Notes
         * This is a pure delegate to the [[tabsMovableProperty]].
         */
        set: function (value) {
            TabBar.tabsMovableProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabs", {
        /**
         * Get a shallow copy of the array of tabs.
         *
         * #### Notes
         * When only iterating over the tabs, it can be faster to use
         * the tab query methods, which do not perform a copy.
         *
         * **See also:** [[tabCount]], [[tabAt]]
         */
        get: function () {
            return this._tabs.slice();
        },
        /**
         * Set the tabs for the tab bar.
         *
         * #### Notes
         * This will clear the current tabs and add the specified tabs.
         * Depending on the desired outcome, it can be more efficient to
         * use one of the tab manipulation methods.
         *
         * **See also:** [[addTab]], [[insertTab]], [[removeTab]]
         */
        set: function (tabs) {
            var _this = this;
            this.clearTabs();
            tabs.forEach(function (tab) { return _this.addTab(tab); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabCount", {
        /**
         * Get the number of tabs in the tab bar.
         *
         * #### Notes
         * This is a read-only property.
         *
         * **See also:** [[tabs]], [[tabAt]]
         */
        get: function () {
            return this._tabs.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the tab at a specific index.
     *
     * @param index - The index of the tab of interest.
     *
     * @returns The tab at the specified index, or `undefined` if the
     *   index is out of range.
     *
     * **See also:** [[tabCount]], [[tabIndex]]
     */
    TabBar.prototype.tabAt = function (index) {
        return this._tabs[index | 0];
    };
    /**
     * Get the index of a specific tab.
     *
     * @param tab - The tab of interest.
     *
     * @returns The index of the specified tab, or `-1` if the tab is
     *   not contained within the tab bar.
     *
     * **See also:** [[tabCount]], [[tabAt]]
     */
    TabBar.prototype.tabIndex = function (tab) {
        return this._tabs.indexOf(tab);
    };
    /**
     * Add a tab to the end of the tab bar.
     *
     * @param tab - The tab to add to the tab bar.
     *
     * @returns The new index of the tab.
     *
     * #### Notes
     * If the tab is already contained within the tab bar, it will first
     * be removed.
     *
     * The tab *must not* be contained by any other tab bar.
     *
     * **See also:** [[insertTab]], [[moveTab]]
     */
    TabBar.prototype.addTab = function (tab) {
        return this.insertTab(this._tabs.length, tab);
    };
    /**
     * Insert a tab into the tab bar at the given index.
     *
     * @param index - The index at which to insert the tab. This will be
     *   clamped to the bounds of the tabs.
     *
     * @param tab - The tab to add to the tab bar.
     *
     * @returns The new index of the tab.
     *
     * #### Notes
     * If the tab is already contained within the tab bar, it will first
     * be removed.
     *
     * The tab *must not* be contained by any other tab bar.
     *
     * **See also:** [[addTab]], [[moveTab]]
     */
    TabBar.prototype.insertTab = function (index, tab) {
        this.removeTab(tab);
        return this._insertTab(index, tab);
    };
    /**
     * Move a tab from one index to another.
     *
     * @param fromIndex - The index of the tab to move.
     *
     * @param toIndex - The target index of the tab.
     *
     * @returns `true` if the move was successful, or `false` if either
     *   index is out of range.
     *
     * #### Notes
     * This can be more efficient than re-inserting an existing tab.
     *
     * **See also:** [[addTab]], [[insertTab]]
     */
    TabBar.prototype.moveTab = function (fromIndex, toIndex) {
        this._releaseMouse();
        return this._moveTab(fromIndex, toIndex);
    };
    /**
     * Remove the tab at a specific index.
     *
     * @param index - The index of the tab of interest.
     *
     * @returns The removed tab, or `undefined` if the index is out
     *   of range.
     *
     * **See also:** [[removeTab]], [[clearTabs]]
     */
    TabBar.prototype.removeTabAt = function (index) {
        this._releaseMouse();
        return this._removeTab(index);
    };
    /**
     * Remove a specific tab from the tab bar.
     *
     * @param tab - The tab of interest.
     *
     * @returns The index occupied by the tab, or `-1` if the tab is
     *   not contained by the tab bar.
     *
     * **See also:** [[removeTabAt]], [[clearTabs]]
     */
    TabBar.prototype.removeTab = function (tab) {
        this._releaseMouse();
        var i = this._tabs.indexOf(tab);
        if (i !== -1)
            this._removeTab(i);
        return i;
    };
    /**
     * Remove all tabs from the tab bar.
     *
     * **See also:** [[removeTab]], [[removeTabAt]]
     */
    TabBar.prototype.clearTabs = function () {
        while (this._tabs.length > 0) {
            this.removeTabAt(this._tabs.length - 1);
        }
    };
    /**
     * Add a tab to the tab bar at the given client X position.
     *
     * @param tab - The tab to attach to the tab bar.
     *
     * @param clientX - The current client X mouse position.
     *
     * @returns `true` if the tab was attached, `false` otherwise.
     *
     * #### Notes
     * This method is intended for use by code which supports tear-off
     * tab interfaces. It will insert the tab at the specified location
     * and grab the mouse to continue the tab drag. It assumes that the
     * left mouse button is currently pressed.
     *
     * This is a no-op if the tab is already contained by the tab bar,
     * if the tabs are not movable, or if a tab drag is in progress.
     */
    TabBar.prototype.attachTab = function (tab, clientX) {
        // Bail if there is a drag in progress or the tabs aren't movable.
        if (this._dragData || !this.tabsMovable) {
            return false;
        }
        // Bail if the tab is already part of the tab bar.
        if (this._tabs.indexOf(tab) !== -1) {
            return false;
        }
        // Insert and select the new tab.
        var index = this._tabs.length;
        this._insertTab(index, tab);
        this.selectedTab = tab;
        // Setup the drag data object.
        var content = this.node.firstChild.nextSibling;
        var tabRect = tab.node.getBoundingClientRect();
        var data = this._dragData = new DragData();
        data.tab = tab;
        data.tabIndex = index;
        data.tabLeft = tab.node.offsetLeft;
        data.tabWidth = tabRect.width;
        data.pressX = tabRect.left + Math.floor(0.4 * tabRect.width);
        data.pressY = tabRect.top + (tabRect.height >> 1);
        data.tabPressX = Math.floor(0.4 * tabRect.width);
        data.tabLayout = snapTabLayout(this._tabs);
        data.contentRect = content.getBoundingClientRect();
        data.cursorGrab = phosphor_domutil_1.overrideCursor('default');
        data.dragActive = true;
        // Add the extra mouse event listeners.
        document.addEventListener('mouseup', this, true);
        document.addEventListener('mousemove', this, true);
        // Add the dragging style classes.
        tab.addClass(exports.ACTIVE_CLASS);
        this.addClass(exports.DRAGGING_CLASS);
        // Update the drag tab position.
        this._updateDragPosition(clientX);
        return true;
    };
    /**
     * Handle the DOM events for the tab bar.
     *
     * @param event - The DOM event sent to the tab bar.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the tab bar's DOM node. It should
     * not be called directly by user code.
     */
    TabBar.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'click':
                this._evtClick(event);
                break;
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'mousemove':
                this._evtMouseMove(event);
                break;
            case 'mouseup':
                this._evtMouseUp(event);
                break;
        }
    };
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    TabBar.prototype.onAfterAttach = function (msg) {
        this.node.addEventListener('mousedown', this);
        this.node.addEventListener('click', this);
    };
    /**
     * A message handler invoked on a `'before-dettach'` message.
     */
    TabBar.prototype.onBeforeDetach = function (msg) {
        this.node.removeEventListener('mousedown', this);
        this.node.removeEventListener('click', this);
    };
    /**
     * Handle the `'click'` event for the tab bar.
     */
    TabBar.prototype._evtClick = function (event) {
        // Do nothing if it's not a left click.
        if (event.button !== 0) {
            return;
        }
        // Do nothing if the click is not on a tab.
        var index = hitTestTabs(this._tabs, event.clientX, event.clientY);
        if (index < 0) {
            return;
        }
        // Clicking on a tab stops the event propagation.
        event.preventDefault();
        event.stopPropagation();
        // If the click was on a node contained by the close icon node
        // of a closable tab, emit the `tabCloseRequested` signal.
        var tab = this._tabs[index];
        var target = event.target;
        if (tab.closable && tab.closeIconNode.contains(target)) {
            this.tabCloseRequested.emit({ index: index, tab: tab });
        }
    };
    /**
     * Handle the `'mousedown'` event for the tab bar.
     */
    TabBar.prototype._evtMouseDown = function (event) {
        // Do nothing if it's not a left mouse press.
        if (event.button !== 0) {
            return;
        }
        // Bail if a previous drag is still transitioning.
        if (this._dragData) {
            return;
        }
        // Do nothing of the press is not on a tab.
        var index = hitTestTabs(this._tabs, event.clientX, event.clientY);
        if (index < 0) {
            return;
        }
        // Pressing on a tab stops the event propagation.
        event.preventDefault();
        event.stopPropagation();
        // Do nothing further if the press was on the tab close icon.
        var tab = this._tabs[index];
        if (tab.closeIconNode.contains(event.target)) {
            return;
        }
        // Setup the drag if the tabs are movable.
        if (this.tabsMovable) {
            var tabRect = tab.node.getBoundingClientRect();
            var data = this._dragData = new DragData();
            data.tab = tab;
            data.tabIndex = index;
            data.tabLeft = tab.node.offsetLeft;
            data.tabWidth = tabRect.width;
            data.pressX = event.clientX;
            data.pressY = event.clientY;
            data.tabPressX = event.clientX - tabRect.left;
            document.addEventListener('mouseup', this, true);
            document.addEventListener('mousemove', this, true);
        }
        // Update the selected tab to the pressed tab.
        this.selectedTab = tab;
    };
    /**
     * Handle the `'mousemove'` event for the tab bar.
     */
    TabBar.prototype._evtMouseMove = function (event) {
        // Mouse move events are never propagated since this handler
        // is only installed when during a left mouse drag operation.
        event.preventDefault();
        event.stopPropagation();
        // Bail if there is no drag in progress.
        if (!this._dragData) {
            return;
        }
        // Check to see if the drag threshold has been exceeded, and
        // start the tab drag operation the first time that occurrs.
        var data = this._dragData;
        if (!data.dragActive) {
            var dx = Math.abs(event.clientX - data.pressX);
            var dy = Math.abs(event.clientY - data.pressY);
            if (dx < DRAG_THRESHOLD && dy < DRAG_THRESHOLD) {
                return;
            }
            // Fill in the remaining drag data.
            var content = this.node.firstChild.nextSibling;
            data.tabLayout = snapTabLayout(this._tabs);
            data.contentRect = content.getBoundingClientRect();
            data.cursorGrab = phosphor_domutil_1.overrideCursor('default');
            data.dragActive = true;
            // Add the dragging style classes.
            data.tab.addClass(exports.ACTIVE_CLASS);
            this.addClass(exports.DRAGGING_CLASS);
        }
        // Check to see if the detach threshold has been exceeded, and
        // emit the detach request signal the first time that occurrs.
        // If the drag data gets set to null, the mouse was released.
        if (!data.detachRequested && shouldDetach(data.contentRect, event)) {
            data.detachRequested = true;
            this.tabDetachRequested.emit({
                tab: data.tab,
                index: data.tabIndex,
                clientX: event.clientX,
                clientY: event.clientY,
            });
            if (!this._dragData) {
                return;
            }
        }
        // Update the drag tab position.
        this._updateDragPosition(event.clientX);
    };
    /**
     * Handle the `'mouseup'` event for the tab bar.
     */
    TabBar.prototype._evtMouseUp = function (event) {
        var _this = this;
        // Do nothing if the left mouse button is not released.
        if (event.button !== 0) {
            return;
        }
        // Mouse move events are never propagated since this handler
        // is only installed when during a left mouse drag operation.
        event.preventDefault();
        event.stopPropagation();
        // Bail if there is no drag in progress.
        if (!this._dragData) {
            return;
        }
        // Remove the extra mouse handlers.
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('mousemove', this, true);
        // Store a local reference to the drag data.
        var data = this._dragData;
        // If the drag is not active, clear the reference and bail.
        if (!data.dragActive) {
            this._dragData = null;
            return;
        }
        // Compute the approximate final relative tab offset.
        var idealLeft;
        if (data.tabTargetIndex === data.tabIndex) {
            idealLeft = 0;
        }
        else if (data.tabTargetIndex > data.tabIndex) {
            var tl = data.tabLayout[data.tabTargetIndex];
            idealLeft = tl.left + tl.width - data.tabWidth - data.tabLeft;
        }
        else {
            var tl = data.tabLayout[data.tabTargetIndex];
            idealLeft = tl.left - data.tabLeft;
        }
        // Position the tab to its final position, subject to limits.
        var maxLeft = data.contentRect.width - (data.tabLeft + data.tabWidth);
        var adjustedLeft = Math.max(-data.tabLeft, Math.min(idealLeft, maxLeft));
        data.tab.node.style.left = adjustedLeft + 'px';
        // Remove the active class from the tab so it can be transitioned.
        data.tab.removeClass(exports.ACTIVE_CLASS);
        // Complete the release on a timer to allow the tab to transition.
        setTimeout(function () {
            // Bail if the drag data has been changed or released.
            if (_this._dragData !== data) {
                return;
            }
            // Clear the drag data reference.
            _this._dragData = null;
            // Clear the relative tab positions.
            for (var i = 0, n = _this._tabs.length; i < n; ++i) {
                _this._tabs[i].node.style.left = '';
            }
            // Clear the cursor grab and drag styles.
            data.cursorGrab.dispose();
            data.tab.removeClass(exports.ACTIVE_CLASS);
            _this.removeClass(exports.DRAGGING_CLASS);
            // Finally, move the drag tab to its final index location.
            if (data.tabTargetIndex !== -1) {
                _this._moveTab(data.tabIndex, data.tabTargetIndex);
            }
        }, TRANSITION_DURATION);
    };
    /**
     * Update the drag tab position for the given mouse X position.
     *
     * This method is a no-op if an active drag is not in progress.
     */
    TabBar.prototype._updateDragPosition = function (clientX) {
        // Bail if there is not an active drag.
        var data = this._dragData;
        if (!data || !data.dragActive) {
            return;
        }
        // Compute the target bounds of the drag tab.
        var offsetLeft = clientX - data.contentRect.left;
        var targetLeft = offsetLeft - data.tabPressX;
        var targetRight = targetLeft + data.tabWidth;
        // Reset the target tab index.
        data.tabTargetIndex = data.tabIndex;
        // Update the non-drag tab positions and the tab target index.
        for (var i = 0, n = this._tabs.length; i < n; ++i) {
            var style = this._tabs[i].node.style;
            var layout = data.tabLayout[i];
            var threshold = layout.left + (layout.width >> 1);
            if (i < data.tabIndex && targetLeft < threshold) {
                style.left = data.tabWidth + data.tabLayout[i + 1].margin + 'px';
                data.tabTargetIndex = Math.min(data.tabTargetIndex, i);
            }
            else if (i > data.tabIndex && targetRight > threshold) {
                style.left = -data.tabWidth - layout.margin + 'px';
                data.tabTargetIndex = i;
            }
            else if (i !== data.tabIndex) {
                style.left = '';
            }
        }
        // Update the drag tab position
        var idealLeft = clientX - data.pressX;
        var maxLeft = data.contentRect.width - (data.tabLeft + data.tabWidth);
        var adjustedLeft = Math.max(-data.tabLeft, Math.min(idealLeft, maxLeft));
        data.tab.node.style.left = adjustedLeft + 'px';
    };
    /**
     * Release the mouse grab and restore the tab positions.
     */
    TabBar.prototype._releaseMouse = function () {
        // Bail early if there is no drag in progress.
        if (!this._dragData) {
            return;
        }
        // Remove the extra mouse listeners.
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('mousemove', this, true);
        // Clear the drag data reference.
        var data = this._dragData;
        this._dragData = null;
        // If the drag is not active, there's nothing left to do.
        if (!data.dragActive) {
            return;
        }
        // Reset the positions of the tabs.
        for (var i = 0, n = this._tabs.length; i < n; ++i) {
            this._tabs[i].node.style.left = '';
        }
        // Clear the cursor grab and drag styles.
        data.cursorGrab.dispose();
        data.tab.removeClass(exports.ACTIVE_CLASS);
        this.removeClass(exports.DRAGGING_CLASS);
    };
    /**
     * Insert a new tab into the tab bar at the given index.
     *
     * The tab should not already be contained in the tab bar.
     *
     * The mouse should be released before calling this method.
     */
    TabBar.prototype._insertTab = function (index, tab) {
        tab.selected = false;
        var i = arrays.insert(this._tabs, index, tab);
        var content = this.node.firstChild.nextSibling;
        content.appendChild(tab.node);
        if (!this.selectedTab) {
            this.selectedTab = tab;
        }
        else {
            this._updateTabOrdering();
        }
        return i;
    };
    /**
     * Move a tab to a new index in the tab bar.
     *
     * The mouse should be released before calling this method.
     */
    TabBar.prototype._moveTab = function (fromIndex, toIndex) {
        var i = fromIndex | 0;
        var j = toIndex | 0;
        if (!arrays.move(this._tabs, i, j)) {
            return false;
        }
        if (i === j) {
            return true;
        }
        this._updateTabOrdering();
        this.tabMoved.emit({ fromIndex: i, toIndex: j });
        return true;
    };
    /**
     * Remove and return the tab at the given index.
     *
     * The mouse should be released before calling this method.
     */
    TabBar.prototype._removeTab = function (index) {
        // Bail if the index is invalid.
        var i = index | 0;
        var tab = arrays.removeAt(this._tabs, i);
        if (!tab) {
            return void 0;
        }
        // Remove the tab from the DOM and reset its style.
        var content = this.node.firstChild.nextSibling;
        content.removeChild(tab.node);
        tab.selected = false;
        tab.node.style.left = '';
        tab.node.style.zIndex = '';
        tab.removeClass(exports.ACTIVE_CLASS);
        tab.removeClass(exports.FIRST_CLASS);
        tab.removeClass(exports.LAST_CLASS);
        // Update the selected tab. If the removed tab was the selected tab,
        // select the next best tab by starting with the previous tab, then
        // the next sibling, and finally the previous sibling. Otherwise,
        // update the state and tab ordering as appropriate.
        if (tab === this.selectedTab) {
            var next = this._previousTab || this._tabs[i] || this._tabs[i - 1];
            this.selectedTab = next;
            this._previousTab = null;
        }
        else if (tab === this._previousTab) {
            this._previousTab = null;
            this._updateTabOrdering();
        }
        else {
            this._updateTabOrdering();
        }
        return tab;
    };
    /**
     * Update the Z-index and flex order of the tabs.
     */
    TabBar.prototype._updateTabOrdering = function () {
        if (this._tabs.length === 0) {
            return;
        }
        var selectedTab = this.selectedTab;
        for (var i = 0, n = this._tabs.length, k = n - 1; i < n; ++i) {
            var tab = this._tabs[i];
            var style = tab.node.style;
            tab.removeClass(exports.FIRST_CLASS);
            tab.removeClass(exports.LAST_CLASS);
            style.order = i + '';
            if (tab === selectedTab) {
                style.zIndex = n + '';
            }
            else {
                style.zIndex = k-- + '';
            }
        }
        this._tabs[0].addClass(exports.FIRST_CLASS);
        this._tabs[n - 1].addClass(exports.LAST_CLASS);
    };
    /**
     * The change handler for the [[selectedTabProperty]].
     */
    TabBar.prototype._onSelectedTabChanged = function (old, tab) {
        if (old)
            old.selected = false;
        if (tab)
            tab.selected = true;
        this._previousTab = old;
        this._updateTabOrdering();
        this.tabSelected.emit({ index: this.tabIndex(tab), tab: tab });
    };
    /**
     * A signal emitted when a tab is moved.
     *
     * **See also:** [[tabMoved]]
     */
    TabBar.tabMovedSignal = new phosphor_signaling_1.Signal();
    /**
     * A signal emitted when a tab is selected.
     *
     * **See also:** [[tabSelected]]
     */
    TabBar.tabSelectedSignal = new phosphor_signaling_1.Signal();
    /**
     * A signal emitted when the user clicks a tab close icon.
     *
     * **See also:** [[tabCloseRequested]
     */
    TabBar.tabCloseRequestedSignal = new phosphor_signaling_1.Signal();
    /**
     * A signal emitted when a tab is dragged beyond the detach threshold.
     *
     * **See also:** [[tabDetachRequested]]
     */
    TabBar.tabDetachRequestedSignal = new phosphor_signaling_1.Signal();
    /**
     * The property descriptor for the selected tab.
     *
     * This controls which tab is selected in the tab bar.
     *
     * **See also:** [[selectedTab]]
     */
    TabBar.selectedTabProperty = new phosphor_properties_1.Property({
        value: null,
        coerce: function (owner, val) { return (val && owner.tabIndex(val) !== -1) ? val : null; },
        changed: function (owner, old, val) { return owner._onSelectedTabChanged(old, val); },
    });
    /**
     * The property descriptor for the tabs movable property
     *
     * THis controls whether tabs are movable by the user.
     *
     * **See also:** [[tabsMovable]]
     */
    TabBar.tabsMovableProperty = new phosphor_properties_1.Property({
        value: true,
    });
    return TabBar;
})(phosphor_widget_1.Widget);
exports.TabBar = TabBar;
/**
 * A struct which holds the drag data for a tab bar.
 */
var DragData = (function () {
    function DragData() {
        /**
         * The tab being dragged.
         */
        this.tab = null;
        /**
         * The offset left of the tab being dragged.
         */
        this.tabLeft = -1;
        /**
         * The offset width of the tab being dragged.
         */
        this.tabWidth = -1;
        /**
         * The index of the tab being dragged.
         */
        this.tabIndex = -1;
        /**
         * The orgian mouse X position in tab coordinates.
         */
        this.tabPressX = -1;
        /**
         * The tab target index upon mouse release.
         */
        this.tabTargetIndex = -1;
        /**
         * The array of tab layout objects snapped at drag start.
         */
        this.tabLayout = null;
        /**
         * The mouse press client X position.
         */
        this.pressX = -1;
        /**
         * The mouse press client Y position.
         */
        this.pressY = -1;
        /**
         * The bounding client rect of the tab bar content node.
         */
        this.contentRect = null;
        /**
         * The disposable to clean up the cursor override.
         */
        this.cursorGrab = null;
        /**
         * Whether the drag is currently active.
         */
        this.dragActive = false;
        /**
         * Whether the detach request signal has been emitted.
         */
        this.detachRequested = false;
    }
    return DragData;
})();
/**
 * Test if a mouse position lies outside the detach bound of a rect.
 */
function shouldDetach(rect, event) {
    return ((event.clientX < rect.left - DETACH_THRESHOLD) ||
        (event.clientX >= rect.right + DETACH_THRESHOLD) ||
        (event.clientY < rect.top - DETACH_THRESHOLD) ||
        (event.clientY >= rect.bottom + DETACH_THRESHOLD));
}
/**
 * Get the index of the tab which intersect the client point, or -1.
 */
function hitTestTabs(tabs, clientX, clientY) {
    for (var i = 0, n = tabs.length; i < n; ++i) {
        if (phosphor_domutil_1.hitTest(tabs[i].node, clientX, clientY)) {
            return i;
        }
    }
    return -1;
}
/**
 * Snap an array of the current tab layout values.
 */
function snapTabLayout(tabs) {
    var layout = new Array(tabs.length);
    for (var i = 0, n = tabs.length; i < n; ++i) {
        var node = tabs[i].node;
        var left = node.offsetLeft;
        var width = node.offsetWidth;
        var cstyle = window.getComputedStyle(tabs[i].node);
        var margin = parseInt(cstyle.marginLeft, 10) || 0;
        layout[i] = { margin: margin, left: left, width: width };
    }
    return layout;
}

},{"phosphor-arrays":4,"phosphor-domutil":7,"phosphor-properties":16,"phosphor-signaling":18,"phosphor-widget":30}],23:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_boxpanel_1 = require('phosphor-boxpanel');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_signaling_1 = require('phosphor-signaling');
var phosphor_stackedpanel_1 = require('phosphor-stackedpanel');
var tabbar_1 = require('./tabbar');
/**
 * `p-TabPanel`: the class name added to TabPanel instances.
 */
exports.TAB_PANEL_CLASS = 'p-TabPanel';
/**
 * A panel which provides a tabbed layout for child widgets.
 *
 * The `TabPanel` provides a convenient combination of a `TabBar` and
 * a `StackedPanel` which allows the user to toggle between widgets by
 * selecting the tab associated with a widget.
 *
 * #### Notes
 * Widgets should be added to a `TabPanel` using the `<prefix>Widget`
 * methods, **not** the `<prefix>Child` methods. The children of a
 * `TabPanel` should **not** be manipulated directly by user code.
 */
var TabPanel = (function (_super) {
    __extends(TabPanel, _super);
    /**
     * Construct a new tab panel.
     */
    function TabPanel() {
        _super.call(this);
        this.addClass(exports.TAB_PANEL_CLASS);
        var tabs = new tabbar_1.TabBar();
        tabs.tabMoved.connect(this._onTabMoved, this);
        tabs.tabSelected.connect(this._onTabSelected, this);
        tabs.tabCloseRequested.connect(this._onTabCloseRequested, this);
        var stack = new phosphor_stackedpanel_1.StackedPanel();
        stack.currentChanged.connect(this._onCurrentChanged, this);
        stack.widgetRemoved.connect(this._onWidgetRemoved, this);
        phosphor_boxpanel_1.BoxPanel.setStretch(tabs, 0);
        phosphor_boxpanel_1.BoxPanel.setStretch(stack, 1);
        this.direction = phosphor_boxpanel_1.BoxPanel.TopToBottom;
        this.spacing = 0;
        this._tabs = tabs;
        this._stack = stack;
        this.addChild(tabs);
        this.addChild(stack);
    }
    /**
     * Get the tab for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The tab for the given widget.
     *
     * #### Notes
     * This is a pure delegate for the [[tabProperty]].
     */
    TabPanel.getTab = function (widget) {
        return TabPanel.tabProperty.get(widget);
    };
    /**
     * Set the tab for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param tab - The tab to use for the widget.
     *
     * #### Notes
     * This is a pure delegate for the [[tabProperty]].
     */
    TabPanel.setTab = function (widget, tab) {
        TabPanel.tabProperty.set(widget, tab);
    };
    /**
     * Dispose of the resources held by the widget.
     */
    TabPanel.prototype.dispose = function () {
        this._tabs = null;
        this._stack = null;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(TabPanel.prototype, "currentChanged", {
        /**
         * A signal emitted when the current widget is changed.
         *
         * #### Notes
         * This is a pure delegate to the [[currentChangedSignal]].
         */
        get: function () {
            return TabPanel.currentChangedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "currentWidget", {
        /**
         * Get the currently selected widget.
         */
        get: function () {
            return this._stack.currentWidget;
        },
        /**
         * Set the currently selected widget.
         */
        set: function (widget) {
            var i = this._stack.childIndex(widget);
            this._tabs.selectedTab = this._tabs.tabAt(i);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "tabsMovable", {
        /**
         * Get whether the tabs are movable by the user.
         */
        get: function () {
            return this._tabs.tabsMovable;
        },
        /**
         * Set whether the tabs are movable by the user.
         */
        set: function (movable) {
            this._tabs.tabsMovable = movable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "widgets", {
        /**
         * Get a shallow copy of the array of widgets.
         *
         * #### Notes
         * When only iterating over the widgets, it can be faster to use
         * the widget query methods, which do not perform a copy.
         *
         * **See also:** [[widgetCount]], [[widgetAt]]
         */
        get: function () {
            return this._stack.children;
        },
        /**
         * Set the widgets for the tab panel.
         *
         * #### Notes
         * This will clear the current widgets and add the specified widgets.
         * Depending on the desired outcome, it can be more efficient to use
         * one of the widget manipulation methods.
         *
         * **See also:** [[addWidget]], [[insertWidget]], [[removeWidget]]
         */
        set: function (widgets) {
            var _this = this;
            this.clearWidgets();
            widgets.forEach(function (widget) { return _this.addWidget(widget); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "widgetCount", {
        /**
         * Get the number of widgets in the tab panel.
         *
         * #### Notes
         * This is a read-only property.
         *
         * **See also:** [[widgets]], [[widgetAt]]
         */
        get: function () {
            return this._stack.childCount;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the widget at a specific index.
     *
     * @param index - The index of the widget of interest.
     *
     * @returns The widget widget at the specified index, or `undefined`
     *   if the index is out of range.
     *
     * **See also:** [[widgetCount]], [[widgetIndex]]
     */
    TabPanel.prototype.widgetAt = function (index) {
        return this._stack.childAt(index);
    };
    /**
     * Get the index of a specific widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The index of the specified widget, or `-1` if the widget
     *   is not contained in the tab panel.
     *
     * **See also:** [[widgetCount]], [[widgetAt]]
     */
    TabPanel.prototype.widgetIndex = function (widget) {
        return this._stack.childIndex(widget);
    };
    /**
     * Add a widget to the end of the panel.
     *
     * @param widget - The widget to add to the panel.
     *
     * @returns The new index of the widget.
     *
     * #### Notes
     * If the widget already exists in the panel, it will first be
     * removed.
     *
     * The `TabPanel.tab` attached property *must* be set with the
     * tab to use for the widget, or an error will be thrown. This
     * can be set via `TabPanel.setTab`.
     *
     * The `TabPanel.tab` attached property is assumed to remain
     * constant while the widget is contained by the tab panel.
     *
     * **See also:** [[insertWidget]], [[moveWidget]]
     */
    TabPanel.prototype.addWidget = function (widget) {
        return this.insertWidget(this.widgetCount, widget);
    };
    /**
     * Insert a widget into the panel at the given index.
     *
     * @param index - The target index for the widget. This will be
     *   clamped to the bounds of the widgets.
     *
     * @param widget - The widget to insert into the panel.
     *
     * @returns The new index of the widget.
     *
     * #### Notes
     * If the widget already exists in the panel, it will first be
     * removed.
     *
     * The `TabPanel.tab` attached property *must* be set with the
     * tab to use for the widget, or an error will be thrown. This
     * can be set via `TabPanel.setTab`.
     *
     * The `TabPanel.tab` attached property is assumed to remain
     * constant while the widget is contained by the tab panel.
     *
     * **See also:** [[addWidget]], [[moveWidget]]
     */
    TabPanel.prototype.insertWidget = function (index, widget) {
        var tab = TabPanel.getTab(widget);
        if (!tab)
            throw new Error('`TabPanel.tab` property not set');
        var i = this._stack.insertChild(index, widget);
        return this._tabs.insertTab(i, tab);
    };
    /**
     * Move a widget from one index to another.
     *
     * @param fromIndex - The index of the widget of interest.
     *
     * @param toIndex - The target index for the widget.
     *
     * @returns 'true' if the widget was moved, or `false` if either
     *   of the given indices are out of range.
     *
     * #### Notes
     * This can be more efficient than re-inserting an existing widget.
     *
     * **See also:** [[addWidget]], [[insertWidget]]
     */
    TabPanel.prototype.moveWidget = function (fromIndex, toIndex) {
        return this._tabs.moveTab(fromIndex, toIndex);
    };
    /**
     * Remove the widget at a specific index.
     *
     * @param index - The index of the widget of interest.
     *
     * @returns The removed widget, or `undefined` if the index
     *   is out of range.
     *
     * **See also:** [[removeWidget]], [[clearWidgets]]
     */
    TabPanel.prototype.removeWidgetAt = function (index) {
        return this._stack.removeChildAt(index);
    };
    /**
     * Remove a specific widget from the panel.
     *
     * @param child - The widget of interest.
     *
     * @returns The index which the widget occupied, or `-1` if the
     *   widget is not contained in the tab panel.
     *
     * **See also:** [[removeWidgetAt]], [[clearWidgets]]
     */
    TabPanel.prototype.removeWidget = function (widget) {
        return this._stack.removeChild(widget);
    };
    /**
     * Remove all widgets from the tab panel.
     *
     * **See also:** [[removeWidget]], [[removeWidgetAt]]
     */
    TabPanel.prototype.clearWidgets = function () {
        this._stack.clearChildren();
    };
    /**
     * Handle the `tabMoved` signal from the tab bar.
     */
    TabPanel.prototype._onTabMoved = function (sender, args) {
        this._stack.moveChild(args.fromIndex, args.toIndex);
    };
    /**
     * Handle the `tabSelected` signal from the tab bar.
     */
    TabPanel.prototype._onTabSelected = function (sender, args) {
        this._stack.currentWidget = this._stack.childAt(args.index);
    };
    /**
     * Handle the `tabCloseRequested` signal from the tab bar.
     */
    TabPanel.prototype._onTabCloseRequested = function (sender, args) {
        this._stack.childAt(args.index).close();
    };
    /**
     * Handle the `currentChanged` signal from the stacked panel.
     */
    TabPanel.prototype._onCurrentChanged = function (sender, args) {
        this.currentChanged.emit(args);
    };
    /**
     * Handle the `widgetRemoved` signal from the stacked panel.
     */
    TabPanel.prototype._onWidgetRemoved = function (sender, args) {
        this._tabs.removeTabAt(args.index);
    };
    /**
     * A signal emitted when the current widget is changed.
     *
     * **See also:** [[currentChanged]]
     */
    TabPanel.currentChangedSignal = new phosphor_signaling_1.Signal();
    /**
     * The property descriptor for the tab attached property.
     *
     * This controls the tab used for a widget in a tab panel.
     *
     * #### Notes
     * If the tab for a widget is changed, the new tab will not be
     * reflected until the widget is re-inserted into the tab panel.
     * However, in-place changes to the tab's properties **will** be
     * reflected.
     *
     * **See also:** [[getTab]], [[setTab]]
     */
    TabPanel.tabProperty = new phosphor_properties_1.Property({
        value: null,
        coerce: function (owner, value) { return value || null; },
    });
    return TabPanel;
})(phosphor_boxpanel_1.BoxPanel);
exports.TabPanel = TabPanel;

},{"./tabbar":22,"phosphor-boxpanel":25,"phosphor-properties":16,"phosphor-signaling":18,"phosphor-stackedpanel":28}],24:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\n.p-BoxPanel {\n  position: relative;\n}\n.p-BoxPanel > .p-Widget {\n  position: absolute;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-tabs/node_modules/phosphor-boxpanel/lib/index.css"})); module.exports = css;
},{"browserify-css":3}],25:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var arrays = require('phosphor-arrays');
var phosphor_boxengine_1 = require('phosphor-boxengine');
var phosphor_messaging_1 = require('phosphor-messaging');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_widget_1 = require('phosphor-widget');
require('./index.css');
/**
 * `p-BoxPanel`: the class name added to BoxPanel instances.
 */
exports.BOX_PANEL_CLASS = 'p-BoxPanel';
/**
 * `p-mod-left-to-right`: the class name added to ltr box panels.
 */
exports.LTR_CLASS = 'p-mod-left-to-right';
/**
 * `p-mod-right-to-left`: the class name added to rtl box panels.
 */
exports.RTL_CLASS = 'p-mod-right-to-left';
/**
 * `p-mod-top-to-bottom`: the class name added to ttb box panels.
 */
exports.TTB_CLASS = 'p-mod-top-to-bottom';
/**
 * `p-mod-bottom-to-top`: the class name added to btt box panels.
 */
exports.BTT_CLASS = 'p-mod-bottom-to-top';
/**
 * The layout direction of a box panel.
 */
(function (Direction) {
    /**
     * Left to right direction.
     */
    Direction[Direction["LeftToRight"] = 0] = "LeftToRight";
    /**
     * Right to left direction.
     */
    Direction[Direction["RightToLeft"] = 1] = "RightToLeft";
    /**
     * Top to bottom direction.
     */
    Direction[Direction["TopToBottom"] = 2] = "TopToBottom";
    /**
     * Bottom to top direction.
     */
    Direction[Direction["BottomToTop"] = 3] = "BottomToTop";
})(exports.Direction || (exports.Direction = {}));
var Direction = exports.Direction;
/**
 * A widget which arranges its children in a single row or column.
 */
var BoxPanel = (function (_super) {
    __extends(BoxPanel, _super);
    /**
     * Construct a new box panel.
     */
    function BoxPanel() {
        _super.call(this);
        this._fixedSpace = 0;
        this._sizers = [];
        this.addClass(exports.BOX_PANEL_CLASS);
        this.addClass(exports.TTB_CLASS);
    }
    /**
     * Get the box panel stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The box panel stretch factor for the widget.
     *
     * #### Notes
     * This is a pure delegate to the [[stretchProperty]].
     */
    BoxPanel.getStretch = function (widget) {
        return BoxPanel.stretchProperty.get(widget);
    };
    /**
     * Set the box panel stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the stretch factor.
     *
     * #### Notes
     * This is a pure delegate to the [[stretchProperty]].
     */
    BoxPanel.setStretch = function (widget, value) {
        BoxPanel.stretchProperty.set(widget, value);
    };
    /**
     * Get the box panel size basis for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The box panel size basis for the widget.
     *
     * #### Notes
     * This is a pure delegate to the [[sizeBasisProperty]].
     */
    BoxPanel.getSizeBasis = function (widget) {
        return BoxPanel.sizeBasisProperty.get(widget);
    };
    /**
     * Set the box panel size basis for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the size basis.
     *
     * #### Notes
     * This is a pure delegate to the [[sizeBasisProperty]].
     */
    BoxPanel.setSizeBasis = function (widget, value) {
        BoxPanel.sizeBasisProperty.set(widget, value);
    };
    /**
     * Dispose of the resources held by the panel.
     */
    BoxPanel.prototype.dispose = function () {
        this._sizers.length = 0;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(BoxPanel.prototype, "direction", {
        /**
         * Get the layout direction for the box panel.
         *
         * #### Notes
         * This is a pure delegate to the [[directionProperty]].
         */
        get: function () {
            return BoxPanel.directionProperty.get(this);
        },
        /**
         * Set the layout direction for the box panel.
         *
         * #### Notes
         * This is a pure delegate to the [[directionProperty]].
         */
        set: function (value) {
            BoxPanel.directionProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoxPanel.prototype, "spacing", {
        /**
         * Get the inter-element spacing for the box panel.
         *
         * #### Notes
         * This is a pure delegate to the [[spacingProperty]].
         */
        get: function () {
            return BoxPanel.spacingProperty.get(this);
        },
        /**
         * Set the inter-element spacing for the box panel.
         *
         * #### Notes
         * This is a pure delegate to the [[spacingProperty]].
         */
        set: function (value) {
            BoxPanel.spacingProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * A message handler invoked on a `'child-added'` message.
     */
    BoxPanel.prototype.onChildAdded = function (msg) {
        arrays.insert(this._sizers, msg.currentIndex, new phosphor_boxengine_1.BoxSizer());
        this.node.appendChild(msg.child.node);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, phosphor_widget_1.MSG_AFTER_ATTACH);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.MSG_LAYOUT_REQUEST);
    };
    /**
     * A message handler invoked on a `'child-removed'` message.
     */
    BoxPanel.prototype.onChildRemoved = function (msg) {
        arrays.removeAt(this._sizers, msg.previousIndex);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, phosphor_widget_1.MSG_BEFORE_DETACH);
        this.node.removeChild(msg.child.node);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.MSG_LAYOUT_REQUEST);
        msg.child.clearOffsetGeometry();
    };
    /**
     * A message handler invoked on a `'child-moved'` message.
     */
    BoxPanel.prototype.onChildMoved = function (msg) {
        arrays.move(this._sizers, msg.previousIndex, msg.currentIndex);
        this.update();
    };
    /**
     * A message handler invoked on an `'after-show'` message.
     */
    BoxPanel.prototype.onAfterShow = function (msg) {
        this.update(true);
    };
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    BoxPanel.prototype.onAfterAttach = function (msg) {
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.MSG_LAYOUT_REQUEST);
    };
    /**
     * A message handler invoked on a `'child-shown'` message.
     */
    BoxPanel.prototype.onChildShown = function (msg) {
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.MSG_LAYOUT_REQUEST);
    };
    /**
     * A message handler invoked on a `'child-hidden'` message.
     */
    BoxPanel.prototype.onChildHidden = function (msg) {
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.MSG_LAYOUT_REQUEST);
    };
    /**
     * A message handler invoked on a `'resize'` message.
     */
    BoxPanel.prototype.onResize = function (msg) {
        if (this.isVisible) {
            if (msg.width < 0 || msg.height < 0) {
                var rect = this.offsetRect;
                this._layoutChildren(rect.width, rect.height);
            }
            else {
                this._layoutChildren(msg.width, msg.height);
            }
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    BoxPanel.prototype.onUpdateRequest = function (msg) {
        if (this.isVisible) {
            var rect = this.offsetRect;
            this._layoutChildren(rect.width, rect.height);
        }
    };
    /**
     * A message handler invoked on a `'layout-request'` message.
     */
    BoxPanel.prototype.onLayoutRequest = function (msg) {
        if (this.isAttached) {
            this._setupGeometry();
        }
    };
    /**
     * Update the size constraints of the panel.
     */
    BoxPanel.prototype._setupGeometry = function () {
        // Compute the visible item count.
        var visibleCount = 0;
        for (var i = 0, n = this.childCount; i < n; ++i) {
            if (!this.childAt(i).hidden)
                visibleCount++;
        }
        // Update the fixed space for the visible items.
        this._fixedSpace = this.spacing * Math.max(0, visibleCount - 1);
        // Update the sizers and compute the new size limits.
        var minW = 0;
        var minH = 0;
        var maxW = Infinity;
        var maxH = Infinity;
        var dir = this.direction;
        if (dir === Direction.LeftToRight || dir === Direction.RightToLeft) {
            minW = this._fixedSpace;
            maxW = visibleCount > 0 ? minW : maxW;
            for (var i = 0, n = this.childCount; i < n; ++i) {
                var widget = this.childAt(i);
                var sizer = this._sizers[i];
                if (widget.hidden) {
                    sizer.minSize = 0;
                    sizer.maxSize = 0;
                    continue;
                }
                var limits = widget.sizeLimits;
                sizer.sizeHint = BoxPanel.getSizeBasis(widget);
                sizer.stretch = BoxPanel.getStretch(widget);
                sizer.minSize = limits.minWidth;
                sizer.maxSize = limits.maxWidth;
                minW += limits.minWidth;
                maxW += limits.maxWidth;
                minH = Math.max(minH, limits.minHeight);
                maxH = Math.min(maxH, limits.maxHeight);
            }
        }
        else {
            minH = this._fixedSpace;
            maxH = visibleCount > 0 ? minH : maxH;
            for (var i = 0, n = this.childCount; i < n; ++i) {
                var widget = this.childAt(i);
                var sizer = this._sizers[i];
                if (widget.hidden) {
                    sizer.minSize = 0;
                    sizer.maxSize = 0;
                    continue;
                }
                var limits = widget.sizeLimits;
                sizer.sizeHint = BoxPanel.getSizeBasis(widget);
                sizer.stretch = BoxPanel.getStretch(widget);
                sizer.minSize = limits.minHeight;
                sizer.maxSize = limits.maxHeight;
                minH += limits.minHeight;
                maxH += limits.maxHeight;
                minW = Math.max(minW, limits.minWidth);
                maxW = Math.min(maxW, limits.maxWidth);
            }
        }
        // Add the box sizing to the size constraints.
        var box = this.boxSizing;
        minW += box.horizontalSum;
        minH += box.verticalSum;
        maxW += box.horizontalSum;
        maxH += box.verticalSum;
        // Update the panel's size constraints.
        this.setSizeLimits(minW, minH, maxW, maxH);
        // Notifiy the parent that it should relayout.
        if (this.parent)
            phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.MSG_LAYOUT_REQUEST);
        // Update the layout for the child widgets.
        this.update(true);
    };
    /**
     * Layout the children using the given offset width and height.
     */
    BoxPanel.prototype._layoutChildren = function (offsetWidth, offsetHeight) {
        // Bail early if their are no children to arrange.
        if (this.childCount === 0) {
            return;
        }
        // Compute the actual layout bounds adjusted for border and padding.
        var box = this.boxSizing;
        var top = box.paddingTop;
        var left = box.paddingLeft;
        var width = offsetWidth - box.horizontalSum;
        var height = offsetHeight - box.verticalSum;
        // Distribute the layout space and layout the items.
        var dir = this.direction;
        var spacing = this.spacing;
        if (dir === Direction.LeftToRight) {
            phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, width - this._fixedSpace));
            for (var i = 0, n = this.childCount; i < n; ++i) {
                var widget = this.childAt(i);
                if (widget.hidden) {
                    continue;
                }
                var size = this._sizers[i].size;
                widget.setOffsetGeometry(left, top, size, height);
                left += size + spacing;
            }
        }
        else if (dir === Direction.TopToBottom) {
            phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, height - this._fixedSpace));
            for (var i = 0, n = this.childCount; i < n; ++i) {
                var widget = this.childAt(i);
                if (widget.hidden) {
                    continue;
                }
                var size = this._sizers[i].size;
                widget.setOffsetGeometry(left, top, width, size);
                top += size + spacing;
            }
        }
        else if (dir === Direction.RightToLeft) {
            left += width;
            phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, width - this._fixedSpace));
            for (var i = 0, n = this.childCount; i < n; ++i) {
                var widget = this.childAt(i);
                if (widget.hidden) {
                    continue;
                }
                var size = this._sizers[i].size;
                widget.setOffsetGeometry(left - size, top, size, height);
                left -= size + spacing;
            }
        }
        else {
            top += height;
            phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, height - this._fixedSpace));
            for (var i = 0, n = this.childCount; i < n; ++i) {
                var widget = this.childAt(i);
                if (widget.hidden) {
                    continue;
                }
                var size = this._sizers[i].size;
                widget.setOffsetGeometry(left, top - size, width, size);
                top -= size + spacing;
            }
        }
    };
    /**
     * The change handler for the [[orientationProperty]].
     */
    BoxPanel.prototype._onDirectionChanged = function (old, value) {
        this.toggleClass(exports.LTR_CLASS, value === Direction.LeftToRight);
        this.toggleClass(exports.RTL_CLASS, value === Direction.RightToLeft);
        this.toggleClass(exports.TTB_CLASS, value === Direction.TopToBottom);
        this.toggleClass(exports.BTT_CLASS, value === Direction.BottomToTop);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.MSG_LAYOUT_REQUEST);
    };
    /**
     * A convenience alias of the `LeftToRight` [[Direction]].
     */
    BoxPanel.LeftToRight = Direction.LeftToRight;
    /**
     * A convenience alias of the `RightToLeft` [[Direction]].
     */
    BoxPanel.RightToLeft = Direction.RightToLeft;
    /**
     * A convenience alias of the `TopToBottom` [[Direction]].
     */
    BoxPanel.TopToBottom = Direction.TopToBottom;
    /**
     * A convenience alias of the `BottomToTop` [[Direction]].
     */
    BoxPanel.BottomToTop = Direction.BottomToTop;
    /**
     * The property descriptor for the box panel layout direction.
     *
     * The controls the arrangement of child widgets within the panel.
     * The default value is `TopToBottom`.
     *
     * **See also:** [[direction]]
     */
    BoxPanel.directionProperty = new phosphor_properties_1.Property({
        value: Direction.TopToBottom,
        changed: function (owner, old, value) { return owner._onDirectionChanged(old, value); },
    });
    /**
     * The property descriptor for the box panel spacing.
     *
     * The controls the fixed spacing between the child widgets, in
     * pixels. The default value is `8`.
     *
     * **See also:** [[spacing]]
     */
    BoxPanel.spacingProperty = new phosphor_properties_1.Property({
        value: 8,
        coerce: function (owner, value) { return Math.max(0, value | 0); },
        changed: function (owner) { return phosphor_messaging_1.postMessage(owner, phosphor_widget_1.MSG_LAYOUT_REQUEST); },
    });
    /**
     * The property descriptor for a widget stretch factor.
     *
     * This is an attached property which controls how much a child widget
     * stretches or shrinks relative to its siblings when the box panel is
     * resized. The default value is `0`.
     *
     * **See also:** [[getStretch]], [[setStretch]]
     */
    BoxPanel.stretchProperty = new phosphor_properties_1.Property({
        value: 0,
        coerce: function (owner, value) { return Math.max(0, value | 0); },
        changed: onChildPropertyChanged,
    });
    /**
     * The property descriptor for a widget size basis.
     *
     * This is an attached property which controls the preferred size of
     * a child widget. The widget will be initialized to this size before
     * being expanded or shrunk to fit the available layout space. The
     * default value is `0`.
     *
     * **See also:** [[getSizeBasis]], [[setSizeBasis]]
     */
    BoxPanel.sizeBasisProperty = new phosphor_properties_1.Property({
        value: 0,
        coerce: function (owner, value) { return Math.max(0, value | 0); },
        changed: onChildPropertyChanged,
    });
    return BoxPanel;
})(phosphor_widget_1.Widget);
exports.BoxPanel = BoxPanel;
/**
 * The change handler for the attached child properties.
 */
function onChildPropertyChanged(child) {
    if (child.parent instanceof BoxPanel) {
        phosphor_messaging_1.postMessage(child.parent, phosphor_widget_1.MSG_LAYOUT_REQUEST);
    }
}

},{"./index.css":24,"phosphor-arrays":4,"phosphor-boxengine":26,"phosphor-messaging":14,"phosphor-properties":16,"phosphor-widget":30}],26:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * The sizer object for the [[boxCalc]] function.
 *
 * A box sizer holds the geometry information for an object along the
 * layout orientation. An array of box sizers representing a line of
 * objects is passed to [[boxCalc]] along with the amount of space
 * available for layout. The algorithm will update the [[size]] of
 * each box sizer with its computed size.
 *
 * #### Notes
 * For best performance, this class should be treated as a raw data
 * struct. It should not typically be subclassed.
 */
var BoxSizer = (function () {
    function BoxSizer() {
        /**
         * The preferred size for the sizer.
         *
         * The sizer will be given this initial size subject to its size
         * bounds. The sizer will not deviate from this size unless such
         * deviation is required to fit into the available layout space.
         *
         * #### Notes
         * There is no limit to this value, but it will be clamped to the
         * bounds defined by [[minSize]] and [[maxSize]].
         *
         * The default value is `0`.
         */
        this.sizeHint = 0;
        /**
         * The minimum size of the sizer.
         *
         * The sizer will never be sized less than this value, even if
         * it means the sizer will overflow the available layout space.
         *
         * #### Notes
         * It is assumed that this value lies in the range `[0, Infinity)`
         * and that it is `<=` to [[maxSize]]. Failure to adhere to this
         * constraint will yield undefined results.
         *
         * The default value is `0`.
         */
        this.minSize = 0;
        /**
         * The maximum size of the sizer.
         *
         * The sizer will never be sized greater than this value, even if
         * it means the sizer will underflow the available layout space.
         *
         * #### Notes
         * It is assumed that this value lies in the range `[0, Infinity]`
         * and that it is `>=` to [[minSize]]. Failure to adhere to this
         * constraint will yield undefined results.
         *
         * The default value is `Infinity`.
         */
        this.maxSize = Infinity;
        /**
         * The stretch factor for the sizer.
         *
         * This controls how much the sizer stretches relative to its sibling
         * sizers when layout space is distributed. A stretch factor of zero
         * is special and will cause the sizer to only be resized after all
         * other sizers with a stretch factor greater than zero have been
         * resized to their limits.
         *
         * #### Notes
         * It is assumed that this value is an integer that lies in the range
         * `[0, Infinity)`. Failure to adhere to this constraint will yield
         * undefined results.
         *
         * The default value is `1`.
         */
        this.stretch = 1;
        /**
         * The computed size of the sizer.
         *
         * This value is the output of a call to [[boxCalc]]. It represents
         * the computed size for the object along the layout orientation,
         * and will always lie in the range `[minSize, maxSize]`.
         *
         * #### Notes
         * This value is output only. Changing the value will have no effect.
         */
        this.size = 0;
        /**
         * An internal storage property for the layout algorithm.
         *
         * #### Notes
         * This value is used as temporary storage by the layout algorithm.
         * Changing the value will have no effect.
         */
        this.done = false;
    }
    return BoxSizer;
})();
exports.BoxSizer = BoxSizer;
/**
 * Compute the optimal layout sizes for an array of box sizers.
 *
 * This distributes the available layout space among the box sizers
 * according to the following algorithm:
 *
 * 1. Initialize the sizers's size to its size hint and compute the
 *    sums for each of size hint, min size, and max size.
 *
 * 2. If the total size hint equals the available space, return.
 *
 * 3. If the available space is less than the total min size, set all
 *    sizers to their min size and return.
 *
 * 4. If the available space is greater than the total max size, set
 *    all sizers to their max size and return.
 *
 * 5. If the layout space is less than the total size hint, distribute
 *    the negative delta as follows:
 *
 *    a. Shrink each sizer with a stretch factor greater than zero by
 *       an amount proportional to the negative space and the sum of
 *       stretch factors. If the sizer reaches its min size, remove
 *       it and its stretch factor from the computation.
 *
 *    b. If after adjusting all stretch sizers there remains negative
 *       space, distribute the space equally among the sizers with a
 *       stretch factor of zero. If a sizer reaches its min size,
 *       remove it from the computation.
 *
 * 6. If the layout space is greater than the total size hint,
 *    distribute the positive delta as follows:
 *
 *    a. Expand each sizer with a stretch factor greater than zero by
 *       an amount proportional to the postive space and the sum of
 *       stretch factors. If the sizer reaches its max size, remove
 *       it and its stretch factor from the computation.
 *
 *    b. If after adjusting all stretch sizers there remains positive
 *       space, distribute the space equally among the sizers with a
 *       stretch factor of zero. If a sizer reaches its max size,
 *       remove it from the computation.
 *
 * 7. return
 *
 * @param sizers - The sizers for a particular layout line.
 *
 * @param space - The available layout space for the sizers.
 *
 * #### Notes
 * This function can be called at any time to recompute the layout
 * sizing for an existing array of sizers. The previously computed
 * results will have no effect on the new output. It is therefore
 * not necessary to create new sizers on each resize event.
 */
function boxCalc(sizers, space) {
    // Bail early if there is nothing to do.
    var count = sizers.length;
    if (count === 0) {
        return;
    }
    // Setup the size and stretch counters.
    var totalMin = 0;
    var totalMax = 0;
    var totalSize = 0;
    var totalStretch = 0;
    var stretchCount = 0;
    // Setup the sizers and compute the totals.
    for (var i = 0; i < count; ++i) {
        var sizer = sizers[i];
        initSizer(sizer);
        totalSize += sizer.size;
        totalMin += sizer.minSize;
        totalMax += sizer.maxSize;
        if (sizer.stretch > 0) {
            totalStretch += sizer.stretch;
            stretchCount++;
        }
    }
    // If the space is equal to the total size, return.
    if (space === totalSize) {
        return;
    }
    // If the space is less than the total min, minimize each sizer.
    if (space <= totalMin) {
        for (var i = 0; i < count; ++i) {
            var sizer = sizers[i];
            sizer.size = sizer.minSize;
        }
        return;
    }
    // If the space is greater than the total max, maximize each sizer.
    if (space >= totalMax) {
        for (var i = 0; i < count; ++i) {
            var sizer = sizers[i];
            sizer.size = sizer.maxSize;
        }
        return;
    }
    // The loops below perform sub-pixel precision sizing. A near zero
    // value is used for compares instead of zero to ensure that the
    // loop terminates when the subdivided space is reasonably small.
    var nearZero = 0.01;
    // A counter which is decremented each time a sizer is resized to
    // its limit. This ensures the loops terminate even if there is
    // space remaining to distribute.
    var notDoneCount = count;
    // Distribute negative delta space.
    if (space < totalSize) {
        // Shrink each stretchable sizer by an amount proportional to its
        // stretch factor. If a sizer reaches its min size it's marked as
        // done. The loop progresses in phases where each sizer is given
        // a chance to consume its fair share for the pass, regardless of
        // whether a sizer before it reached its limit. This continues
        // until the stretchable sizers or the free space is exhausted.
        var freeSpace = totalSize - space;
        while (stretchCount > 0 && freeSpace > nearZero) {
            var distSpace = freeSpace;
            var distStretch = totalStretch;
            for (var i = 0; i < count; ++i) {
                var sizer = sizers[i];
                if (sizer.done || sizer.stretch === 0) {
                    continue;
                }
                var amt = sizer.stretch * distSpace / distStretch;
                if (sizer.size - amt <= sizer.minSize) {
                    freeSpace -= sizer.size - sizer.minSize;
                    totalStretch -= sizer.stretch;
                    sizer.size = sizer.minSize;
                    sizer.done = true;
                    notDoneCount--;
                    stretchCount--;
                }
                else {
                    freeSpace -= amt;
                    sizer.size -= amt;
                }
            }
        }
        // Distribute any remaining space evenly among the non-stretchable
        // sizers. This progresses in phases in the same manner as above.
        while (notDoneCount > 0 && freeSpace > nearZero) {
            var amt = freeSpace / notDoneCount;
            for (var i = 0; i < count; ++i) {
                var sizer = sizers[i];
                if (sizer.done) {
                    continue;
                }
                if (sizer.size - amt <= sizer.minSize) {
                    freeSpace -= sizer.size - sizer.minSize;
                    sizer.size = sizer.minSize;
                    sizer.done = true;
                    notDoneCount--;
                }
                else {
                    freeSpace -= amt;
                    sizer.size -= amt;
                }
            }
        }
    }
    else {
        // Expand each stretchable sizer by an amount proportional to its
        // stretch factor. If a sizer reaches its max size it's marked as
        // done. The loop progresses in phases where each sizer is given
        // a chance to consume its fair share for the pass, regardless of
        // whether a sizer before it reached its limit. This continues
        // until the stretchable sizers or the free space is exhausted.
        var freeSpace = space - totalSize;
        while (stretchCount > 0 && freeSpace > nearZero) {
            var distSpace = freeSpace;
            var distStretch = totalStretch;
            for (var i = 0; i < count; ++i) {
                var sizer = sizers[i];
                if (sizer.done || sizer.stretch === 0) {
                    continue;
                }
                var amt = sizer.stretch * distSpace / distStretch;
                if (sizer.size + amt >= sizer.maxSize) {
                    freeSpace -= sizer.maxSize - sizer.size;
                    totalStretch -= sizer.stretch;
                    sizer.size = sizer.maxSize;
                    sizer.done = true;
                    notDoneCount--;
                    stretchCount--;
                }
                else {
                    freeSpace -= amt;
                    sizer.size += amt;
                }
            }
        }
        // Distribute any remaining space evenly among the non-stretchable
        // sizers. This progresses in phases in the same manner as above.
        while (notDoneCount > 0 && freeSpace > nearZero) {
            var amt = freeSpace / notDoneCount;
            for (var i = 0; i < count; ++i) {
                var sizer = sizers[i];
                if (sizer.done) {
                    continue;
                }
                if (sizer.size + amt >= sizer.maxSize) {
                    freeSpace -= sizer.maxSize - sizer.size;
                    sizer.size = sizer.maxSize;
                    sizer.done = true;
                    notDoneCount--;
                }
                else {
                    freeSpace -= amt;
                    sizer.size += amt;
                }
            }
        }
    }
}
exports.boxCalc = boxCalc;
/**
 * (Re)initialize a box sizer's data for a layout pass.
 */
function initSizer(sizer) {
    sizer.size = Math.max(sizer.minSize, Math.min(sizer.sizeHint, sizer.maxSize));
    sizer.done = false;
}

},{}],27:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\n| Copyright (c) 2014-2015, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n.p-StackedPanel {\n  position: relative;\n}\n.p-StackedPanel > .p-Widget {\n  position: absolute;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-tabs/node_modules/phosphor-stackedpanel/lib/index.css"})); module.exports = css;
},{"browserify-css":3}],28:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_messaging_1 = require('phosphor-messaging');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_signaling_1 = require('phosphor-signaling');
var phosphor_widget_1 = require('phosphor-widget');
require('./index.css');
/**
 * `p-StackedPanel`: the class name added to StackedPanel instances.
 */
exports.STACKED_PANEL_CLASS = 'p-StackedPanel';
/**
 * A layout widget where only one child widget is visible at a time.
 */
var StackedPanel = (function (_super) {
    __extends(StackedPanel, _super);
    /**
     * Construct a new stacked panel.
     */
    function StackedPanel() {
        _super.call(this);
        this.addClass(exports.STACKED_PANEL_CLASS);
    }
    Object.defineProperty(StackedPanel.prototype, "currentChanged", {
        /**
         * A signal emitted when the current widget is changed.
         *
         * #### Notes
         * This is a pure delegate to the [[currentChangedSignal]].
         */
        get: function () {
            return StackedPanel.currentChangedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedPanel.prototype, "widgetRemoved", {
        /**
         * A signal emitted when a widget is removed from the panel.
         *
         * #### Notes
         * This is a pure delegate to the [[widgetRemovedSignal]].
         */
        get: function () {
            return StackedPanel.widgetRemovedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedPanel.prototype, "currentWidget", {
        /**
         * Get the current panel widget.
         *
         * #### Notes
         * This is a pure delegate to the [[currentWidgetProperty]].
         */
        get: function () {
            return StackedPanel.currentWidgetProperty.get(this);
        },
        /**
         * Set the current panel widget.
         *
         * #### Notes
         * This is a pure delegate to the [[currentWidgetProperty]].
         */
        set: function (widget) {
            StackedPanel.currentWidgetProperty.set(this, widget);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * A message handler invoked on a `'child-added'` message.
     */
    StackedPanel.prototype.onChildAdded = function (msg) {
        msg.child.hidden = true;
        this.node.appendChild(msg.child.node);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, phosphor_widget_1.MSG_AFTER_ATTACH);
    };
    /**
     * A message handler invoked on a `'child-removed'` message.
     */
    StackedPanel.prototype.onChildRemoved = function (msg) {
        if (msg.child === this.currentWidget)
            this.currentWidget = null;
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, phosphor_widget_1.MSG_BEFORE_DETACH);
        this.node.removeChild(msg.child.node);
        msg.child.clearOffsetGeometry();
        this.widgetRemoved.emit({ index: msg.previousIndex, widget: msg.child });
    };
    /**
     * A message handler invoked on a `'child-moved'` message.
     */
    StackedPanel.prototype.onChildMoved = function (msg) { };
    /**
     * A message handler invoked on an `'after-show'` message.
     */
    StackedPanel.prototype.onAfterShow = function (msg) {
        this.update(true);
    };
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    StackedPanel.prototype.onAfterAttach = function (msg) {
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.MSG_LAYOUT_REQUEST);
    };
    /**
     * A message handler invoked on a `'resize'` message.
     */
    StackedPanel.prototype.onResize = function (msg) {
        if (this.isVisible) {
            if (msg.width < 0 || msg.height < 0) {
                var rect = this.offsetRect;
                this._layoutChildren(rect.width, rect.height);
            }
            else {
                this._layoutChildren(msg.width, msg.height);
            }
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    StackedPanel.prototype.onUpdateRequest = function (msg) {
        if (this.isVisible) {
            var rect = this.offsetRect;
            this._layoutChildren(rect.width, rect.height);
        }
    };
    /**
     * A message handler invoked on a `'layout-request'` message.
     */
    StackedPanel.prototype.onLayoutRequest = function (msg) {
        if (this.isAttached) {
            this._setupGeometry();
        }
    };
    /**
     * Update the size constraints of the panel.
     */
    StackedPanel.prototype._setupGeometry = function () {
        // Compute the new size limits.
        var minW = 0;
        var minH = 0;
        var maxW = Infinity;
        var maxH = Infinity;
        var widget = this.currentWidget;
        if (widget) {
            var limits = widget.sizeLimits;
            minW = limits.minWidth;
            minH = limits.minHeight;
            maxW = limits.maxWidth;
            maxH = limits.maxHeight;
        }
        // Add the box sizing to the size constraints.
        var box = this.boxSizing;
        minW += box.horizontalSum;
        minH += box.verticalSum;
        maxW += box.horizontalSum;
        maxH += box.verticalSum;
        // Update the panel's size constraints.
        this.setSizeLimits(minW, minH, maxW, maxH);
        // Notifiy the parent that it should relayout.
        if (this.parent)
            phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.MSG_LAYOUT_REQUEST);
        // Update the layout for the child widgets.
        this.update(true);
    };
    /**
     * Layout the children using the given offset width and height.
     */
    StackedPanel.prototype._layoutChildren = function (offsetWidth, offsetHeight) {
        // Bail early if there is no current widget.
        var widget = this.currentWidget;
        if (!widget) {
            return;
        }
        // Compute the actual layout bounds adjusted for border and padding.
        var box = this.boxSizing;
        var top = box.paddingTop;
        var left = box.paddingLeft;
        var width = offsetWidth - box.horizontalSum;
        var height = offsetHeight - box.verticalSum;
        // Update the current widget's layout geometry.
        widget.setOffsetGeometry(left, top, width, height);
    };
    /**
     * The change handler for the [[currentWidgetProperty]].
     */
    StackedPanel.prototype._onCurrentWidgetChanged = function (old, val) {
        if (old)
            old.hidden = true;
        if (val)
            val.hidden = false;
        // Ideally, the layout request would be posted in order to take
        // advantage of message compression, but some browsers repaint
        // before the message gets processed, resulting in jitter. So,
        // the layout request is sent and processed immediately.
        phosphor_messaging_1.sendMessage(this, phosphor_widget_1.MSG_LAYOUT_REQUEST);
        this.currentChanged.emit({ index: this.childIndex(val), widget: val });
    };
    /**
     * A signal emitted when the current widget is changed.
     *
     * **See also:** [[currentChanged]]
     */
    StackedPanel.currentChangedSignal = new phosphor_signaling_1.Signal();
    /**
     * A signal emitted when a widget is removed from the panel.
     *
     * **See also:** [[widgetRemoved]]
     */
    StackedPanel.widgetRemovedSignal = new phosphor_signaling_1.Signal();
    /**
     * The property descriptor for the current widget.
     *
     * This controls which child widget is visible.
     *
     * **See also:** [[currentWidget]]
     */
    StackedPanel.currentWidgetProperty = new phosphor_properties_1.Property({
        value: null,
        coerce: function (owner, val) { return (val && val.parent === owner) ? val : null; },
        changed: function (owner, old, val) { return owner._onCurrentWidgetChanged(old, val); },
    });
    return StackedPanel;
})(phosphor_widget_1.Widget);
exports.StackedPanel = StackedPanel;

},{"./index.css":27,"phosphor-messaging":14,"phosphor-properties":16,"phosphor-signaling":18,"phosphor-widget":30}],29:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\n| Copyright (c) 2014-2015, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\n.p-Widget {\n  box-sizing: border-box;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  overflow: hidden;\n  cursor: default;\n}\n.p-Widget.p-mod-hidden {\n  display: none;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-widget/lib/index.css"})); module.exports = css;
},{"browserify-css":3}],30:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var arrays = require('phosphor-arrays');
var phosphor_domutil_1 = require('phosphor-domutil');
var phosphor_messaging_1 = require('phosphor-messaging');
var phosphor_nodewrapper_1 = require('phosphor-nodewrapper');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_signaling_1 = require('phosphor-signaling');
require('./index.css');
/**
 * `p-Widget`: the class name added to Widget instances.
 */
exports.WIDGET_CLASS = 'p-Widget';
/**
 * `p-mod-hidden`: the class name added to hidden widgets.
 */
exports.HIDDEN_CLASS = 'p-mod-hidden';
/**
 * A singleton `'update-request'` message.
 *
 * #### Notes
 * This message can be dispatched to supporting widgets in order to
 * update their content. Not all widgets will respond to messages of
 * this type.
 *
 * This message is typically used to update the position and size of
 * a widget's children, or to update a widget's content to reflect the
 * current state of the widget.
 *
 * Messages of this type are compressed by default.
 *
 * **See also:** [[update]], [[onUpdateRequest]]
 */
exports.MSG_UPDATE_REQUEST = new phosphor_messaging_1.Message('update-request');
/**
 * A singleton `'layout-request'` message.
 *
 * #### Notes
 * This message can be dispatched to supporting widgets in order to
 * update their layout. Not all widgets will respond to messages of
 * this type.
 *
 * This message is typically used to update the size contraints of
 * a widget and to update the position and size of its children.
 *
 * Messages of this type are compressed by default.
 *
 * **See also:** [[onLayoutRequest]]
 */
exports.MSG_LAYOUT_REQUEST = new phosphor_messaging_1.Message('layout-request');
/**
 * A singleton `'close-request'` message.
 *
 * #### Notes
 * This message should be dispatched to a widget when it should close
 * and remove itself from the widget hierarchy.
 *
 * Messages of this type are compressed by default.
 *
 * **See also:** [[close]], [[onCloseRequest]]
 */
exports.MSG_CLOSE_REQUEST = new phosphor_messaging_1.Message('close-request');
/**
 * A singleton `'after-show'` message.
 *
 * #### Notes
 * This message is sent to a widget when it becomes visible.
 *
 * This message is **not** sent when the widget is attached.
 *
 * **See also:** [[isVisible]], [[onAfterShow]]
 */
exports.MSG_AFTER_SHOW = new phosphor_messaging_1.Message('after-show');
/**
 * A singleton `'before-hide'` message.
 *
 * #### Notes
 * This message is sent to a widget when it becomes not-visible.
 *
 * This message is **not** sent when the widget is detached.
 *
 * **See also:** [[isVisible]], [[onBeforeHide]]
 */
exports.MSG_BEFORE_HIDE = new phosphor_messaging_1.Message('before-hide');
/**
 * A singleton `'after-attach'` message.
 *
 * #### Notes
 * This message is sent to a widget after it is attached to the DOM.
 *
 * **See also:** [[isAttached]], [[onAfterAttach]]
 */
exports.MSG_AFTER_ATTACH = new phosphor_messaging_1.Message('after-attach');
/**
 * A singleton `'before-detach'` message.
 *
 * #### Notes
 * This message is sent to a widget before it is detached from the DOM.
 *
 * **See also:** [[isAttached]], [[onBeforeDetach]]
 */
exports.MSG_BEFORE_DETACH = new phosphor_messaging_1.Message('before-detach');
/**
 * The base class of the Phosphor widget hierarchy.
 *
 * #### Notes
 * This class will typically be subclassed in order to create a useful
 * widget. However, it can be used by itself to host foreign content
 * such as a React or Bootstrap component. Simply instantiate an empty
 * widget and add the content directly to its [[node]]. The widget and
 * its content can then be embedded within a Phosphor widget hierarchy.
 */
var Widget = (function (_super) {
    __extends(Widget, _super);
    /**
     * Construct a new widget.
     *
     * #### Notes
     * The [[WIDGET_CLASS]] is added to the widget during construction.
     */
    function Widget() {
        _super.call(this);
        this._flags = 0;
        this._parent = null;
        this._children = [];
        this._box = null;
        this._rect = null;
        this._limits = null;
        this.addClass(exports.WIDGET_CLASS);
    }
    /**
     * Dispose of the widget and its descendant widgets.
     *
     * #### Notes
     * It is generally unsafe to use the widget after it has been
     * disposed.
     *
     * If this method is called more than once, all calls made after
     * the first will be a no-op.
     */
    Widget.prototype.dispose = function () {
        if (this.isDisposed) {
            return;
        }
        this._flags |= WidgetFlag.IsDisposed;
        this.disposed.emit(void 0);
        if (this._parent) {
            this._parent.removeChild(this);
        }
        else if (this.isAttached) {
            detachWidget(this);
        }
        while (this._children.length > 0) {
            var child = this._children.pop();
            child._parent = null;
            child.dispose();
        }
        phosphor_signaling_1.clearSignalData(this);
        phosphor_messaging_1.clearMessageData(this);
        phosphor_properties_1.clearPropertyData(this);
    };
    Object.defineProperty(Widget.prototype, "disposed", {
        /**
         * A signal emitted when the widget is disposed.
         *
         * #### Notes
         * This is a pure delegate to the [[disposedSignal]].
         */
        get: function () {
            return Widget.disposedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "isAttached", {
        /**
         * Test whether the widget's node is attached to the DOM.
         *
         * #### Notes
         * This is a read-only property which is always safe to access.
         *
         * **See also:** [[attachWidget]], [[detachWidget]]
         */
        get: function () {
            return (this._flags & WidgetFlag.IsAttached) !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "isDisposed", {
        /**
         * Test whether the widget has been disposed.
         *
         * #### Notes
         * This is a read-only property which is always safe to access.
         *
         * **See also:** [[disposed]]
         */
        get: function () {
            return (this._flags & WidgetFlag.IsDisposed) !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "isVisible", {
        /**
         * Test whether the widget is visible.
         *
         * #### Notes
         * A widget is visible when it is attached to the DOM, is not
         * explicitly hidden, and has no explicitly hidden ancestors.
         *
         * This is a read-only property which is always safe to access.
         *
         * **See also:** [[hidden]]
         */
        get: function () {
            return (this._flags & WidgetFlag.IsVisible) !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "hidden", {
        /**
         * Get whether the widget is explicitly hidden.
         *
         * #### Notes
         * This is a pure delegate to the [[hiddenProperty]].
         *
         * **See also:** [[isVisible]]
         */
        get: function () {
            return Widget.hiddenProperty.get(this);
        },
        /**
         * Set whether the widget is explicitly hidden.
         *
         * #### Notes
         * This is a pure delegate to the [[hiddenProperty]].
         *
         * **See also:** [[isVisible]]
         */
        set: function (value) {
            Widget.hiddenProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "boxSizing", {
        /**
         * Get the box sizing for the widget's DOM node.
         *
         * #### Notes
         * This value is computed once and then cached in order to avoid
         * excessive style recomputations. The cache can be cleared via
         * [[clearBoxSizing]].
         *
         * Layout widgets rely on this property when computing their layout.
         * If a layout widget's box sizing changes at runtime, the box sizing
         * cache should be cleared and the layout widget should be posted a
         *`'layout-request'` message.
         *
         * This is a read-only property.
         *
         * **See also:** [[clearBoxSizing]]
         */
        get: function () {
            if (this._box)
                return this._box;
            return this._box = Object.freeze(phosphor_domutil_1.boxSizing(this.node));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "sizeLimits", {
        /**
         * Get the size limits for the widget's DOM node.
         *
         * #### Notes
         * This value is computed once and then cached in order to avoid
         * excessive style recomputations. The cache can be cleared by
         * calling [[clearSizeLimits]].
         *
         * Layout widgets rely on this property of their child widgets when
         * computing the layout. If a child widget's size limits change at
         * runtime, the size limits should be cleared and the layout widget
         * should be posted a `'layout-request'` message.
         *
         * This is a read-only property.
         *
         * **See also:** [[setSizeLimits]], [[clearSizeLimits]]
         */
        get: function () {
            if (this._limits)
                return this._limits;
            return this._limits = Object.freeze(phosphor_domutil_1.sizeLimits(this.node));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "offsetRect", {
        /**
         * Get the current offset geometry rect for the widget.
         *
         * #### Notes
         * If the widget geometry has been set using [[setOffsetGeometry]],
         * those values will be used to populate the rect, and no data will
         * be read from the DOM. Otherwise, the offset geometry of the node
         * **will** be read from the DOM, which may cause a reflow.
         *
         * This is a read-only property.
         *
         * **See also:** [[setOffsetGeometry]], [[clearOffsetGeometry]]
         */
        get: function () {
            if (this._rect)
                return cloneOffsetRect(this._rect);
            return getOffsetRect(this.node);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "parent", {
        /**
         * Get the parent of the widget.
         *
         * #### Notes
         * This will be `null` if the widget does not have a parent.
         */
        get: function () {
            return this._parent;
        },
        /**
         * Set the parent of the widget.
         *
         * @throws Will throw an error if the widget is the parent.
         *
         * #### Notes
         * If the specified parent is the current parent, this is a no-op.
         *
         * If the specified parent is `null`, this is equivalent to the
         * expression `widget.parent.removeChild(widget)`, otherwise it
         * is equivalent to the expression `parent.addChild(widget)`.
         *
         * **See also:** [[addChild]], [[insertChild]], [[removeChild]]
         */
        set: function (parent) {
            if (parent && parent !== this._parent) {
                parent.addChild(this);
            }
            else if (!parent && this._parent) {
                this._parent.removeChild(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "children", {
        /**
         * Get a shallow copy of the array of child widgets.
         *
         * #### Notes
         * When only iterating over the children, it can be faster to use
         * the child query methods, which do not perform a copy.
         *
         * **See also:** [[childCount]], [[childAt]]
         */
        get: function () {
            return this._children.slice();
        },
        /**
         * Set the children of the widget.
         *
         * #### Notes
         * This will clear the current child widgets and add the specified
         * child widgets. Depending on the desired outcome, it can be more
         * efficient to use one of the child manipulation methods.
         *
         * **See also:** [[addChild]], [[insertChild]], [[removeChild]]
         */
        set: function (children) {
            var _this = this;
            this.clearChildren();
            children.forEach(function (child) { return _this.addChild(child); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "childCount", {
        /**
         * Get the number of children of the widget.
         *
         * #### Notes
         * This is a read-only property.
         *
         * **See also:** [[children]], [[childAt]]
         */
        get: function () {
            return this._children.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the child widget at a specific index.
     *
     * @param index - The index of the child of interest.
     *
     * @returns The child widget at the specified index, or `undefined`
     *  if the index is out of range.
     *
     * **See also:** [[childCount]], [[childIndex]]
     */
    Widget.prototype.childAt = function (index) {
        return this._children[index | 0];
    };
    /**
     * Get the index of a specific child widget.
     *
     * @param child - The child widget of interest.
     *
     * @returns The index of the specified child widget, or `-1` if
     *   the widget is not a child of this widget.
     *
     * **See also:** [[childCount]], [[childAt]]
     */
    Widget.prototype.childIndex = function (child) {
        return this._children.indexOf(child);
    };
    /**
     * Add a child widget to the end of the widget's children.
     *
     * @param child - The child widget to add to this widget.
     *
     * @returns The new index of the child.
     *
     * @throws Will throw an error if a widget is added to itself.
     *
     * #### Notes
     * The child will be automatically removed from its current parent
     * before being added to this widget.
     *
     * **See also:** [[insertChild]], [[moveChild]]
     */
    Widget.prototype.addChild = function (child) {
        return this.insertChild(this._children.length, child);
    };
    /**
     * Insert a child widget at a specific index.
     *
     * @param index - The target index for the widget. This will be
     *   clamped to the bounds of the children.
     *
     * @param child - The child widget to insert into the widget.
     *
     * @returns The new index of the child.
     *
     * @throws Will throw an error if a widget is inserted into itself.
     *
     * #### Notes
     * The child will be automatically removed from its current parent
     * before being added to this widget.
     *
     * **See also:** [[addChild]], [[moveChild]]
     */
    Widget.prototype.insertChild = function (index, child) {
        if (child === this) {
            throw new Error('invalid child widget');
        }
        if (child._parent) {
            child._parent.removeChild(child);
        }
        else if (child.isAttached) {
            detachWidget(child);
        }
        child._parent = this;
        var i = arrays.insert(this._children, index, child);
        phosphor_messaging_1.sendMessage(this, new ChildMessage('child-added', child, -1, i));
        return i;
    };
    /**
     * Move a child widget from one index to another.
     *
     * @param fromIndex - The index of the child of interest.
     *
     * @param toIndex - The target index for the child.
     *
     * @returns 'true' if the child was moved, or `false` if either
     *   of the given indices are out of range.
     *
     * #### Notes
     * This method can be more efficient than re-inserting an existing
     * child, as some widgets may be able to optimize child moves and
     * avoid making unnecessary changes to the DOM.
     *
     * **See also:** [[addChild]], [[insertChild]]
     */
    Widget.prototype.moveChild = function (fromIndex, toIndex) {
        var i = fromIndex | 0;
        var j = toIndex | 0;
        if (!arrays.move(this._children, i, j)) {
            return false;
        }
        if (i !== j) {
            var child = this._children[j];
            phosphor_messaging_1.sendMessage(this, new ChildMessage('child-moved', child, i, j));
        }
        return true;
    };
    /**
     * Remove the child widget at a specific index.
     *
     * @param index - The index of the child of interest.
     *
     * @returns The removed child widget, or `undefined` if the index
     *   is out of range.
     *
     * **See also:** [[removeChild]], [[clearChildren]]
     */
    Widget.prototype.removeChildAt = function (index) {
        var i = index | 0;
        var child = arrays.removeAt(this._children, i);
        if (child) {
            child._parent = null;
            phosphor_messaging_1.sendMessage(this, new ChildMessage('child-removed', child, i, -1));
        }
        return child;
    };
    /**
     * Remove a specific child widget from this widget.
     *
     * @param child - The child widget of interest.
     *
     * @returns The index which the child occupied, or `-1` if the
     *   child is not a child of this widget.
     *
     * **See also:** [[removeChildAt]], [[clearChildren]]
     */
    Widget.prototype.removeChild = function (child) {
        var i = this.childIndex(child);
        if (i !== -1)
            this.removeChildAt(i);
        return i;
    };
    /**
     * Remove all child widgets from the widget.
     *
     * #### Notes
     * This will continue to remove children until the `childCount`
     * reaches zero. It is therefore possible to enter an infinite
     * loop if a message handler causes a child widget to be added
     * in response to one being removed.
     *
     * **See also:** [[removeChild]], [[removeChildAt]]
     */
    Widget.prototype.clearChildren = function () {
        while (this.childCount > 0) {
            this.removeChildAt(this.childCount - 1);
        }
    };
    /**
     * Dispatch an `'update-request'` message to the widget.
     *
     * @param immediate - Whether to dispatch the message immediately
     *   (`true`) or in the future (`false`). The default is `false`.
     *
     * **See also:** [[MSG_UPDATE_REQUEST]], [[onUpdateRequest]]
     */
    Widget.prototype.update = function (immediate) {
        if (immediate === void 0) { immediate = false; }
        if (immediate) {
            phosphor_messaging_1.sendMessage(this, exports.MSG_UPDATE_REQUEST);
        }
        else {
            phosphor_messaging_1.postMessage(this, exports.MSG_UPDATE_REQUEST);
        }
    };
    /**
     * Dispatch a `'close-request'` message to the widget.
     *
     * @param immediate - Whether to dispatch the message immediately
     *   (`true`) or in the future (`false`). The default is `false`.
     *
     * **See also:** [[MSG_CLOSE_REQUEST]], [[onCloseRequest]]
     */
    Widget.prototype.close = function (immediate) {
        if (immediate === void 0) { immediate = false; }
        if (immediate) {
            phosphor_messaging_1.sendMessage(this, exports.MSG_CLOSE_REQUEST);
        }
        else {
            phosphor_messaging_1.postMessage(this, exports.MSG_CLOSE_REQUEST);
        }
    };
    /**
     * Clear the cached box sizing for the widget.
     *
     * #### Notes
     * This method does **not** read from the DOM.
     *
     * This method does **not** write to the DOM.
     *
     * **See also:** [[boxSizing]]
     */
    Widget.prototype.clearBoxSizing = function () {
        this._box = null;
    };
    /**
     * Set the size limits for the widget's DOM node.
     *
     * @param minWidth - The min width for the widget, in pixels.
     *
     * @param minHeight - The min height for the widget, in pixels.
     *
     * @param maxWidth - The max width for the widget, in pixels.
     *
     * @param maxHeight - The max height for the widget, in pixels.
     *
     * #### Notes
     * This method does **not** read from the DOM.
     *
     * **See also:** [[sizeLimits]], [[clearSizeLimits]]
     */
    Widget.prototype.setSizeLimits = function (minWidth, minHeight, maxWidth, maxHeight) {
        var minW = Math.max(0, minWidth);
        var minH = Math.max(0, minHeight);
        var maxW = Math.max(0, maxWidth);
        var maxH = Math.max(0, maxHeight);
        this._limits = Object.freeze({
            minWidth: minW,
            minHeight: minH,
            maxWidth: maxW,
            maxHeight: maxH,
        });
        var style = this.node.style;
        style.minWidth = minW + 'px';
        style.minHeight = minH + 'px';
        style.maxWidth = (maxW === Infinity) ? '' : maxW + 'px';
        style.maxHeight = (maxH === Infinity) ? '' : maxH + 'px';
    };
    /**
     * Clear the cached size limits for the widget.
     *
     * #### Notes
     * This method does **not** read from the DOM.
     *
     * **See also:** [[sizeLimits]], [[setSizeLimits]]
     */
    Widget.prototype.clearSizeLimits = function () {
        this._limits = null;
        var style = this.node.style;
        style.minWidth = '';
        style.maxWidth = '';
        style.minHeight = '';
        style.maxHeight = '';
    };
    /**
     * Set the offset geometry for the widget.
     *
     * @param left - The offset left edge of the widget, in pixels.
     *
     * @param top - The offset top edge of the widget, in pixels.
     *
     * @param width - The offset width of the widget, in pixels.
     *
     * @param height - The offset height of the widget, in pixels.
     *
     * #### Notes
     * This method is only useful when using absolute positioning to set
     * the layout geometry of the widget. It will update the inline style
     * of the widget with the specified values. If the width or height is
     * different from the previous value, a [[ResizeMessage]] will be sent
     * to the widget.
     *
     * This method does **not** take into account the size limits of the
     * widget. It is assumed that the specified width and height do not
     * violate the size constraints of the widget.
     *
     * This method does **not** read any data from the DOM.
     *
     * Code which uses this method to layout a widget is responsible for
     * calling [[clearOffsetGeometry]] when it is finished managing the
     * widget.
     *
     * **See also:** [[offsetRect]], [[clearOffsetGeometry]]
     */
    Widget.prototype.setOffsetGeometry = function (left, top, width, height) {
        var rect = this._rect || (this._rect = makeOffsetRect());
        var style = this.node.style;
        var resized = false;
        if (top !== rect.top) {
            rect.top = top;
            style.top = top + 'px';
        }
        if (left !== rect.left) {
            rect.left = left;
            style.left = left + 'px';
        }
        if (width !== rect.width) {
            resized = true;
            rect.width = width;
            style.width = width + 'px';
        }
        if (height !== rect.height) {
            resized = true;
            rect.height = height;
            style.height = height + 'px';
        }
        if (resized)
            phosphor_messaging_1.sendMessage(this, new ResizeMessage(width, height));
    };
    /**
     * Clear the offset geometry for the widget.
     *
     * #### Notes
     * This method is only useful when using absolute positioning to set
     * the layout geometry of the widget. It will reset the inline style
     * of the widget and clear the stored offset geometry values.
     *
     * This method will **not** dispatch a [[ResizeMessage]].
     *
     * This method does **not** read any data from the DOM.
     *
     * This method should be called by the widget's layout manager when
     * it no longer manages the widget. It allows the widget to be added
     * to another layout panel without conflict.
     *
     * **See also:** [[offsetRect]], [[setOffsetGeometry]]
     */
    Widget.prototype.clearOffsetGeometry = function () {
        if (!this._rect) {
            return;
        }
        this._rect = null;
        var style = this.node.style;
        style.top = '';
        style.left = '';
        style.width = '';
        style.height = '';
    };
    /**
     * Process a message sent to the widget.
     *
     * @param msg - The message sent to the widget.
     *
     * #### Notes
     * Subclasses may reimplement this method as needed.
     */
    Widget.prototype.processMessage = function (msg) {
        switch (msg.type) {
            case 'resize':
                this.onResize(msg);
                break;
            case 'update-request':
                this.onUpdateRequest(msg);
                break;
            case 'layout-request':
                this.onLayoutRequest(msg);
                break;
            case 'child-added':
                this.onChildAdded(msg);
                break;
            case 'child-removed':
                this.onChildRemoved(msg);
                break;
            case 'child-moved':
                this.onChildMoved(msg);
                break;
            case 'after-show':
                this._flags |= WidgetFlag.IsVisible;
                this.onAfterShow(msg);
                sendToShown(this._children, msg);
                break;
            case 'before-hide':
                this.onBeforeHide(msg);
                sendToShown(this._children, msg);
                this._flags &= ~WidgetFlag.IsVisible;
                break;
            case 'after-attach':
                var visible = !this.hidden && (!this._parent || this._parent.isVisible);
                if (visible)
                    this._flags |= WidgetFlag.IsVisible;
                this._flags |= WidgetFlag.IsAttached;
                this.onAfterAttach(msg);
                sendToAll(this._children, msg);
                break;
            case 'before-detach':
                this.onBeforeDetach(msg);
                sendToAll(this._children, msg);
                this._flags &= ~WidgetFlag.IsVisible;
                this._flags &= ~WidgetFlag.IsAttached;
                break;
            case 'child-shown':
                this.onChildShown(msg);
                break;
            case 'child-hidden':
                this.onChildHidden(msg);
                break;
            case 'close-request':
                this.onCloseRequest(msg);
                break;
        }
    };
    /**
     * Compress a message posted to the widget.
     *
     * @param msg - The message posted to the widget.
     *
     * @param pending - The queue of pending messages for the widget.
     *
     * @returns `true` if the message was compressed and should be
     *   dropped, or `false` if the message should be enqueued for
     *   delivery as normal.
     *
     * #### Notes
     * The default implementation compresses the following messages:
     * `'update-request'`, `'layout-request'`, and `'close-request'`.
     *
     * Subclasses may reimplement this method as needed.
     */
    Widget.prototype.compressMessage = function (msg, pending) {
        switch (msg.type) {
            case 'update-request':
            case 'layout-request':
            case 'close-request':
                return pending.some(function (other) { return other.type === msg.type; });
        }
        return false;
    };
    /**
     * A message handler invoked on a `'child-added'` message.
     *
     * #### Notes
     * The default implementation adds the child node to the widget
     * node at the proper location and dispatches an `'after-attach'`
     * message if appropriate.
     *
     * Subclasses may reimplement this method to control how the child
     * node is added, but they must dispatch an `'after-attach'` message
     * if appropriate.
     */
    Widget.prototype.onChildAdded = function (msg) {
        var next = this.childAt(msg.currentIndex + 1);
        this.node.insertBefore(msg.child.node, next && next.node);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, exports.MSG_AFTER_ATTACH);
    };
    /**
     * A message handler invoked on a `'child-removed'` message.
     *
     * #### Notes
     * The default implementation removes the child node from the widget
     * node and dispatches a `'before-detach'` message if appropriate.
     *
     * Subclasses may reimplement this method to control how the child
     * node is removed, but they must  dispatch a `'before-detach'`
     * message if appropriate.
     */
    Widget.prototype.onChildRemoved = function (msg) {
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, exports.MSG_BEFORE_DETACH);
        this.node.removeChild(msg.child.node);
    };
    /**
     * A message handler invoked on a `'child-moved'` message.
     *
     * #### Notes
     * The default implementation moves the child node to the proper
     * location in the widget node and dispatches a `'before-detach'`
     * and `'after-attach'` message if appropriate.
     *
     * Subclasses may reimplement this method to control how the child
     * node is moved, but they must dispatch a `'before-detach'` and
     * `'after-attach'` message if appropriate.
     */
    Widget.prototype.onChildMoved = function (msg) {
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, exports.MSG_BEFORE_DETACH);
        var next = this.childAt(msg.currentIndex + 1);
        this.node.insertBefore(msg.child.node, next && next.node);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, exports.MSG_AFTER_ATTACH);
    };
    /**
     * A message handler invoked on a `'resize'` message.
     *
     * #### Notes
     * The default implementation of this handler sends an [[UnknownSize]]
     * resize message to each child. This ensures that the resize messages
     * propagate through all widgets in the hierarchy.
     *
     * Subclasses may reimplement this method as needed, but they must
     * dispatch `'resize'` messages to their children as appropriate.
     */
    Widget.prototype.onResize = function (msg) {
        sendToAll(this._children, ResizeMessage.UnknownSize);
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     *
     * #### Notes
     * The default implementation of this handler sends an [[UnknownSize]]
     * resize message to each child. This ensures that the resize messages
     * propagate through all widgets in the hierarchy.
     *
     * Subclass may reimplement this method as needed, but they should
     * dispatch `'resize'` messages to their children as appropriate.
     *
     * **See also:** [[update]], [[MSG_UPDATE_REQUEST]]
     */
    Widget.prototype.onUpdateRequest = function (msg) {
        sendToAll(this._children, ResizeMessage.UnknownSize);
    };
    /**
     * A message handler invoked on a `'close-request'` message.
     *
     * #### Notes
     * The default implementation of this handler will unparent or detach
     * the widget as appropriate. Subclasses may reimplement this handler
     * for custom close behavior.
     *
     * **See also:** [[close]], [[MSG_CLOSE_REQUEST]]
     */
    Widget.prototype.onCloseRequest = function (msg) {
        if (this._parent) {
            this._parent.removeChild(this);
        }
        else if (this.isAttached) {
            detachWidget(this);
        }
    };
    /**
     * A message handler invoked on a `'layout-request'` message.
     *
     * The default implementation of this handler is a no-op.
     *
     * **See also:** [[MSG_LAYOUT_REQUEST]]
     */
    Widget.prototype.onLayoutRequest = function (msg) { };
    /**
     * A message handler invoked on an `'after-show'` message.
     *
     * The default implementation of this handler is a no-op.
     *
     * **See also:** [[MSG_AFTER_SHOW]]
     */
    Widget.prototype.onAfterShow = function (msg) { };
    /**
     * A message handler invoked on a `'before-hide'` message.
     *
     * The default implementation of this handler is a no-op.
     *
     * **See also:** [[MSG_BEFORE_HIDE]]
     */
    Widget.prototype.onBeforeHide = function (msg) { };
    /**
     * A message handler invoked on an `'after-attach'` message.
     *
     * **See also:** [[MSG_AFTER_ATTACH]]
     */
    Widget.prototype.onAfterAttach = function (msg) { };
    /**
     * A message handler invoked on a `'before-detach'` message.
     *
     * **See also:** [[MSG_BEFORE_DETACH]]
     */
    Widget.prototype.onBeforeDetach = function (msg) { };
    /**
     * A message handler invoked on a `'child-shown'` message.
     *
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onChildShown = function (msg) { };
    /**
     * A message handler invoked on a `'child-hidden'` message.
     *
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onChildHidden = function (msg) { };
    /**
     * A signal emitted when the widget is disposed.
     *
     * **See also:** [[disposed]], [[isDisposed]]
     */
    Widget.disposedSignal = new phosphor_signaling_1.Signal();
    /**
     * A property descriptor which controls the hidden state of a widget.
     *
     * #### Notes
     * This property controls whether a widget is explicitly hidden.
     *
     * Hiding a widget will cause the widget and all of its descendants
     * to become not-visible.
     *
     * This property will toggle the presence of [[HIDDEN_CLASS]] on a
     * widget according to the property value. It will also dispatch
     * `'after-show'` and `'before-hide'` messages as appropriate.
     *
     * The default property value is `false`.
     *
     * **See also:** [[hidden]], [[isVisible]]
     */
    Widget.hiddenProperty = new phosphor_properties_1.Property({
        value: false,
        changed: onHiddenChanged,
    });
    return Widget;
})(phosphor_nodewrapper_1.NodeWrapper);
exports.Widget = Widget;
/**
 * Attach a widget to a host DOM node.
 *
 * @param widget - The widget to attach to the DOM.
 *
 * @param host - The node to use as the widget's host.
 *
 * @throws Will throw an error if the widget is not a root widget,
 *   if the widget is already attached to the DOM, or if the host
 *   is not attached to the DOM.
 *
 * #### Notes
 * This function ensures that an `'after-attach'` message is dispatched
 * to the hierarchy. It should be used in lieu of manual DOM attachment.
 */
function attachWidget(widget, host) {
    if (widget.parent) {
        throw new Error('only a root widget can be attached to the DOM');
    }
    if (widget.isAttached || document.body.contains(widget.node)) {
        throw new Error('widget is already attached to the DOM');
    }
    if (!document.body.contains(host)) {
        throw new Error('host is not attached to the DOM');
    }
    host.appendChild(widget.node);
    phosphor_messaging_1.sendMessage(widget, exports.MSG_AFTER_ATTACH);
}
exports.attachWidget = attachWidget;
/**
 * Detach a widget from its host DOM node.
 *
 * @param widget - The widget to detach from the DOM.
 *
 * @throws Will throw an error if the widget is not a root widget,
 *   or if the widget is not attached to the DOM.
 *
 * #### Notes
 * This function ensures that a `'before-detach'` message is dispatched
 * to the hierarchy. It should be used in lieu of manual DOM detachment.
 */
function detachWidget(widget) {
    if (widget.parent) {
        throw new Error('only a root widget can be detached from the DOM');
    }
    if (!widget.isAttached || !document.body.contains(widget.node)) {
        throw new Error('widget is not attached to the DOM');
    }
    phosphor_messaging_1.sendMessage(widget, exports.MSG_BEFORE_DETACH);
    widget.node.parentNode.removeChild(widget.node);
}
exports.detachWidget = detachWidget;
/**
 * A message class for child-related messages.
 */
var ChildMessage = (function (_super) {
    __extends(ChildMessage, _super);
    /**
     * Construct a new child message.
     *
     * @param type - The message type.
     *
     * @param child - The child widget for the message.
     *
     * @param previousIndex - The previous index of the child, if known.
     *   The default index is `-1` and indicates an unknown index.
     *
     * @param currentIndex - The current index of the child, if known.
     *   The default index is `-1` and indicates an unknown index.
     */
    function ChildMessage(type, child, previousIndex, currentIndex) {
        if (previousIndex === void 0) { previousIndex = -1; }
        if (currentIndex === void 0) { currentIndex = -1; }
        _super.call(this, type);
        this._child = child;
        this._currentIndex = currentIndex;
        this._previousIndex = previousIndex;
    }
    Object.defineProperty(ChildMessage.prototype, "child", {
        /**
         * The child widget for the message.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._child;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChildMessage.prototype, "currentIndex", {
        /**
         * The current index of the child.
         *
         * #### Notes
         * This will be `-1` if the current index is unknown.
         *
         * This is a read-only property.
         */
        get: function () {
            return this._currentIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChildMessage.prototype, "previousIndex", {
        /**
         * The previous index of the child.
         *
         * #### Notes
         * This will be `-1` if the previous index is unknown.
         *
         * This is a read-only property.
         */
        get: function () {
            return this._previousIndex;
        },
        enumerable: true,
        configurable: true
    });
    return ChildMessage;
})(phosphor_messaging_1.Message);
exports.ChildMessage = ChildMessage;
/**
 * A message class for 'resize' messages.
 */
var ResizeMessage = (function (_super) {
    __extends(ResizeMessage, _super);
    /**
     * Construct a new resize message.
     *
     * @param width - The **offset width** of the widget, or `-1` if
     *   the width is not known.
     *
     * @param height - The **offset height** of the widget, or `-1` if
     *   the height is not known.
     */
    function ResizeMessage(width, height) {
        _super.call(this, 'resize');
        this._width = width;
        this._height = height;
    }
    Object.defineProperty(ResizeMessage.prototype, "width", {
        /**
         * The offset width of the widget.
         *
         * #### Notes
         * This will be `-1` if the width is unknown.
         *
         * This is a read-only property.
         */
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeMessage.prototype, "height", {
        /**
         * The offset height of the widget.
         *
         * #### Notes
         * This will be `-1` if the height is unknown.
         *
         * This is a read-only property.
         */
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * A singleton 'resize' message with an unknown size.
     */
    ResizeMessage.UnknownSize = new ResizeMessage(-1, -1);
    return ResizeMessage;
})(phosphor_messaging_1.Message);
exports.ResizeMessage = ResizeMessage;
/**
 * An enum of widget bit flags.
 */
var WidgetFlag;
(function (WidgetFlag) {
    /**
     * The widget is attached to the DOM.
     */
    WidgetFlag[WidgetFlag["IsAttached"] = 1] = "IsAttached";
    /**
     * The widget is visible.
     */
    WidgetFlag[WidgetFlag["IsVisible"] = 2] = "IsVisible";
    /**
     * The widget has been disposed.
     */
    WidgetFlag[WidgetFlag["IsDisposed"] = 4] = "IsDisposed";
})(WidgetFlag || (WidgetFlag = {}));
/**
 * Create a new offset rect full of NaN's.
 */
function makeOffsetRect() {
    return { top: NaN, left: NaN, width: NaN, height: NaN };
}
/**
 * Clone an offset rect object.
 */
function cloneOffsetRect(rect) {
    return {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
    };
}
/**
 * Get the offset rect for a DOM node.
 */
function getOffsetRect(node) {
    return {
        top: node.offsetTop,
        left: node.offsetLeft,
        width: node.offsetWidth,
        height: node.offsetHeight,
    };
}
/**
 * The change handler for the [[hiddenProperty]].
 */
function onHiddenChanged(owner, old, hidden) {
    if (hidden) {
        if (owner.isAttached && (!owner.parent || owner.parent.isVisible)) {
            phosphor_messaging_1.sendMessage(owner, exports.MSG_BEFORE_HIDE);
        }
        owner.addClass(exports.HIDDEN_CLASS);
        if (owner.parent) {
            phosphor_messaging_1.sendMessage(owner.parent, new ChildMessage('child-hidden', owner));
        }
    }
    else {
        owner.removeClass(exports.HIDDEN_CLASS);
        if (owner.isAttached && (!owner.parent || owner.parent.isVisible)) {
            phosphor_messaging_1.sendMessage(owner, exports.MSG_AFTER_SHOW);
        }
        if (owner.parent) {
            phosphor_messaging_1.sendMessage(owner.parent, new ChildMessage('child-shown', owner));
        }
    }
}
/**
 * Send a message to all widgets in an array.
 */
function sendToAll(array, msg) {
    for (var i = 0; i < array.length; ++i) {
        phosphor_messaging_1.sendMessage(array[i], msg);
    }
}
/**
 * Send a message to all non-hidden widgets in an array.
 */
function sendToShown(array, msg) {
    for (var i = 0; i < array.length; ++i) {
        if (!array[i].hidden)
            phosphor_messaging_1.sendMessage(array[i], msg);
    }
}

},{"./index.css":29,"phosphor-arrays":4,"phosphor-domutil":7,"phosphor-messaging":14,"phosphor-nodewrapper":15,"phosphor-properties":16,"phosphor-signaling":18}]},{},[2]);
