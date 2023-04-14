import { initializeApp } from 'firebase/app'

import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyD2SomWLG-8t2O4ayZyNoV5EAW5_rAcf9o',
	authDomain: 'crwn-clothing-db-462c5.firebaseapp.com',
	projectId: 'crwn-clothing-db-462c5',
	storageBucket: 'crwn-clothing-db-462c5.appspot.com',
	messagingSenderId: '885195761549',
	appId: '1:885195761549:web:4797f39918cf4058643fc4',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
	prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => {
	return signInWithPopup(auth, provider)
}

export const db = getFirestore()

export const createUserDocumentFromAuth = async userAuth => {
	const userDocRef = doc(db, 'users', userAuth.uid)

	console.log(userDocRef)

	const userSnapshot = await getDoc(userDocRef)
	console.log(userSnapshot)
	console.log(userSnapshot.exists())

	//IF USER DOES NOT EXIST
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			})
		} catch (err) {
			console.log(err.message)
		}
	}

	return userDocRef
}
