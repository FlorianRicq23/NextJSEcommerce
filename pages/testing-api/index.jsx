import { Box, Flex, Heading, Stack, StackDivider } from '@chakra-ui/react'
import TestingApiItem from '../../components/testingApiItem'
import TestingApiCreate from '../../components/testingApiCreate'
import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import Head from 'next/head'

export default function TestingApi() {
  let title = `NextJS E-Shop - Testing API`

  async function fetchAllProducts() {
    //const { data } = await axios.get('http://localhost:3000/api/products')
    const { data } = await axios.get('https://nextjs-ecommerce-florianricq23.vercel.app/api/products')
    return data
  }
  const { status, error, data } = useQuery(['listeProducts'], () =>
    fetchAllProducts()
  )

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content='Page de test pour de API next' />
      </Head>
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
          <Heading as="h2" size={'md'}>Création d&apos;un produit</Heading>
          <TestingApiCreate />
        </Box>
        <Box>
          <Heading as="h2" mb={7} size={'md'}>
            Liste de produits (non synchronisée avec /produits)
          </Heading>

          <Stack divider={<StackDivider />} spacing="4">
            {data
              ? data.products.map((product) => (
                  <TestingApiItem key={product.id} product={product} />
                ))
              : null}
          </Stack>
        </Box>
      </Flex>
    </Box>
    </>
  )
}

/* export async function getServerSideProps() {
  const products = await fetch(
    'https://nextjs-ecommerce-florianricq23.vercel.app/api/products'
    //'http://localhost:3000/api/products'
  ).then((r) => r.json())
  return {
    props: {
      products,
    },
  }
} */
