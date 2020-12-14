import React, { useCallback } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'

const DeleteDialog = ({ open, todo, deleteTodo = () => {}, deleteIsShow = () => {} }) => {
    const deleteTodoItem = useCallback((id) => {
        deleteTodo(id)
        deleteIsShow(false)
    }, [])

    return (
        <Dialog fullWidth={true} maxWidth="xs" open={open}>
            <DialogTitle>Are you sure you wish to delete this to-do?</DialogTitle>
            <DialogContent>{todo.name}</DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        deleteTodoItem(todo.id)
                    }}
                >
                    Delete
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        deleteIsShow(false)
                    }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog
