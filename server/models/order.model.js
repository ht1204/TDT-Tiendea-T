import mongoose from 'mongoose'
const CartItemSchema = new mongoose.Schema({
  product: {type: mongoose.Schema.ObjectId, ref: 'Product'},
  quantity: Number,
  shop: {
    type: mongoose.Schema.ObjectId,
    ref: 'Shop'
  },
  status: {type: String,
    default: 'No procesado',
    enum: ['No procesado' , 'En Proceso',  'Entregado', 'Cancelado']}
})
const CartItem = mongoose.model('CartItem', CartItemSchema)

const regExForEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const OrderSchema = new mongoose.Schema({
  products: [CartItemSchema],
  customer_name: {
    type: String,
    trim: true,
    required: 'Nombre es obligatorio'
  },
  customer_email: {
    type: String,
    trim: true,
    match: [regExForEmail, 'Ingrese correo válido'],
    required: 'Correo es obligatorio'
  },
  customer_phone:{
    type: Number,
    minLength: [10,'Ingrese número de celular válido']
  },
  delivery_address: {
    street: {type: String, required: 'Dirección es obligatoria'},
    city: {type: String, required: 'Ciudad es obligatoria'},
    state: {type: String, required: 'Departamento es obligatorio'},
    zipcode: {type: String},
  },
  payment_id: {},
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

const Order = mongoose.model('Order', OrderSchema)

export {
  Order, 
  CartItem
}
