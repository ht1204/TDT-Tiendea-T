import React, { useState } from 'react'
import {
  Link, 
  Redirect
} from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'

import { makeStyles } from '@material-ui/core/styles'

import auth from '../../../api/auth/auth-helper'
import { create } from '../../../api/shop/api-shop'

export const stylesNewShop = makeStyles(theme => ({
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
    fontSize: '1em'
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


export default function NewShop() {
  const classes = stylesNewShop()
  const [values, setValues] = useState({
      name: '',
      description: '',
      image: '',
      redirect: false,
      error: ''
  })

  const jwt = auth.isAuthenticated()

  const handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value

    setValues({...values, [name]: value })
  }

  const handleChangePhone = name => event =>{
    const regexp = /^[0-9\b]+$/
    const value = name === 'phone' ? event.target.value : ''

    if (!Number(value)) return
   
    if (event.target.value !== '' || regexp.test(event.target.value)) {
          setValues({...values, [name]: value })
    }
  }

  const handleSubmit = () => {
    let shopData = new FormData()
    values.name && shopData.append('name', values.name)
    values.description && shopData.append('description', values.description)
    values.phone && shopData.append('phone', values.phone)
    values.image && shopData.append('image', values.image)

    create({ userId: jwt.user._id }, { t: jwt.token }, shopData).then( (data) => {

      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, error: '', redirect: true})
      }

    })
  }

    if (values.redirect) {
      return (<Redirect to={'/seller/shops'}/>)
    }

    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Nueva Tienda
          </Typography>
          <br/>
          <input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="secondary" component="span">
              Subir Logo
              <FileUpload/>
            </Button>
          </label> <span className={classes.filename}>{values.image ? values.image.name : ''}</span><br/>
          <TextField 
            id="name" 
            label="Nombre de Tienda" 
            className={classes.textField} 
            value={values.name}
            onChange={handleChange('name')}
            margin="normal"
          />
          <br/>
          <TextField
            id="multiline-flexible"
            label="Description"
            multiline
            rows="2"
            value={values.description}
            onChange={handleChange('description')}
            className={classes.textField}
            margin="normal"
          />
          <br/>
          <TextField 
            id="phone" 
            label="Teléfono de Contacto" 
            className={classes.textField} 
            value={values.name}
            onChange={handleChangePhone('phone')}
            margin="normal"
          />
          <br/> 
          {values.error && (
                <Typography component="p" color="error">
                  <Icon color="error" className={classes.error}>error</Icon>
                  {values.error}
                </Typography>
              )
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={handleSubmit} className={classes.submit}>Submit</Button>
          <Link to='/seller/shops' className={classes.submit}><Button variant="contained">Cancel</Button></Link>
        </CardActions>
      </Card>
    </div>)
}
