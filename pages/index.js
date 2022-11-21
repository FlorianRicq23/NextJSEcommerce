import Head from 'next/head'
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  chakra,
  SimpleGrid,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react'
import Link from 'next/link'
import Product from '../components/product'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Home({ products }) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    router.isReady && setIsLoading(false)
  }, [])
  return (
    <div>
      <Head>
        <title>NextJS E-Shop</title>
        <meta name="description" content="My NextJS E-Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>        
      <Flex bg='teal.400' p={2} alignItems={'center'} justifyContent={'center'}><Text textAlign={'center'}>Vente flash débloquée ⚡ 25% de réduction avec le code &quot;NEXT25&quot;</Text></Flex>
      <Container maxW={'7xl'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 7, md: 28 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            >
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'teal.400',
                  zIndex: -1,
                }}
              >
                Promotion spéciale
              </Text>
              <br />
              <Text as={'span'} color={'teal.400'} fontSize="3xl">
                Jusqu&apos;à 50% de réduction !
              </Text>
            </Heading>
            <Text color={'gray.500'}>
              Utilisez le code promo ⚡ “NOUVEL AN”
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}
            >
              <Link href={'/products'}>
                <a>
                  <Button
                    rounded={'full'}
                    size={'lg'}
                    fontWeight={'normal'}
                    px={6}
                    colorScheme={'teal'}
                    bg={'teal.400'}
                    _hover={{ bg: 'teal.500' }}
                  >
                    En savoir plus
                  </Button>
                </a>
              </Link>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}
          >
            <Blob
              w={'150%'}
              h={'150%'}
              position={'absolute'}
              top={'-20%'}
              left={0}
              zIndex={-1}
              color={useColorModeValue('teal.50', 'teal.400')}
            />
            <Box
              position={'relative'}
              height={'300px'}
              rounded={'2xl'}
              boxShadow={'2xl'}
              width={'full'}
              overflow={'hidden'}
            >
              <Image
                alt={'Hero Image'}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={'100%'}
                src={'../../../Images/home_2.jpg'}
              />
            </Box>
          </Flex>
        </Stack>
      </Container>

      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}
        >
          Nos meilleures ventes
        </chakra.h1>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          {isLoading ? (<><Spinner /></>
            
          ) : <>
              <Link href={`/products/${products.products[0].id}`}>
                <a>
                  <Product
                    imageSrc={`/Images/shop/${products.products[0].image[0]}`}
                    imageAlt={products.products[0].name}
                    title={products.products[0].name}
                    category={products.products[0].category}
                    price={products.products[0].price}
                  />
                </a>
              </Link>
              <Link href={`/products/${products.products[1].id}`}>
                <a>
                  <Product
                    imageSrc={`/Images/shop/${products.products[1].image[0]}`}
                    imageAlt={products.products[1].name}
                    title={products.products[1].name}
                    category={products.products[1].category}
                    price={products.products[1].price}
                  />
                </a>
              </Link>
              <Link href={`/products/${products.products[2].id}`}>
                <a>
                  <Product
                    imageSrc={`/Images/shop/${products.products[2].image[0]}`}
                    imageAlt={products.products[2].name}
                    title={products.products[2].name}
                    category={products.products[2].category}
                    price={products.products[2].price}
                  />
                </a>
              </Link>
            </> }
        </SimpleGrid>

        <Flex py={10} justifyContent={'center'}>
          <Link href={'/products'}>
            <Button
              bg="teal.600"
              color={'white'}
              _hover={{ background: 'teal.300' }}
            >
              Afficher tous les produits
            </Button>
          </Link>
        </Flex>
      </Box>
    </div>
  )
}

export const Blob = (IconProps) => {
  return (
    <Icon
      width={'100%'}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...IconProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  )
}

export async function getStaticProps() {
  const products = await fetch(
    'http://localhost:3000/api/products'
  ).then((r) => r.json())
  return {
    props: {
      products,
    },
  }
}
