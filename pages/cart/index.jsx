import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useMyShoppingCart } from '../../utils/hooks'
import * as React from 'react'
import { CartItem } from '../../components/Cart/CartItem'
import { CartOrderSummary } from '../../components/Cart/CartOrderSummary'

export default function Cart() {
  const { myShoppingCart, setMyShoppingCart } = useMyShoppingCart()

  const deleteItem = (idP) => {
    setMyShoppingCart((myShoppingCart) => {
      let newList = myShoppingCart.filter(
        (shoppingItem) => shoppingItem.id !== idP
      )
      return newList
    })
  }

  const addQuantity = (idP) => {
    setMyShoppingCart((myShoppingCart) => {
      return myShoppingCart.map((item) => {
        if (item.id == idP) {
          return { ...item, quantity: item.quantity + 1 }
        } else return item
      })
    })
  }

  const reduceQuantity = (idP) => {
    setMyShoppingCart((myShoppingCart) => {
      return myShoppingCart.map((item) => {
        if (item.id == idP && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 }
        } else return item
      })
    })
  }

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart'))
    setMyShoppingCart(items)
  }, [])

  return (
    <div>
      <Head>
        <title>NextJS E-Shop - Cart</title>
        <meta name="description" content="My NextJS E-Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
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
              Shopping Cart ({myShoppingCart.length} items)
            </Heading>

            <Stack spacing="6">
              {myShoppingCart.map((item) => (
                <CartItem key={item.id} 
                addQuantity={addQuantity}
                reduceQuantity={reduceQuantity}
                deleteItem={deleteItem} 
                {...item} />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary />
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link href='/products' color={mode('blue.500', 'blue.200')}><a>
                Continue shopping</a>
              </Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    </div>
  )
}
