// FormTable.jsx
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { MenuItem, Paper, Select, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { HandleColorStatus } from '../util/colorStatus';
import PostForm from '../services/Api/Post/PostForm';
import { useLocation } from 'react-router-dom';
import { getPlantNo } from '../services/Storage/PlantService';
import SuccessSnackbar from '../components/Alert/successAlert';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#00BBF2',
    color: theme.palette.common.white,
    fontSize: 20,
    borderBottom: '2px solid white',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
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

function FormTable({ data, userId }) {
  const location = useLocation();
  const { GroupId } = location.state;
  const initialSelectedScores = data.reduce((acc, row) => ({
    ...acc,
    [row.QUESTION_ID]: row.CHOICE.length > 0 ? row.CHOICE[0].score : ''
  }), {});

  const [selectedScores, setSelectedScores] = useState(initialSelectedScores);
  const [successOpen, setSuccessOpen] = useState(false); // State for success message visibility

  const handleSelectChange = (questionId, score) => {
    setSelectedScores(prevScores => ({
      ...prevScores,
      [questionId]: score
    }));
  };

  const handleSubmit = async () => {
    const scores = data.map(row => {
      const selectedChoice = row.CHOICE.find(choice => choice.score === selectedScores[row.QUESTION_ID]);
      return {
        audit_group_id: GroupId,
        question_id: row.QUESTION_ID,
        plant_no: getPlantNo(),
        choice_no: selectedChoice.no,
        choice_results: selectedChoice.description,
        k_score: selectedChoice.score,
        create_by_user_id: userId
      };
    });

    try {
      const response = await PostForm.postScores(scores);
      console.log('Form submitted successfully:', response);
      setSuccessOpen(true); // Set success message visibility to true after successful form submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: 20 }}>
        Submit
      </Button>
      <SuccessSnackbar open={successOpen} handleClose={() => setSuccessOpen(false)} /> {/* Render success message */}
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
  auditGroupId: PropTypes.any.isRequired,
  plantNo: PropTypes.string.isRequired,
  userId: PropTypes.any.isRequired,
};

export default FormTable;
