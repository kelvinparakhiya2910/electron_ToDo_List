import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({ task, delete_todo, editing_todo, complete_todo }) => {
    return (
        <div className="Todo">
            <p className={`${task.is_completed === 0 ? "completed" : "incompleted"}`} onClick={() => complete_todo(task.todo_id, task.is_completed === 0 ? 1 : 0)}>{task.todo_name}</p>
            <div>
                <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editing_todo(task.todo_id, task.is_editing === 0 ? 1 : 0)} />
                <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => delete_todo(task.todo_id)} />
            </div>
        </div>
    )
}
