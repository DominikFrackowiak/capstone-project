import { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Crown from '../../assets/crown.svg'
import './Navigation.styles.scss'
import { UserContext } from '../../context/UserContext'

const Navigation = () => {
	const { currentUser } = useContext(UserContext)
	console.log(currentUser)
	return (
		<>
			<div className='navigation'>
				<Link to='/' className='logo-container'>
					<div>
						<img src={Crown} className='logo' />
					</div>
				</Link>
				<div className='nav-links-container'>
					<Link className='nav-link' to='/shop'>
						SHOP
					</Link>
					
						{currentUser ? (
							<span className='nav-link'>SIGNOUT</span>
						) : (
							<Link to='/auth' className='nav-link'> SIGN IN</Link>
						)}
				
				</div>
			</div>
			<Outlet />
		</>
	)
}

export default Navigation
