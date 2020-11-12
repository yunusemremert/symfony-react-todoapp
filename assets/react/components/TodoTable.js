import React, { useContext } from 'react'
import { TodoContext } from '../contexts/TodoContext'

function TodoTable() {
    const context = useContext(TodoContext)

    return (
        <div>
            {context.todos.map((todo) => (
                <div key={todo.id}>{todo.name}</div>
            ))}
        </div>
    )
}

export default TodoTable
