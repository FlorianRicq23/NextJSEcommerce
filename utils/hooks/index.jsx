import { useContext } from 'react'
import { MyShoppingCartContext } from '../context'

export function useMyShoppingCart() {
  const { myShoppingCart, setMyShoppingCart } = useContext(MyShoppingCartContext)
  return { myShoppingCart, setMyShoppingCart }
}