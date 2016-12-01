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
}


let todoID = 0;

const AddTodo = ({onAddClick}) => {
	let input;
	return (
		<div>
		  	<input ref={
		  		node => {
		  			input = node;
		  		}
		  	}/>
		    <button onClick={() => {
		    		onAddClick(input.value); input.value = ''; 
	    	}}>Add</button>
    	</div>
	);
}

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

class FilterLink extends Component {
	componentDidMount() {
		this.unsubscribe = store.subscribe(() => {this.forceUpdate()});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		const props = this.props;
		const state = store.getState();

		return (
			<Link
				active={props.filter === state.visibilityFilter}
				onClick={() => store.dispatch({type:'SET_VISIBILITY_FILTER', filter: props.filter})}
			>
			{props.children}
			</Link>
		);
	}

}

const Footer = ({visibilityFilter, onFilterClick}) => {
	return (
		<div>
			Show: 
	    	{' '}
	    	<FilterLink 
	    		filter='SHOW_ALL' 	 
	    		currentFilter={visibilityFilter}
	    		onClick={onFilterClick}
    		>All</FilterLink>
	    	{' '}
	    	<FilterLink 
	    		filter='SHOW_ACTIVE' 
	    		currentFilter={visibilityFilter}
	    		onClick={onFilterClick}
    		>Active</FilterLink>
	    	{' '}
	    	<FilterLink 
	    		filter='SHOW_COMPLETED' 
	    		currentFilter={visibilityFilter}
	    		onClick={onFilterClick}
			>Completed</FilterLink>
		</div>
	);
};

class TodoApp extends Component {
	render() {
		const {todos, visibilityFilter} = this.props;

		const visibleTodos = getVisibleTodos(todos, visibilityFilter);
		
		return (
		  <div>
		  	<AddTodo 
		  		onAddClick={
			  		(text) => {
			  			store.dispatch({type: 'ADD_TODO', text: text, id: todoID++});
			  		}}
	  		/>
		    <TodoList 
		    	todos={visibleTodos} 
		    	onTodoClick={(id) => {store.dispatch(
		    		{type: 'TOGGLE_TODO', id: id }
		    )}}/>
		    <Footer />
		  </div>
		);
	}
}



const render = () => {
	ReactDOM.render(
	  <TodoApp 
	  	{...store.getState()}
	  />,
	  document.getElementById('root')
	);	
}
render();
store.subscribe(render);

