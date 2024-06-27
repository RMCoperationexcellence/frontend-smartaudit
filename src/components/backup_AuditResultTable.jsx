import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { subDays, format } from 'date-fns';


const getDatesArray = (daysCount) => {
    const dates = [];
    const currentDate = new Date();
    for (let i = daysCount - 1; i >= 0; i--) {
        dates.push(format(subDays(currentDate, i), 'dd-MM-yy'));
    }
    return dates;
};

const dates = getDatesArray(7);

export default function AuditauditDataTable({ auditData }) {
    if (!auditData || auditData.length === 0) {
        return <p>No data available.</p>;
    }

    const columns = Object.keys(auditData[0]); // Assuming all objects in auditData have the same structure

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: '650px' }}>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell
                                key={index}
                                style={{
                                    minWidth: '80px',
                                    minHeight: '60px',
                                    position: (index === 0 || index === columns.length - 1) ? 'sticky' : 'static',
                                    left: index === 0 ? 0 : 'auto',
                                    right: index === columns.length - 1 ? 0 : 'auto',
                                    backgroundColor: (index === 0 || index === columns.length - 1) ? '#f0f0f0' : 'inherit',
                                    zIndex: (index === 0 || index === columns.length - 1) ? 1 : 'auto',
                                }}
                            >
                                {column}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {auditData.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <TableCell
                                    key={`${rowIndex}-${colIndex}`}
                                    style={{
                                        minWidth: '80px',
                                        minHeight: '60px',
                                        position: (colIndex === 0 || colIndex === columns.length - 1) ? 'sticky' : 'static',
                                        left: colIndex === 0 ? 0 : 'auto',
                                        right: colIndex === columns.length - 1 ? 0 : 'auto',
                                        backgroundColor: (colIndex === 0 || colIndex === columns.length - 1) ? '#f0f0f0' : 'inherit',
                                        zIndex: (colIndex === 0 || colIndex === columns.length - 1) ? 1 : 'auto',
                                    }}
                                >
                                    {row[column]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
