import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect } from 'react'
import { useMyShoppingCart } from '../../utils/hooks'
import * as React from 'react'
import { CartItem } from '../../components/Cart/CartItem'
import { CartOrderSummary } from '../../components/Cart/CartOrderSummary'
import Link from 'next/link'

export default function Cart() {
  const { myShoppingCart, setMyShoppingCart } = useMyShoppingCart()
  console.log(myShoppingCart)
  const deleteItem = (idP) => {
    setMyShoppingCart((myShoppingCart) => {
      let newList = myShoppingCart.filter(
        (shoppingItem, index) => index !== idP
      )
      return newList
    })
  }

  const addQuantity = (idP) => {
    setMyShoppingCart((myShoppingCart) => {
      return myShoppingCart.map((item) => {
        if (item.product.id == idP) {
          return { ...item, quantity: item.quantity + 1 }
        } else return item
      })
    })
  }

  const reduceQuantity = (idP) => {
    setMyShoppingCart((myShoppingCart) => {
      return myShoppingCart.map((item) => {
        if (item.product.id == idP && item.quantity > 1) {
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
              Panier ({myShoppingCart.length} produits)
            </Heading>

            <Stack spacing="6">
              {myShoppingCart.map((item, index) => (
                <CartItem
                  key={index}
                  addQuantity={addQuantity}
                  reduceQuantity={reduceQuantity}
                  deleteItem={deleteItem}
                  indexItem={index}
                  quantityItem={item.quantity}
                  id={item.product.id}
                  name={item.product.name}
                  description={item.product.description}
                  image={item.product.image}
                  currency={item.product.currency}
                  price={item.product.price}
                  variante={item.variante}
                />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary />
            <HStack mt="6" fontWeight="semibold">
              <p>ou</p>
              <Link href="/products" color={mode('blue.500', 'blue.200')}>
                <a>Continuer le shopping</a>
              </Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    </div>
  )
}
