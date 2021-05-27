import React, {
  useState, 
  useEffect
} from 'react'

import Grid from '@material-ui/core/Grid'

import Suggestions from '../../../components/product/Suggestions' 
import Search from '../../../components/product/Search'
import Categories from '../../../components/product/Categories'
import Carousel from '../Carousel'
import { SliderData } from '../Carousel/SliderData'
import Footer from '../Footer'

import { makeStyles } from '@material-ui/core/styles'

import {
  listLatest,
  listCategories
} from '../../../api/product/api-product'

export const stylesHome = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
}))



function Home(){
  const classes = stylesHome()
  const [categories, setCategories] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const suggestionTitle = "Productos recientes"

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listLatest(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setSuggestions(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listCategories(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setCategories(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

    return (
      <>
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={8} sm={8}>
              <Search categories={categories}/>
              <Carousel slides={SliderData}/>
              <Categories categories={categories}/>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Suggestions products={suggestions} title={suggestionTitle}/>
            </Grid>
          </Grid>
        </div>
      <Footer/>
      </>
    )
}

export default Home

