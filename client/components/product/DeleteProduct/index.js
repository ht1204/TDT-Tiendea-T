import React, { useState } from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import auth from '../../../api/auth/auth-helper' 
import { remove } from '../../../api/product/api-product'

export default function DeleteProduct(props) {
  const [open, setOpen] = useState(false)
  const jwt = auth.isAuthenticated()

  const productName = props.product.name

    const clickButton = () => {
      setOpen(true)
    }

    const deleteProduct = () => {
      const { shopId, product } = props
      remove({ shopId: shopId,  productId: product._id }, {t: jwt.token}).then((data) => {

        if (data.error) {
          console.log(data.error)
        } else {
          setOpen(false)
          props.onRemove(props.product)
        }

      })
    }

    const handleClose = () => {
      setOpen(false)
    }

    return (
      <span>
        <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
          <DeleteIcon/>
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Borrar Producto :  "+ productName}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de borrar este producto? : {productName}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={deleteProduct} color="secondary" autoFocus="autoFocus">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    )

}

DeleteProduct.propTypes = {
  shopId: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}

