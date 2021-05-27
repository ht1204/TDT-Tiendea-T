import React, { useState } from 'react'

import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'

import { makeStyles } from '@material-ui/core/styles'

import PlaceOrder from '../PlaceOrder'

import auth from '../../../api/auth/auth-helper'
import cart from '../../../api/cart/cart-helper'

const stylesCheckout = makeStyles(theme => ({
  card: {
    margin: '24px 0px',
    padding: '16px 40px 90px 40px',
    backgroundColor: '#80808017'
  },
  title: {
    margin: '24px 16px 8px 0px',
    color: theme.palette.openTitle
  },
  subheading: {
    color: 'rgba(88, 114, 128, 0.87)',
    marginTop: "20px",
  },
  addressField: {
    marginTop: "4px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "45%"
  },
  streetField: {
    marginTop: "4px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "93%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "90%"
  }
}))

function Checkout(){
  const classes = stylesCheckout()
  const user = auth.isAuthenticated().user
  const [values, setValues] = useState({
    checkoutDetails: {
      products: cart.getCart(),
      customer_name: user.name,
      customer_email:user.email,
      customer_phone: user.phone,
      delivery_address: { street: '', city: '', state: '', zipcode: ''}
    },
    error: ''
  })

  const handleCustomerChange = name => event => {
    let checkoutDetails = values.checkoutDetails
    checkoutDetails[name] = event.target.value || undefined
    setValues({...values, checkoutDetails: checkoutDetails})
  }

  const handleAddressChange = name => event => {
    let checkoutDetails = values.checkoutDetails
    checkoutDetails.delivery_address[name] = event.target.value || undefined
    setValues({...values, checkoutDetails: checkoutDetails})
  }

    return (
      <Card className={classes.card}>
        <Typography type="title" className={classes.title}>
          Checkout
        </Typography>
        <TextField 
          id="name" 
          label="Name" 
          className={classes.textField} 
          value={values.checkoutDetails.customer_name}
          onChange={handleCustomerChange('customer_name')} 
          margin="normal"
        />
        <br/>
        <TextField 
          id="email" 
          type="email" 
          label="Email" 
          className={classes.textField} 
          value={values.checkoutDetails.customer_email} 
          onChange={handleCustomerChange('customer_email')} 
          margin="normal"
        />
        <br/>
        {!!values.checkoutDetails.customer_phone && (
          <Typography type="subheading" component="h3" className={classes.textField}>
            Teléfono de contacto : { values.checkoutDetails.customer_phone }
          </Typography>
        )}
        <Typography type="subheading" component="h3" className={classes.subheading}>
            Datos de Domicilio
        </Typography>
        <TextField 
          id="street" 
          label="Dirección" 
          className={classes.streetField} 
          value={values.checkoutDetails.delivery_address.street} 
          onChange={handleAddressChange('street')}
          margin="normal"
        />
        <br/>
        <TextField 
          id="city" 
          label="Ciudad" 
          className={classes.addressField}
          value={values.checkoutDetails.delivery_address.city} 
          onChange={handleAddressChange('city')} 
          margin="normal"
        />
        <TextField 
          id="state" 
          label="Deparmento" 
          className={classes.addressField} 
          value={values.checkoutDetails.delivery_address.state} 
          onChange={handleAddressChange('state')}
          margin="normal"
        />
        <br/>
        <TextField 
          id="zipcode" 
          label="Código Postal" 
          className={classes.addressField} 
          value={values.checkoutDetails.delivery_address.zipcode} 
          onChange={handleAddressChange('zipcode')} 
          margin="normal"
        />
        <br/> {
            values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>
            )
          }
        <div>
            <PlaceOrder checkoutDetails={values.checkoutDetails} />
        </div>
      </Card>
  )
}

export default Checkout