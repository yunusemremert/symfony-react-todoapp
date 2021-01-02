import React from 'react'

import { Link } from 'react-router-dom'

import { Box, Typography, Button } from '@material-ui/core/'

const NotFound = () => {
    return (
        <Box textAlign="center">
            <Typography variant="h1">Page not found 404</Typography>
            <Link style={{ textDecoration: 'none' }} to="/">
                <Button color="primary" variant="contained" size="large">
                    Go back the the homepage
                </Button>
            </Link>
        </Box>
    )
}

export default NotFound
