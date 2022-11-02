import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Header from '../components/header'
import Footer from '../components/footer'
import { MyShoppingCartProvider } from '../utils/context'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <MyShoppingCartProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
      </MyShoppingCartProvider>
    </ChakraProvider>
  )
}

export default MyApp
