import React, { 
  useState,
  useEffect 
} from 'react'

import { useLocation } from 'react-router-dom'

import PropTypes from 'prop-types'
import axios from 'axios'
import { nanoid } from 'nanoid'


import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'

import { makeStyles } from '@material-ui/core/styles'

import config from '../../../../config/config'
import auth from '../../../api/auth/auth-helper'
import cart from '../../../api/cart/cart-helper'

import { create } from '../../../api/order/api-order'

const stylesPlaceOrder = makeStyles(theme => ({
  subheading: {
    color: 'rgba(88, 114, 128, 0.87)',
    marginTop: "20px",
  },
  checkout: {
    margin: '20px 30px'
  },
  error: {
    display: 'inline',
    padding: "0px 10px"
  },
  errorIcon: {
    verticalAlign: 'middle'
  },
  StripeElement: {
    display: 'block',
    margin: '24px 0 10px 10px',
    maxWidth: '408px',
    padding: '10px 14px',
    boxShadow: 'rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px',
    borderRadius: '4px',
    background: 'white'
  }
}))



function queryString(query) {
  const res = {}
  query
    .replace('?', '')
    .split('&')
    .forEach(q => {
      const [key, value] = q.split('=')
      res[key] = value
    })
  return res
}


function PlaceOrder ( props ) {
  
  const classes = stylesPlaceOrder()
  const [values, setValues] = useState({
    order: {},
    error: '',
    orderId: ''
  })
  
  
  const location = useLocation()
  const jwt = auth.isAuthenticated()

    useEffect(() => {
      const { ref_payco } = queryString(location.search)

      axios.get({
        baseURL: 'https://secure.epayco.co',
        url: `/validation/v1/reference/${ref_payco}`,
      }).then(({ data }) => console.log(data))

    }, [location])


    const handler = window.ePayco.checkout.configure({
      key: config.epayco_public_key,
      test: true,
    })


  const loadPayment = () =>{
    
    let cartItems = props.checkoutDetails.products
    const amount = cartItems.reduce( (acum, item) => {
        return acum + (item.quantity * item.product.price)
    }, 0)
    
    const data = {
      external: 'false',
      autoclick: false,

      amount,
      name: 'Tiendea-T',
      description: 'Compra a tu alcance',
      currency: 'cop',

      country: 'CO',
      lang: 'es',
      tax: '0',
      tax_base: '0',

      invoice: nanoid(10),
      extra1: props.checkoutDetails.customer_email,

      response: config.base_url+'/user/'+ auth.isAuthenticated().user._id,

      name_billing: props.checkoutDetails.customer_name,
      address_billing: props.checkoutDetails.delivery_address.street,
      type_doc_billing: 'cc',
      number_doc_billing: '4575623182290326',
      mobilephone_billing: props.checkoutDetails.customer_phone,
      methodsDisable: ["CASH", "SP", "DP"],
      
    }
    return data
  }

  const handleOrder = () =>{
    const data = loadPayment()
    handler.open(data)

    create({userId:jwt.user._id}, { t: jwt.token}, props.checkoutDetails, data.invoice).then( (data) => {

      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        cart.emptyCart( () => {
          setValues({ ...values, 'orderId': data._id })
        })
      }
  
    })
  
  }


    return (
    <span>
      <Typography type="subheading" component="h3" className={classes.subheading}>
        Procesar orden
      </Typography>

      <div className={classes.checkout}>
        { values.error &&
          (<Typography component="span" color="error" className={classes.error}>
            <Icon color="error" className={classes.errorIcon}>error</Icon>
              {values.error}
          </Typography>)
        }
        <Button color="secondary" variant="contained" onClick={handleOrder}>
          Preparar Orden de Compra
        </Button>
      </div>
    </span>)

}

PlaceOrder.propTypes = {
  checkoutDetails: PropTypes.object.isRequired
}

export default PlaceOrder
