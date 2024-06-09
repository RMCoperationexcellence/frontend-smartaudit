import PropTypes from 'prop-types';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './style.css';

function Box1({ data = [] }) {

    const getEmoji = (value) => (value === 1 ? '🟢' : '🔴');

  return (
    <Paper
      elevation={3}
      sx={{
        width: '500px',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '15px',
      }}
    >
      <Typography variant="h7" sx={{ marginTop: '10px' }}>สถานะการอบรมของพนักงานในโรงงาน</Typography>
      <TableContainer component={Paper}>
      <Table sx={{ margin: '10px', width: '90%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ชื่อ-นามสกุล</TableCell>
            <TableCell align="center">ภาคทฤษฎี</TableCell>
            <TableCell align="center">OJT</TableCell>
            <TableCell align="center">ภาคปฏิบัติ</TableCell>
            <TableCell align="center">Reskill</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.fullname}
              </TableCell>
              <TableCell align="center">{getEmoji(row.EXAM)}</TableCell>
              <TableCell align="center">{getEmoji(row.OJT)}</TableCell>
              <TableCell align="center">{getEmoji(row.PRACTICE)}</TableCell>
              <TableCell align="center">{getEmoji(row.RESKILL)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}

Box1.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      PLANT_NO: PropTypes.string.isRequired,
      users_id: PropTypes.number.isRequired,
      preflix: PropTypes.string.isRequired,
      fullname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      EXAM: PropTypes.number.isRequired,
      OJT: PropTypes.number.isRequired,
      PRACTICE: PropTypes.number.isRequired,
      RESKILL: PropTypes.number.isRequired,
    })  
  ).isRequired
};

export default Box1;
