import React, { useState } from 'react'

export const TodoForm = ({ add_todo }) => {
    const [value, setValue] = useState('');

    const handle_submit = (e) => {
        // prevent default action
        e.preventDefault();
        if (value) {
            // add todo
            add_todo(value);
            // clear form after submission
            setValue('');
        }
    };
    return (
        <form onSubmit={handle_submit} className="TodoForm">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='What is the task today?' />
            <button type="submit" className='todo-btn'>Add Task</button>
        </form>
    )
}
