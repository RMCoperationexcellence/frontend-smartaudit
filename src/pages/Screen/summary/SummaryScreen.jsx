import { useEffect, useState } from 'react';
import MainLayout from './../../../layouts/MainLayout';
import Box1 from './../../../components/boxSummary/box1';
import { Typography, Grid } from '@mui/material';
import { getuserEXAM } from '../../../services/Api/Get/GetRMCOP';
import { getPlantNo, getPlantName } from '../../../services/Storage/PlantService';
import LoadingCircle from '../../../components/Loading/LoadingCircle';


const plantNo = getPlantNo();
const plantName = getPlantName();

function SummaryScreen() {
  const [dataEXAM, setDataEXAM] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getuserEXAM(plantNo);
        setDataEXAM(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <Grid container spacing={2} sx={{ m: 2 }}>
        <Grid item xs={12}>
          <Typography align="center">โรงงาน : {plantName}</Typography>
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <LoadingCircle />
          ) : (
            <Box1 data={dataEXAM} />
          )}
        </Grid>
      </Grid>
    </MainLayout>
  );
}

export default SummaryScreen;
