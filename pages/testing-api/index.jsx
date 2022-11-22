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

export default function TestingApi({ products }) {
  let title = `NextJS E-Shop - Testing API`
  const router = useRouter()
  const [data, setData] = useState(products)

  const deleteProduct = async (productId) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    })
    router.replace(router.asPath);
  }
  return (
    <Box>
      <Heading as="h1">Bonjour a tous</Heading>
      <Flex
        direction={'column'}
        p={7}
        maxW="1000px"
        w={'100%'}
        mr="auto"
        ml="auto"
      >
        <Heading as="h1">Liste de produits</Heading>

        <Stack divider={<StackDivider />} spacing="4">
          {products.products.map((product) => (
            <Flex
              key={product.id}
              alignItems="center"
              justifyContent={'space-between'}
            >
              <HStack>
                <Avatar
                  alt={'product image'}
                  src={`/Images/shop/${product.image[0]}`}
                />
                <Box>
                  <Heading as={'h2'} textTransform="uppercase" size={'xs'}>
                    {product.name}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {product.description}...
                  </Text>
                </Box>
              </HStack>
              <HStack>
                <Button colorScheme={'blue'}>Modifier</Button>
                <Button
                  colorScheme={'red'}
                  onClick={() => deleteProduct(product.id)}
                >
                  Supprimer
                </Button>
              </HStack>
            </Flex>
          ))}
        </Stack>
      </Flex>
    </Box>
  )
}

export async function getServerSideProps() {
  const products = await fetch(
    'http://localhost:3000/api/products'
  ).then((r) => r.json())
  return {
    props: {
      products,
    },
  }
}
