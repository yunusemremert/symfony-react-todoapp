import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Button,
    Drawer,
    List,
    ListItem,
    Typography,
    ListItemText,
    ListItemIcon,
    makeStyles
} from '@material-ui/core'
import { Menu as MenuIcon, List as ListIcon, Label as LabelIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    menuIcon: {
        marginRight: theme.spacing(2)
    },
    list: {
        width: '200px'
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    }
}))

const Navigation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const classes = useStyles()

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    const drawerItems = [
        {
            text: 'Todo List',
            icon: <ListIcon />,
            link: '/todo-list'
        },
        {
            text: 'Tags',
            icon: <LabelIcon />,
            link: '/tag-list'
        }
    ]

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton onClick={toggleDrawer} className={classes.menuIcon} edge="start">
                    <MenuIcon />
                </IconButton>
                <Link className={classes.link} to="/todo-list">
                    <Typography color="textPrimary" variant="h6">
                        TodoApp
                    </Typography>
                </Link>
                <Box flexGrow={1} />
                <Button size="large">Login</Button>
            </Toolbar>
            <Drawer anchor="left" variant="temporary" onClose={toggleDrawer} open={drawerOpen}>
                <List className={classes.list}>
                    {drawerItems.map((prop) => (
                        <Link className={classes.link} to={prop.link} key={prop.text}>
                            <ListItem onClick={toggleDrawer} button>
                                <ListItemIcon>{prop.icon}</ListItemIcon>
                                <ListItemText>{prop.text}</ListItemText>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </AppBar>
    )
}

export default Navigation
