import { useState } from 'react'
import FormInput from '../form-input/formInput'
import Button from '../button/Button'
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebaseConfig'

import './SignInForm.scss'

const SignInForm = () => {
	const defaultFormFields = {
		email: '',
		password: '',
	}

	const [formFields, setFormFields] = useState(defaultFormFields)
	const { email, password } = formFields

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const handleChange = (name, value) => {
		setFormFields(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			const response = await signInAuthUserWithEmailAndPassword(email, password)
			console.log(response)
			resetFormFields()
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('incorrect password for email')
					break
				case 'auth/user-not-found':
					alert('no user associated with this email')
					break
				default:
					console.log(error)
			}
		}
	}

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup()

		const userDocRef = await createUserDocumentFromAuth(user)
		console.log(userDocRef)
	}

	return (
		<div className='sign-up-container'>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
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

				<div className='buttons-container'>
					<Button type='submit'>Sign in</Button>
					<Button type='button' buttonType='google' onClick={signInWithGoogle}>
						Google sign in
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm
