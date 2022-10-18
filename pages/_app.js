import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Header from '../components/header'
import Footer from '../components/footer'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  )
}

export default MyApp
