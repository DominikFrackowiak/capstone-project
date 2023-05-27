import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../contexts/CartContext'

import './CartDropdown.scss'
import Button from '../button/Button'
import CartItem from '../cart-item/CartItem'


const CartDropdown = () => {
	const navigate = useNavigate()
	const { cartItems } = useContext(CartContext)

	const handleNavigate = () => {
		navigate('/checkout')
	}

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.length ? (
					cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
				) : (
					<small>No items</small>
				)}
			</div>
			<Button onClick={handleNavigate}>GO TO CHECKOUT</Button>
		</div>
	)
}

export default CartDropdown
