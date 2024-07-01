import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Grid, CardHeader, Stepper, Step, StepLabel, Stack } from '@mui/material';
import { styled } from '@mui/system';
import { convertToThaiTime } from './../util/convertTime';
import { useNavigate } from 'react-router-dom';
import BuildIcon from '@mui/icons-material/Build';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

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

const getActiveStep = (item) => {
  const FactoryHead_choice = parseInt(item.FactoryHead_choice);
  const DeptManager_choice = parseInt(item.DeptManager_choice);
  const DivManager_choice = parseInt(item.DivManager_choice);

  if (FactoryHead_choice === 1 && DeptManager_choice === 0 && DivManager_choice === 0) {
    return 0;
  } else if (FactoryHead_choice === 1 && DeptManager_choice === 1 && DivManager_choice === 0) {
    return 1;
  } else if (FactoryHead_choice === 1 && DeptManager_choice === 1 && DivManager_choice === 1) {
    return 2;
  } else {
    return -1; // Default value if no conditions match
  }
};

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient(330deg, rgba(24,196,0,1) 0%, rgba(36,255,40,1) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient(330deg, rgba(24,196,0,1) 0%, rgba(36,255,40,1) 100%)',
  }),
}));

const ColorlibStepIcon = (props) => {
  const { active, completed, className } = props;

  const icons = {
    1: <BuildIcon />,
    2: <VerifiedUserIcon />,
    3: <VerifiedUserIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
};

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
};

const AuditResultList = ({ data }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleCardClick = (auditResultId) => {
    navigate(`/AuditResult/${auditResultId}`); // Update the navigation path
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
              subheader={<Typography variant="body1">{item.VERIFY_STATUS} - {item.QUESTION_TEXT}</Typography>}
            />
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                วันที่: {item ? convertToThaiTime(item.UPDATE_DATE) : '-'}
                <br />
                Verify โดย: {item.CREATE_BY_USER_NAME}
              </Typography>
              <Stack spacing={2} sx={{ marginTop: '20px' }}>
                <Stepper activeStep={getActiveStep(item)} alternativeLabel connector={null}>
                  <Step>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>ดำเนินการแก้ไข</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>ตรวจผลการแก้ไข</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>ยืนยันการแก้ไข</StepLabel>
                  </Step>
                </Stepper>
              </Stack>
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
