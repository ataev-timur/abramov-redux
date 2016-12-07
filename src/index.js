import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/getStore';
import AddTodo from './containers/AddTodo';
import VisibleTodoList from './containers/VisibleTodoList';
import Footer from './components/Footer';

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

ReactDOM.render(
	<Provider store={store}>
		<TodoApp />
	</Provider>,
  	document.getElementById('root')
);
