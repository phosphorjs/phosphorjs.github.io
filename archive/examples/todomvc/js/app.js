/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
var app = app || {};

(function () {
	'use strict';

	app.ALL_TODOS = 'all';
	app.ACTIVE_TODOS = 'active';
	app.COMPLETED_TODOS = 'completed';
	var TodoFooter = app.TodoFooter;
	var TodoItem = app.TodoItem;

	var ENTER_KEY = 13;

	app.TodoApp = React.createClass({displayName: "TodoApp",
		getInitialState: function () {
			return {
				nowShowing: app.ALL_TODOS,
				editing: null
			};
		},

		componentDidMount: function () {
			var setState = this.setState;
			var router = Router({
				'/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
				'/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
				'/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
			});
			router.init('/');
		},

		handleNewTodoKeyDown: function (event) {
			if (event.keyCode !== ENTER_KEY) {
				return;
			}

			event.preventDefault();

			var val = React.findDOMNode(this.refs.newField).value.trim();

			if (val) {
				this.props.model.addTodo(val);
				React.findDOMNode(this.refs.newField).value = '';
			}
		},

		toggleAll: function (event) {
			var checked = event.target.checked;
			this.props.model.toggleAll(checked);
		},

		toggle: function (todoToToggle) {
			this.props.model.toggle(todoToToggle);
		},

		destroy: function (todo) {
			this.props.model.destroy(todo);
		},

		edit: function (todo) {
			this.setState({editing: todo.id});
		},

		save: function (todoToSave, text) {
			this.props.model.save(todoToSave, text);
			this.setState({editing: null});
		},

		cancel: function () {
			this.setState({editing: null});
		},

		clearCompleted: function () {
			this.props.model.clearCompleted();
		},

		render: function () {
			var footer;
			var main;
			var todos = this.props.model.todos;

			var shownTodos = todos.filter(function (todo) {
				switch (this.state.nowShowing) {
				case app.ACTIVE_TODOS:
					return !todo.completed;
				case app.COMPLETED_TODOS:
					return todo.completed;
				default:
					return true;
				}
			}, this);

			var todoItems = shownTodos.map(function (todo) {
				return (
					React.createElement(TodoItem, {
						key: todo.id, 
						todo: todo, 
						onToggle: this.toggle.bind(this, todo), 
						onDestroy: this.destroy.bind(this, todo), 
						onEdit: this.edit.bind(this, todo), 
						editing: this.state.editing === todo.id, 
						onSave: this.save.bind(this, todo), 
						onCancel: this.cancel}
					)
				);
			}, this);

			var activeTodoCount = todos.reduce(function (accum, todo) {
				return todo.completed ? accum : accum + 1;
			}, 0);

			var completedCount = todos.length - activeTodoCount;

			if (activeTodoCount || completedCount) {
				footer =
					React.createElement(TodoFooter, {
						count: activeTodoCount, 
						completedCount: completedCount, 
						nowShowing: this.state.nowShowing, 
						onClearCompleted: this.clearCompleted}
					);
			}

			if (todos.length) {
				main = (
					React.createElement("section", {className: "main"}, 
						React.createElement("input", {
							className: "toggle-all", 
							type: "checkbox", 
							onChange: this.toggleAll, 
							checked: activeTodoCount === 0}
						), 
						React.createElement("ul", {className: "todo-list"}, 
							todoItems
						)
					)
				);
			}

			return (
				React.createElement("div", null, 
					React.createElement("header", {className: "header"}, 
						React.createElement("h1", null, "todos"), 
						React.createElement("input", {
							ref: "newField", 
							className: "new-todo", 
							placeholder: "What needs to be done?", 
							onKeyDown: this.handleNewTodoKeyDown, 
							autoFocus: true}
						)
					), 
					main, 
					footer
				)
			);
		}
	});


})();
