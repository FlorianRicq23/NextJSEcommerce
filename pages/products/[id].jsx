import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Box,
  useColorModeValue,
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
  List,
  ListItem,
  FormControl,
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react'
import { MdLocalShipping } from 'react-icons/md'
import { useMyShoppingCart } from '../../utils/hooks'
import { useState } from 'react'
import VarianteItem from '../../components/VarianteItem'

function ProductDetailPage({ product }) {
  const { myShoppingCart, setMyShoppingCart } = useMyShoppingCart()
  let title = `NextJS E-Shop -  ${product.name}`
  const router = useRouter()

  const [name, setName] = useState(product.name)
  const [quantity, setQuantity] = useState(product.quantity)
  const [category, setCategory] = useState(product.category)
  const [price, setPrice] = useState(product.price)
  const [description, setDescription] = useState(product.description)
  const [image, setImage] = useState(product.image)
  const [imageStack, setImageStack] = useState(product.image)
  const [imageDisplay, setImageDisplay] = useState(imageStack[0])
  const [indexVariante, setIndexVariante] = useState(0)
  const [displayForm, setDisplayForm] = useState(false)
  const colorPrice = useColorModeValue('gray.900', 'gray.400')
  const colorDescription = useColorModeValue('gray.500', 'gray.400')

  const editProduct = async (productId) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        quantity,
        category,
        price,
        description,
        image,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setDisplayForm(false)
    router.push({
      pathname: `/products/${productId}`,
    })
  }

  const deleteProduct = async (productId) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    })
    router.push({
      pathname: '/products',
    })
  }

  const addToCart = () => {
    setMyShoppingCart((myShoppingCart) => {
      let isAlreadyInCart = false

      for (let i = 0; i < myShoppingCart.length; i++) {
        if (myShoppingCart[i].variante) {
          if (myShoppingCart[i].product.id == product.id && myShoppingCart[i].variante.id == indexVariante) {
            isAlreadyInCart = true
          }
        } else if (myShoppingCart[i].product.id == product.id) {
          isAlreadyInCart = true
        }
      }

      if (isAlreadyInCart) return myShoppingCart
      else {
        const varianteProduct = product.variantes
          ? product.variantes[indexVariante]
          : null
        return [
          {
            product: product,
            variante: varianteProduct,
            quantity: product.quantity,
          },
          ...myShoppingCart,
        ]
      }
    })
  }

  const strUcFirst = (a) => {
    return (a + '').charAt(0).toUpperCase() + a.substr(1)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={product.description} />
      </Head>
      <Box>
        <Container maxW={'7xl'}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex direction={'column'}>
              <Image
                rounded={'md'}
                alt={'product image'}
                src={`/Images/shop/${imageDisplay}`}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={{ base: '100%', sm: '400px', lg: '500px' }}
              />
              <SimpleGrid columns={3} spacing={{ base: 2, sm: 5 }} mt={3}>
                {imageStack.map((item, index) => (
                  <Image
                    key={index}
                    rounded={'md'}
                    alt={'product image'}
                    src={`/Images/shop/${item}`}
                    fit={'cover'}
                    align={'center'}
                    w={'100%'}
                    onClick={() => setImageDisplay(item)}
                  />
                ))}
              </SimpleGrid>
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={'header'}>
                {displayForm ? (
                  <FormControl isRequired mb={5}>
                    <Input
                      placeholder="Product name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                ) : (
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
                  >
                    {product.name}
                  </Heading>
                )}

                {displayForm ? (
                  <FormControl isRequired mb={5}>
                    <Input
                      placeholder="Product price"
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </FormControl>
                ) : (
                  <Text color={colorPrice} fontWeight={300} fontSize={'2xl'}>
                    {product.price} €
                  </Text>
                )}
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
                  {displayForm ? (
                    <FormControl isRequired mb={5}>
                      <Textarea
                        placeholder="Product description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormControl>
                  ) : (
                    <Text
                      color={colorDescription}
                      fontSize={'2xl'}
                      fontWeight={'300'}
                    >
                      {product.description}
                    </Text>
                  )}
                </VStack>
                <Box>
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color={useColorModeValue('teal.500', 'teal.300')}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}
                  >
                    Details du produit
                  </Text>

                  <List spacing={2} mb={'4'}>
                    {displayForm ? (
                      <FormControl isRequired mb={5}>
                        <Select
                          placeholder="Select category"
                          name="category"
                          id="category"
                          onChange={(e) => setCategory(e.target.value)}
                          defaultValue={category}
                        >
                          <option value="homme">Homme</option>
                          <option value="femme">Femme</option>
                          <option value="enfant">Enfant</option>
                        </Select>
                      </FormControl>
                    ) : (
                      <ListItem>
                        <Text as={'span'} fontWeight={'bold'}>
                          Category:
                        </Text>{' '}
                        {strUcFirst(product.category)}
                      </ListItem>
                    )}
                  </List>

                  {product.variantes ? (
                    <>
                      <Flex gap={{ base: 2, sm: 5 }} mt={3}>
                        {product.variantes.map((item, index) => (
                          <VarianteItem
                            key={index}
                            item={item}
                            setImageStack={setImageStack}
                            setImageDisplay={setImageDisplay}
                            setIndexVariante={setIndexVariante}
                          />
                        ))}
                      </Flex>

                      <Flex gap={{ base: 2, sm: 5 }} mt={3}>
                        {product.variantes[indexVariante].sizes.map(
                          (item, index) => (
                            <Box key={index}>{item}</Box>
                          )
                        )}
                      </Flex>
                    </>
                  ) : null}

                  {product.id > 9 ? (
                    <Flex direction={{ base: 'column', sm: 'row' }} gap={2}>
                      <Button
                        colorScheme={'red'}
                        onClick={() => deleteProduct(product.id)}
                        fontSize={{ base: 12, lg: 14 }}
                        h={8}
                      >
                        Supprimer le produit
                      </Button>

                      {displayForm ? (
                        <>
                          <Button
                            colorScheme={'yellow'}
                            onClick={() => setDisplayForm(!displayForm)}
                            fontSize={{ base: 12, lg: 14 }}
                            h={8}
                          >
                            Annuler la modification
                          </Button>
                          <Button
                            colorScheme={'green'}
                            onClick={() => editProduct(product.id)}
                            fontSize={{ base: 12, lg: 14 }}
                            h={8}
                          >
                            Valider la modification
                          </Button>
                        </>
                      ) : (
                        <Button
                          colorScheme={'green'}
                          onClick={() => setDisplayForm(!displayForm)}
                          fontSize={{ base: 12, lg: 14 }}
                          h={8}
                        >
                          Modifier le produit
                        </Button>
                      )}
                    </Flex>
                  ) : null}
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
                Ajouter au panier
              </Button>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent={'center'}
              >
                <MdLocalShipping />
                <Text>2-3 jours de livraison</Text>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  )
}

export async function getStaticProps({ params }) {
  const id = params.id
  const product = await fetch(`https://nextjs-ecommerce-florianricq23.vercel.app/api/products/${id}`).then(
    (r) => r.json()
  )

  return {
    props: {
      product,
    },
  }
}
export async function getStaticPaths() {
  const products = await fetch('https://nextjs-ecommerce-florianricq23.vercel.app/api/products').then((r) =>
    r.json()
  )
  return {
    paths: products.products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: false,
  }
}

/* export async function getServerSideProps({ params }) {
  const id = params.id
  const product = await fetch(
    `https://nextjs-ecommerce-florianricq23.vercel.app/api/products/${id}`
  ).then((r) => r.json())

  return {
    props: {
      product,
    },
  }
} */

export default ProductDetailPage
