import React from 'react';
const Todo = ({onClick, completed, text}) => {
    const style	= {textDecoration: completed ? 'line-through' : 'none'};
    return (<li onClick={onClick} style={style}>{text}</li>);
};

export default Todo;