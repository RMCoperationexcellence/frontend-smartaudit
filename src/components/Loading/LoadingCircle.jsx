import CircularProgress from '@mui/material/CircularProgress';

function LoadingCircle() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress color="#01BAF2" />
    </div>
  );
}

export default LoadingCircle;
