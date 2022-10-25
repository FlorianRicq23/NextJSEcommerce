import Link from 'next/link'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Icon,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import SearchBar from '../searchBar'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import CartItemHeader from '../cartItemHeader'

const NavLinkComponent = ({ title, link, current }) => (
  <Link href={link}>
    <a style={current === link ? { fontWeight: 'bold' } : null}>{title}</a>
  </Link>
)

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const currentRoute = router.pathname
  return (
    <>
      <Box bg={'gray.100'} px={4}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          p="0 8%"
        >
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <NavLinkComponent
                title={'Home'}
                link={'/'}
                current={currentRoute}
              />
              <NavLinkComponent
                title={'Products'}
                link={'/products'}
                current={currentRoute}
              />
              <SearchBar />
            </HStack>
          </HStack>
          <CartItemHeader />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <NavLinkComponent
                title={'Home'}
                link={'/'}
                current={currentRoute}
              />
              <NavLinkComponent
                title={'Products'}
                link={'/products'}
                current={currentRoute}
              />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}

export default Header
