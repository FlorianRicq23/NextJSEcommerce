import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  Stack,
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

        <Flex
          justifyContent={'space-between'}
          alignItems="center"
          bg="teal.600"
          color="white"
          h={90}
          p="0 8%"
        >
          <Box>
            <Heading as="h6" fontSize={16} fontWeight="bold">
              © 2022 Designed and built by Florian Ricq. All rights reserved
            </Heading>
          </Box>
          <Flex justifyContent={'space-between'} w={150} fontSize={25}>
            <Link href={'http://www.florianricq.fr/'}>
              <a>
                <FaUser />
              </a>
            </Link>
            <Link href={'https://www.linkedin.com/in/florian-ricq/'}>
              <a>
                <FaLinkedinIn />
              </a>
            </Link>
            <Link href={'https://github.com/FlorianRicq23'}>
              <a>
                <FaGithub />
              </a>
            </Link>
          </Flex>
        </Flex>
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