import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import SearchBar from '../searchBar'

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
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}
            >
              Action
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
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

/* function Header() {
  return (
    <>
      <Flex color={'white'} fontWeight='bold' fontSize={20} h={50} bg="green" justifyContent={'center'} alignItems="center" gap={20}>
        <Link href={'/'}>
          <a>Accueil</a>
        </Link>
        <Link href={'/'}>
          <a>Page 1</a>
        </Link>
      </Flex>
    </>
  )
}*/
export default Header
