import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { MenuItem, Paper, Select } from '@mui/material';
import { PropTypes } from 'prop-types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


function FormTable({data}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
<TableContainer component={Paper} sx={{ borderRadius: 5}}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">รายการ</StyledTableCell>
            <StyledTableCell align="center">ผล Verify</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.QUESTION_ID}>
              <StyledTableCell component="th" scope="row">
                {row.QUESTION_TEXT}
              </StyledTableCell>
              <StyledTableCell align="center">
              <Select
                    defaultValue=""
                    label=""
                    onChange={(event) => {
                      console.log("Selected value:", event.target.value);
                    }}
                    sx={{ width: 230 }}
                  >
                    {row.CHOICE && row.CHOICE.map((choice) => (
                      <MenuItem key={choice.no} value={choice.score}>
                        {choice.description}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  )
}
FormTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    QUESTION_ID: PropTypes.any.isRequired,
    QUESTION_TEXT: PropTypes.string.isRequired,
    CHOICE: PropTypes.arrayOf(PropTypes.shape({
      no: PropTypes.any.isRequired,
      score: PropTypes.any.isRequired,
      description: PropTypes.string.isRequired,
    }))
  })).isRequired,
};

export default FormTable