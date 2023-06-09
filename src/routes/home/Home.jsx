import { Outlet } from 'react-router-dom'

// import Home from './routes/home/Home'
// import Navigation from './components/navigation/Navigation'
// import Shop from './routes/shop/Shop'
// import Authentication from './routes/authentication/Authentication.jsx'
import Directory from '../../components/directory/directory'

const Home = () => {
	const categories = [
		{
			id: 1,
			title: 'hats',
			imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
		},
		{
			id: 2,
			title: 'jackets',
			imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
		},
		{
			id: 3,
			title: 'sneakers',
			imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
		},
		{
			id: 4,
			title: "women's",
			imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
		},
		{
			id: 5,
			title: "men's",
			imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
		},
	]

	return (
		<div>
			<Directory categories={categories} />
   <Outlet/>
		</div>
	) 
}

export default Home
