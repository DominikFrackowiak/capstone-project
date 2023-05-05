import { Link, Outlet } from 'react-router-dom'
import Crown from '../../assets/crown.svg'
import './Navigation.styles.scss'

const Navigation = () => {
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
					<Link className='nav-link' to='/auth'>
						SIGN IN
					</Link>
				</div>
			</div>
			<Outlet />
		</>
	)
}

export default Navigation
