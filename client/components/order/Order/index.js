import React, {
    useState, 
    useEffect
}  from 'react'
import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

import { makeStyles } from '@material-ui/core/styles'

import { read } from '../../../api/order/api-order'


export const stylesOrder = makeStyles(theme => ({
  card: {
    textAlign: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    flexGrow: 1,
    margin: 30,
  },
  cart: {
    textAlign: 'left',
    width: '100%',
    display: 'inline-flex'
  },
  details: {
    display: 'inline-block',
    width: "100%",
    padding: "4px"
  },
  content: {
    flex: '1 0 auto',
    padding: '16px 8px 0px'
  },
  cover: {
    width: 160,
    height: 125,
    margin: '8px'
  },
  info: {
    color: 'rgb(33, 56, 146)',
    fontSize: '0.95rem',
    display: 'inline'
  },
  thanks:{
    color: 'rgb(64, 45, 213)',
    fontSize: '0.9rem',
    fontStyle: 'italic'
  },
  innerCardItems: {
    textAlign: 'left',
    margin: '24px 10px 24px 24px',
    padding: '24px 20px 40px 20px',
    backgroundColor: '#80808017'
  },
  innerCard: {
    textAlign: 'left',
    margin: '24px 24px 24px 10px',
    padding: '30px 45px 40px 45px',
    backgroundColor: '#80808017'
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    color: 'blue',
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(1),
    color: theme.primary
  },
  productTitle: {
    fontSize: '1.15em',
    marginBottom: '5px'
  },
  itemTotal: {
    float: 'right',
    marginRight: '40px',
    fontSize: '1.5em',
    color: 'rgb(72, 175, 148)'
  },
  itemShop: {
    display: 'block',
    fontSize: '1em',
    color: '#0a6398'
  },
  checkout: {
    float: 'right',
    margin: '24px'
  },
  total: {
    fontSize: '1.2em',
    color: 'rgb(53, 97, 85)',
    marginRight: '16px',
    fontWeight: '600',
    verticalAlign: 'bottom'
  }
}))


export default function Order({ match }) {
  const classes = stylesOrder()
  const [order, setOrder] = useState({products:[], delivery_address:{}})

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({ orderId: match.params.orderId }, signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setOrder(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

  const getTotal = () => {
    return order.products.reduce((acum, item) => {
       const quantity = item.status === "Cancelado" ? 0 : item.quantity
        return acum + (quantity * item.product.price)
    }, 0)
  }

    return (
      <Card className={classes.card}>
        <Typography type="headline" component="h2" className={classes.title}>
            Detalles de orden de compra
        </Typography>
        <Typography type="subheading" component="h2" className={classes.subheading}>
            Código de Orden: <strong>{order._id}</strong> <br/> Realizada el {(new Date(order.created)).toDateString()}
        </Typography><br/>
        <Grid container spacing={4}>
            <Grid item xs={7} sm={7}>
                <Card className={classes.innerCardItems}>
                  {order.products.map((item, id) => {
                    return  <span key={id}>
                      <Card className={classes.cart} >
                        <CardMedia
                          className={classes.cover}
                          image={'/api/product/image/'+item.product._id}
                          title={item.product.name}
                        />
                        <div className={classes.details}>
                          <CardContent className={classes.content}>
                            <Link to={'/product/'+item.product._id}>
                          <Typography 
                            type="title" 
                            component="h3" 
                            className={classes.productTitle} 
                            color="primary"
                          >
                            {item.product.name}
                          </Typography>
                          </Link>
                            <Typography 
                              type="subheading" 
                              component="h3" 
                              className={classes.itemShop}
                              color="primary"
                            >
                            $ {item.product.price} x {item.quantity} COP
                            </Typography>
                            <span className={classes.itemTotal}>
                                $ {item.product.price * item.quantity} COP
                            </span>
                            <span className={classes.itemShop}>Tienda: {item.shop.name}</span>
                            <Typography type="subheading" style={{color: 'blue'}} component="h3" color={item.status === "Cancelado" ? "error" : "secondary"}>
                               Estado de Orden: {item.status}
                            </Typography>
                          </CardContent>
                        </div>
                      </Card>
                      <Divider/>
                    </span>})
                  }
                  <div className={classes.checkout}>
                    <span className={classes.total}>Total: $ {getTotal()} COP</span>
                  </div>
                </Card>
            </Grid>
            <Grid item xs={5} sm={5}>
              <Card className={classes.innerCard}>
                <Typography 
                  type="subheading" 
                  component="h2"
                  className={classes.productTitle}
                  color="primary"
                 >
                 Entregado a:
                </Typography>
                <Typography 
                  type="subheading" 
                  component="h3" 
                  className={classes.info} 
                  color="primary"
                >
                  <strong>{order.customer_name}</strong>
                </Typography>
                <br/>
                <Typography 
                  type="subheading" 
                  component="h3" 
                  className={classes.info}
                  color="primary"
                >
                  {order.customer_email}
                </Typography>
                <br/>
                <Typography 
                  type="subheading" 
                  component="h3" 
                  className={classes.info}
                  color="primary"
                >
                  {order.customer_phone}
                </Typography>
                  <br/>
                <br/>
                <Divider/>
                <br/>
                <Typography type="subheading" component="h3" className={classes.itemShop} color="primary">
                  {order.delivery_address.street}
                </Typography>

                <Typography type="subheading" component="h3" className={classes.itemShop} color="primary">
                  {order.delivery_address.city}, 
                  {order.delivery_address.state} {order.delivery_address.zipcode}
                </Typography>

               <br/>
                <Typography type="subheading" component="h3" className={classes.thanks} color="primary">
                  Muchas gracias por comprar y Tiendear-T 
                  <br/>
                  Rastrea el estado de tu compra en esta página
                </Typography>
              </Card>
            </Grid>
        </Grid>
      </Card>
    )
}
