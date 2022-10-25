import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { FaLess } from 'react-icons/fa'
import { MdMore } from 'react-icons/md'
import { useMyShoppingCart } from '../../utils/hooks'

export default function Cart() {
  const { myShoppingCart, setMyShoppingCart } = useMyShoppingCart()
  console.log(myShoppingCart)

  const deleteItem = (item) => {
    setMyShoppingCart((myShoppingCart) => {
      let newList = myShoppingCart.filter(
        (shoppingItem) => shoppingItem.id !== item
      )
      return newList
    })
  }

  const addQuantity = (product) => {
    setMyShoppingCart((myShoppingCart) => {
      return myShoppingCart.map((item) => {
        if (item.id == product.id) {
          return { ...item, quantity: item.quantity + 1 }
        } else return item
      })
    })
  }

  const reduceQuantity = (product) => {
    setMyShoppingCart((myShoppingCart) => {
      return myShoppingCart.map((item) => {
        if (item.id == product.id && product.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 }
        } else return item
      })
    })
  }

  return (
    <div>
      <Head>
        <title>NextJS E-Shop - Cart</title>
        <meta name="description" content="My NextJS E-Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box p="0 8%">
        My cart page
        <Heading> My cart page</Heading>
        <Box>
          {myShoppingCart.map((item, index) => (
            <Box key={index}>
              <Text onClick={() => deleteItem(item.id)}>Supprimer</Text>
              <Text>{item.name}</Text>
              <Flex gap={5}>
                <MinusIcon onClick={() => reduceQuantity(item)} />
                <Text>{item.quantity}</Text>
                <AddIcon onClick={() => addQuantity(item)} />
              </Flex>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  )
}
