import React from 'react'

import DefaultThemeProvider from './components/themes/DefaultThemeProvider'

import Router from './components/Router'

export default function App() {
    return (
        <DefaultThemeProvider>
            <Router />
        </DefaultThemeProvider>
    )
}
