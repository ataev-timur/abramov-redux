import { connect }      from 'react-redux';
import { toggleItem }   from '../actions/TodoApp';
import TodoList         from '../components/TodoList';

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

const mapStateToProps = (state) => ({
    todos: getVisibleTodos(
        state.todos,
        state.visibilityFilter
    )
});

const mapDispatchToProps = (dispatch) => ({
    onTodoClick: (id) => {
        dispatch(toggleItem(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);