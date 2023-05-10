import { useState, useEffect, useContext } from 'react'

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase'

import FormInput from '../form-input/FormInput'
import Button from '../button/button'

import { UserContext } from '../../context/UserContext'

import './SignUpForm.scss'

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { displayName, email, password, confirmPassword } = formFields

	const { setCurrentUser } = useContext(UserContext)

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		if (password !== confirmPassword) {
			alert('passwords do not match')
			return
		}
		try {
			const userCredentials = await createAuthUserWithEmailAndPassword(
				email,
				password
			)
			const user = userCredentials.user
			await createUserDocumentFromAuth(user, { displayName })
			setCurrentUser(user)
			resetFormFields()
		} catch (err) {
			if (err.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use')
			} else {
				console.log(err)
			}
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
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={e => handleSubmit(e)}>
				<FormInput
					id={'displayName'}
					label={'Display Name'}
					type={'text'}
					changeHandler={e => handleChange(e.target.value, e.target.id)}
					value={displayName}
				/>

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

				<FormInput
					id={'confirmPassword'}
					label={'Confirm Password'}
					type={'password'}
					changeHandler={e => handleChange(e.target.value, e.target.id)}
					value={confirmPassword}
				/>

				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	)
}

export default SignUpForm
