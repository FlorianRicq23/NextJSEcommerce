import { Box } from '@chakra-ui/react'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>NextJS E-Shop</title>
        <meta name="description" content="My NextJS E-Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box p='0 8%'>My home page</Box>
    </div>
  )
}
