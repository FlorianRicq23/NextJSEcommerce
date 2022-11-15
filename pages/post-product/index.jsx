import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react'

export default function PostProduct() {
  const router = useRouter()

  const submitProduct = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const name = formData.get('name')
    const quantity = 1
    const category = formData.get('category')
    const price = formData.get('price')
    const description = formData.get('description')
    const image = ['new-product.jpeg']
    const response = await fetch('/api/products', {
      method: 'POST',
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
    form.reset();
    router.replace(router.asPath);
    router.push({
      pathname: '/products',
    })
  }
  return (
    <Box p={7} maxW="600px" w={'100%'} mr="auto" ml="auto">
      <form onSubmit={submitProduct}>
        <FormControl isRequired mb={5}>
          <FormLabel>Nom du produit</FormLabel>
          <Input
            placeholder="Nom du produit"
            type="text"
            name="name"
            id="name"
          />
        </FormControl>
        <FormControl isRequired mb={5}>
          <FormLabel>Description du produit</FormLabel>
          <Input
            placeholder="Description du produit"
            type="text"
            name="description"
            id="description"
          />
        </FormControl>
        <FormControl isRequired mb={5}>
          <FormLabel>Prix du produit</FormLabel>
          <Input
            placeholder="Prix du produit"
            type="number"
            name="price"
            id="price"
          />
        </FormControl>
        <FormControl isRequired mb={5}>
          <FormLabel>Catégorie du produit</FormLabel>
          <Select
          placeholder="Catégorie du produit"
          name="category"
          id="category"
        >
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
          <option value="enfant">Enfant</option>
        </Select>
        </FormControl>
        <Button
          type="submit"
          width="full"
          mt={4}
        >
          Ajouter le produit
        </Button>
      </form>
    </Box>
  )
}
