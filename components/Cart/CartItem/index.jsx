import {
  CloseButton,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper
} from '@chakra-ui/react'
import * as React from 'react'
import { PriceTag } from '../PriceTag'
import { CartProductMeta } from '../CartProductMeta'

const QuantitySelect = (props) => {
  return (
    <>
      <NumberInput value={props.value} min={1} max={20} w='50%'>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper onClick={() => props.addQuantity(props.idP)} />
          <NumberDecrementStepper onClick={() => props.reduceQuantity(props.idP)} />
        </NumberInputStepper>
      </NumberInput>
    </>
  )
}

export const CartItem = (props) => {
  const {
    isGiftWrapping,
    id,
    name,
    quantityItem,
    description,
    image,indexItem,
    currency,variante,
    price,
    addQuantity, reduceQuantity,deleteItem,
  } = props
  console.log(indexItem)
  return (
    <Flex
      direction={{
        base: 'column',
        md: 'row',
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={name}
        variante={variante}
        description={description}
        image={variante ? `/Images/shop/${variante.image[0]}` : `/Images/shop/${image[0]}`}
        isGiftWrapping={isGiftWrapping}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: 'none',
          md: 'flex',
        }}
      >
        <QuantitySelect
          value={quantityItem}
          idP={indexItem}
          addQuantity={addQuantity}
          reduceQuantity={reduceQuantity}
        />
        <PriceTag price={price} currency={currency} />
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={() => deleteItem(indexItem)}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: 'flex',
          md: 'none',
        }}
      >
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={() => deleteItem(indexItem)}
        />
        <QuantitySelect
          value={quantityItem}
          idP={indexItem}
          addQuantity={addQuantity}
          reduceQuantity={reduceQuantity}
        />
        <PriceTag price={price} currency={currency} />
      </Flex>
    </Flex>
  )
}
