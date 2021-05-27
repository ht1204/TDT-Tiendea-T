import React from 'react'
import {
  Link,
  withRouter
} from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Image from 'material-ui-image'
import Button from '@material-ui/core/Button'
import CartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'

import { 
  StyledLink,
  StyledLinkUser,
  DropDown,
  DropDownContent,
  ImageTDTLogo,
 } from './styles'

import auth from '../../../api/auth/auth-helper'
import cart from '../../../api/cart/cart-helper'

const isActive = (history, path) => {
  if (history.location.pathname === path)
    return {color: '#bef67a'}
  else
    return {color: '#ffffff'}
}
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return {color: '#bef67a'}
  else
    return {color: '#ffffff'}
}

const Menu = withRouter(({ history }) => (
  <AppBar position="static">
    <Toolbar>
      <Tooltip title="Tiendea-T" disableFocusListener disableTouchListener>
        <ImageTDTLogo to="/">      
          <Image 
            src="https://res.cloudinary.com/htmediacloud/image/upload/c_thumb,h_96,w_96/v1622069689/TDT-Logo_u8r2ch.png" 
          />
        </ImageTDTLogo>
      </Tooltip>
      <div>
        <Link to="/shops/all">
          <Button style={isActive(history, "/shops/all")}>Ver Tiendas</Button>
        </Link>
        <Link to="/cart">
          <Button style={isActive(history, "/cart")}>
            <Badge invisible={false} color="secondary" badgeContent={cart.itemTotal()} style={{'marginLeft': '7px'}}>
              <CartIcon />
            </Badge>
          </Button>
        </Link>      
      </div>
      <div style={{'position':'absolute', 'right': '10px'}}><span style={{'float': 'right'}}>
      {!auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Crear Cuenta</Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Iniciar Sesión</Button>
          </Link>
        </span>)
      }
      {!!auth.isAuthenticated() && (<span>
          {auth.isAuthenticated().user.seller && (
            <Link to="/seller/shops">
              <Button style={isPartActive(history, "/seller/")}>
                Mis Tiendas
              </Button>
            </Link>
          )}
            <DropDown>
            <StyledLinkUser to="#">
                {"HOLA "+ auth.isAuthenticated().user.name.toUpperCase()}
            </StyledLinkUser>
            
            <DropDownContent>
                <StyledLink to={"/user/" + auth.isAuthenticated().user._id}>
                  Mi Perfil
                </StyledLink>
                <StyledLink color="inherit" onClick={() => {
                    auth.clearJWT(() => history.push('/'))
                }}>
                  Cerrar Sesión
                </StyledLink>
              </DropDownContent>
            </DropDown>
        </span>)
      }
      </span></div>
    </Toolbar>
  </AppBar>
))

export default Menu
