import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { getPermission, getPlantVisible } from "../../../services/Storage/UserService";
import SuccessSnackbar from "../../../components/Alert/successAlert";

const AuditResultDetailScreen = () => {
  const navigate = useNavigate();
  const { auditResultId } = useParams();
  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar visibility
  const [formData, setFormData] = useState({
    FactoryHead_choice: 0,
    FactoryHead_desc: "",
    DeptManager_choice: 0,
    DeptManager_desc: "",
    DivManager_choice: 0,
    DivManager_desc: "",
  });

  const userPermissions = getPermission();
  const userPlantVisible = getPlantVisible();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auditResults = await getAuditResultDetail(auditResultId);
        const auditResult = auditResults[0]; // Assuming you are getting an array of results
        setAuditData(auditResult);

        // Set initial form data if needed
        if (auditResult) {
          setFormData({
            FactoryHead_choice: Number(auditResult.FactoryHead_choice) || 0,
            FactoryHead_desc: auditResult.FactoryHead_desc || "",
            DeptManager_choice: Number(auditResult.DeptManager_choice) || 0,
            DeptManager_desc: auditResult.DeptManager_desc || "",
            DivManager_choice: Number(auditResult.DivManager_choice) || 0,
            DivManager_desc: auditResult.DivManager_desc || "",
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


  const PlantVisibleCheck = () => {
  }

  const handleCheckboxChange = (field, checked, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: checked ? value : 0,
    }));

    // Additional logic based on FactoryHead_choice
    if (field === "FactoryHead_choice" && !checked) {
      // If FactoryHead_choice becomes unchecked (0), reset other fields
      setFormData((prevData) => ({
        ...prevData,
        DeptManager_choice: 0,
        DivManager_choice: 0,
      }));
    }
  };

  const handleTextFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
      setSnackbarOpen(true); // Show success snackbar
      setTimeout(() => {
        navigate("/auditresult"); // Navigate to /auditresult after successful submission
      }, 1000); // Wait for the snackbar to close before navigating
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
        <Card sx={{ width: "100%", maxWidth: 360 }}>
          <CardContent>
            <Typography variant="h5">รายละเอียด</Typography>
            <Typography>หัวข้อ : {auditData.QUESTION_TEXT}</Typography>
            <Typography sx={{color: "green"}}> สถานะ : {auditData.CHOICE_RESULTS}</Typography>
            <Typography sx={{color: "red"}}> คะแนน : {auditData.SCORE}</Typography>
          </CardContent>
        </Card>
      </Box>
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
                        onChange={(event) => handleCheckboxChange("FactoryHead_choice", event.target.checked, 1)}
                        name="FactoryHead_choice"
                        disabled={userPermissions !== "1" || formData.DeptManager_choice === 1 } // Disable if user doesn't have factory_head permission
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
                    disabled={userPermissions !== "1"|| formData.FactoryHead_choice === 1 || formData.DeptManager_choice === 1 } // Disable if user doesn't have factory_head permission
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
                        onChange={(event) => handleCheckboxChange("DeptManager_choice", event.target.checked, 1)}
                        name="DeptManager_choice"
                        disabled={userPermissions !== "2" || !formData.FactoryHead_choice}
                      />
                    }
                    label="ผ่านมาตรฐาน"
                    sx={{ mb: 1, mr: 1 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.DeptManager_choice === 2}
                        onChange={(event) => handleCheckboxChange("DeptManager_choice", event.target.checked, 2)}
                        name="DeptManager_choice"
                        disabled={userPermissions !== "2" || !formData.FactoryHead_choice}
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
                    disabled={userPermissions !== "2" || !formData.FactoryHead_choice}
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
                        onChange={(event) => handleCheckboxChange("DivManager_choice", event.target.checked, 1)}
                        name="DivManager_choice"
                        disabled={
                          userPermissions !== "3" ||
                          !formData.FactoryHead_choice ||
                          formData.DeptManager_choice !== 1
                        }
                      />
                    }
                    label="ผ่านมาตรฐาน"
                    sx={{ mb: 1, mr: 1 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.DivManager_choice === 2}
                        onChange={(event) => handleCheckboxChange("DivManager_choice", event.target.checked, 2)}
                        name="DivManager_choice"
                        disabled={
                          userPermissions !== "3" ||
                          !formData.FactoryHead_choice ||
                          formData.DeptManager_choice !== 1
                        }
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
                    disabled={
                      userPermissions !== "3" ||
                      !formData.FactoryHead_choice ||
                      formData.DeptManager_choice !== 1
                    }
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
      <SuccessSnackbar open={snackbarOpen} handleClose={handleSnackbarClose} />
    </MainLayout>
  );
};

export default AuditResultDetailScreen;
