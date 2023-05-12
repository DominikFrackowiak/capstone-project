import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebaseConfig'

const SignIn = () => {
	const logGoogleUser = async () => {
		const response = await signInWithGooglePopup()

		const userDocRef = await createUserDocumentFromAuth(response.user)
		console.log(userDocRef)
	}
	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign in with Google Popup</button>
		</div>
	)
}

export default SignIn
