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
var phosphor_command_1 = require('phosphor-command');
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
 * A command which logs its arguments to the log span.
 */
var logCmd = new phosphor_command_1.DelegateCommand(function (args) {
    var node = document.getElementById('log-span');
    node.textContent = args;
});
/**
 * A simple disabled command.
 */
var disabledCmd = new phosphor_command_1.DelegateCommand(function () { });
disabledCmd.enabled = false;
/**
 * A command which toggles its state when executed.
 */
var saveOnExitCmd = new phosphor_command_1.DelegateCommand(function () {
    logCmd.execute('Save On Exit');
    saveOnExitCmd.checked = !saveOnExitCmd.checked;
});
/**
 * Create the example menu bar.
 */
function createMenuBar() {
    var fileMenu = new phosphor_menus_1.Menu([
        new phosphor_menus_1.MenuItem({
            text: 'New File',
            shortcut: 'Ctrl+N',
            command: logCmd,
            commandArgs: 'New File'
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Open File',
            shortcut: 'Ctrl+O',
            command: logCmd,
            commandArgs: 'Open File'
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Save File',
            shortcut: 'Ctrl+S',
            command: logCmd,
            commandArgs: 'Save File'
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Save As...',
            shortcut: 'Ctrl+Shift+S',
            command: disabledCmd
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Close File',
            shortcut: 'Ctrl+W',
            command: logCmd,
            commandArgs: 'Close File'
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Close All',
            command: logCmd,
            commandArgs: 'Close All'
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: 'More...',
            submenu: new phosphor_menus_1.Menu([
                new phosphor_menus_1.MenuItem({
                    text: 'One',
                    command: logCmd,
                    commandArgs: 'One'
                }),
                new phosphor_menus_1.MenuItem({
                    text: 'Two',
                    command: logCmd,
                    commandArgs: 'Two'
                }),
                new phosphor_menus_1.MenuItem({
                    text: 'Three',
                    command: logCmd,
                    commandArgs: 'Three'
                }),
                new phosphor_menus_1.MenuItem({
                    text: 'Four',
                    command: logCmd,
                    commandArgs: 'Four'
                })
            ])
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Exit',
            command: logCmd,
            commandArgs: 'Exit'
        })
    ]);
    var editMenu = new phosphor_menus_1.Menu([
        new phosphor_menus_1.MenuItem({
            text: '&Undo',
            icon: 'fa fa-undo',
            shortcut: 'Ctrl+Z',
            command: logCmd,
            commandArgs: 'Undo'
        }),
        new phosphor_menus_1.MenuItem({
            text: '&Repeat',
            icon: 'fa fa-repeat',
            shortcut: 'Ctrl+Y',
            command: disabledCmd
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: '&Copy',
            icon: 'fa fa-copy',
            shortcut: 'Ctrl+C',
            command: logCmd,
            commandArgs: 'Copy'
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Cu&t',
            icon: 'fa fa-cut',
            shortcut: 'Ctrl+X',
            command: logCmd,
            commandArgs: 'Cut'
        }),
        new phosphor_menus_1.MenuItem({
            text: '&Paste',
            icon: 'fa fa-paste',
            shortcut: 'Ctrl+V',
            command: logCmd,
            commandArgs: 'Paste'
        })
    ]);
    var findMenu = new phosphor_menus_1.Menu([
        new phosphor_menus_1.MenuItem({
            text: 'Find...',
            shortcut: 'Ctrl+F',
            command: logCmd,
            commandArgs: 'Find...'
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Find Next',
            shortcut: 'F3',
            command: logCmd,
            commandArgs: 'Find Next'
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Find Previous',
            shortcut: 'Shift+F3',
            command: logCmd,
            commandArgs: 'Find Previous'
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Replace...',
            shortcut: 'Ctrl+H',
            command: logCmd,
            commandArgs: 'Replace...'
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Replace Next',
            shortcut: 'Ctrl+Shift+H',
            command: logCmd,
            commandArgs: 'Replace Next'
        })
    ]);
    var helpMenu = new phosphor_menus_1.Menu([
        new phosphor_menus_1.MenuItem({
            text: 'Documentation',
            command: logCmd,
            commandArgs: 'Documentation'
        }),
        new phosphor_menus_1.MenuItem({
            text: 'About',
            command: logCmd,
            commandArgs: 'About'
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
            command: logCmd,
            commandArgs: 'Copy'
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Cu&t',
            icon: 'fa fa-cut',
            shortcut: 'Ctrl+X',
            command: logCmd,
            commandArgs: 'Cut'
        }),
        new phosphor_menus_1.MenuItem({
            text: '&Paste',
            icon: 'fa fa-paste',
            shortcut: 'Ctrl+V',
            command: logCmd,
            commandArgs: 'Paste'
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: '&New Tab',
            command: logCmd,
            commandArgs: 'New Tab'
        }),
        new phosphor_menus_1.MenuItem({
            text: '&Close Tab',
            command: logCmd,
            commandArgs: 'Close Tab'
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Check,
            text: '&Save On Exit',
            command: saveOnExitCmd
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Task Manager',
            command: disabledCmd
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: 'More...',
            submenu: new phosphor_menus_1.Menu([
                new phosphor_menus_1.MenuItem({
                    text: 'One',
                    command: logCmd,
                    commandArgs: 'One'
                }),
                new phosphor_menus_1.MenuItem({
                    text: 'Two',
                    command: logCmd,
                    commandArgs: 'Two'
                }),
                new phosphor_menus_1.MenuItem({
                    text: 'Three',
                    command: logCmd,
                    commandArgs: 'Three'
                }),
                new phosphor_menus_1.MenuItem({
                    text: 'Four',
                    command: logCmd,
                    commandArgs: 'Four'
                })
            ])
        }),
        new phosphor_menus_1.MenuItem({
            type: phosphor_menus_1.MenuItem.Separator
        }),
        new phosphor_menus_1.MenuItem({
            text: 'Close',
            icon: 'fa fa-close',
            command: logCmd,
            commandArgs: 'Close'
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
    panel.widgets.assign([contextArea, cmSource, cmCss]);
    phosphor_widget_1.Widget.attach(menuBar, document.body);
    phosphor_widget_1.Widget.attach(panel, document.body);
    window.onresize = function () { return panel.update(); };
}
window.onload = main;
