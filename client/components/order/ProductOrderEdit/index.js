import React, {
  useState, 
  useEffect
} from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'

import { makeStyles } from '@material-ui/core/styles'

import auth from '../../../api/auth/auth-helper'

import {
  getStatusValues,
  update, 
  cancelProduct,
  processCharge
} from '../../../api/order/api-order'

export const stylesProductOrderEdit = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
    paddingBottom: 0
  },
  listImg: {
    width: '70px',
    verticalAlign: 'top',
    marginRight: '10px'
  },
  listDetails: {
    display: "inline-block"
  },
  listQty: {
    margin: 0,
    fontSize: '0.9em',
    color: '#5f7c8b'
  },
  textField: {
    width: '160px',
    marginRight: '16px'
  },
  statusMessage: {
    position: 'absolute',
    zIndex: '12',
    right: '5px',
    padding: '5px'
  }
}))


export default function ProductOrderEdit(props){
  const classes = stylesProductOrderEdit()
  const [values, setValues] = useState({
      open: 0,
      statusValues: [],
      error: ''
  })

  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    getStatusValues(signal).then((data) => {
      if (data.error) {
        setValues({...values, error: "No se puede obtener estado de la orden"})
      } else {
        setValues({...values, statusValues: data, error: ''})
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

  const handleStatusChange = productIndex => event => {
    let order = props.order
    order.products[productIndex].status = event.target.value
    let product = order.products[productIndex]

    if (event.target.value === "Cancelado") {
      cancelProduct({ shopId: props.shopId, productId: product.product._id }, { t: jwt.token }, {
          cartItemId: product._id,
          status: event.target.value,
          quantity: product.quantity
        }).then((data) => {
          if (data.error) {
            setValues({
              ...values,
              error: "Estado de orden no actualizado, por favor intente de nuevo"
            })
          } else {
            props.updateOrders(props.orderIndex, order)
            setValues({
              ...values,
              error: ''
            })
          }
        })

    } else if (event.target.value === "En Proceso") {
      processCharge({ userId: jwt.user._id,  shopId: props.shopId, orderId: order._id }, { t: jwt.token }, {
          cartItemId: product._id,
          status: event.target.value,
          amount: (product.quantity * product.product.price)

        }).then((data) => {

          if (data.error) {
            setValues({...values, error: "Estado de orden no actualizado, por favor intente de nuevo"})
          } else {
            props.updateOrders(props.orderIndex, order)
            setValues({ ...values, error: ''})
          }

        })

    } else {
      update({shopId: props.shopId }, { t: jwt.token }, { cartItemId: product._id, status: event.target.value})
        .then((data) => {
          if (data.error) {
            setValues({
              ...values,
              error: "Estado de orden no actualizado, por favor intente de nuevo"
            })
          } else {
            props.updateOrders(props.orderIndex, order)
            setValues({
              ...values,
              error: ''
            })
          }
        })
    }
  }
    return (
     <div>
        <Typography component="span" color="error" className={classes.statusMessage}>
          {values.error}
        </Typography>
        <List disablePadding style={{backgroundColor:'#f8f8f8'}}>
          {props.order.products.map((item, index) => {
            return(<span key={index}>
                    { item.shop == props.shopId &&
                      <ListItem button className={classes.nested}>
                        <ListItemText
                          primary={<div>
                                      <img className={classes.listImg} 
                                            src={'/api/product/image/'+item.product._id}
                                      />
                                      <div className={classes.listDetails}>
                                        {item.product.name}
                                        <p className={classes.listQty}>{"Cantidad: "+item.quantity}</p>
                                      </div>
                                    </div>}/>
                        <TextField
                          id="select-status"
                          select
                          label="Update Status"
                          className={classes.textField}
                          value={item.status}
                          onChange={handleStatusChange(index)}
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu,
                            },
                          }}
                          margin="normal"
                        >
                          {values.statusValues.map(option => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </ListItem>
                    }
                    <Divider style={{margin: 'auto', width: "80%"}}/>
                  </span>)
                  })
                }
        </List>
      </div>
  )
}

ProductOrderEdit.propTypes = {
  shopId: PropTypes.string.isRequired,
  order: PropTypes.object.isRequired,
  orderIndex: PropTypes.number.isRequired,
  updateOrders: PropTypes.func.isRequired
}
