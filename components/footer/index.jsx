import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { FaFacebookF } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FcShipped } from 'react-icons/fc'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { MdPayment } from 'react-icons/md'
import { TbCornerUpLeftDouble } from 'react-icons/tb'

function Footer() {
  return (
    <Box>
      <Flex flexDirection={'column'}>
        <Flex justifyContent={'space-between'} bg='#e9edf0' borderTop={'1px solid silver'} padding='20px 8% 20px 8%'>
          <Flex flexDirection={'column'} alignItems='center'>
            <Box fontSize={50}>
              <FcShipped />
            </Box>
            <strong>Livraison gratuite</strong>
            <span>Voir conditions*</span>
          </Flex>

          <Flex flexDirection={'column'} alignItems='center'>
            <Box fontSize={50}>
              <AiOutlineClockCircle />
            </Box>
            <strong>Satisfait</strong>
            <span>ou remboursé*</span>
          </Flex>

          <Flex flexDirection={'column'} alignItems='center'>
            <Box fontSize={50}>
              <TbCornerUpLeftDouble />
            </Box>
            <strong>30 jours</strong>
            <span>pour changer d'avis*</span>
          </Flex>

          <Flex flexDirection={'column'} alignItems='center'>
            <Box fontSize={50}>
              <MdPayment />
            </Box>
            <strong>Paiement sécurisé</strong>
            <span>100% tranquilité*</span>
          </Flex>
        </Flex>

        <Flex justifyContent={'space-between'} alignItems='center' bg='#509CE2' color='white' h={90} p='0 8%'>
          <Box>
            <Heading as='h6' fontSize={16} fontWeight='bold'>
              @2022 E-shop Device Co. | Ltd. | Tous droits réservés.
            </Heading>
          </Box>
          <Flex justifyContent={'space-between'} w={150} fontSize={25}>
            <FaInstagram />
            <FaTwitter />
            <FaFacebookF />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
export default Footer
