import { Routes, Route } from 'react-router-dom'

import Home from './routes/home/Home'
import Navigation from './components/navigation/Navigation'
import Shop from './routes/shop/Shop'
// import Authentication from './routes/authentication/Authentication.jsx'
import Directory from './components/directory/directory'

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='/shop' element={<Shop />} />
			</Route>
		</Routes>
	)
}

export default App
