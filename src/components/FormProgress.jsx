import { Typography } from "@mui/material";
function FormProgress() {
  return (
<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "50px" }}>
      <div className="menuBox blueBox" onClick={() => navigate('/auditresult')}>
        <Typography variant='h6'>ผล Verify / Linewalk</Typography>
      </div>
    </div>
  )
}

export default FormProgress