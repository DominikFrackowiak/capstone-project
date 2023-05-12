import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import './Navigation.scss'

const Navigation = () => {
	return (
		<>
			<div className='navigation'>
				<div>
					<Link className='nav-link' to={'/'}>
						<Logo />
					</Link>
				</div>
				<div className='nav-links-container'>
					<Link className='nav-link' to={'/shop'}>
						SHOP
					</Link>
					<Link className='nav-link' to={'/signin'}>
						SIGN IN
					</Link>
				</div>
			</div>

			<Outlet />
		</>
	)
}

export default Navigation
