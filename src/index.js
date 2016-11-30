import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';

const todo = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO': 
			return {
				id: action.id,
			 	text: action.text,
			 	completed: false
			}
		case 'TOGGLE_TODO':
			if (state.id !== action.id) {
				return state;
			}

			return {
				...state, completed: !state.completed
			};
		default:
			return state;
	}
}

const todos = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO': 
			return [...state, todo(undefined, action)];
		case 'TOGGLE_TODO':
			return state.map(item => todo(item, action));
		default:
			return state;
	}
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		default:
			return state;
	}
}

const todoApp = combineReducers({ todos, visibilityFilter });
const store = createStore(todoApp);

let todoID = 0;

class TodoApp extends Component {
	constructor(props) {
		super(props);
		this.addTodo 	= this.addTodo.bind(this);
	}

	addTodo(event) {
		store.dispatch({type: 'ADD_TODO', text: this.input.value, id: todoID++});
	}

	render() {
		let todos = this.props.todos.map(todo => {
			const toggleTodo = () => {

				console.log(todo);
				console.log(store.getState());
				store.dispatch({type: 'TOGGLE_TODO', id: todo.id});		
			}	
			return (<li key={todo.id} onClick={toggleTodo}>{ todo.text }</li>);
		});
		return (
		  <div>
		  	<input ref={
		  		node => {
		  			this.input = node;
		  		}
		  	}/>
		    <button onClick={this.addTodo}>Add</button>
		    <ul>
		    	{todos}
		    </ul>
		  </div>
		);
	}
}



const render = () => {
	ReactDOM.render(
	  <TodoApp 
	  	todos={store.getState().todos}
	  />,
	  document.getElementById('root')
	);	
}
render();
store.subscribe(render);

