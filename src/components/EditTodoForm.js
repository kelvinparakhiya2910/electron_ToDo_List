import React, { useState } from 'react'

export const EditTodoForm = ({ edit_task, task }) => {
    const [value, setValue] = useState(task.todo_name);

    const handleSubmit = (e) => {
        // prevent default action
        e.preventDefault();
        // edit todo
        let is_editing = task.is_editing === 0 ? 1 : 0;
        let is_completed = task.is_completed === 0 ? 1 : 1;
        edit_task(task.todo_id, value, is_editing, is_completed);
    };
    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='Update task' />
            <button type="submit" className='todo-btn'>Add Task</button>
        </form>
    )
}
