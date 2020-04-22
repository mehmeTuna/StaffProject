import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: theme.spacing(1),
    lineHeight: 1.5,
    color: 'white',
    margin: theme.spacing(1),
    '&:hover': {
      boxShadow: 'none'
    }
  }
}))

export default function Btn({ children, ...props }) {
  const classes = useStyles()
  return (
    <Button className={classes.root} {...props}>
      {children}
    </Button>
  )
}
