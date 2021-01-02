import React from 'react'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import TodoContextProvider from '../contexts/TodoContext'

import { makeStyles } from '@material-ui/core/styles'

import NotFound from './NotFound'
import AppSnackbar from './AppSnackbar'
import Navigation from './Navigation'
import TodoTable from './TodoTable'

const TodoList = () => (
    <TodoContextProvider>
        <AppSnackbar />
        <TodoTable />
    </TodoContextProvider>
)

const useStyles = makeStyles((theme) => ({
    divider: theme.mixins.toolbar
}))

const Router = () => {
    const classes = useStyles()

    return (
        <BrowserRouter>
            <Navigation />
            <div className={classes.divider} />
            <Switch>
                <Redirect exact from="/" to="/todo-list" />
                <Route exact path="/todo-list" component={TodoList} />
                <Route exact path="/tag-list" component={null} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router
