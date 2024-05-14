import { useNavigate } from 'react-router-dom';
import MainLayout from "../../layouts/MainLayout";
import { Typography } from '@mui/material';

function AuditMenu() {
  const navigate = useNavigate();
  return (
    <MainLayout>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "50px" }}>
      <div className="menuBox blueBox" onClick={() => navigate('/factoryactual')}>
        <Typography variant='h6'>ผลปฏิบัติงานในโรงงาน</Typography>
      </div>
      <div className="menuBox blueBox" onClick={() => navigate('/auditform')}>
      <Typography  variant='h6'>แบบฟอร์ม Verify / Linewalk</Typography>
      </div>
      <div className="menuBox blueBox" onClick={() => navigate('/auditresult')}>
        <Typography variant='h6'>ผล Verify / Linewalk</Typography>
      </div>
    </div>
    </MainLayout>
  );
}

export default AuditMenu;
