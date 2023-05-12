import { Routes, Route } from 'react-router-dom'

import Home from './routes/home/Home'
import Navigation from './components/navigation/Navigation'
import Shop from './routes/shop/Shop'
import SignIn from './routes/sign-in/SignIn'
import Directory from './components/directory/directory'

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='/shop' element={<Shop />} />
				<Route path='/signin' element={<SignIn />} />
			</Route>
		</Routes>
	)
}

export default App
