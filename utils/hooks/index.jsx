import { useContext } from 'react'
import { MyShoppingCartContext } from '../context'

export function useMyShoppingCart() {
  const { myShoppingCart, setMyShoppingCart, totalPrice } = useContext(MyShoppingCartContext)
  return { myShoppingCart, setMyShoppingCart, totalPrice }
}