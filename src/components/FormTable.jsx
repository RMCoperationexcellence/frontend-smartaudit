import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  MenuItem,
  Paper,
  Select,
  Button,
  Typography,
  LinearProgress,
  Box,
  Chip,
} from "@mui/material";
import PropTypes from "prop-types";
import { HandleColorStatus } from "../util/colorStatus";
import {PostForm} from "../services/Api/Post/PostForm";
import SuccessSnackbar from "../components/Alert/successAlert";

const StyledTableCell = styled(TableCell)(({ theme, isMust }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#00BBF2",
    color: theme.palette.common.white,
    fontSize: 20,
    borderBottom: "2px solid white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    color: isMust === 1 ? "red" : "black", // Conditional color based on isMust
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#E7F4F2",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function FormTable({ question, result, auditGroupId, plantNo, userId }) {
  const [selectedScores, setSelectedScores] = useState({});
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    if (result && result.length > 0) {
      const scores = {};
      result.forEach((res) => {
        if (res.K_SCORE !== null) {
          scores[res.QUESTION_ID] = parseInt(res.K_SCORE);
        }
      });
      setSelectedScores(scores);
    }
  }, [result]);

  const handleSelectChange = (questionId, score) => {
    setSelectedScores((prevScores) => ({
      ...prevScores,
      [questionId]: score,
    }));
    console.log("Selected Score", selectedScores);
  };

  const handleSubmit = async () => {
    const scores = question.map(({ CHOICE, QUESTION_ID, isMust }) => {
      const choices = JSON.parse(CHOICE);
      const selectedChoice = choices.find(
        (choice) => choice.score === selectedScores[QUESTION_ID]
      );
      let isFinished = selectedChoice
        ? selectedChoice.score > 1
          ? 1
          : 0
        : null;
      isFinished = isMust === 1 && isFinished > 3 ? 0 : isFinished;
      const k_score = selectedChoice ? selectedChoice.score : null;
      return {
        audit_group_id: auditGroupId,
        question_id: QUESTION_ID,
        plant_no: plantNo,
        choice_no: selectedChoice?.no || null,
        choice_results: selectedChoice?.description || null,
        k_score: k_score,
        create_by_user_id: userId,
        isFinished,
      };
    });

    try {
      const response = await PostForm.postScores(scores);
      console.log("Form submitted successfully:", response);
      setSuccessOpen(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const maxScore = question.reduce((max, q) => {
    const choices = JSON.parse(q.CHOICE);
    const maxChoiceScore = Math.max(...choices.map((choice) => choice.score));
    return max + q.K_SCORE * maxChoiceScore;
  }, 0);

  const actualScore = question.reduce((totalScore, q) => {
    const selectedScore = selectedScores[q.QUESTION_ID];
    if (selectedScore !== undefined) {
      const choices = JSON.parse(q.CHOICE);
      const selectedChoice = choices.find(
        (choice) => choice.score === selectedScore
      );
      if (selectedChoice) {
        return totalScore + q.K_SCORE * selectedChoice.score;
      }
    }
    return totalScore;
  }, 0);

  const answeredQuestions = Object.values(selectedScores).filter(
    (score) => score !== null
  ).length;
  const totalQuestions = question.length;
  // const progress = (answeredQuestions / totalQuestions) * 100;
  const scorePercentage = (actualScore / maxScore) * 100;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        className="actualBox"
        style={{
          position: "fixed",
          top: 3,
          left: 0,
          width: "100%",
          zIndex: 999,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "right",
          flexDirection: "column",
          backgroundColor: "rgba(255, 255, 255, 1)",
        }}
      >
        <Typography variant="h6">
          คะแนนที่ได้ : {actualScore} / {maxScore}
          <Chip
            label={`(${scorePercentage.toFixed(0)}%)`}
            style={{
              color: scorePercentage < 75 ? "white" : "white",
              backgroundColor: scorePercentage < 75 ? "red" : "green",
              margin: "3px",
            }}
            variant="outlined"
          />
        </Typography>
      </div>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 5, marginTop: "15px", width: "100%" }}
      >
        <Table
          sx={{
            width: "100%",
            borderRadius: 5,
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">รายการ</StyledTableCell>
              <StyledTableCell align="center">ผล Verify</StyledTableCell>
              {/* <StyledTableCell align="center">คะแนน</StyledTableCell>{" "} */}
              {/* New column for score */}
            </TableRow>
          </TableHead>

          <TableBody>
            {question.map((row) => {
              const choices = JSON.parse(row.CHOICE);
              return (
                <StyledTableRow key={row.QUESTION_ID}>
                  <StyledTableCell align="center" isMust={row.isMust}>
                    {row.QUESTION_TEXT}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Select
                      value={selectedScores[row.QUESTION_ID] ?? ""}
                      onChange={(event) =>
                        handleSelectChange(row.QUESTION_ID, event.target.value)
                      }
                      sx={{
                        width: 150,
                        borderRadius: 5,
                        textAlign: "center",
                        backgroundColor: HandleColorStatus(
                          selectedScores[row.QUESTION_ID]
                        ),
                        border: "none",
                        color: "white",
                      }}
                    >
                      {choices.map((choice) => (
                        <MenuItem key={choice.no} value={choice.score}>
                          {choice.description}
                        </MenuItem>
                      ))}
                    </Select>
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">
                    {selectedScores[row.QUESTION_ID] !== undefined
                      ? selectedScores[row.QUESTION_ID] * 2
                      : "-"}
                  </StyledTableCell> */}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: 20 }}
      >
        บันทึกข้อมูล
      </Button>
      <SuccessSnackbar
        open={successOpen}
        handleClose={() => setSuccessOpen(false)}
      />
    </div>
  );
}

FormTable.propTypes = {
  question: PropTypes.arrayOf(
    PropTypes.shape({
      QUESTION_ID: PropTypes.any.isRequired,
      QUESTION_TEXT: PropTypes.string.isRequired,
      CHOICE: PropTypes.string.isRequired,
      K_SCORE: PropTypes.number.isRequired,
      isMust: PropTypes.number.isRequired,
    })
  ).isRequired,
  auditGroupId: PropTypes.any.isRequired,
  plantNo: PropTypes.string.isRequired,
  userId: PropTypes.any.isRequired,
  result: PropTypes.array,
};

export default FormTable;
