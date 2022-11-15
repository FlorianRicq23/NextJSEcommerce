import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useMyShoppingCart } from '../../utils/hooks'

export default function CartItemHeader() {
  const { myShoppingCart } = useMyShoppingCart()
  const buttonCartImage = useColorModeValue(
    '/Images/cart-gif-black.gif',
    '/Images/cart-gif-white.gif'
  )

  return (
    <>
      <Link href={'/cart'}>
        <a>
          <Flex position={'relative'}>
            <Button bg='none' type="submit" p={0} height={'40px'} width={'40px'}>
              <Image h="100%" alt={'product image'} src={buttonCartImage} />
            </Button>
            {myShoppingCart != 0 && (
              <Flex
                position={'absolute'}
                color="white"
                fontWeight={'bold'}
                right={'-5px'}
                top={'-6px'}
                alignItems={'center'}
                justifyContent={'center'}
                bg="teal.300"
                borderRadius={'50%'}
                h={19}
                w={19}
              >
                {myShoppingCart.length}
              </Flex>
            )}
          </Flex>
        </a>
      </Link>
    </>
  )
}
