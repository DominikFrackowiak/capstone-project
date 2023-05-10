import {
	auth,
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInWithGoogleRedirect,
} from '../../utils/firebase/firebase'

import './Authentication.scss'

import { getRedirectResult } from 'firebase/auth'

import SignUpForm from '../../components/sign-up-form/SignUpForm'
import SignInForm from '../../components/sign-in-form/SignInForm'

const Authentication = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup()

		const userDocRef = await createUserDocumentFromAuth(user)
	}

	return (
		<div className='authentication-container'>
			
			<SignInForm />
			<SignUpForm />
		</div>
	)
}

export default Authentication
