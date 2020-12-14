import React from 'react'

import TodoContextProvider from './contexts/TodoContext'

import TodoTable from './components/TodoTable'

import { CssBaseline } from '@material-ui/core'

export default function App() {
    return (
        <TodoContextProvider>
            <CssBaseline>
                <TodoTable />
            </CssBaseline>
        </TodoContextProvider>
    )
}
