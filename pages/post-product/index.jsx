import { useState } from 'react'
import { useRouter } from 'next/router'

export default function PostProduct() {
  const [name, setName] = useState([])
  const [quantity, setQuantity] = useState([])
  const [category, setCategory] = useState([])
  const [price, setPrice] = useState(12)
  const [description, setDescription] = useState(
    "Fabriqué à la main avec un style saisonnier à l'esprit, il est idéal pour une tenue formelle ou décontractée quelle que soit l'occasion et est un incontournable idéal pour toute garde-robe."
  )
  const [image, setImage] = useState([
    'https://i.ibb.co/vjHZ06V/Pull-01.webp',
    'https://i.ibb.co/rQGSZ6P/Pull-02.webp',
  ])
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
        image
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    router.push({
      pathname: '/products'
    })
  }
  return (
    <>
      <div align="center">
        {'name: '}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        {'quantity: '}
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <br />
        {'category: '}
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <button onClick={submitBook}>Submit book</button>
      </div>
    </>
  )
}
