import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'


import styled from 'styled-components'


const Container = styled.div`
  margin-top:calc(5% + 60px);
  bottom: 0;
`;


function Footer() {

    return (
        <Container>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography gutterBottom align="center" style={{width: "100%", alignItems: "center"}}>
                        © 2021 Tiendea-T
                    </Typography>
                </Toolbar>
            </AppBar>
        </Container>
    )
}

export default Footer