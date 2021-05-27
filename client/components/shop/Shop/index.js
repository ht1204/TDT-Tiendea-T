import React, {
  useState, 
  useEffect
} from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles'

import Products from '../../product/Products'
import styled from 'styled-components'
import ReactWhatsapp from 'react-whatsapp'

import { read } from '../../../api/shop/api-shop'
import { listByShop } from '../../../api/product/api-product'


const StyledReactWhatsapp =  styled(ReactWhatsapp)`
 
	background-color: #44c767;
	border-radius: 28px;
	border:1px solid #18ab29;
	display: inline-block;
	cursor: pointer;
	color: #ffffff;
	font-family: Arial;
	font-size: 14px;
	padding: 16px 31px;
	text-decoration: none;

    &:hover {
        background-color:#5cbf2a;
    }
    &:active {
        position:relative;
        top:1px;
    }

`

export const stylesShop = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: 'center',
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(1),
    color: theme.palette.openTitle
  },
  bigAvatar: {
    width: 100,
    height: 100,
    margin: 'auto'
  },
  productTitle: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: '100%',
    fontSize: '1.2em'
  }
}))


function Shop({ match }) {
  const classes = stylesShop()
  const [shop, setShop] = useState('')
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listByShop({ shopId: match.params.shopId }, signal).then((data)=>{
      if (data.error) {
        setError(data.error)
      } else {
        setProducts(data)
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

  }, [match.params.shopId])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listByShop({ shopId: match.params.shopId }, signal).then((data)=>{
      
      if (data.error) {
        setError(data.error)
      } else {
        setProducts(data)
      }

    })

    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.shopId])

    const logoUrl = shop._id  ? `/api/shops/logo/${shop._id}?${new Date().getTime()}` : '/api/shops/defaultphoto'

    const goToWpp = {
      number: "+57"+shop.phone,
      message: "Hola, "+shop.name+", solicito atención al cliente, por favor"
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={4} sm={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography type="headline" component="h2" className={classes.title}>
                  {shop.name}
                </Typography>
                <br/>
                <Avatar src={logoUrl} className={classes.bigAvatar}/><br/>
                  <Typography type="subheading" component="h2" className={classes.subheading}>
                    {shop.description}
                  </Typography>
                <br/>
                {!!shop.phone && (
                  <>
                    <Typography type="subheading" component="h3" className={classes.subheading}>
                      Teléfono de contacto : { shop.phone }
                    </Typography>
                      <br/>
                    <StyledReactWhatsapp number={goToWpp.number} message={goToWpp.message}>
                       Ir a Whatsapp
                    </StyledReactWhatsapp>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8} sm={8}>
            <Card>
              <Typography 
                type="title" 
                component="h2" 
                className={classes.productTitle}
              >
              Productos
              </Typography>
              <Products products={products} searched={false}/>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
}

export default Shop
