// eslint-disable-next-line no-unused-vars
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import theme from './../theme'

// eslint-disable-next-line no-unused-vars
const CustomButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    color: 'white',
    backgroundColor: theme.colors.primary,
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none'
    }
  }
})(Button)

export default function Btn({ children, ...props }) {
  return (
    <CustomButton {...props} variant="contained" disableRipple>
      {children}
    </CustomButton>
  )
}
