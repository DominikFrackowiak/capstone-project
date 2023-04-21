import {
	auth,
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInWithGoogleRedirect,
} from '../../utils/firebase/firebase'


import { getRedirectResult } from 'firebase/auth'

import SignUpForm from '../../components/sign-up-form/SignUpForm'

const SignIn = () => {
	
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup()

		const userDocRef = await createUserDocumentFromAuth(user)
	}

	return (
		<>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign in with Google Popup</button>
			<SignUpForm />
		</>
	)
}

export default SignIn
