import { initializeApp } from 'firebase/app'

import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
} from 'firebase/auth'

import { 
	getFirestore, 
	doc, 
	getDoc, 
	setDoc 
} from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyD2SomWLG-8t2O4ayZyNoV5EAW5_rAcf9o',
	authDomain: 'crwn-clothing-db-462c5.firebaseapp.com',
	projectId: 'crwn-clothing-db-462c5',
	storageBucket: 'crwn-clothing-db-462c5.appspot.com',
	messagingSenderId: '885195761549',
	appId: '1:885195761549:web:4797f39918cf4058643fc4',
}

// INIT FIREBASE
const firebaseApp = initializeApp(firebaseConfig)

//AUTHORIZATION

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
	prompt: 'select_account',
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider)

//DATA BASE

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	if (!userAuth) return

	const userDocRef = doc(db, 'users', userAuth.uid)
 const userSnapshot = await getDoc(userDocRef)
	
	//IF USER DOES NOT EXIST
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation
			})
		} catch (err) {
			console.log(err.message)
		}
	}

	return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return

	return await createUserWithEmailAndPassword(auth, email, password)
}
