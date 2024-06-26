import { useEffect, useState } from "react";
import AuditResultTable from "../../../components/AuditResultTable";
import MainLayout from "../../../layouts/MainLayout";
import { getPlantName, getPlantNo } from "../../../services/Storage/PlantService";
import { getAuditResult } from "../../../services/Api/Get/GetResults";
import AuditResultList from "../../../components/AuditResultList";
import { getAuditGroup } from "../../../services/Api/Get/GetAuditForm";

function AuditResultScreen() {
  const [auditData, setAuditData] = useState([]);
  const [auditGroupData, setAuditGroupData] = useState([]);
  const [loading, setLoading] = useState(true);

  const PlantNo = getPlantNo();
  const PlantName = getPlantName();

  useEffect(() => {
    async function fetchData() {
      try {
        const [auditResults, auditGroups] = await Promise.all([
          getAuditResult(PlantNo),
          getAuditGroup(PlantNo)
        ]);
        setAuditData(auditResults);
        setAuditGroupData(auditGroups);
        console.log("from Results", auditResults);
        console.table(auditResults)
        console.log("from Groups", auditGroups);
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
          <AuditResultTable auditData={auditData} auditGroupData={auditGroupData} />
        )}
        <AuditResultList data={AbnormalData} />
      </div>
    </MainLayout>
  );
}

export default AuditResultScreen;
