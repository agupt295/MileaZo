import React from 'react'
import { Button } from '@mui/material'

function ButtonCopy({color, onClick, size, variant, children, style}) {
  return (
      <Button color={color} onClick = {onClick} size={size} variant={variant} style={style}> {children} </Button>
  )
}

export default ButtonCopy
