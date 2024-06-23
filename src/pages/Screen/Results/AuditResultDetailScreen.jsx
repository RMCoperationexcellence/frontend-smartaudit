import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import MainLayout from "../../../layouts/MainLayout";
import { getAuditResultDetail } from "../../../services/Api/Get/GetResults";

const ActionSection = ({ primaryText, chips, textFieldLabel }) => (
  <ListItem alignItems="flex-start">
    <ListItemText
      primary={
        <Typography variant="h5" component="div" gutterBottom>
          {primaryText}
        </Typography>
      }
      secondary={
        <Box>
          {chips.map((chipText, index) => (
            <Chip key={index} label={chipText} variant="outlined" sx={{ mb: 1, mr: 1 }} />
          ))}
          <TextField
            label={textFieldLabel}
            variant="outlined"
            size="small"
            sx={{ mt: 1, backgroundColor: "white", width: "100%" }}
          />
        </Box>
      }
    />
  </ListItem>
);

function AuditResultDetailScreen() {
  const { auditResultId } = useParams();
  const [auditData, setAuditData] = useState(null); // Adjusted state initialization
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    async function fetchData() {
      try {
        const auditResults = await getAuditResultDetail(auditResultId);
        setAuditData(auditResults);
      } catch (error) {
        console.error("Error fetching audit data:", error);
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [auditResultId]);

  if (loading) {
    return (
      <MainLayout>
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box display="flex" justifyContent="center" mt={4}>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#f0f0f0", borderRadius: 2, p: 2 }}>
          <ActionSection
            primaryText="หัวหน้าโรงงาน / หัวหน้ากลุ่มโรงงาน"
            chips={["รับทราบและดำเนินการแก้ไขแล้ว", "รับทราบแต่รอดำเนินการแก้ไข", "เพิ่มรูปภาพ"]}
            textFieldLabel="ระบุหมายเหตุ *"
          />
          <Divider variant="inset" component="li" />
          <ActionSection
            primaryText="ผู้จัดการแผนกโดยตรง"
            chips={["Action"]}
            textFieldLabel="ระบุหมายเหตุ"
          />
          <Divider variant="inset" component="li" />
          <ActionSection
            primaryText="RMC Manager / ผู้ Verify / Line Walk"
            chips={["Action"]}
            textFieldLabel="ระบุหมายเหตุ"
          />
        </List>
      </Box>
    </MainLayout>
  );
}

export default AuditResultDetailScreen;
  