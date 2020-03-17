import React from 'react'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})

export default function ChoosingPaymentPlan() {
  const [open, setOpen] = React.useState(props.isState)
  const [maxWidth, setMaxWidth] = React.useState('md')

  const handleClose = () => {
    setOpen(false)
  }

  return <div>Plan</div>
}
