import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react'

export default function PostProduct() {
  const [name, setName] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [category, setCategory] = useState([])
  const [price, setPrice] = useState(12)
  const [description, setDescription] = useState(
    "Fabriqué à la main avec un style saisonnier à l'esprit, il est idéal pour une tenue formelle ou décontractée quelle que soit l'occasion et est un incontournable idéal pour toute garde-robe."
  )
  const [image, setImage] = useState(['glastonbury_outfit.jpeg'])
  const router = useRouter()

  const submitBook = async () => {
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
    router.push({
      pathname: '/products',
    })
  }
  return (
    <Box maxW='600px' w={'100%'} mr='auto' ml='auto'>
      <FormControl isRequired mb={5}>
        <FormLabel>Product name</FormLabel>
        <Input placeholder="Product name" type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl isRequired mb={5}>
        <FormLabel>Categort</FormLabel>
        <Select placeholder="Select category" name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}>
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
          <option value="enfant">Enfant</option>
        </Select>
      </FormControl>
      <Button onClick={submitBook} mb={5}>Submit book</Button>
    </Box>
  )
}
