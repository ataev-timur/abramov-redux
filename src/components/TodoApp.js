import React, { Component } from 'react';

class TodoApp extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let todos = this.props.todos.map(todo => <li key={todo.id}>{ todo.text }</li>);
		return (
		  <div>
		  	<input ref="todoText" />
		    <button onClick={this.props.addTodo}>Add</button>
		    <ul>
		    	{todos}
		    </ul>
		  </div>
		);
	}
}

export default TodoApp;