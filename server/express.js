import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'

import user from './routes/user'
import auth from './routes/auth'
import shop from './routes/shop'
import product from './routes/product'
import order from './routes/order'


// Módulos SSR
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainBrowserRouter from './../client/ToLoad/MainBrowserRouter'
import { StaticRouter } from 'react-router-dom'

import { 
  ServerStyleSheets,
  ThemeProvider 
} from '@material-ui/styles'

import theme from './../client/ToLoad/Theme'


//Comentar antes de pasar a producción
import devBundle from './devBundle'

const CURRENT_WORKING_DIR = process.cwd()
const app = express()

//Comentar antes de pasar a producción
devBundle.compile(app)

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))


app.use('/', user)
app.use('/', auth)
app.use('/', shop)
app.use('/', product)
app.use('/', order)

//SSR
app.get('*', (req, res) => {
  const sheets = new ServerStyleSheets()
  const context = {}
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
          <ThemeProvider theme={theme}>
            <MainBrowserRouter/>
          </ThemeProvider>
      </StaticRouter>
     )
  )
    if (context.url) {
      return res.redirect(303, context.url)
    }
    const css = sheets.toString()
    res.status(200).send(Template({
      markup: markup,
      css: css
    }))
})

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }else if (err) {
    res.status(400).json({"error" : err.name + ": " + err.message})
    console.log(err)
  }
})

export default app
