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

const columns = [
    { audit_group_id: 'name', label: 'หัวข้อ' },
    ...getDatesArray(7).map(date => ({ id: date, label: date }))
];

const data = [
    { audit_group_id: 1, name: 'การพัฒนาพนักงาน', '15-05-24': 'A', '16-05-24': 'B', '17-05-24': 'C', '18-05-24': 'A', '19-05-24': 'B', '20-05-24': 'C', '21-05-24': 'A' },
    { audit_group_id: 2, name: 'การผลิต', '15-05-24': 'A', '16-05-24': 'B', '17-05-24': 'C', '18-05-24': 'A', '19-05-24': 'B', '20-05-24': 'C', '21-05-24': 'A' },
    { audit_group_id: 3, name: 'การควบคุมคุณภาพ', '15-05-24': 'A', '16-05-24': 'B', '17-05-24': 'C', '18-05-24': 'A', '19-05-24': 'B', '20-05-24': 'C', '21-05-24': 'A' },
    { audit_group_id: 4, name: 'การบำรุงรักษาเครื่องจักร', '15-05-24': 'A', '16-05-24': 'B', '17-05-24': 'C', '18-05-24': 'A', '19-05-24': 'B', '20-05-24': 'C', '21-05-24': 'A' },
    { audit_group_id: 5, name: 'ความปลอดภัย', '15-05-24': 'A', '16-05-24': 'B', '17-05-24': 'C', '18-05-24': 'A', '19-05-24': 'B', '20-05-24': 'C', '21-05-24': 'A' },
    { audit_group_id: 6, name: 'สิ่งแวดล้อม', '15-05-24': 'A', '16-05-24': 'B', '17-05-24': 'C', '18-05-24': 'A', '19-05-24': 'B', '20-05-24': 'C', '21-05-24': 'A' }
];

export default function AuditResultTable(result) {
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
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
    {data.map((row) => (
        <TableRow key={row.audit_group_id}>
            {columns.map((column, index) => (
                <TableCell
                    key={`${row.audit_group_id}-${column.id || index}`} 
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
                    {row[column.id] || row[column.audit_group_id]} 
                </TableCell>
            ))}
        </TableRow>
    ))}
</TableBody>

            </Table>
        </TableContainer>
    );
}
