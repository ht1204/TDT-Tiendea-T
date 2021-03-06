import React, { 
  useState, 
  useEffect
} from 'react'

import { Link } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import { makeStyles } from '@material-ui/core/styles'

import { list } from '../../../api/shop/api-shop'


export const stylesShops = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
    textAlign: 'center',
    fontSize: '1.2em'
  },
  avatar:{
    width: 100,
    height: 100
  },
  subheading: {
    color: theme.palette.text.secondary
  },
  shopTitle: {
    fontSize: '1.2em',
    marginBottom: '5px'
  },
  details: {
    padding: '24px'
  }
}))

function Shops(){
  const classes = stylesShops()
  const [shops, setShops] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    list(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setShops(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [])

    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography type="title" className={classes.title}>
            Listado de Tiendas
          </Typography>
          <List dense>
            {shops.map((shop, id) => {
              return(
                  <Link to={"/shops/"+shop._id} key={id}>
                  <Divider/>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} 
                              src={'/api/shops/logo/'+shop._id+"?" + new Date().getTime()}
                      />
                    </ListItemAvatar>
                    <div className={classes.details}>
                      <Typography 
                        type="headline" 
                        component="h2" 
                        color="primary" 
                        className={classes.shopTitle}
                      >
                        {shop.name}
                      </Typography>
                      <Typography 
                        type="subheading" 
                        component="h4" 
                        className={classes.subheading}
                      >
                        {shop.description}
                      </Typography>
                      {!!shop.phone && (
                        <Typography type="subheading" component="h6" className={classes.subheading}>
                          Tel??fono de contacto : { shop.phone }
                        </Typography>
                      )}
                    </div>
                  </ListItem>
                  <Divider/>
                </Link>
                )
              })
            }
          </List>
        </Paper>
      </div>
  )
}

export default Shops
