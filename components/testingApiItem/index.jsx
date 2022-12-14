import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

export default function TestingApiItem({ product }) {
  const router = useRouter()
  const [name, setName] = useState(product.name)
  const [quantity, setQuantity] = useState(product.quantity)
  const [category, setCategory] = useState(product.category)
  const [price, setPrice] = useState(product.price)
  const [description, setDescription] = useState(product.description)
  const [image, setImage] = useState(product.image)
  const [displayForm, setDisplayForm] = useState(false)

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
  }

  const deleteProduct = async (productId) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    })
  }

  const mutation = useMutation(deleteProduct, {
    onError: (error, variable, context) => {
      console.log(error)
    },
    onSuccess:async (data, variable, context) => {
      console.log(data)
    },
  })
  const queryClient = useQueryClient();
  const mutationEdit = useMutation(editProduct, {
    onError: (error, variable, context) => {
      console.log(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['listeProducts'])
    }
  })

  return (
    <>
      {mutation.isSuccess ? (
        <div>Produit supprimé</div>
      ) : mutationEdit.isSuccess ? (
        <Flex flexDirection={{base:'column', sm:'row'}} alignItems="center" justifyContent={'space-between'}>
          <HStack w="75%">
            <Avatar
              alt={'product image'}
              src={`/Images/shop/${product.image[0]}`}
            />
            <Box w="100%">
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
                <Heading as={'h3'} textTransform="uppercase" size={'xs'}>
                  {product.name}
                </Heading>
              )}

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
                <Text pt="2" fontSize="sm">
                  {product.description.substring(0, 100)}...
                </Text>
              )}
            </Box>
          </HStack>
          <Stack direction={{base:'row', sm:'column'}} >
            {displayForm ? (
              <>
                <Button
                  colorScheme={'yellow'}
                  onClick={() => setDisplayForm(!displayForm)}
                  w={24}
                >
                  Annuler
                </Button>
                <Button
                  colorScheme={'green'}
                  //onClick={() => editProduct(product.id)}
                  onClick={() => {
                    mutationEdit.mutate(product.id)
                  }}
                  w={24}
                >
                  Valider
                </Button>
              </>
            ) : (
              <>
                <Button
                  colorScheme={'blue'}
                  onClick={() => setDisplayForm(!displayForm)}
                  w={24}
                >
                  Modifier
                </Button>

                <Button
                  colorScheme={'red'}
                  onClick={() => {
                    mutation.mutate(product.id)
                  }}
                  w={24}
                >
                  Supprimer
                </Button>
              </>
            )}
          </Stack>
        </Flex>
      ) : (
        <Flex flexDirection={{base:'column', sm:'row'}} alignItems="center" justifyContent={'space-between'}>
          <HStack w="75%">
            <Avatar
              alt={'product image'}
              src={`/Images/shop/${product.image[0]}`}
            />
            <Box w="100%">
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
                <Heading as={'h3'} textTransform="uppercase" size={'xs'}>
                  {product.name}
                </Heading>
              )}

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
                <Text pt="2" fontSize="sm">
                  {product.description.substring(0, 100)}...
                </Text>
              )}
            </Box>
          </HStack>
          <Stack direction={{base:'row', sm:'column'}} >
            {displayForm ? (
              <>
                <Button
                  colorScheme={'yellow'}
                  onClick={() => setDisplayForm(!displayForm)}
                  w={24}
                >
                  Annuler
                </Button>
                <Button
                  colorScheme={'green'}
                  //onClick={() => editProduct(product.id)}
                  onClick={() => {
                    mutationEdit.mutate(product.id)
                  }}
                  w={24}
                >
                  Valider
                </Button>
              </>
            ) : (
              <>
                <Button
                  colorScheme={'blue'}
                  onClick={() => setDisplayForm(!displayForm)}
                  w={24}
                >
                  Modifier
                </Button>

                <Button
                  colorScheme={'red'}
                  onClick={() => {
                    mutation.mutate(product.id)
                  }}
                  w={24}
                >
                  Supprimer
                </Button>
              </>
            )}
          </Stack>
        </Flex>
      )}
    </>
  )
}
