import { Image, Box, Stack, Heading } from '@chakra-ui/react'

const VarianteItem = ({ item, setImageStack, setImageDisplay, setIndexVariante }) => (
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
      onClick={() => {setImageStack(item.image), setImageDisplay(item.image[0]), setIndexVariante(item.id)} }
    />
  </Box>
)

export default VarianteItem
