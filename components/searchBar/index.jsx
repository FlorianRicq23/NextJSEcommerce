import { Box, Button, Flex, Image, Input } from '@chakra-ui/react'
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
              placeholder="Rechercher un produit"
              type="text"
              value={value}
              onChange={onChange}
            />
            <Button type="submit">Rechercher</Button>
          </Flex>
        </form>
        {data ? (
          <Flex display={{base:'none', md:'block'}} direction={'column'} border='1px solid gray;' bg='white' w={600} _empty={{border:'none'}}>
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
                <Box key={item.id} onClick={() => setValue('')}>
                  <Link href={`/products/${item.id}`}>
                    <a>
                      <Flex alignItems={'center '}>
                        <Image
                          rounded={'md'}
                          alt={'product image'}
                          src={item.image[0]}
                          fit={'cover'}
                          align={'center'}
                          h={16}
                        />{' '}
                        {item.name}
                      </Flex>
                    </a>
                  </Link>
                </Box>
              ))}
          </Flex>
        ) : null}
      </Box>
    </>
  )
}
