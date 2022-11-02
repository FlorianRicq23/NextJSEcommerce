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
  const [myShoppingCart, setMyShoppingCart] = useState([])
  const contextValue = {
    myShoppingCart,
    setMyShoppingCart,
  }

  return (
    <MyShoppingCartContext.Provider value={contextValue}>
      {children}
    </MyShoppingCartContext.Provider>
  )
}
