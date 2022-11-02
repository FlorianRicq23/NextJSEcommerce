import { Box, Button, Flex, Input } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SearchBar() {
  const [value, setValue] = useState('')
  const [data, setData] = useState()

  const router = useRouter()

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push({
      pathname: '/products',
      query: { value },
    })
    setValue('')
  }

  useEffect(() => {
    async function fetchData() {
      const products = await fetch('https://kds-js.github.io/shop.json').then(
        (r) => r.json()
      )
      setData(products)
    }
    fetchData()
  }, [])

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit}>
          <Flex>
            <Input
              bg={'white'}
              placeholder="Search product"
              type="text"
              value={value}
              onChange={onChange}
            />
            <Button type="submit">Search</Button>
          </Flex>
        </form>
        {data ? (
          <div className="dropdown">
            {data.products
              .filter((item) => {
                const searchTerm = value.toLowerCase()
                const fullName = item.name.toLowerCase()

                return (
                  searchTerm &&
                  fullName.startsWith(searchTerm) &&
                  fullName !== searchTerm
                )
              })
              .slice(0, 10)
              .map((item) => (
                <Box key={item.id}>
                  <Link href={`/products/${item.id}`}>
                    <a>
                      {item.name}
                    </a>
                  </Link>
                </Box>
              ))}
          </div>
        ) : null}
      </Box>
    </>
  )
}
