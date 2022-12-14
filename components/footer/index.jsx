import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  Stack,
  Container,
  chakra,
  Image,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import Link from 'next/link'
import { BsCreditCard } from 'react-icons/bs'
import { FaCreditCard, FaGithub, FaLinkedinIn, FaUser } from 'react-icons/fa'
import { FcAbout, FcAdvertising, FcAssistant, FcBusinessContact, FcDonate, FcInTransit } from 'react-icons/fc'

function Footer() {
  return (
    <Box>
      <Flex flexDirection={'column'}>
        <Box
          justifyContent={'space-between'}
          bg={useColorModeValue('gray.100', 'teal.600')}
          padding={{base:"20px", md:"20px 8% 20px 8%"}}
        >
          <SimpleGrid columns={3} spacing={{base:5, md:10}}>
            <Feature
              icon={<Icon as={FcAssistant} w={10} h={10} />}
              title={'Satisfait'}
              text={
                'ou remboursé*'
              }
            />
            <Feature
              icon={<Icon as={BsCreditCard} color='black' w={10} h={10} />}
              title={'Paiement sécurisé'}
              text={
                '100% tranquilité*'
              }
            />
            <Feature
              icon={<Icon as={FcInTransit} w={10} h={10} />}
              title={'Livraison gratuite'}
              text={
                'Voir conditions*'
              }
            />
          </SimpleGrid>
        </Box>

        <Box bg={useColorModeValue('teal.600', 'gray.800')} color="white">
          <Container
            as={Stack}
            maxW={'6xl'}
            py={4}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ base: 'center', md: 'space-between' }}
            align={{ base: 'center', md: 'center' }}
          >
            <Text align={{ base: 'center' }}>
              © 2022 Designed and built by Florian Ricq. All rights reserved
            </Text>
            <Stack direction={'row'} spacing={6}>
              <SocialButton
                label={'Personnal website'}
                href={'http://www.florianricq.fr/'}
              >
                <FaUser />
              </SocialButton>
              <SocialButton
                label={'Linkedin'}
                href={'https://www.linkedin.com/in/florian-ricq/'}
              >
                <FaLinkedinIn />
              </SocialButton>
              <SocialButton
                label={'YouTube'}
                href={'https://github.com/FlorianRicq23'}
              >
                <FaGithub />
              </SocialButton>
            </Stack>
          </Container>
        </Box>
      </Flex>
    </Box>
  )
}
export default Footer

const Feature = (FeatureProps) => {
  return (
    <Stack>
      <Flex
        h={{base:7, md:16}}
        align={'center'}
        justify={'center'}
        mb={1}
      >
        {FeatureProps.icon}
      </Flex>
      <Text fontWeight={600} textAlign="center" display={{base: 'none', md:'block'}}>
        {FeatureProps.title}
      </Text>
      <Text color={'gray.600'} textAlign="center" display={{base: 'none', md:'block'}}>
        {FeatureProps.text}
      </Text>
    </Stack>
  )
}

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}
