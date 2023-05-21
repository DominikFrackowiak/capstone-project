import SHOP_DATA from '../../shop-data.json'
import { useContext } from 'react'
import './Shop.scss'

import { ProductsContext } from '../../contexts/ProductsContext'
import ProductCard from '../../components/product-card/ProductCard'

const Shop = () => {
 const {products} = useContext(ProductsContext)
	return (
		<div className='products-container'>
			{products.map(product => (
				<ProductCard key={product.id} product={product}/>
					
		
			))}
		</div>
	)
}

export default Shop
