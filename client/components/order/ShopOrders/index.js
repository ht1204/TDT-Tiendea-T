import React, {
  useState,
  useEffect
} from 'react'


import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'

import styled from 'styled-components'
import ReactWhatsapp from 'react-whatsapp'

import ProductOrderEdit from '../ProductOrderEdit'


import auth from '../../../api/auth/auth-helper'
import { listByShop } from '../../../api/order/api-order'
import { read } from '../../../api/shop/api-shop'

const StyledReactWhatsapp =  styled(ReactWhatsapp)`
 
	background-color:#44c767;
	border-radius:28px;
	border:1px solid #18ab29;
    margin-bottom: 5px;
	display:inline-block;
	cursor: pointer;
	color:#ffffff;
	font-family:Arial;
	font-size: 14px;
	padding:16px 31px;
	text-decoration:none;

    &:hover {
        background-color:#5cbf2a;
    }
    &:active {
        position:relative;
        top:1px;
    }
`


export const stylesShopOrders = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px` ,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(1),
    color: '#434b4e',
    fontSize: '1.1em'
  },
  customerDetails: {
    paddingLeft: '36px',
    paddingTop: '16px',
    backgroundColor:'#f8f8f8'
  }
}))


export default function ShopOrders({ match }) {
  const classes = stylesShopOrders()
  const [shop, setShop] = useState('')
  const [orders, setOrders] = useState([])
  const [open, setOpen] = useState(0)

  const jwt = auth.isAuthenticated()

    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
      listByShop({ shopId: match.params.shopId }, {t: jwt.token}, signal).then((data) => {
        if (data.error) {
          console.log(data)
        } else {
          setOrders(data)
        }
      })

      read({ shopId: match.params.shopId }, signal).then((data) => {

        if (data.error) {
          setError(data.error)
        } else {
          setShop(data)
        }

      })
      return function cleanup(){
        abortController.abort()
      }
    }, [])


  const handleClick = index => event => {
    setOpen(index)
  }

  const updateOrders = (index, updatedOrder) => {
    let updatedOrders = orders
    updatedOrders[index] = updatedOrder
    setOrders([...updatedOrders])
  }



    return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Ordenes de Tienda: {match.params.shop}
        </Typography>
        <List dense >
          {orders.map((order, index) => {
            const goToWpp = {
                    number: "+57"+order.customer_phone,
                    message: "Hola, "+order.customer_name+", mucho gusto, somos  "+shop.name+", le comunico sobre su pedido..."
                  }
            return (<span key={index}>
              <ListItem button onClick={handleClick(index)}>
                <ListItemText primary={'Orden # '+order._id} 
                  secondary={(new Date(order.created)).toDateString()}
                />
                {open === index ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Divider/>
              <Collapse component="li" in={open === index} timeout="auto" unmountOnExit>
                <ProductOrderEdit shopId={match.params.shopId}
                  order={order} 
                  orderIndex={index} 
                  updateOrders={updateOrders}
                />
                <div className={classes.customerDetails}>
                  <Typography type="subheading" component="h3" className={classes.subheading}>
                    Entregado a:
                  </Typography>
                  <Typography type="subheading" component="h3" color="primary">
                    <strong>{order.customer_name}</strong> ({order.customer_email})
                  </Typography>
                  {console.log('Número cliente: '+order.customer_phone)}
                  {order.customer_phone && (
                      <> 
                        <Typography type="subheading" component="h3" color="primary">
                          Teléfono de contacto: {order.customer_phone}
                        </Typography>
                        <StyledReactWhatsapp number={goToWpp.number} message={goToWpp.message}>
                          Chatear con cliente
                        </StyledReactWhatsapp>
                      </>
                    )
                  }
                  <Typography type="subheading" component="h3" color="primary">
                    {order.delivery_address.street}
                  </Typography>
                  <Typography type="subheading" component="h3" color="primary">
                    {order.delivery_address.city}, {order.delivery_address.state} {order.delivery_address.zipcode}
                  </Typography>
                  <br/>
                </div>
              </Collapse>
              <Divider/>
            </span>)
            })}
        </List>
      </Paper>
    </div>)
}
