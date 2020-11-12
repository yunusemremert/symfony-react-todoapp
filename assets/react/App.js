import React from 'react'

import TodoContextProvider from './contexts/TodoContext'

import TodoTable from './components/TodoTable'

export default function App() {
    return (
        <TodoContextProvider>
            <TodoTable />
        </TodoContextProvider>
    )
}
