import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query'

export default function TestingApiCreate() {
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
    form.reset()
  }

  const queryClient = useQueryClient()
  const mutationAdd = useMutation(submitProduct, {
    onError: (error, variable, context) => {
      console.log(error)
    },
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries(['listeProducts'])
    },
    onSettled: () => {
      console.log('tets')
    },
  })

  return (
    <Box p={7} mr="auto" ml="auto">
      <form onSubmit={mutationAdd}>
      {mutationAdd.error && (
        <h5 onClick={() => mutationAdd.reset()}>{mutationAdd.error}</h5>
      )}
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
        <Button type="submit" width="full" mt={4}>
          Ajouter le produit
        </Button>
      </form>
    </Box>
  )
}
