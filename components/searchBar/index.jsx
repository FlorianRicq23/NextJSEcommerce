import { Box, Button, Flex, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SearchBar() {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault()
    router.push({
      pathname: '/products',
      query: { search }
   })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex>
        <Input
          bg={'white'}
          placeholder="Search product"
          type="text"
          name="route"
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
        <Button type="submit">Search</Button>
        </Flex>
      </form>
    </>
  )
}
