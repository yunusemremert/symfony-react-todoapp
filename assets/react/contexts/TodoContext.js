import React, { createContext, useEffect, useState } from 'react'

export const TodoContext = createContext(null)

import configData from '../../config.json'

function TodoContextProvider({ children }) {
    const [todos, setTodo] = useState([])

    useEffect(() => {
        fetch(configData.SERVER_URL + '/api/todo/read')
            .then((response) => response.json())
            .then((data) => setTodo(data))
    }, [])

    const createTodo = (todo) => {
        fetch(configData.SERVER_URL + '/api/todo/create', {
            method: 'POST',
            body: JSON.stringify(todo)
        })
            .then((res) => res.json())
            .then((res) => {
                const newTodos = [...todos, res.todo]

                setTodo(newTodos)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    const updateTodo = (data) => {
        fetch(configData.SERVER_URL + '/api/todo/update/' + data.id, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(() => {
                let todo = todos.find((todo) => {
                    return todo.id === data.id
                })

                todo.name = data.name

                const newTodos = [...todos, todo]

                setTodo(newTodos)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    const deleteTodo = (id) => {
        fetch(configData.SERVER_URL + '/api/todo/delete/' + id, {
            method: 'DELETE'
        })
            .then((res) => res.json())
            .then((res) => {
                const newTodos = todos.filter((todo) => todo.id !== id)

                setTodo(newTodos)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return <TodoContext.Provider value={{ todos, createTodo, updateTodo, deleteTodo }}>{children}</TodoContext.Provider>
}

export default TodoContextProvider
