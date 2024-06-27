import { useEffect, useState } from "react";
import AuditResultTable from "../../../components/AuditResultTable";
import MainLayout from "../../../layouts/MainLayout";
import { getPlantName, getPlantNo } from "../../../services/Storage/PlantService";
import { getAuditResult } from "../../../services/Api/Get/GetResults";
import AuditResultList from "../../../components/AuditResultList";

function AuditResultScreen() {
  const [auditData, setAuditData] = useState([]);
  const [loading, setLoading] = useState(true);

  const PlantNo = getPlantNo();
  const PlantName = getPlantName();

  useEffect(() => {
    async function fetchData() {
      try {
        const auditResults = await getAuditResult(PlantNo);
        setAuditData(auditResults);
        console.log("from Results", auditResults);
      } catch (error) {
        console.error("Error fetching audit data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [PlantNo]);

  const AbnormalData = auditData.filter(item => item.isFinished === 0);

  return (
    <MainLayout>
      <div className="centerContent">
        <h3> โรงงาน : {PlantName} / {PlantNo}</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <AuditResultTable auditData={AbnormalData} />
        )}
        <AuditResultList data={AbnormalData} />
      </div>
    </MainLayout>
  );
}

export default AuditResultScreen;
