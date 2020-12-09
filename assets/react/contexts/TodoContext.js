import React, { createContext, useState } from 'react'

export const TodoContext = createContext(null)

function TodoContextProvider({ children }) {
    const [todos, setTodo] = useState([
        {
            id: 1,
            name: 'React import'
        },
        {
            id: 2,
            name: 'React import'
        }
    ])

    const createTodo = (todo) => {
        const newTodos = [...todos, todo].sort(function (a, b) {
            return b.id - a.id
        })

        setTodo(newTodos)
    }
    const updateTodo = () => {}
    const deleteTodo = () => {}

    return <TodoContext.Provider value={{ todos, createTodo, updateTodo, deleteTodo }}>{children}</TodoContext.Provider>
}

export default TodoContextProvider
