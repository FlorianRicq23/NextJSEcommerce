import Link from 'next/link'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Icon,
  Image,
  useColorMode,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import SearchBar from '../searchBar'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import CartItemHeader from '../cartItemHeader'

const NavLinkComponent = ({
  title,
  link,
  current,
  isOpen,
  onClose,
  onOpen,
}) => (
  <Box onClick={isOpen ? onClose : onOpen}>
    <Link href={link}>
      <a style={current === link ? { fontWeight: 'bold' } : null}>{title}</a>
    </Link>
  </Box>
)

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()
  const currentRoute = router.pathname
  const buttonToggleImage = useColorModeValue(
    '/Images/moon-gif.gif',
    '/Images/sun-icon.png'
  )
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.800')} px={{base:1, sm:4}}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          px={{base:1, sm:4}}
        >
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Image
              src="../../../Images/logo-header.png"
              alt="logo header"
              maxW={150}
            />
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <NavLinkComponent
                title={'Accueil'}
                link={'/'}
                current={currentRoute}
              />
              <NavLinkComponent
                title={'Produits'}
                link={'/products'}
                current={currentRoute}
              />
              <NavLinkComponent
                title={'Créer un produit'}
                link={'/post-product'}
                current={currentRoute}
              />
            </HStack>
          </HStack>
          <Flex gap={{base:3, sm:5}}>
            {/* <Icon
             onClick={toggleColorMode}
              cursor={'pointer'}
              as={colorMode === 'light' ? <Image h="100%" alt={'product image'} src={'/Images/cart-gif-black.gif'} /> : SunIcon}
              height={'30px'}
              width={'25px'}
            /> */}
            <Button bg='none' type="submit" onClick={toggleColorMode} p={0} height={'40px'} width={'40px'}>
              <Image h="90%" alt={'product image'} src={buttonToggleImage} />
            </Button>
            <CartItemHeader />
          </Flex>
        </Flex>
        <Box p={{base:1, sm:4}}>
          <SearchBar />
        </Box>

        {isOpen ? (
          <Box px={{base:4, sm:0}} pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <NavLinkComponent
                title={'Accueil'}
                link={'/'}
                current={currentRoute}
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
              />
              <NavLinkComponent
                title={'Produits'}
                link={'/products'}
                current={currentRoute}
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
              />
              <NavLinkComponent
                title={'Créer un produit'}
                link={'/post-product'}
                current={currentRoute}
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
              />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}

export default Header
