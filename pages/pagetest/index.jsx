import { Button, Input, useColorMode } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Pagetest() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <div>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </div>
  )
}
