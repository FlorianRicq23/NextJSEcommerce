import React, { useState, useEffect, createContext } from 'react'
import { useContext } from 'react'

export const MyShoppingCartContext = createContext()

export function useMyShoppingCartContext() {
  const context = useContext(MyShoppingCartContext)

  if (!context) {
    throw new Error(
      'MyShoppingCartContext must be used inside MyShoppingCartProvider'
    )
  }
}

export function MyShoppingCartProvider({ children }) {
  const initialState = [];
  let [myShoppingCart, setMyShoppingCart] = useState(initialState);
  let [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      setMyShoppingCart(cartData);
    }
  }, []);

  useEffect(() => {
    if (myShoppingCart !== initialState) {
      localStorage.setItem("cart", JSON.stringify(myShoppingCart));
    }
    let price = 0;
    myShoppingCart.map((product) => {
      price += (product.quantity*product.price)
    })
    setTotalPrice(price)
  }, [myShoppingCart]);

  const contextValue = {
    myShoppingCart,
    setMyShoppingCart,
    totalPrice
  }

  return (
    <MyShoppingCartContext.Provider value={contextValue}>
      {children}
    </MyShoppingCartContext.Provider>
  )
}
