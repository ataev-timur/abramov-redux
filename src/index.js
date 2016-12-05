import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

let todoID = 0;
const addTodo = (text) => {
	return {
		type: 'ADD_TODO',
		id: todoID++,
		text: text
	}
};

const setVisibilityFilter = (filter) => {
	return {
		type: 'SET_VISIBILITY_FILTER',
		filter: filter
	}
};

const toggleItem = (id) => {
	return {
		type: 'TOGGLE_TODO',
		id: id
	}
};


const todo = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO': 
			return {
				id: action.id,
			 	text: action.text,
			 	completed: false
			};
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
};

const todos = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO': 
			return [...state, todo(undefined, action)];
		case 'TOGGLE_TODO':
			return state.map(item => todo(item, action));
		default:
			return state;
	}
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		default:
			return state;
	}
};

const getVisibleTodos = (todos, filter) => {
	switch (filter) {
		case 'SHOW_ALL':
			return todos;
		case 'SHOW_COMPLETED':
			return todos.filter(todo => todo.completed);
		case 'SHOW_ACTIVE':
			return todos.filter(todo => !todo.completed);
		default:
			return todos;
	}
};

let AddTodo = ({dispatch}) => {
	let input;
	return (
		<div>
		  	<input ref={
		  		node => {
		  			input = node;
		  		}
		  	}/>
		    <button onClick={() => {
				dispatch(addTodo(input.value));
				input.value = '';
	    	}}>Add</button>
    	</div>
	);
};

const Todo = ({onClick, completed, text}) => {
	const style	= {textDecoration: completed ? 'line-through' : 'none'};
	return (<li onClick={onClick} style={style}>{text}</li>);
};

const TodoList = (({todos, onTodoClick}) => (
	<ol>
	{ todos.map(todo => (<Todo key={todo.id} onClick={() => onTodoClick(todo.id)} completed={todo.completed} text={todo.text} />)) }
	</ol>
));

const Link = ({active, children, onClick}) => {
	if (active) {
		return (
			<span>{children}</span>
		);
	}
	return (
		<a href="#"
			onClick={e => {
				e.preventDefault();
				onClick();
			}}
		>
		{children}
		</a>
	);
};

const Footer = () => {
	return (
		<div>
			Show:
			{' '}
			<FilterLink
				filter='SHOW_ALL'
			>All</FilterLink>
			{' '}
			<FilterLink
				filter='SHOW_ACTIVE'
			>Active</FilterLink>
			{' '}
			<FilterLink
				filter='SHOW_COMPLETED'
			>Completed</FilterLink>
		</div>
	);
};

const mapStateToListProps = (state) => {
	return {
		todos: getVisibleTodos(
			state.todos,
			state.visibilityFilter
		)
	};
};

const mapDispatchToListProps = (dispatch) => {
	return {
		onTodoClick: (id) => {
			dispatch(toggleItem(id));
		}
	}
};

const mapStateToLinkProps = (state, ownProps) => {
	return {
		active: ownProps.filter === state.visibilityFilter
	}
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch(setVisibilityFilter(ownProps.filter))
		}
	}
};

AddTodo = connect()(AddTodo);

const VisibleTodoList = connect(mapStateToListProps, mapDispatchToListProps)(TodoList);
const FilterLink	  = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

class TodoApp extends Component {
	render() {
		return (
		  <div>
		  	<AddTodo />
		    <VisibleTodoList />
		    <Footer />
		  </div>
		);
	}
}

const todoApp = combineReducers({ todos, visibilityFilter });

ReactDOM.render(
	<Provider store={createStore(todoApp)}>
		<TodoApp />
	</Provider>,
  document.getElementById('root')
);
