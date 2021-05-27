import mongoose from 'mongoose'
const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Nombre de Tienda es obligatorio'
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  phone:{
    type: Number,
    minLength: [10,'Debe ingresar un número de celular válido']
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
})

export default mongoose.model('Shop', ShopSchema)
