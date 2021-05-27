import React, {
  useState,
  useEffect
} from 'react'
import { Redirect } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import { makeStyles } from '@material-ui/core/styles'

import auth from '../../../api/auth/auth-helper'
import {
  read, 
  update
} from '../../../api/user/api-user'


export const stylesEditProfile = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
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
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  }
}))

function EditProfile({ match }) {
  const classes = stylesEditProfile()
  const [values, setValues] = useState({
      name: '',
      email: '',
      password: '',
      phone: '',
      seller: false,
      redirectToProfile: false,
      error: ''
  })
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({ userId: match.params.userId }, {t: jwt.token}, signal).then( (data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, name: data.name, email: data.email, phone: data.phone, seller: data.seller})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])

  const handleSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      phone: values.phone || undefined,
      seller: values.seller || undefined
    }

    update({ userId: match.params.userId }, { t: jwt.token }, user).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        console.log("Values to update: ", values)
        auth.updateUser(data, () => { 
          setValues({...values, userId: data._id, redirectToProfile: true})
        })
      }
    })
  }

  const handleChange = name => event => {
    const { value } = event.target
    setValues({...values, [name]: value})
  }

  const handleChangePhone = name => event =>{
      const regexp = /^[0-9\b]+$/
      const {value} = event.target
      if (!Number(value)) return
    
      if (regexp.test(event.target.value)) {
          setValues({...values, [name]: value })
      }
  }

  const handleCheck = (event, checked) => {
    setValues({...values, ['seller']: checked})
  }

  if (values.redirectToProfile) {
    return (<Redirect to={'/user/' + values.userId}/>)
  }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Editar perfil de usuario
          </Typography>
          <TextField 
            id="name" 
            label="Name" 
            className={classes.textField} 
            value={values.name} 
            onChange={handleChange('name')} 
            margin="normal"
          />
          <br/>
          <TextField 
            id="email" 
            type="email" 
            label="Email" 
            className={classes.textField} 
            value={values.email} 
            onChange={handleChange('email')} 
            margin="normal"
          />
          <br/>
          <TextField 
            id="password" 
            type="password"
            label="Password" 
            className={classes.textField} 
            value={values.password}
            onChange={handleChange('password')} 
            margin="normal"
          />
          <TextField 
            id="phone" 
            label="Teléfono" 
            className={classes.textField} 
            value={values.phone}
            onChange={handleChangePhone('phone')}
            margin="normal"
          />
          <Typography variant="subtitle1" className={classes.subheading}>
            ¿Eres tendero?
          </Typography>
          <FormControlLabel
            control={
              <Switch 
                      checked={values.seller}
                      onChange={handleCheck}
              />}
            label={values.seller ? 'Si' : 'No'}
          />
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={handleSubmit} className={classes.submit}>
            Ingresar Cambios
          </Button>
        </CardActions>
      </Card>
    )
}

export default EditProfile