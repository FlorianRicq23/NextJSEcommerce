import { Box, Button, Flex, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const [route, setRoute] = useState()
  const handleSubmit = (e) => {
    e.preventDefault()
    router.push('/products')
  }

  return (
    <Flex>
      <form onSubmit={handleSubmit}>
        <Input
          bg={'white'}
          placeholder="Search product"
          type="text"
          name="route"
          onChange={(e) => {
            setSearchQuery(e.target.value)
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Flex>
  )
}
