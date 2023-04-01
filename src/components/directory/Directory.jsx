import './Directory.styles.scss'
import CategoryItem from '../category-item/CategoryItem'

export default function Directory({categories}) {
  return (
		<div className='directory-container'>
			{categories.map(category => (
				<CategoryItem key={category.id} category={category} />
			))}
		</div>
	)
}
