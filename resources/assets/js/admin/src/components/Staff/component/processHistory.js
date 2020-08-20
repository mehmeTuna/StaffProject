import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {
  Box,
  Typography,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table
} from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    border: 1
  }
})

export default function ProcessHistory(props) {
  const classes = useStyles()

  return (
    <Box width="100%">
      <Typography align="center">Entry-Exit Process History</Typography>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.created_at}
                </TableCell>
                <TableCell align="right">{row.pay}₺</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
