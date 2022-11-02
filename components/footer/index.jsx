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
import { FaGithub, FaLinkedinIn, FaUser } from 'react-icons/fa'
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc'

function Footer() {
  return (
    <Box>
      <Flex flexDirection={'column'}>
        <Box
          justifyContent={'space-between'}
          bg="#e9edf0"
          borderTop={'1px solid silver'}
          padding="20px 8% 20px 8%"
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Feature
              icon={<Icon as={FcAssistant} w={10} h={10} />}
              title={'Lifetime Support'}
              text={
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
              }
            />
            <Feature
              icon={<Icon as={FcDonate} w={10} h={10} />}
              title={'Unlimited Donations'}
              text={
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
              }
            />
            <Feature
              icon={<Icon as={FcInTransit} w={10} h={10} />}
              title={'Instant Delivery'}
              text={
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
              }
            />
          </SimpleGrid>
        </Box>


        <Box bg="teal.600" color="white">
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
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}
      >
        {FeatureProps.icon}
      </Flex>
      <Text fontWeight={600}>{FeatureProps.title}</Text>
      <Text color={'gray.600'}>{FeatureProps.text}</Text>
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
