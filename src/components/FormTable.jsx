import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { MenuItem, Paper, Select } from '@mui/material';
import { PropTypes } from 'prop-types';
import { HandleColorStatus } from '../util/colorStatus';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#00BBF2',
      color: theme.palette.common.white,
      fontSize: 20,
      borderBottom: '2px solid white', // Add border at the bottom of header cells
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      borderBottom: '1px solid rgba(224, 224, 224, 1)', // Add border at the bottom of body cells
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

function FormTable({ data }) {
  // Create state to track each row's selected score
  const initialSelectedScores = data.reduce((acc, row) => ({
    ...acc,
    [row.QUESTION_ID]: row.CHOICE.length > 0 ? row.CHOICE[0].score : '' 
  }), {});

  const [selectedScores, setSelectedScores] = useState(initialSelectedScores);

  const handleSelectChange = (questionId, score) => {
    setSelectedScores(prevScores => ({
      ...prevScores,
      [questionId]: score
    }));
  };
  


  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
      <TableContainer component={Paper} sx={{ borderRadius: 5 }}>
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
                    value={selectedScores[row.QUESTION_ID]}
                    onChange={(event) => handleSelectChange(row.QUESTION_ID, event.target.value)}
                    sx={{
                      width: 230,
                      borderRadius: 5,
                      textAlign: "center",
                      backgroundColor: HandleColorStatus(selectedScores[row.QUESTION_ID]),
                      border: "none",
                      color: "white"
                    }}
                  >
                    {row.CHOICE.map((choice) => (
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
  );
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

export default FormTable;
