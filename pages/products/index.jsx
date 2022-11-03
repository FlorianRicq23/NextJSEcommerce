import {
  Box,
  Flex,
  Grid,
  Heading,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  CheckboxGroup,
  Stack,
  Checkbox,
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import Product from '../../components/product'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Products({ products }) {
  const router = useRouter()
  const query = router.query.value ? router.query.value : ''

  const [searchQuery, setSearchQuery] = useState(query)
  const [checkedCategories, setCheckedCategories] = useState([])
  const allPrice = products.products.map((d) => {
    return d.price
  })
  const valMin = Math.min(...allPrice)
  const valMax = Math.max(...allPrice)
  const [valMinSlide, setValMinSlide] = useState(valMin)
  const [valMaxSlide, setValMaxSlide] = useState(valMax)

  const handleCheck = (event) => {
    var updatedList = [...checkedCategories]
    if (event.target.checked) {
      updatedList = [...checkedCategories, event.target.value]
    } else {
      updatedList.splice(checkedCategories.indexOf(event.target.value), 1)
    }
    setCheckedCategories(updatedList)
  }

  const filterPosts = (data, categories, minPrice, maxPrice) => {
    if (
      !query &&
      !categories.length &&
      minPrice === valMin &&
      maxPrice === valMax
    ) {
      return data
    }

    return data
      .filter((product) => {
        return product.price >= minPrice && product.price <= maxPrice
      })
      .filter((product) => {
        if (categories.length) {
          if (categories.includes(product.category)) return product
        } else return product
      })
      .filter((product) => {
        const postName = product.name.toLowerCase()
        return postName.includes(query)
      })
  }
  const filteredPosts = filterPosts(
    products.products,
    checkedCategories,
    valMinSlide,
    valMaxSlide
  )

  return (
    <div>
      <Head>
        <title>NextJS E-Shop - Products</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Flex p="0 8%" mt={15} mb={15}>
        <Flex flexDirection="column" w={'200px'} p={15} display={{base:'none', md:'block'}}>
          <Box>
            <Heading fontSize={18} borderBottom="solid 1px black">
              Categories
            </Heading>
            <Box p={5}>
              <CheckboxGroup>
                <Stack spacing={[1, 5]} direction={['column']}>
                  <Checkbox value={'homme'} onChange={handleCheck}>
                    Homme
                  </Checkbox>
                  <Checkbox value={'femme'} onChange={handleCheck}>
                    Femme
                  </Checkbox>
                  <Checkbox value={'enfant'} onChange={handleCheck}>
                    Enfant
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </Box>
          </Box>
          <Box>
            <Heading fontSize={18} borderBottom="solid 1px black">
              Prix
            </Heading>
            <Box p={5}>
              <RangeSlider
                min={valMin}
                max={valMax}
                aria-label={['min', 'max']}
                defaultValue={[valMin, valMax]}
                onChange={(val) => {
                  setValMinSlide(val[0])
                  setValMaxSlide(val[1])
                }}
              >
                <RangeSliderTrack bg="teal.600">
                  <RangeSliderFilledTrack bg="teal.300" />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={8} index={0}>
                  <Box color="teal.600" fontSize={12}>{valMinSlide}</Box>
                </RangeSliderThumb>
                <RangeSliderThumb boxSize={8} index={1}>
                  <Box color="teal.600" fontSize={12}>{valMaxSlide}</Box>
                </RangeSliderThumb>
              </RangeSlider>
            </Box>
          </Box>
        </Flex>
        <Box w='100%'>
          <Flex
            direction="column"
            justifyContent="center"
            maxW={{ xl: '1200px' }}
            m="0 auto"
            minH="100vh"
          >
            <Grid
              w="full"
              gridGap="5"
              gridTemplateColumns="repeat( auto-fit, minmax(300px, 1fr) )"
            >
              {filteredPosts.map((product) => (
                <Box key={product.id}>
                  <Link href={`/products/${product.id}`}>
                    <a>
                      <Product
                        imageSrc={product.image[0]}
                        imageAlt={product.name}
                        title={product.name}
                        category={product.category}
                        price={product.price}
                      />
                    </a>
                  </Link>
                </Box>
              ))}
            </Grid>
          </Flex>
        </Box>
      </Flex>
    </div>
  )
}

export async function getStaticProps() {
  const products = await fetch('https://kds-js.github.io/shop.json').then((r) =>
    r.json()
  )
  return {
    props: {
      products,
    },
  }
}
