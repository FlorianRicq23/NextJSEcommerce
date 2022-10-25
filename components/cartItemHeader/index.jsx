import { Box, Flex, Icon } from '@chakra-ui/react'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useMyShoppingCart } from '../../utils/hooks'

export default function CartItemHeader() {
  const { myShoppingCart } = useMyShoppingCart()

  return (
    <>
        <Link href={'/cart'}>
          <a>
            <Flex position={'relative'}>
            <Icon
              cursor={'pointer'}
              as={AiOutlineShoppingCart}
              height={'30px'}
              width={'30px'}
            />
            {
              myShoppingCart !=0 && 
              <Flex position={'absolute'} color='white' fontWeight={'bold'} right={'-5px'} top={'-6px'} alignItems={'center'} justifyContent={'center'} bg='red' borderRadius={'50%'} h={19} w={19}>
                {myShoppingCart.length}
              </Flex>
            }</Flex>
          </a>
        </Link>
    </>
  )
}
