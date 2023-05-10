import './FormInput.scss'

const FormInput = ({ type, label, changeHandler, id, value }) => {
	return (
		<div className='group'>
			<input
				className='form-input'
				type={type}
				required
				onChange={changeHandler}
				id={id}
				value={value}
			/>
			<label className={`${value.length ? 'shrink' : ''} form-input-label`}>
				{label}
			</label>
		</div>
	)
}

export default FormInput
