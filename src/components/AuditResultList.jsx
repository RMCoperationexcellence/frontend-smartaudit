// AuditResultList.jsx
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Grid, CardHeader, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { convertToThaiTime } from './../util/convertTime';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
}));

const Circle = styled('span')(({ theme }) => ({
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.main,
  marginRight: theme.spacing(1)
}));

const Label = styled(Typography)({
  fontSize: '0.75rem',
  textAlign: 'center',
  marginTop: theme => theme.spacing(0.5),
});

const calculateProgressValue = (item) => {
  const FactoryHead_choice = parseInt(item.FactoryHead_choice);
  const DeptManager_choice = parseInt(item.DeptManager_choice);
  const DivManager_choice = parseInt(item.DivManager_choice);

  if (FactoryHead_choice === 0 && DeptManager_choice === 0 && DivManager_choice === 0) {
    return 0;
  } else if (FactoryHead_choice === 1 && DeptManager_choice === 1 && DivManager_choice === 0) {
    return 50;
  } else if (FactoryHead_choice === 1 && DeptManager_choice === 1 && DivManager_choice === 1) {
    return 100;
  } else {
    return 0; // Default value if no conditions match
  }
};

const AuditResultList = ({ data }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleCardClick = (auditResultId) => {
    navigate(`/AuditResultDetail/${auditResultId}`); // Update the navigation path
  };

  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{ height: '100%', margin: '20px', cursor: 'pointer' }}
            onClick={() => handleCardClick(item.AUDIT_RESULT_ID)} // Add onClick handler
          >
            <CardHeader
              sx={{
                backgroundColor: item.isFinished ? 'green' : '#BD0000',
                color: 'white'
              }}
              title={<Typography variant="h5">{item.NAME}</Typography>}
              subheader={<Typography variant="body1">{item.QUESTION_TEXT}</Typography>}
            />
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                สถานะ: {item.VERIFY_STATUS}
                <br />
                วันที่: {item ? convertToThaiTime(item.UPDATE_DATE) : '-'}
                <br />
                โรงงาน: {item.PLANT_NO}
                <br />
                Verify โดย: {item.CREATE_BY_USER_NAME}
              </Typography>
              <StyledLinearProgress variant="determinate" value={calculateProgressValue(item)} color='success' />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <div style={{ textAlign: 'center' }}>
                  <Circle />
                  <Label>ดำเนินการแก้ไข</Label>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Circle />
                  <Label>ตรวจผลการแก้ไข</Label>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Circle />
                  <Label>แก้ไขเรียบร้อย</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

AuditResultList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      AUDIT_RESULT_ID: PropTypes.string.isRequired,
      NAME: PropTypes.string.isRequired,
      QUESTION_TEXT: PropTypes.string.isRequired,
      CHOICE_NO: PropTypes.number,
      CHOICE_RESULTS: PropTypes.string,
      isFinished: PropTypes.number,
      QUESTION_SCORE: PropTypes.number,
      RESULT_SCORE: PropTypes.string,
      FactoryHead_choice: PropTypes.string.isRequired,
      DeptManager_choice: PropTypes.string.isRequired,
      DivManager_choice: PropTypes.string.isRequired,
      PLANT_NO: PropTypes.string.isRequired,
      UPDATE_DATE: PropTypes.string.isRequired,
      VERIFY_STATUS: PropTypes.string,
      CREATE_BY_USER_NAME: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AuditResultList;
