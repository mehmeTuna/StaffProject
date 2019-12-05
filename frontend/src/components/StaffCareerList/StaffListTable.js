import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'name', label: 'Experience Identifier', minWidth: 100 },
  { id: 'code', label: 'Begin Time', minWidth: 100 },
  { id: 'code2', label: 'End Time', minWidth: 100 },
  { id: 'code3', label: 'Adjust Time', minWidth: 100 },
  { id: 'code4', label: 'Periode', minWidth: 100 },
  { id: 'code5', label: 'Factor', minWidth: 100 },
  { id: 'code6', label: 'Pay(TL)', minWidth: 100 },
  { id: 'code7', label: 'Total Time', minWidth: 100 },
  { id: 'code8', label: 'Work Class', minWidth: 100 },
  { id: 'code9', label: 'Ended ', minWidth: 100 },
];

function createData(name, code, code2, code3, code4, code5, code6, code7, code8, code9) {
  return {name, code, code2, code3, code4, code5, code6, code7, code8, code9 };
}

const rows = [
  createData('Boss: Founder', '25:10:2019 19:47:44','-','25:10:2019 19:47:44', '1','week','500','0','Free-Time','no')
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 440,
    marginTop: 25,
    overflow: 'auto',
  },
});

export default function StaffListTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        { value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
