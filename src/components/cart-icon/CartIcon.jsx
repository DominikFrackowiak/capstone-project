import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

import './CartIcon.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

const CartIcon = () => {
	const { setIsCartOpen, cartCount } = useContext(CartContext)

	const toggleIsCartOpen = () => {
		setIsCartOpen(prev => !prev)
	}

	return (
		<div className='cart-icon-container' onClick={toggleIsCartOpen}>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>{cartCount}</span>
		</div>
	)
}

export default CartIcon
