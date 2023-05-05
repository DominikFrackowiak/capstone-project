import { useState, useEffect } from 'react'

import {
	signInAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
} from '../../utils/firebase/firebase'

import FormInput from '../form-input/FormInput'
import Button from '../button/button'

import './SignInForm.scss'

const defaultFormFields = {
	email: '',
	password: '',
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { email, password } = formFields

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const signInWithGoogle = async () => {
		console.log('clicked')
		const { user } = await signInWithGooglePopup()
		await createUserDocumentFromAuth(user)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			const response = await signInAuthUserWithEmailAndPassword(email, password)
			console.log(response)
			resetFormFields()
		} catch (err) {
			switch (err.code) {
				case 'auth/wrong-password':
					alert('incorrect password for email')
					break
				case 'auth/user-not-found':
					alert('user not found')
					break
			}
			console.log(err)
		}
	}

	const handleChange = (value, id) => {
		setFormFields(prev => {
			return { ...prev, [id]: value }
		})
	}

	useEffect(() => {
		console.log(formFields)
	}, [formFields])

	return (
		<div className='sign-up-container'>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={e => handleSubmit(e)}>
				<FormInput
					id={'email'}
					label={'E-mail'}
					type={'email'}
					changeHandler={e => handleChange(e.target.value, e.target.id)}
					value={email}
				/>

				<FormInput
					id={'password'}
					label={'Password'}
					type={'password'}
					changeHandler={e => handleChange(e.target.value, e.target.id)}
					value={password}
				/>

				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button type='button' buttonType='google' onClick={signInWithGoogle}>
						Google sign in
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm
