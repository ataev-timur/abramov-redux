let todoID = 0;

export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: todoID++,
    text: text
});

export const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
});

export const toggleItem = (id) => ({
    type: 'TOGGLE_TODO',
    id: id
});