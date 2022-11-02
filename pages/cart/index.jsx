import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { FaLess } from 'react-icons/fa'
import { MdMore } from 'react-icons/md'
import { useMyShoppingCart } from '../../utils/hooks'
import CartOrderSummary from '../../components/cartOrderSummary'
import CartItem from '../../components/cartItem'
import { useState, useEffect } from 'react'

export default function Cart() {
  const { myShoppingCart, setMyShoppingCart } = useState([])
  
  useEffect(() => {
    if(localStorage.getItem('cart')) {
      setMyShoppingCart(JSON.parse(localStorage.getItem('cart')))
  } else {
      setMyShoppingCart([])
  }
    localStorage.setItem('cart', JSON.stringify(myShoppingCart))
  }, [myShoppingCart, setMyShoppingCart])

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
          {myShoppingCart ? 
          <>
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
          </>
          : 
          <Box>Le panier est vide</Box>
          }
          
        </Box>
      </Box>
      {/* <Box
        maxW={{
          base: '3xl',
          lg: '7xl',
        }}
        mx="auto"
        px={{
          base: '4',
          md: '8',
          lg: '12',
        }}
        py={{
          base: '6',
          md: '8',
          lg: '12',
        }}
      >
        <Stack
          direction={{
            base: 'column',
            lg: 'row',
          }}
          align={{
            lg: 'flex-start',
          }}
          spacing={{
            base: '8',
            md: '16',
          }}
        >
          <Stack
            spacing={{
              base: '8',
              md: '10',
            }}
            flex="2"
          >
            <Heading fontSize="2xl" fontWeight="extrabold">
              Shopping Cart (3 items)
            </Heading>

            <Stack spacing="6">
              {myShoppingCart.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary />
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link color='teal.300'>
                Continue shopping
              </Link>
            </HStack>
          </Flex>
        </Stack>
      </Box> */}
    </div>
  )
}
