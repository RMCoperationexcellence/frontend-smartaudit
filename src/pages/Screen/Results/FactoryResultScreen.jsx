// FactoryResultScreen.jsx
import MainLayout from './../../../layouts/MainLayout';
import UserExamCard from '../../../components/Results/UserexamCard';
import ManufacturingCard from '../../../components/Results/ManufacturingCard';
import QualtiyCard from '../../../components/Results/QualtiyCard';
import MachineCard from '../../../components/Results/MachineCard';
import SafetyCard from '../../../components/Results/SafetyCard';
import EnvCard from '../../../components/Results/EnvCard';
import { getPlantName } from '../../../services/Storage/PlantService';
import { useState, useEffect } from 'react';

function FactoryResultScreen() {
  const [plantName, setPlantName] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchPlantName = async () => {
      const name = await getPlantName();
      setPlantName(name);
    };

    fetchPlantName();

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(formattedDate);
  }, []);

  const cardStyle = {
    marginTop: '20px',
  };

  return (
    <MainLayout>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", cursor: "pointer" }}>
        <h1>โรงงาน : {plantName}</h1>
        <p>{currentDate}</p>
        <div style={cardStyle}>
          <UserExamCard />
        </div>
        <div style={cardStyle}>
          <ManufacturingCard />
        </div>
        <div style={cardStyle}>
          <QualtiyCard />
        </div>
        <div style={cardStyle}>
          <MachineCard />
        </div>
        <div style={cardStyle}>
          <SafetyCard />
        </div>
        <div style={cardStyle}>
          <EnvCard />
        </div>
      </div>
    </MainLayout>
  );
}

export default FactoryResultScreen;