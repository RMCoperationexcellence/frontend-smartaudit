// successAlert.jsx
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Proptype from 'prop-types';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SuccessSnackbar({ open, handleClose }) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="danger" sx={{ width: '100%' }}>
        ไม่สามารถบันทึกข้อมูลได้
      </Alert>
    </Snackbar>
  );
}

SuccessSnackbar.propTypes = {
  open: Proptype.bool.isRequired,
  handleClose: Proptype.func.isRequired,
}

export default SuccessSnackbar;
