import React, { useState } from 'react'
import {
  Link, 
  Redirect
} from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'

import auth from '../../../api/auth/auth-helper'
import { create } from '../../../api/product/api-product'


export const stylesNewProduct = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: '1.2em'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
}))



function NewProduct({ match }) {
  const classes = stylesNewProduct()
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

  const handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    setValues({...values,  [name]: value })
  }

  const handleSubmit = () => {
    let productData = new FormData()
    values.name && productData.append('name', values.name)
    values.description && productData.append('description', values.description)
    values.image && productData.append('image', values.image)
    values.category && productData.append('category', values.category)
    values.quantity && productData.append('quantity', values.quantity)
    values.price && productData.append('price', values.price)

    const { shopId } = match.params
    create({ shopId : shopId }, { t: jwt.token }, productData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, error: '', redirect: true})
      }
    })
  }

    if (values.redirect) {
      return (<Redirect to={'/seller/shop/edit/'+match.params.shopId}/>)
    }
    return (
        <div>
          <Card className={classes.card}>
            <CardContent>
              <Typography type="headline" component="h2" className={classes.title}>
                Ingresar nuevo producto
              </Typography><br/>
              <input accept="image/*" 
                onChange={handleChange('image')} 
                className={classes.input} 
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <Button variant="contained" color="secondary" component="span">
                  Subir Foto
                  <FileUpload/>
                </Button>
              </label> 
              <span className={classes.filename}>{values.image ? values.image.name : ''}</span>
              <br/>
              <TextField 
                id="name" 
                label="Nombre" 
                className={classes.textField}
                value={values.name} 
                onChange={handleChange('name')} 
                margin="normal"
              />
              <br/>
              <TextField
                id="multiline-flexible"
                label="Descripci??n"
                multiline
                rows="2"
                value={values.description}
                onChange={handleChange('description')}
                className={classes.textField}
                margin="normal"
              /><br/>
              <TextField 
                id="category"
                label="Categor??a" 
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
                label="Precio ($ COP)" 
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
              Agregar Producto
              </Button>
              <Link to={'/seller/shop/edit/'+match.params.shopId} className={classes.submit}>
                <Button variant="contained">Cancelar</Button>
              </Link>
            </CardActions>
          </Card>
      </div>
    )
}

export default NewProduct
