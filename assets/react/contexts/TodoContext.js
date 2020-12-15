import React, { createContext, useEffect, useState } from 'react'

export const TodoContext = createContext(null)

function TodoContextProvider({ children }) {
    const [todos, setTodo] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/api/todo/read')
            .then((response) => response.json())
            .then((data) => setTodo(data))
    })

    const createTodo = (todo) => {
        const newTodos = [...todos, todo].sort(function (a, b) {
            return b.id - a.id
        })

        setTodo(newTodos)
    }

    const updateTodo = (data) => {
        let todo = todos.find((todo) => {
            return todo.id === data.id
        })

        todo.name = data.name
    }

    const deleteTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id)

        setTodo(newTodos)
    }

    return <TodoContext.Provider value={{ todos, createTodo, updateTodo, deleteTodo }}>{children}</TodoContext.Provider>
}

export default TodoContextProvider
