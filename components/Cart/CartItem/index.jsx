import {
  CloseButton,
  Flex,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { PriceTag } from '../PriceTag'
import { CartProductMeta } from '../CartProductMeta'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

const QuantitySelect = (props) => {
  return (
    <>
      <NumberInput defaultValue={props.value} min={1} max={20}>
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
    isGiftWrapping,id,
    name,
    quantity,description,
    image,
    currency,
    price,addQuantity, reduceQuantity,deleteItem,
  } = props
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
        description={description}
        image={`/Images/shop/${image[0]}`}
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
          value={quantity}
          idP={id}
          addQuantity={addQuantity}
          reduceQuantity={reduceQuantity}
        />
        <PriceTag price={price} currency={currency} />
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={() => deleteItem(id)}
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
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={quantity}
          idP={id}
          addQuantity={addQuantity}
          reduceQuantity={reduceQuantity}
        />
        <PriceTag price={price} currency={currency} />
      </Flex>
    </Flex>
  )
}
