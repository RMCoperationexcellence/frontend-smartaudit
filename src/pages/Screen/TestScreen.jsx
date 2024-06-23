import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function createData(col1, col2, col3, col4, col5, col6) {
    return { col1, col2, col3, col4, col5, col6 };
}

const rows = [
    createData('Row1Col1', 'Row1Col2', 'Row1Col3', 'Row1Col4', 'Row1Col5', 'Row1Col6'),
    createData('Row2Col1', 'Row2Col2', 'Row2Col3', 'Row2Col4', 'Row2Col5', 'Row2Col6'),
    createData('Row3Col1', 'Row3Col2', 'Row3Col3', 'Row3Col4', 'Row3Col5', 'Row3Col6'),
    createData('Row4Col1', 'Row4Col2', 'Row4Col3', 'Row4Col4', 'Row4Col5', 'Row4Col6'),
    createData('Row5Col1', 'Row5Col2', 'Row5Col3', 'Row5Col4', 'Row5Col5', 'Row5Col6'),
    createData('Row6Col1', 'Row6Col2', 'Row6Col3', 'Row6Col4', 'Row6Col5', 'Row6Col6'),
    createData('Row7Col1', 'Row7Col2', 'Row7Col3', 'Row7Col4', 'Row7Col5', 'Row7Col6'),
    createData('Row8Col1', 'Row8Col2', 'Row8Col3', 'Row8Col4', 'Row8Col5', 'Row8Col6'),
];

function TestScreen() {
    return (
        <MainLayout>
            <TableContainer component={Paper} sx={{ width: '100%' }}>
                <Table sx={{ width: '100%', height: '500' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Column 1</TableCell>
                            <TableCell>Column 2</TableCell>
                            <TableCell>Column 3</TableCell>
                            <TableCell>Column 4</TableCell>
                            <TableCell>Column 5</TableCell>
                            <TableCell>Column 6</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{row.col1}</TableCell>
                                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{row.col2}</TableCell>
                                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{row.col3}</TableCell>
                                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{row.col4}</TableCell>
                                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{row.col5}</TableCell>
                                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{row.col6}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainLayout>
    );
}

export default TestScreen;
