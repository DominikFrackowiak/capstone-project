import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import { ProductProvider } from './contexts/ProductsContext'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<UserProvider>
				<ProductProvider>
					<App />
				</ProductProvider>
			</UserProvider>
		</BrowserRouter>
	</React.StrictMode>
)
