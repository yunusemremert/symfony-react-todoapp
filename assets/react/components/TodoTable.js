import React, { useContext, useState } from 'react'

import { TodoContext } from '../contexts/TodoContext'

import {
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'

import DeleteDialog from './DeleteDialog'

function TodoTable() {
    const context = useContext(TodoContext)

    const [addTodo, setAddTodo] = useState('')
    const [deleteTodo, setDeleteTodo] = useState({})
    const [editIsShow, setEditIsShow] = useState(0)
    const [editTodo, setEditTodo] = useState('')
    const [deleteIsShow, setDeleteIsShow] = useState(false)

    const submitForm = (e) => {
        e.preventDefault()

        if (addTodo.length >= 3) {
            context.createTodo({ id: context.todos.length + 1, name: addTodo })

            setAddTodo('')
        }
    }

    return (
        <>
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
                                    {editIsShow === todo.id ? (
                                        <TextField
                                            fullWidth={true}
                                            value={editTodo}
                                            onChange={(e) => {
                                                setEditTodo(e.target.value)
                                            }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment
                                                        position="start"
                                                        style={{ margin: '20px 8px 30px 0' }}
                                                    >
                                                        <IconButton
                                                            onClick={() => {
                                                                {
                                                                    context.updateTodo({ id: todo.id, name: editTodo })
                                                                    setEditIsShow(0)
                                                                }
                                                            }}
                                                        >
                                                            <DoneIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => {
                                                                setEditIsShow(0)
                                                            }}
                                                        >
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    ) : (
                                        todo.name
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        onClick={() => {
                                            setEditIsShow(todo.id)
                                            setEditTodo(todo.name)
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            setDeleteTodo(todo)
                                            setDeleteIsShow(true)
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>
            {deleteIsShow && (
                <DeleteDialog
                    open={deleteIsShow}
                    todo={deleteTodo}
                    deleteTodo={context.deleteTodo}
                    deleteIsShow={setDeleteIsShow}
                />
            )}
        </>
    )
}

export default TodoTable
