import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Header from '../components/header'
import Footer from '../components/footer'
import { MyShoppingCartProvider } from '../utils/context'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <MyShoppingCartProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </MyShoppingCartProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
