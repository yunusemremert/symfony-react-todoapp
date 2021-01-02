import React, { useContext, useState } from 'react'

import { TodoContext } from '../contexts/TodoContext'

import DeleteDialog from './DeleteDialog'

import {
    IconButton,
    InputAdornment,
    LinearProgress,
    makeStyles,
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

const useStyles = makeStyles((theme) => ({
    thead: {
        backgroundColor: theme.palette.primary.main
    }
}))

function TodoTable() {
    const context = useContext(TodoContext)

    const [addTodoName, setAddTodoName] = useState('')
    const [addTodoDescription, setAddTodoDescription] = useState('')
    const [deleteTodo, setDeleteTodo] = useState({})
    const [editIsShow, setEditIsShow] = useState(0)
    const [editTodoName, setEditTodoName] = useState('')
    const [editTodoDescription, setEditTodoDescription] = useState('')
    const [deleteIsShow, setDeleteIsShow] = useState(false)

    const classes = useStyles()

    const submitForm = (e) => {
        e.preventDefault()

        if (addTodoName.length >= 5 && addTodoDescription.length >= 5) {
            context.createTodo({ name: addTodoName, description: addTodoDescription })

            setAddTodoName('')
            setAddTodoDescription('')
        } else {
            context.setMessage({ text: '!Enter at least 5 character.', status: true })
        }
    }

    return (
        <>
            <form onSubmit={submitForm}>
                <Table>
                    <TableHead className={classes.thead}>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    value={addTodoName}
                                    onChange={(e) => {
                                        setAddTodoName(e.target.value)
                                    }}
                                    label="New Task"
                                    fullWidth={true}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={addTodoDescription}
                                    onChange={(e) => {
                                        setAddTodoDescription(e.target.value)
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
                        {context.todos.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LinearProgress />
                                </TableCell>
                            </TableRow>
                        ) : (
                            context.todos.map((todo, index) => (
                                <TableRow key={`todo-` + index}>
                                    <TableCell component="th" scope="row">
                                        {editIsShow === todo.id ? (
                                            <TextField
                                                fullWidth={true}
                                                value={editTodoName}
                                                onChange={(e) => {
                                                    setEditTodoName(e.target.value)
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
                                                                        context.updateTodo({
                                                                            id: todo.id,
                                                                            name: editTodoName,
                                                                            description: editTodoDescription
                                                                        })
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
                                    <TableCell component="th" scope="row">
                                        {editIsShow === todo.id ? (
                                            <TextField
                                                fullWidth={true}
                                                value={editTodoDescription}
                                                onChange={(e) => {
                                                    setEditTodoDescription(e.target.value)
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
                                                                        context.updateTodo({
                                                                            id: todo.id,
                                                                            name: editTodoName,
                                                                            description: editTodoDescription
                                                                        })
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
                                            todo.description
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color="primary"
                                            onClick={() => {
                                                setEditIsShow(todo.id)
                                                setEditTodoName(todo.name)
                                                setEditTodoDescription(todo.description)
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={() => {
                                                setDeleteTodo(todo)
                                                setDeleteIsShow(true)
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
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
