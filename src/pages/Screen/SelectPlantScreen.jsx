import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { getPlant } from "../../services/Api/Get/GetPlantService.js";

function SelectPlantScreen() {
  const [plants, setPlants] = useState([]); // State เพื่อเก็บข้อมูลโรงงาน
  const [selectedPlant, setSelectedPlant] = useState(null); // State เพื่อเก็บข้อมูลโรงงานที่ถูกเลือก
  const navigate = useNavigate();

  const fetchPlants = async () => {
    try {
      const plantsData = await getPlant(); // เรียกใช้ getPlant เพื่อดึงข้อมูลโรงงาน
      setPlants(plantsData);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handlePlantChange = (event, newValue) => {
    setSelectedPlant(newValue);
  };

  const handleSave = async () => {
    if (selectedPlant) {
      // Save selectedPlant to local storage
      await localStorage.setItem('PLANT_NO', selectedPlant.PLANT_NO);
      await localStorage.setItem('PLANT_NAME', selectedPlant.NAME);
      
      // Navigate to Audit page using React Router
      await navigate('/menu');
    }
  };

  return (
    <MainLayout>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "50px" }}>
        <Typography variant="h4">เลือกโรงงาน</Typography>
        <Autocomplete
          value={selectedPlant}
          onChange={handlePlantChange}
          options={plants}
          getOptionLabel={(option) => option.NAME}
          renderInput={(params) => <TextField {...params} label="เลือกโรงงาน" variant="outlined" />}
          sx={{ width: 300, margin: 2 }}
        />
        {selectedPlant && (
          <Button onClick={handleSave} sx={{ width: 225, margin: 2 }} variant="contained">ยืนยัน</Button>
        )}
      </div>
    </MainLayout>
  );
}

export default SelectPlantScreen;
