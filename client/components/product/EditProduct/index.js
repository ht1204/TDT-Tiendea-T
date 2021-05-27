import React, {
  useEffect, 
  useState
} from 'react'

import {
  Link, 
  Redirect
} from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Avatar from '@material-ui/core/Avatar'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'

import { makeStyles } from '@material-ui/core/styles'

import auth from '../../../api/auth/auth-helper'
import {
  read, 
  update
} from '../../../api/product/api-product'



export const stylesEditProduct = makeStyles(theme => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    maxWidth: 500,
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
}))


export default function EditProduct ({ match }) {
  const classes = stylesEditProduct()
  const [values, setValues] = useState({
                                name: '',
                                description: '',
                                image: '',
                                category: '',
                                quantity: '',
                                price: '',
                                redirect: false,
                                error: ''
                            })

    const jwt = auth.isAuthenticated()
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
      read({ productId: match.params.productId }, signal).then((data) => {

        if (data.error) {
          setValues({...values, error: data.error})
        } else {
          const {_id, name, description, category, quantity, price} = data
          setValues({...values, 
                    id, 
                    name, 
                    description, 
                    category, 
                    quantity, 
                    price
                  })
        }

      })

    return function cleanup(){
      abortController.abort()
    }
  }, [])

  const handleSubmit = () => {
    let productData = new FormData()
    values.name && productData.append('name', values.name)
    values.description && productData.append('description', values.description)
    values.image && productData.append('image', values.image)
    values.category && productData.append('category', values.category)
    values.quantity && productData.append('quantity', values.quantity)
    values.price && productData.append('price', values.price)
  
    update({ shopId: match.params.shopId, 
             productId: match.params.productId 
            }, { t: jwt.token }, productData).then((data) => {
      
        if(data.error) {
          setValues({...values, error: data.error})
        } else {
          setValues({...values, 'redirect': true})
        }
    
    })
  }

  const handleChange = name => event => {
    const value = name === 'image' ? event.target.files[0] : event.target.value
    setValues({...values,  [name]: value })
  }

    const imageUrl = values.id
          ? `/api/product/image/${values.id}?${new Date().getTime()}`
          : '/api/product/defaultphoto'

    if (values.redirect) {
      return (<Redirect to={'/seller/shop/edit/'+match.params.shopId}/>)
    }

    return (
      <div>
          <Card className={classes.card}>
            <CardContent>
              <Typography type="headline" component="h2" className={classes.title}>
                Editar Producto
              </Typography><br/>
              <Avatar src={imageUrl} className={classes.bigAvatar}/><br/>
              <input accept="image/*" 
                onChange={handleChange('image')} 
                className={classes.input} 
                id="icon-button-file" 
                type="file" 
              />
              <label htmlFor="icon-button-file">
                <Button variant="contained" color="secondary" component="span">
                  Cambiar Foto
                  <FileUpload/>
                </Button>
              </label> 
              <span className={classes.filename}>{values.image ? values.image.name : ''}</span>
              <br/>
              <TextField 
                id="name" 
                label="Nombre de Producto" 
                className={classes.textField} 
                value={values.name} 
                onChange={handleChange('name')} 
                margin="normal"
              />
              <br/>
              <TextField
                id="multiline-flexible"
                label="Descripción"
                multiline
                rows="3"
                value={values.description}
                onChange={handleChange('description')}
                className={classes.textField}
                margin="normal"
              />
              <br/>
              <TextField 
                id="category" 
                label="Categoría" 
                className={classes.textField} 
                value={values.category} 
                onChange={handleChange('category')} 
                margin="normal"
              />
              <br/>
              <TextField 
                id="quantity" 
                label="Cantidad" 
                className={classes.textField} 
                value={values.quantity} 
                onChange={handleChange('quantity')} 
                type="number"
                margin="normal"
              />
              <br/>
              <TextField 
                id="price" 
                label="Precio" 
                className={classes.textField} 
                value={values.price} 
                onChange={handleChange('price')} 
                type="number" 
                margin="normal"
              />
              <br/>
              {
                values.error && (
                          <Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                            {values.error}
                          </Typography>
                        )
              }
            </CardContent>
            <CardActions>
              <Button 
                color="primary" 
                variant="contained" 
                onClick={handleSubmit} 
                className={classes.submit}
              >
              Actualizar Producto
              </Button>
              <Link 
                  to={'/seller/shops/edit/'+match.params.shopId} 
                  className={classes.submit}
              >
                <Button variant="contained">
                  Cancelar
                </Button>
              </Link>
            </CardActions>
          </Card>
    </div>
    )
}
