import { initializeApp } from 'firebase/app'

import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from 'firebase/auth'

import {
	getFirestore,
	doc, //document reference
	getDoc, //actual data from that document
	setDoc,
	collection, //collection reference
	writeBatch, //
	query,
	getDocs
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

//AUTH
const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
	prompt: 'select_account',
})

//INIT AUTHENTICATION
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

//INIT FIRESTORE DB
export const db = getFirestore()

//ADD collection and documents
// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
//   const collectionRef = collection(db, collectionKey)
// 		const batch = writeBatch(db)

// 		objectsToAdd.forEach((object) => {
// 			 const docRef = doc(collectionRef, object.title.toLowerCase())
// 				batch.set(docRef, object)
// 		})

// 		await batch.commit()
// 		console.log('done')
// }

//retrieve data from the db
export const getCategoriesAndDocuments = async() => {
 const collectionRef = collection(db, 'categories')
 const q = query(collectionRef)

	const querySnapshot = await getDocs(q)
 const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
		const {title, items} = docSnapshot.data()
		acc[title.toLowerCase()] = items
		return acc
	}, {})

	return categoryMap
}

//create user document in db
export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return

	const userDocRef = doc(db, 'users', userAuth.uid)
	const userSnapshot = await getDoc(userDocRef)

	//if user data does not exists, create it in db
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			})
		} catch (err) {
			console.log('error creating the user', err.message)
		}
	}
	//if user data exists
	return userDocRef
	//return data
}

//create user in firebase auth (returns user credentials)
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return
	return await createUserWithEmailAndPassword(auth, email, password)
}

//sign in using email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return
	return await signInWithEmailAndPassword(auth, email, password)
}

//signout user
export const signOutUser = async () => signOut(auth)

//changes listener
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
//receives a callback function that is called only when there is a change in auth state