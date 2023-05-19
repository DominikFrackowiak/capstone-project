import { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import './Navigation.scss'
import { UserContext } from '../../contexts/UserContext'
import { signOutUser } from '../../utils/firebase/firebaseConfig'

const Navigation = () => {
	const { currentUser } = useContext(UserContext)

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
				</div>
			</div>

			<Outlet />
		</>
	)
}

export default Navigation
