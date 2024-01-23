import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

const DataTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  >X</TableCell>
            <TableCell  >Y</TableCell>
            <TableCell  >R</TableCell>
            <TableCell  >Hit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {data.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell  >{row.x}</TableCell>
              <TableCell  >{row.y}</TableCell>
              <TableCell  >{row.r}</TableCell>
              <TableCell  >{row.hit ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
