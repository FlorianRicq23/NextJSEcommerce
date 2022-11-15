import { Box, Button, Flex, Icon, Image, Input, useColorModeValue } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SearchBar() {
  const [value, setValue] = useState('')
  const [data, setData] = useState()

  const buttonSearchImage = useColorModeValue('/Images/search-gif-black.gif', '/Images/search-gif-white.gif')

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
      const products = await fetch('https://nextjs-ecommerce-florianricq23.vercel.app/api/products').then(
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
            <Button bg='none' type="submit" p={0}>
              <Image h='100%' alt={'product image'} src={buttonSearchImage} />
            </Button>
          </Flex>
        </form>
        {data ? (
          <Flex
            display={{ base: 'none', md: 'block' }}
            direction={'column'}
            border="1px solid gray;"
            bg="white"
            w={600}
            _empty={{ border: 'none' }}
          >
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
                          src={`/Images/shop/${item.image[0]}`}
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
