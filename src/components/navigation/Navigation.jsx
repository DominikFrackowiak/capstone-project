import { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import CartIcon from '../cart-icon/CartIcon'
import CartDropdown from '../cart-dropdown/CartDropdown'
import './Navigation.scss'
import { UserContext } from '../../contexts/UserContext'
import { CartContext } from '../../contexts/cartContext'
import { signOutUser } from '../../utils/firebase/firebaseConfig'

const Navigation = () => {
	const { currentUser } = useContext(UserContext)
	const {isCartOpen, setIsCartOpen} = useContext(CartContext)

	return (
		<>
			<div className='navigation'>
				<div>
					<Link className='nav-link' to={'/'}>
						<Logo />
					</Link>
				</div>
				<div className='nav-links-container'>
					<Link className='nav-link' to='/shop'>
						SHOP
					</Link>
					{currentUser ? (
						<span className='nav-link' onClick={signOutUser}>
							SIGN OUT
						</span>
					) : (
						<Link className='nav-link' to='/auth'>
							SIGN IN
						</Link>
					)}
					<CartIcon/>
				</div>
				{isCartOpen && <CartDropdown/>}
			</div>

			<Outlet />
		</>
	)
}

export default Navigation
