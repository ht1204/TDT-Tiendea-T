import mongoose from 'mongoose'
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Nombre es obligatorio'
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String
  },
  quantity: {
    type: Number,
    required: "Cantidad en exitencias es obligatoria"
  },
  price: {
    type: Number,
    required: "Precio es obligatorio"
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  shop: {
    type: mongoose.Schema.ObjectId,
    ref: 'Shop'
  }
})

export default mongoose.model('Product', ProductSchema)
