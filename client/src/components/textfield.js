import React from 'react'
import TextField from '@mui/material/TextField'

function Textfield({fullWidth, type, label, disabled, defaultValue, helperText, onChange}) {
  return (
    <div>
      <TextField
        //   error
          onChange={onChange}
          type={type}
          label={label}
          defaultValue={defaultValue}
          helperText={helperText}
          fullWidth={fullWidth}
          disabled={disabled}
        />
    </div>
  )
}

export default Textfield
