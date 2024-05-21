import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { getPlant } from "../../services/Api/Get/GetPlantService.js";

function SelectPlantScreen() {
  const [plants, setPlants] = useState([]); // State เพื่อเก็บข้อมูลโรงงาน
  const [selectedPlant, setSelectedPlant] = useState(''); // State เพื่อเก็บข้อมูลโรงงานที่ถูกเลือก
  const [selectedPlantName, setSelectedPlantName] = useState(''); // State to store selected plant name
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

  const handlePlantChange = (e) => {
    setSelectedPlant(e.target.value);
    setSelectedPlantName(plants.find((plant) => plant.PLANT_NO === e.target.value)?.NAME);
    console.log(selectedPlantName);
};

const handleSave = async () => {
  if (selectedPlant) {
      // Save selectedPlant to local storage
      await localStorage.setItem('PLANT_NO', selectedPlant);
      await localStorage.setItem('PLANT_NAME', selectedPlantName);
      
      // Navigate to Audit page using React Router
      await navigate('/menu');
  }
};
  return (
    <MainLayout>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "50px" }}>
        <Typography variant="h4">เลือกโรงงาน</Typography>
        <Select value={selectedPlant} onChange={handlePlantChange} sx={{ width: 300, margin: 2 }}>
                        {plants.map((plant) => (
                            <MenuItem key={plant.PLANT_NO} value={plant.PLANT_NO}>
                                {plant.NAME}
                            </MenuItem>
                        ))}
                    </Select>
                    {selectedPlant && (
                        <Button onClick={handleSave} sx={{ width: 225, margin: 2 }} variant="contained">ยืนยัน</Button>
                      )}
      </div>
    </MainLayout>
  );
}

export default SelectPlantScreen;
