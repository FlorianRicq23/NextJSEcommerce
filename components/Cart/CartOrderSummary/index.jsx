import {
    Button,
    Flex,
    Heading,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import * as React from 'react'
  import { FaArrowRight } from 'react-icons/fa'
  import { formatPrice } from '../PriceTag'
  import { useState, useEffect } from 'react'
  import { useMyShoppingCart } from '../../../utils/hooks'

  const OrderSummaryItem = (props) => {
    const { label, value, children } = props
    return (
      <Flex justify="space-between" fontSize="sm">
        <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
          {label}
        </Text>
        {value ? <Text fontWeight="medium">{value}</Text> : children}
      </Flex>
    )
  }
  
  export const CartOrderSummary = () => {
    const { totalPrice } = useMyShoppingCart()
    return (
      <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
        <Heading size="md">Resumé de la commande</Heading>
  
        <Stack spacing="6">
          <OrderSummaryItem label="Sous-total" value={`${totalPrice} €`} />
          <OrderSummaryItem label="Livraison + Taxe">
            <Link href="#" textDecor="underline">
              Calculer les frais de livraisons
            </Link>
          </OrderSummaryItem>
          <OrderSummaryItem label="Code promo">
            <Link href="#" textDecor="underline">
              Ajouter un code promo
            </Link>
          </OrderSummaryItem>
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Total
            </Text>
            <Text fontSize="xl" fontWeight="extrabold">
              {totalPrice} €
            </Text>
          </Flex>
        </Stack>
        <Button colorScheme="teal" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
          Valider
        </Button>
      </Stack>
    )
  }