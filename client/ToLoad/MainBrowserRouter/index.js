import React from 'react'
import {
  Route, 
  Switch,
} from 'react-router-dom'

import Home from '../../components/essentials/Home'
import Menu from '../../components/essentials/Menu'

import Signup from '../../components/auth/Signup'
import Signin from '../../components/auth/Signin'
import PrivateRoute from '../../components/auth/PrivateRoute'

import Users from '../../components/user/Users'
import EditProfile from '../../components/user/EditProfile'
import Profile from '../../components/user/Profile'

import NewShop from '../../components/shop/NewShop'
import Shops from '../../components/shop/Shops'
import MyShops from '../../components/shop/MyShops'
import Shop from '../../components/shop/Shop' 
import EditShop from '../../components/shop/EditShop'

import NewProduct from '../../components/product/NewProduct'
import EditProduct from '../../components/product/EditProduct'
import Product from '../../components/product/Product'

import Cart from '../../components/cart/Cart'

import ShopOrders from '../../components/order/ShopOrders'
import Order from '../../components/order/Order'


function MainBrowserRouter(){
  return (
    <div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>

        <Route path="/cart" component={Cart}/>
        
        <Route path="/shops/all" component={Shops}/>
        <Route path="/shops/:shopId" component={Shop}/>
        <Route path="/product/:productId" component={Product}/>

        <Route path="/order/:orderId" component={Order}/>
        <PrivateRoute path="/seller/orders/:shop/:shopId" component={ShopOrders}/>

        <PrivateRoute path="/seller/shops" component={MyShops}/>
        <PrivateRoute path="/seller/shop/new" component={NewShop}/>
        <PrivateRoute path="/seller/shop/edit/:shopId" component={EditShop}/>
        <PrivateRoute path="/seller/:shopId/products/new" component={NewProduct}/>
        <PrivateRoute path="/seller/:shopId/:productId/edit" component={EditProduct}/>

      </Switch>
    </div>
  )
}

export default MainBrowserRouter
