import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function LoadingCircle() {
  return (
    <Box
    sx={{
      position: 'fixed', // ใช้ fixed แทน absolute เพื่อให้อยู่กับตำแหน่งแม้เลื่อนหน้าจอ
      top: 0,
      left: 0,
      width: '100%', // ขยายกว้างเต็มหน้าจอ
      height: '100%', // ขยายสูงเต็มหน้าจอ
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // พื้นหลังสีดำทึบแสงเล็กน้อย
      zIndex: 1500 // ให้อยู่ทับเนื้อหาอื่น
    }}
  >
    <CircularProgress />
  </Box>
  );
}

export default LoadingCircle;
