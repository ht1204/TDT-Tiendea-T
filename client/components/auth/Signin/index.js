import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'

import auth from '../../../api/auth/auth-helper'
import { signin } from '../../../api/auth/api-auth'

const stylesSignin = makeStyles(theme => ({
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
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))


function Signin(props) {
  const classes = stylesSignin()

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirect: false
  })

  const handleSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '', redirect: true})
        })
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const {from} = props.location.state || {
    from: {
      pathname: '/'
    }
  }
  const { redirect } = values
  if (redirect) {
      return (<Redirect to={from}/>)
  }

  return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" className={classes.title}>
            Inicia Sesi??n
          </Typography>
          <TextField 
            id="email" 
            type="email" 
            label="E-mail" 
            className={classes.textField} 
            value={values.email} 
            onChange={handleChange('email')} 
            margin="normal"
          />
          <br/>
          <TextField 
            id="password" 
            type="password" 
            label="Contrase??a"
            className={classes.textField}
            value={values.password} 
            onChange={handleChange('password')} 
            margin="normal"
          />
          <br/> 
          {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
        <Button color="primary" variant="contained" onClick={handleSubmit} className={classes.submit}>
          Iniciar Sesi??n
        </Button>
        </CardActions>
      </Card>
    )
}

export default Signin
