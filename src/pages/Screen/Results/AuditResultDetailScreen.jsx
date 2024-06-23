import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MainLayout from "../../../layouts/MainLayout";
import { getAuditResultDetail } from "../../../services/Api/Get/GetResults";
import { PostUpdate } from "../../../services/Api/Post/PostForm";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const AuditResultDetailScreen = () => {
  const { auditResultId } = useParams();
  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    FactoryHead_choice: 0,
    FactoryHead_desc: "",
    DeptManager_choice: 0,
    DeptManager_desc: "",
    DivManager_choice: 0,
    DivManager_desc: "",
  });

  // Example permissions for the current user
  const permissions = ["factory_head", "direct_manager", "rmc_manager"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auditResults = await getAuditResultDetail(auditResultId);
        setAuditData(auditResults);
        // Set initial form data if needed
        if (auditResults) {
          setFormData({
            FactoryHead_choice: auditResults.FactoryHead_choice || 0,
            FactoryHead_desc: auditResults.FactoryHead_desc || "",
            DeptManager_choice: auditResults.DeptManager_choice || 0,
            DeptManager_desc: auditResults.DeptManager_desc || "",
            DivManager_choice: auditResults.DivManager_choice || 0,
            DivManager_desc: auditResults.DivManager_desc || "",
          });
        }
      } catch (error) {
        console.error("Error fetching audit data:", error);
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auditResultId]);

  const handleCheckboxChange = (field, checked) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: checked ? 1 : 0,
    }));
  };

  const handleTextFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const dataToSubmit = [{
        audit_result_id: auditResultId,
        FactoryHead_choice: formData.FactoryHead_choice,
        FactoryHead_desc: formData.FactoryHead_desc || "",
        DeptManager_choice: formData.DeptManager_choice,
        DeptManager_desc: formData.DeptManager_desc || "",
        DivManager_choice: formData.DivManager_choice,
        DivManager_desc: formData.DivManager_desc || ""
      }];
      await PostUpdate(dataToSubmit); // Call PostUpdate directly as a function
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data. Please try again.");
    }
  };
  

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
          {/* ActionSection for Factory Head */}
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={
                <Box component="div" sx={{ mb: 2 }}>
                  <Typography variant="h5" component="div" gutterBottom>
                    หัวหน้าโรงงาน / หัวหน้ากลุ่มโรงงาน
                  </Typography>
                </Box>
              }
              secondary={
                <Box component="div">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!formData.FactoryHead_choice}
                        onChange={(event) => handleCheckboxChange("FactoryHead_choice", event.target.checked)}
                        name="FactoryHead_choice"
                      />
                    }
                    label="รับทราบและดำเนินการแก้ไขแล้ว"
                    sx={{ mb: 1, mr: 1 }}
                  />
                  <TextField
                    name="FactoryHead_desc"
                    label="ระบุหมายเหตุ"
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1, backgroundColor: "white", width: "100%" }}
                    onChange={handleTextFieldChange}
                    value={formData.FactoryHead_desc}
                  />
                </Box>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />

{/* ActionSection for Department Manager */}
<ListItem alignItems="flex-start">
  <ListItemText
    primary={
      <Box component="div" sx={{ mb: 2 }}>
        <Typography variant="h5" component="div" gutterBottom>
          ผู้จัดการแผนกโดยตรง
        </Typography>
      </Box>
    }
    secondary={
      <Box component="div">
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.DeptManager_choice === 1}
              onChange={(event) => handleCheckboxChange("DeptManager_choice", event.target.checked)}
              name="DeptManager_choice"
            />
          }
          label="ผ่านมาตรฐาน"
          sx={{ mb: 1, mr: 1 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.DeptManager_choice === 2}
              onChange={(event) => handleCheckboxChange("DeptManager_choice", !event.target.checked)}
              name="DeptManager_choice"
            />
          }
          label="ไม่ผ่านมาตรฐาน"
          sx={{ mb: 1, mr: 1 }}
        />
        <TextField
          name="DeptManager_desc"
          label="ระบุหมายเหตุ"
          variant="outlined"
          size="small"
          sx={{ mt: 1, backgroundColor: "white", width: "100%" }}
          onChange={handleTextFieldChange}
          value={formData.DeptManager_desc}
        />
      </Box>
    }
  />
</ListItem>
<Divider variant="inset" component="li" />

{/* ActionSection for RMC Manager */}
<ListItem alignItems="flex-start">
  <ListItemText
    primary={
      <Box component="div" sx={{ mb: 2 }}>
        <Typography variant="h5" component="div" gutterBottom>
          RMC Manager / ผู้ Verify / Line Walk
        </Typography>
      </Box>
    }
    secondary={
      <Box component="div">
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.DivManager_choice === 1}
              onChange={(event) => handleCheckboxChange("DivManager_choice", event.target.checked)}
              name="DivManager_choice"
            />
          }
          label="ผ่านมาตรฐาน"
          sx={{ mb: 1, mr: 1 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.DivManager_choice === 2}
              onChange={(event) => handleCheckboxChange("DivManager_choice", !event.target.checked)}
              name="DivManager_choice"
            />
          }
          label="ไม่ผ่านมาตรฐาน"
          sx={{ mb: 1, mr: 1 }}
        />
        <TextField
          name="DivManager_desc"
          label="ระบุหมายเหตุ"
          variant="outlined"
          size="small"
          sx={{ mt: 1, backgroundColor: "white", width: "100%" }}
          onChange={handleTextFieldChange}
          value={formData.DivManager_desc}
        />
      </Box>
    }
  />
</ListItem>

        </List>
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          ยืนยัน
        </Button>
      </Box>
    </MainLayout>
  );
};

export default AuditResultDetailScreen;
