import { Routes, Route } from 'react-router-dom'

import Home from './routes/home/Home'
import Navigation from './components/navigation/Navigation'
import Shop from './routes/shop/Shop'
import Authentication from './routes/authentication/Authentication'
import Directory from './components/directory/directory'
import Checkout from './routes/checkout/Checkout'

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='shop' element={<Shop />} />
				<Route path='auth' element={<Authentication />} />
				<Route path='checkout' element={<Checkout />} />
			</Route>
		</Routes>
	)
}

export default App
