import React, { createContext, useEffect, useState } from 'react'

export const TodoContext = createContext(null)

import configData from '../../config.json'

function TodoContextProvider({ children }) {
    const [todos, setTodo] = useState([])
    const [message, setMessage] = useState({})

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
                if (res.error === false) {
                    const newTodos = [...todos, res.todo]

                    setTodo(newTodos)
                }

                setMessage({ text: res.message, status: res.error })
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
            .then((res) => {
                let todo = todos.find((todo) => {
                    return todo.id === data.id
                })

                todo.name = data.name
                todo.description = data.description

                setTodo([...todos])

                setMessage({ text: res.message, status: res.error })
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

                setMessage({ text: res.message, status: res.error })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <TodoContext.Provider
            value={{ todos, createTodo, updateTodo, deleteTodo, message, setMessage: (message) => setMessage(message) }}
        >
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContextProvider
