import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const data = [
    { id: 1, name: 'การพัฒนาพนักงาน', age: 28, city: 'New York' },
    { id: 2, name: 'การผลิต', age: 22, city: 'San Francisco' },
    { id: 3, name: 'การควบคุมคุณภาพ', age: 35, city: 'Chicago' },
    { id: 4, name: 'การบำรุงรักษาเครื่องจักร', age: 35, city: 'Chicago' },
    { id: 5, name: 'ความปลอดภัย', age: 35, city: 'Chicago' },
    { id: 6, name: 'สิ่งแวดล้อม', age: 35, city: 'Chicago' },
];

const columns = [
    { id: '1', label: 'หัวข้อ' },
    { id: '2', label: '19-05-24' },
    { id: '3', label: '19-05-24' },
    { id: '4', label: '19-05-24' },
    { id: '5', label: '19-05-24' },
    { id: '6', label: '19-05-24' },
    { id: '7', label: '19-05-24' },
    { id: '8', label: '19-05-24' },
];

export default function AuditResultTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: '350px' }}>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell
                                key={column.id}
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
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={column.id}
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
                                    {row[column.id]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
