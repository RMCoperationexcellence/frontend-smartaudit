import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import ChoiceLayout from "../../../layouts/ChoiceLayout";
import FormTable from "../../../components/FormTable";
import { getAuditQuestion, getAuditQuestionResult } from "../../../services/Api/Get/GetAuditForm";
import { getUser } from "../../../services/Storage/UserService";
import { getPlantNo } from "../../../services/Storage/PlantService";

function AuditChoiceScreen() {
  const { state: { GroupId } } = useLocation();
  const [auditData, setAuditData] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(true);
  const plantNo = getPlantNo();

  useEffect(() => {
    async function fetchData() {
      try {
        const [auditQuestions, auditResults] = await Promise.all([
          getAuditQuestion(GroupId),
          getAuditQuestionResult(GroupId, plantNo),
        ]);
        setAuditData(auditQuestions);
        setResultData(auditResults);
        console.log("from Questions", auditQuestions);
        console.log("from Results", auditResults);
      } catch (error) {
        console.error("Error fetching audit data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [GroupId, plantNo]);

  const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const loadingContainerStyle = { ...centerStyle};
  const contentContainerStyle = { ...centerStyle, flexDirection: "column", marginTop: "30px" };

  return (
    <ChoiceLayout>
      {loading ? (
        <div style={loadingContainerStyle}>
          <CircularProgress />
        </div>
      ) : (
        <div style={contentContainerStyle}>
          <FormTable
            question={auditData}
            result={resultData}
            auditGroupId={GroupId}
            plantNo={plantNo}
            userId={getUser()}
          />
        </div>
      )}
    </ChoiceLayout>
  );
}

export default AuditChoiceScreen;
