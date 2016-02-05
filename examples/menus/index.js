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
 * A handler which logs the item text to the log span.
 */
function logHandler(item) {
    var node = document.getElementById('log-span');
    node.textContent = item.text.replace(/&/g, '');
}
/**
 * A handler which toggles the item state when executed.
 */
function saveOnExitHandler(item) {
    logHandler(item);
    item.checked = !item.checked;
}
/**
 * Create the example menu bar.
 */
function createMenuBar() {
    var fileMenu = new phosphor_menus_1.Menu([
        new phosphor_menus_1.MenuItem({
            text: 'New File',
            shortcut: 'Ctrl+N',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Open File',
            shortcut: 'Ctrl+O',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Save File',
            shortcut: 'Ctrl+S',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Save As...',
            shortcut: 'Ctrl+Shift+S',
            disabled: true
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Close File',
            shortcut: 'Ctrl+W',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Close All',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: 'More...',
            submenu: new phosphor_menus_1.Menu([
                new phosphor_menus_1.MenuItem({
                    text: 'One',
                    handler: logHandler
                }),
                new phosphor_menus_1.MenuItem({
                    text: 'Two',
                    handler: logHandler
                }),
                new phosphor_menus_1.MenuItem({
                    text: 'Three',
                    handler: logHandler
                }),
                new phosphor_menus_1.MenuItem({
                    text: 'Four',
                    handler: logHandler
                })
            ])
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Exit',
            handler: logHandler
        })
    ]);
    var editMenu = new phosphor_menus_1.Menu([
        new phosphor_menus_1.MenuItem({
            text: '&Undo',
            icon: 'fa fa-undo',
            shortcut: 'Ctrl+Z',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            text: '&Repeat',
            icon: 'fa fa-repeat',
            shortcut: 'Ctrl+Y',
            disabled: true
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: '&Copy',
            icon: 'fa fa-copy',
            shortcut: 'Ctrl+C',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Cu&t',
            icon: 'fa fa-cut',
            shortcut: 'Ctrl+X',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            text: '&Paste',
            icon: 'fa fa-paste',
            shortcut: 'Ctrl+V',
            handler: logHandler
        })
    ]);
    var findMenu = new phosphor_menus_1.Menu([
        new phosphor_menus_1.MenuItem({
            text: 'Find...',
            shortcut: 'Ctrl+F',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Find Next',
            shortcut: 'F3',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Find Previous',
            shortcut: 'Shift+F3',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Replace...',
            shortcut: 'Ctrl+H',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Replace Next',
            shortcut: 'Ctrl+Shift+H',
            handler: logHandler
        })
    ]);
    var helpMenu = new phosphor_menus_1.Menu([
        new phosphor_menus_1.MenuItem({
            text: 'Documentation',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            text: 'About',
            handler: logHandler
        })
    ]);
    return new phosphor_menus_1.MenuBar([
        new phosphor_menus_1.MenuItem({
            text: 'File',
            submenu: fileMenu
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Edit',
            submenu: editMenu
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Find',
            submenu: findMenu
        }),
        new phosphor_menus_1.MenuItem({
            text: 'View',
            type: phosphor_menus_1.MenuItem.Submenu
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Help',
            submenu: helpMenu
        })
    ]);
}
/**
 * Create the example context menu.
 */
function createContextMenu() {
    return new phosphor_menus_1.Menu([
        new phosphor_menus_1.MenuItem({
            text: '&Copy',
            icon: 'fa fa-copy',
            shortcut: 'Ctrl+C',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Cu&t',
            icon: 'fa fa-cut',
            shortcut: 'Ctrl+X',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            text: '&Paste',
            icon: 'fa fa-paste',
            shortcut: 'Ctrl+V',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: '&New Tab',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            text: '&Close Tab',
            handler: logHandler
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Check,
            text: '&Save On Exit',
            handler: saveOnExitHandler
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Task Manager',
            disabled: true
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: 'More...',
            submenu: new phosphor_menus_1.Menu([
                new phosphor_menus_1.MenuItem({
                    text: 'One',
                    handler: logHandler
                }),
                new phosphor_menus_1.MenuItem({
                    text: 'Two',
                    handler: logHandler
                }),
                new phosphor_menus_1.MenuItem({
                    text: 'Three',
                    handler: logHandler
                }),
                new phosphor_menus_1.MenuItem({
                    text: 'Four',
                    handler: logHandler
                })
            ])
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Close',
            icon: 'fa fa-close',
            handler: logHandler
        })
    ]);
}
/**
 * The main application entry point.
 */
function main() {
    var contextArea = new phosphor_widget_1.Widget();
    contextArea.addClass('ContextArea');
    contextArea.node.innerHTML = ('<h2>Notice the menu bar at the top of the document.</h2>' +
        '<h2>Right click this panel for a context menu.</h2>' +
        '<h3>Clicked Item: <span id="log-span"></span></h3>');
    contextArea.title.text = 'Demo';
    var cmSource = new CodeMirrorWidget({
        mode: 'text/javascript',
        lineNumbers: true,
        tabSize: 2,
    });
    cmSource.loadTarget('./index.ts');
    cmSource.title.text = 'Source';
    var cmCss = new CodeMirrorWidget({
        mode: 'text/css',
        lineNumbers: true,
        tabSize: 2,
    });
    cmCss.loadTarget('./index.css');
    cmCss.title.text = 'CSS';
    var contextMenu = createContextMenu();
    contextArea.node.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        var x = event.clientX;
        var y = event.clientY;
        contextMenu.popup(x, y);
    });
    var menuBar = createMenuBar();
    var panel = new phosphor_tabs_1.TabPanel();
    panel.id = 'main';
    panel.addChild(contextArea);
    panel.addChild(cmSource);
    panel.addChild(cmCss);
    menuBar.attach(document.body);
    panel.attach(document.body);
    window.onresize = function () { panel.update(); };
}
window.onload = main;
