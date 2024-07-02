import React, { useState, useEffect } from 'react';
import ResultsDisplay from "../../../components/Dashboard/ResultsDisplay";
import SelectMaster from "../../../components/Dashboard/SelectMaster";
import SummaryTable from "../../../components/Dashboard/SummaryTable";
import { fetchPlantData, fetchSummaryAllDiv, fetchSummaryplant } from "../../../services/Api/Get/GetDashboard";
import { CircularProgress, Grid, ToggleButtonGroup, ToggleButton, Popover, Typography } from "@mui/material";
import MainLayout from './../../../layouts/MainLayout';
import SummaryPlanTable from '../../../components/Dashboard/SummaryPlanTable';
function PlantDashboardScreen() {
  const [summaryData, setSummaryData] = useState(null);
  const [plantData, setPlantData] = useState(null);
  const [latestAssessmentDate, setLatestAssessmentDate] = useState("");
  const [summaryPlantData, setSummaryPlantData] = useState(null); // New state for summary plant data
  const [searchData, setSearchData] = useState({
    division: 'all',
    department: '',
    sector: '',
  });
  const [loading, setLoading] = useState(false);
  const [allResults, setAllResults] = useState('summary');
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const handleChangeAllResult = (event, newAlignment) => {
    if (newAlignment === 'factoryReport' && !(searchData.department || searchData.sector)) {
      setPopoverAnchor(event.currentTarget);
      return;
    }
    if (newAlignment !== null) {
      setAllResults(newAlignment);
    }
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  useEffect(() => {
    setLoading(true);
    fetchSummaryAllDiv()
      .then((data) => {
        setSummaryData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching summary data:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = async (searchData) => {
    setSearchData(searchData);
    setLoading(true);

    if (searchData.division === 'all') {
      fetchSummaryAllDiv()
        .then((data) => {
          setSummaryData(data);
          setPlantData(null);
          setLatestAssessmentDate("");
          setSummaryPlantData(null); // Clear summary plant data when fetching all division summary
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching summary data:", error);
          setSummaryData(null);
          setLoading(false);
        });
    } else {
      try {
        const plantData = await fetchPlantData(searchData.division, searchData.department, searchData.sector, searchData.startDate, searchData.EndDate);
        const summaryPlantData = await fetchSummaryplant(searchData.division, searchData.department, searchData.sector, searchData.startDate, searchData.EndDate);

        if (plantData.length > 0) {
          setPlantData(plantData);
          setLatestAssessmentDate(plantData[0].AssessmentDate);
        } else {
          setPlantData(null);
          setLatestAssessmentDate("");
        }

        setSummaryPlantData(summaryPlantData);
        setSummaryData(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPlantData(null);
        setLatestAssessmentDate("");
        setSummaryData(null);
        setSummaryPlantData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <MainLayout>
      <div>
        <SelectMaster onSearch={handleSearch} />
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </div>
        )}

        {!loading && (
          <Grid item xs={12} style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
            {(searchData.division && searchData.department && searchData.sector) ? (
              <ToggleButtonGroup
                color="primary"
                value={allResults}
                exclusive
                onChange={handleChangeAllResult}
                aria-label="Platform"
              >
                <ToggleButton value="summary">สรุปผล</ToggleButton>
                <ToggleButton value="factoryReport">รายโรงงาน</ToggleButton>
              </ToggleButtonGroup>
            ) : (searchData.division && searchData.department) ? (
              <ToggleButtonGroup
                color="primary"
                value={allResults}
                exclusive
                onChange={handleChangeAllResult}
                aria-label="Platform"
              >
                <ToggleButton value="summary">สรุปผล</ToggleButton>
                <ToggleButton value="factoryReport">รายโรงงาน</ToggleButton>
                {/* Add any additional buttons as needed */}
              </ToggleButtonGroup>
            ) : searchData.division ? (
              // Only division is selected
              null // Don't render any ToggleButtonGroup
            ) : (
              // None selected, render default UI or nothing
              null
            )}
            <Popover
              open={Boolean(popoverAnchor)}
              anchorEl={popoverAnchor}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Typography sx={{ p: 2, color: 'red' }}>กรุณาเลือก กิจการ และ ภาค</Typography>
            </Popover>
          </Grid>
        )}


        {!loading && summaryData && allResults === 'summary' && searchData.division === 'all' && (
          <SummaryTable division="all" dataAllResults={summaryData} />
        )}

        {!loading && plantData && allResults === 'factoryReport' && (
          <ResultsDisplay
            dataResults={plantData}
            latestAssessmentDate={latestAssessmentDate}
          />
        )}

        {!loading && plantData && allResults === 'summary' && (
          <SummaryPlanTable dataResults={plantData} summaryPlantData={summaryPlantData} />
        )}
      </div>
    </MainLayout>
  );
}

export default PlantDashboardScreen;
