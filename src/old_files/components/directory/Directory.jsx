import './Directory.styles.scss'
import CategoryItem from '../category-item/CategoryItem'
import { Outlet } from 'react-router-dom'

export default function Directory({categories}) {
  return (
		<div className='directory-container'>
			{categories.map(category => (
				<CategoryItem key={category.id} category={category} />
			))}
			
			<Outlet/>
		</div>
	)
}
