import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Image from 'material-ui-image'
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";

import { makeStyles } from '@material-ui/core/styles'

import { create } from '../../../api/user/api-user'

const stylesSignup = makeStyles(theme => ({
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
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  media: {
    height: 100,
    width: 100
  },
}))

function Signup() {
  const classes = stylesSignup()
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, error: '', open: true})
      }
    })
  }   
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Container className={classes.container}>
            <CardMedia
                className={classes.media}
                image="https://res.cloudinary.com/htmediacloud/image/upload/c_scale,w_74/v1622135325/TDT-Logo_-_2_dbknjz.png"
                title=""
              />
          </Container>
          <Typography variant="h6" className={classes.title}>
            Vamos, Tiendea-T, Crea una cuenta
          </Typography>
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
            label="Contraseña"
            className={classes.textField} 
            value={values.password}
            onChange={handleChange('password')}
            margin="normal"
          />
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" 
              variant="contained" 
              onClick={handleSubmit} 
              className={classes.submit}>
              Crear Cuenta
          </Button>
        </CardActions>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>Nueva Cuenta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cuenta Creada Exitosamente
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Iniciar Sesión
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Signup