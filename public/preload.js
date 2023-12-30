// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
const { contextBridge, ipcRenderer } = require("electron");
// const tastmgr = require("../models/testmgr");

// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".

contextBridge.exposeInMainWorld("todoOperations", {
    ipcInvoke : (channel,data) => ipcRenderer.invoke(channel,data),
});









// addTodo: (todo) => {
//     setTodos([
//         ...todos,
//         { id: uuidv4(), task: todo, completed: false, isEditing: false },
//     ]);
// },
// deleteTodo: (id) => setTodos(todos.filter((todo) => todo.id !== id)),
// toggleComplete: (id) => {
//     setTodos(
//         todos.map((todo) =>
//             todo.id === id ? { ...todo, completed: !todo.completed } : todo
//         )
//     );
// },
// editTodo: (id) => {
//     setTodos(
//         todos.map((todo) =>
//             todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
//         )
//     );
// },
// editTask: (task, id) => {
//     setTodos(
//         todos.map((todo) =>
//             todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
//         )
//     );
// },