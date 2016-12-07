import React from 'react';
import { addTodo } from '../actions/TodoApp';

const AddTodo = ({dispatch}) => {
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

export default AddTodo;