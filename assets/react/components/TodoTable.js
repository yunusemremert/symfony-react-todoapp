import React, { useContext, useState } from 'react'

import { TodoContext } from '../contexts/TodoContext'

import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

function TodoTable() {
    const context = useContext(TodoContext)
    const [addTodo, setAddTodo] = useState('')

    const submitForm = (e) => {
        e.preventDefault()

        if (addTodo.length >= 3) {
            context.createTodo({ id: context.todos.length + 1, name: addTodo })

            setAddTodo('')
        }
    }

    return (
        <form onSubmit={submitForm}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <TextField
                                value={addTodo}
                                onChange={(e) => {
                                    setAddTodo(e.target.value)
                                }}
                                label="New Task"
                                fullWidth={true}
                            />
                        </TableCell>
                        <TableCell align="right">
                            <IconButton type="submit">
                                <AddIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {context.todos.map((todo, index) => (
                        <TableRow key={`todo-` + index}>
                            <TableCell component="th" scope="row">
                                {todo.name}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </form>
    )
}

export default TodoTable
