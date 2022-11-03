import Head from 'next/head'
import Link from 'next/link'
import { Fragment } from 'react'
import Footer from '../../components/footer'
import Header from '../../components/header'
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { MdLocalShipping } from 'react-icons/md'
import { useMyShoppingCart } from '../../utils/hooks'
import { useState, useEffect } from 'react'

function ProductDetailPage({ products, id }) {
  const { myShoppingCart, setMyShoppingCart } = useMyShoppingCart()

  let product = products.products[id]
  let title = `NextJS E-Shop -  ${product.name}`
  

  const addToCart = () => {
    setMyShoppingCart((myShoppingCart) => {
      let isAlreadyInCart = false
      for (let i = 0; i < myShoppingCart.length; i++) {
        if (myShoppingCart[i].id == product.id) {
          isAlreadyInCart = true
        }
      }
      if (isAlreadyInCart) return myShoppingCart
      else return [product, ...myShoppingCart]
    })
  }

/*   const addToCart2 = () => {
    setMyShoppingCart((myShoppingCart) => {
      let isAlreadyInCart = false
      for (let i = 0; i < myShoppingCart.length; i++) {
        if (myShoppingCart[i].id == product.id) {
          isAlreadyInCart = true
        }
      }

      if (isAlreadyInCart) return myShoppingCart
      else return [product, ...myShoppingCart]
    })
  }
  
  const addToCart3 = () => {
    let isAlreadyInCart = false
    //const items = JSON.parse(localStorage.getItem('cart'))
    for (let i = 0; i < myShoppingCart.length; i++) {
      if (items[i].id == product.id) {
        isAlreadyInCart = true
        items[i].quantity+=1
      }
    }
    if (isAlreadyInCart) localStorage.setItem( 'cart',JSON.stringify([...items]))
    else localStorage.setItem( 'cart',JSON.stringify([...items, product])) 
  } */

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="test content" />
      </Head>
      <Box>
        <Container maxW={'7xl'}>
          <Link href={'/products'}>
            <a>
              <Button>Back</Button>
            </a>
          </Link>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              <Image
                rounded={'md'}
                alt={'product image'}
                src={product.image[0]}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={{ base: '100%', sm: '400px', lg: '500px' }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={'header'}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
                >
                  {product.name}
                </Heading>
                <Text
                  color={useColorModeValue('gray.900', 'gray.400')}
                  fontWeight={300}
                  fontSize={'2xl'}
                >
                  {product.price} €
                </Text>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={'column'}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                  />
                }
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text
                    color={useColorModeValue('gray.500', 'gray.400')}
                    fontSize={'2xl'}
                    fontWeight={'300'}
                  >
                    {product.description}
                  </Text>
                </VStack>
                <Box>
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color={useColorModeValue('yellow.500', 'yellow.300')}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}
                  >
                    Product Details
                  </Text>

                  <List spacing={2}>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Category:
                      </Text>{' '}
                      {product.category}
                    </ListItem>
                  </List>
                </Box>
              </Stack>

              <Button
                rounded={'none'}
                w={'full'}
                mt={8}
                size={'lg'}
                py={'7'}
                bg={useColorModeValue('gray.900', 'gray.50')}
                color={useColorModeValue('white', 'gray.900')}
                textTransform={'uppercase'}
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                }}
                onClick={addToCart}
              >
                Add to cart
              </Button>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent={'center'}
              >
                <MdLocalShipping />
                <Text>2-3 business days delivery</Text>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  )
}

export async function getStaticProps({ params }) {
  const products = await fetch(`https://kds-js.github.io/shop.json`).then((r) =>
    r.json()
  )
  const id = params.id
  return {
    props: {
      products,
      id,
    },
  }
}
export async function getStaticPaths() {
  const products = await fetch('https://kds-js.github.io/shop.json').then((r) =>
    r.json()
  )
  return {
    paths: products.products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: false,
  }
}

export default ProductDetailPage
