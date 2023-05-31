import DirectoryItem from '../directory-item/DirectoryItem'
import './Directory.scss'

const Directory = ({ categories }) => {
	return (
		<div className='categories-container'>
			{categories.map(category => (
				<DirectoryItem key={category.id} category={category} />
			))}
		</div>
	)
}

export default Directory
