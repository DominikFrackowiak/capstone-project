import { useState, useContext } from 'react'
import FormInput from '../form-input/formInput'
import Button from '../button/Button'
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebaseConfig'

import { UserContext } from '../../contexts/UserContext'

import './SignUpForm.scss'

const SignUpForm = () => {
	const defaultFormFields = {
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	}

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const [formFields, setFormFields] = useState(defaultFormFields)
	const { displayName, email, password, confirmPassword } = formFields
	const { setCurrentUser } = useContext(UserContext)

	const handleChange = (name, value) => {
		setFormFields(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async e => {
		e.preventDefault()

		if (password !== confirmPassword) {
			alert('Passwords do not match')
			return
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password)
			setCurrentUser(user)
			await createUserDocumentFromAuth(user, { displayName })
			resetFormFields()
		} catch (err) {
			console.log(err.message)
		}
	}

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display name'
					type='text'
					required
					value={displayName}
					name='displayName'
					onChange={e => handleChange(e.target.name, e.target.value)}
				/>

				<FormInput
					label='Email'
					type='email'
					required
					value={email}
					name='email'
					onChange={e => handleChange(e.target.name, e.target.value)}
				/>

				<FormInput
					label='Password'
					type='password'
					required
					value={password}
					name='password'
					onChange={e => handleChange(e.target.name, e.target.value)}
				/>

				<FormInput
					label='Confirm password'
					type='password'
					required
					value={confirmPassword}
					name='confirmPassword'
					onChange={e => handleChange(e.target.name, e.target.value)}
				/>
				<Button type='submit'>Sign up</Button>
			</form>
		</div>
	)
}

export default SignUpForm
