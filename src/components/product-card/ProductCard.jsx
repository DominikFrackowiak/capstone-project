import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

import './ProductCard.scss'

import Button from '../button/Button'

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext)
  const { name, price, imageUrl } = product

  const addProductToCart = () => {
    console.log('clicked')
    addItemToCart(product)
  }

  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt='' />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button onClick={addProductToCart} buttonType='inverted'>
        Add to cart
      </Button>
    </div>
  )
}

export default ProductCard
