import { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";
import MainLayout from "../../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { getAuditForm, getAuditGroup } from "../../../services/Api/GetAuditForm";
import { getPlantNo } from "../../../services/Storage/PlantService";
import { convertToThaiTime } from "../../../util/convertTime";

function AuditFormScreen() {
  const navigate = useNavigate(); // Create an instance of useNavigate

  useEffect(() => {
    const fetchAuditGroup = async () => {
      try {
        const data = await getAuditGroup();
        setAuditFormGroup(data);
      } catch (error) {
        console.error('Failed to fetch audit form:', error);
        setError(true);
      }
    };

    const fetchAuditFormData = async () => {
      try {
        const plantNo = await getPlantNo();
        const data = await getAuditForm(plantNo);
        setAuditFormData(data);
      } catch (error) {
        console.error('Failed to fetch audit form:', error);
        setError(true);
      }
    };
    fetchAuditGroup();
    fetchAuditFormData();
  }, []);

  const [auditFormGroup, setAuditFormGroup] = useState(null);
  const [auditFormData, setAuditFormData] = useState(null);
  const [error, setError] = useState(false);

  const memoizedAuditFormData = useMemo(() => {
    return auditFormGroup?.map((item, index) => (
      <div key={index} className="menuGroupBox blueBox" onClick={() => navigate(`/auditform/${item.AUDIT_GROUP_ID}`,{ state: { name: item.NAME, GroupId: item.AUDIT_GROUP_ID } })}>
        <Typography variant="h5" sx={{ marginBottom: "10px", textAlign: "center", marginTop: "20px" }}>{item.NAME}</Typography>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "10px", marginLeft: "10px", marginRight: "10px" }}>
          <div style={{ textAlign: "left", display: "flex", flexDirection: "column" }}>
            <Typography variant="h8">Verify ล่าสุด :</Typography>
            <Typography variant="h8">{convertToThaiTime(item.UPDATE_DATE)}</Typography>
          </div>
          <div style={{ textAlign: "left", display: "flex", flexDirection: "column" }}>
            <Typography variant="h8">Verify โดย :</Typography>
            <Typography variant="h8">{item.CREATE_BY_USER_ID}</Typography>
          </div>
        </div>
      </div>
    ));
  }, [auditFormGroup, navigate]);

  return (
    <MainLayout>
      {error && <Typography variant="h6">Failed to fetch audit form data.</Typography>}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "50px" }}>
        {memoizedAuditFormData}
      </div>
    </MainLayout>
  );
}

export default AuditFormScreen;
