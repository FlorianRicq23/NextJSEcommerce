import { Image, Box, Stack, Heading } from '@chakra-ui/react'

const VarianteItem = ({ item, setImageDisplay }) => (
  <Box>
    
    <Image
      rounded={'md'}
      alt={'product image'}
      src={`/Images/shop/${item.image[0]}`}
      fit={'cover'}
      align={'center'}
      w={'60px'}
      h={'60px'}
      _hover={{
        border: 'black solid 1px',
        cursor: 'pointer',
      }}
      onClick={() => setImageDisplay(item.image[0])}
    />
  </Box>
)

export default VarianteItem
