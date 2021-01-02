import React from 'react'

import { createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core'

import { red, purple } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: purple[500]
        },
        secondary: {
            main: red[500]
        }
    }
})

const DefaultThemeProvider = (props) => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </MuiThemeProvider>
    )
}

export default DefaultThemeProvider
