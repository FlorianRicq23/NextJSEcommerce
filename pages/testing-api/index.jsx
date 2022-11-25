import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  StackDivider,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import TestingApiItem from '../../components/testingApiItem'
import TestingApiCreate from '../../components/testingApiCreate'

export default function TestingApi({ products }) {
  let title = `NextJS E-Shop - Testing API`

  return (
    <Box>
      <Flex
        direction={'column'}
        p={7}
        maxW="1000px"
        w={'100%'}
        mr="auto"
        ml="auto"
      >
        <Box>
          <Heading as="h2">
            Création d&apos;un produit
          </Heading>
          <TestingApiCreate />
        </Box>
        <Box>
          <Heading as="h2" mb={7}>
            Liste de produits
          </Heading>

          <Stack divider={<StackDivider />} spacing="4">
            {products.products.map((product) => (
              <TestingApiItem key={product.id} product={product} />
            ))}
          </Stack>
        </Box>
      </Flex>
    </Box>
  )
}

export async function getServerSideProps() {
  const products = await fetch(
    'https://nextjs-ecommerce-florianricq23.vercel.app/api/products'
    //'http://localhost:3000/api/products'
  ).then((r) => r.json())
  return {
    props: {
      products,
    },
  }
}
