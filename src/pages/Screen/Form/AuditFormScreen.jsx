import { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";
import MainLayout from "../../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { getAuditGroup, getAuditFormResult } from "../../../services/Api/Get/GetAuditForm";
import { getPlantNo } from "../../../services/Storage/PlantService";
import { convertToThaiTime } from "../../../util/convertTime";

function AuditFormScreen() {
  const navigate = useNavigate();
  const plantNo = getPlantNo();

  const [auditData, setAuditData] = useState({
    group: null,
    form: null,
    error: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupData, formData] = await Promise.all([
          getAuditGroup(),
          getAuditFormResult(plantNo),
        ]);
        setAuditData({ group: groupData, form: formData, error: false });
      } catch (error) {
        console.error('Failed to fetch audit data:', error);
        setAuditData({ ...auditData, error: true });
      }
    };

    fetchData();
  }, [plantNo]);

  const memoizedAuditFormData = useMemo(() => {
    if (!auditData.group || !auditData.form) return null;

    const auditFormDataMap = new Map(auditData.form.map(data => [data.audit_group_id, data]));

    return auditData.group.map((item, index) => {
      const formData = auditFormDataMap.get(item.AUDIT_GROUP_ID);

      return (
        <div key={index} className="menuGroupBox blueBox" onClick={() => navigate(`/auditform/form`,{ state: { name: item.NAME, GroupId: item.AUDIT_GROUP_ID } })}>
          <Typography variant="h5" sx={{ marginBottom: "10px", textAlign: "center", marginTop: "20px" }}>{item.NAME}</Typography>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "10px", marginLeft: "10px", marginRight: "10px" }}>
            <div style={{ textAlign: "left", display: "flex", flexDirection: "column" }}>
              <Typography variant="h8">Verify ล่าสุด :</Typography>
              <Typography variant="h8">{formData ? convertToThaiTime(formData.UPDATE_DATE) : '-'}</Typography>
            </div>
            <div style={{ textAlign: "left", display: "flex", flexDirection: "column" }}>
              <Typography variant="h8">Verify โดย :</Typography>
              <Typography variant="h8">{formData ? formData.CREATE_BY_USER_ID : '-'}</Typography>
            </div>
          </div>
        </div>
      );
    });
  }, [auditData, navigate]);

  return (
    <MainLayout>
      {auditData.error && <Typography variant="h6">Failed to fetch audit form data.</Typography>}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "50px" }}>
        {memoizedAuditFormData}
      </div>
    </MainLayout>
  );
}

export default AuditFormScreen;
