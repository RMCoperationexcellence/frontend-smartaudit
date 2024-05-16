// FormTable.jsx
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { MenuItem, Paper, Select, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { HandleColorStatus } from '../util/colorStatus';
import PostForm from '../services/Api/Post/PostForm';
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

function FormTable({ question, result, auditGroupId, plantNo, userId }) {
  const initialSelectedScores = {};
  useEffect(() => {
    if (result && result.length > 0) {
      const scores = {};
      result.forEach((res) => {
        scores[res.QUESTION_ID] = res.K_SCORE;
      });
      setSelectedScores(scores);
    }
  }, [result]);

  const [selectedScores, setSelectedScores] = useState(initialSelectedScores);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSelectChange = (questionId, score) => {
    setSelectedScores((prevScores) => ({
      ...prevScores,
      [questionId]: score,
    }));
    console.log(selectedScores);
  };

  const handleSubmit = async () => {
    const scores = question.map((row) => {
      const selectedChoice = row.CHOICE.find((choice) => choice.score === selectedScores[row.QUESTION_ID]);
      return {
        audit_group_id: auditGroupId,
        question_id: row.QUESTION_ID,
        plant_no: plantNo,
        choice_no: selectedChoice ? selectedChoice.no : null,
        choice_results: selectedChoice ? selectedChoice.description : null,
        k_score: selectedChoice ? selectedChoice.score : null,
        create_by_user_id: userId,
      };
    });

    try {
      const response = await PostForm.postScores(scores);
      console.log('Form submitted successfully:', response);
      setSuccessOpen(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const maxScore = question.reduce((max, q) => {
    const maxChoiceScore = Math.max(...q.CHOICE.map(choice => choice.score));
    return max + q.K_SCORE * maxChoiceScore;
  }, 0);

  const actualScore = Object.values(selectedScores).reduce((a, b) => a + b, 0)*2

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div id='acutalBox' className='menuBox' style={{position: 'fixed', top: 45, left: 0, width: '100%', zIndex: 999 , display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
      <Typography variant='h6'>จำนวนข้อที่ทำ : {Object.values(selectedScores).filter(score => score !== null).length} / {question.length} </Typography>
      <Typography variant='h6'>คะแนนที่ได้ : {actualScore} / {maxScore} </Typography>
      </div>
      <TableContainer component={Paper} sx={{borderRadius: 5, marginTop: '50px', width: '100%'}}>
        <Table sx={{
          width: '100%',
          borderRadius: 5,
          }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">รายการ</StyledTableCell>
              <StyledTableCell align="center">ผล Verify</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {question.map((row) => (
              <StyledTableRow key={row.QUESTION_ID}>
                <StyledTableCell component="th" scope="row">
                  {row.QUESTION_TEXT}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Select
                    value={selectedScores[row.QUESTION_ID] || ''}
                    onChange={(event) => handleSelectChange(row.QUESTION_ID, event.target.value)}
                    sx={{
                      width: 150,
                      borderRadius: 5,
                      textAlign: 'center',
                      backgroundColor: HandleColorStatus(selectedScores[row.QUESTION_ID]),
                      border: 'none',
                      color: 'white',
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
      <SuccessSnackbar open={successOpen} handleClose={() => setSuccessOpen(false)} />
    </div>
  );
}

FormTable.propTypes = {
  question: PropTypes.arrayOf(
    PropTypes.shape({
      QUESTION_ID: PropTypes.any.isRequired,
      QUESTION_TEXT: PropTypes.string.isRequired,
      CHOICE: PropTypes.arrayOf(
        PropTypes.shape({
          no: PropTypes.any.isRequired,
          score: PropTypes.any.isRequired,
          description: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  auditGroupId: PropTypes.any.isRequired,
  plantNo: PropTypes.string.isRequired,
  userId: PropTypes.any.isRequired,
  result: PropTypes.array,
};

export default FormTable;
