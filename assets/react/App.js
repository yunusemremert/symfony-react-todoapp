import React from 'react'

import TodoContextProvider from './contexts/TodoContext'

import TodoTable from './components/TodoTable'
import AppSnackbar from './components/AppSnackbar'

import DefaultThemeProvider from './components/themes/DefaultThemeProvider'

export default function App() {
    return (
        <DefaultThemeProvider>
            <TodoContextProvider>
                <TodoTable />
                <AppSnackbar />
            </TodoContextProvider>
        </DefaultThemeProvider>
    )
}
