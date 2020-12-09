import React, { useContext } from 'react'

import { TodoContext } from '../contexts/TodoContext'

import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

function TodoTable() {
    const context = useContext(TodoContext)

    return (
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
                        <TextField fullWidth={true} />
                    </TableCell>
                    <TableCell align="right">
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
                {context.todos.map((todo) => (
                    <TableRow key={todo.id}>
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
    )
}

export default TodoTable
