import React, { useContext } from 'react'

import { TodoContext } from '../contexts/TodoContext'

import { Button, Snackbar, SnackbarContent } from '@material-ui/core'

const AppSnackbar = () => {
    const context = useContext(TodoContext)

    const checkStatus = (status) => {
        switch (status) {
            case false:
                return 'green'
            case true:
                return 'red'
        }
    }

    return (
        <Snackbar open={context.message?.text !== undefined} autoHideDuration={3000}>
            <SnackbarContent
                style={{ backgroundColor: checkStatus(context.message.status) }}
                message={context.message.text}
                action={[
                    <Button onClick={() => context.setMessage({})} key="dismiss" color="inherit">
                        Dismiss
                    </Button>
                ]}
            />
        </Snackbar>
    )
}

export default AppSnackbar
