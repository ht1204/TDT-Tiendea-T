import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    width: "100%",
  }
});


function Footer() {

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
            <Container>
                <Toolbar>
                <Typography gutterBottom align="center" style={{width: "100%", alignItems: "center"}}>
                    © 2021 Tiendea-T
                </Typography>
                </Toolbar>
            </Container>
            </AppBar>
        </div>
    )
}

export default Footer