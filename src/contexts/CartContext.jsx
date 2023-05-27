import { createContext, useState, useEffect } from 'react'

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === productToAdd.id
	)

	if (existingCartItem) {
		return cartItems.map(cartItem =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		)
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
	//find the cart item to remove
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === cartItemToRemove.id
	)

	//check if quantity is equal to 1, if it is: remove that item from the cart
	if (existingCartItem.quantity === 1) {
		return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
	}

	//if quantity's not equal to 1, return back cartItems with matching cart item with reduced quantity
	return cartItems.map(cartItem =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	)
}

const clearCartItem = (cartItems, cartItemToClear) => {
	return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
})

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [cartCount, setCartCount] = useState(0)
	const [cartTotal, setCartTotal] = useState(0)

	const addItemToCart = productToAdd => {
		setCartItems(addCartItem(cartItems, productToAdd))
	}

	const removeItemFromCart = cartItemToRemove => {
		setCartItems(removeCartItem(cartItems, cartItemToRemove))
	}

	const clearItemFromCart = cartItemToClear => {
		setCartItems(clearCartItem(cartItems, cartItemToClear))
	}

	useEffect(() => {
		const newCartCount = cartItems.reduce((acc, item) => {
			return acc + item.quantity
		}, 0)
		setCartCount(newCartCount)
	}, [cartItems])

	useEffect(() => {
		const newCartTotal = cartItems.reduce((acc, item) => {
			return acc + item.quantity * item.price
		}, 0)
		setCartTotal(newCartTotal)
	}, [cartItems])

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		cartCount,
		cartTotal,
		removeItemFromCart,
		clearItemFromCart,
	}
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
