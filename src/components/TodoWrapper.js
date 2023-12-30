import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {

    const [todos, setTodos] = useState([]);
    //{ todo_id: 1, todo_name: 'hhh', is_completed: 1, is_editing: 1 }


    useEffect(() => {
        getToDo();
    }, [])

    // Get Table Function
    const getToDo = async () => {
        const get_todo_table = await window.todoOperations.ipcInvoke("get_table");
        setTodos(get_todo_table);
    }

    // Add ToDo Function
    const add_todo = async (todo_text) => {
        const add_new_todo = await window.todoOperations.ipcInvoke("add_table_row", { "todo_text": todo_text });
        setTodos(add_new_todo);
    }

    // Delete ToDo Function
    const delete_todo = async (todo_id) => {
        const delete_todo_row = await window.todoOperations.ipcInvoke("delete_table_row", { "todo_id": todo_id });
        setTodos(delete_todo_row);
    };

    // Toggle Is Complete Function
    const complete_todo = async (todo_id, is_completed) => {
        const complete_todo_edit = await window.todoOperations.ipcInvoke("complete_todo_edit", { "is_completed": is_completed, "todo_id": todo_id });
        setTodos(complete_todo_edit);
    }

    // Editing ToDo Function
    const editing_todo = async (todo_id, is_editing) => {
        const is_todo_editing = await window.todoOperations.ipcInvoke("is_todo_editing", { "is_editing": is_editing, "todo_id": todo_id });
        setTodos(is_todo_editing);
    }

    // Edit Task Function
    const edit_task = async (todo_id, todo_text, is_editing, is_completed) => {
        const edit_todo_text = await window.todoOperations.ipcInvoke("edit_todo_text", { "todo_name": todo_text, "is_editing": is_editing, "is_completed": is_completed, "todo_id": todo_id });
        setTodos(edit_todo_text);

    };

    return (
        <>
            <div className="TodoWrapper">
                <h1>Get Things Done !</h1>
                <TodoForm add_todo={add_todo} />
                {/* display todos */}
                {todos.map((todo) =>
                    todo.is_editing === 1 ? (
                        <EditTodoForm edit_task={edit_task} task={todo} />
                    ) : (
                        <Todo
                            key={todo.todo_id}
                            task={todo}
                            delete_todo={delete_todo}
                            editing_todo={editing_todo}
                            complete_todo={complete_todo}
                        />
                    )
                )}
            </div>
        </>
    );
};