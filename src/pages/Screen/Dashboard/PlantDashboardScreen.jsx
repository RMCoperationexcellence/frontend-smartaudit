import ResultsDisplay from "../../../components/Dashboard/ResultsDisplay";
import SelectMaster from "../../../components/Dashboard/SelectMaster";
import SummaryTable from "../../../components/Dashboard/SummaryTable";
import { fetchPlantData, fetchSummaryAllDiv } from "../../../services/Api/Get/GetDashboard";
import { useEffect, useState } from "react";
import MainLayout from './../../../layouts/MainLayout';

function PlantDashboardScreen() {
    const [summaryData, setSummaryData] = useState(null);
    const [plantData, setPlantData] = useState(null);
    const [latestAssessmentDate, setLatestAssessmentDate] = useState("");
    const [searchData, setSearchData] = useState({
      division: 'all', // Default value for division
      department: '', // Default value for department
      sector: '', // Default value for sector
    });
  
    useEffect(() => {
      // Fetch summary data when component mounts
      fetchSummaryAllDiv()
        .then((data) => {
          setSummaryData(data);
        })
        .catch((error) => {
          console.error("Error fetching summary data:", error);
        });
    }, []);
  
    const handleSearch = async (searchData) => {
      setSearchData(searchData); // Update searchData state with new values
  
      if (searchData.division === 'all') {
        // Fetch all summary data
        fetchSummaryAllDiv()
          .then((data) => {
            setSummaryData(data);
            setPlantData(null); // Clear plant data
            setLatestAssessmentDate(""); // Reset assessment date
          })
          .catch((error) => {
            console.error("Error fetching summary data:", error);
            setSummaryData(null);
          });
      } else {
        // Fetch plant-specific data based on search criteria
        fetchPlantData(searchData.division, searchData.department, searchData.sector)
          .then((data) => {
            if (data.length > 0) {
              setPlantData(data);
              setLatestAssessmentDate(data[0].AssessmentDate); // Assuming AssessmentDate is a property of plant data
            } else {
              setPlantData(null); // Clear plant data if no results
              setLatestAssessmentDate(""); // Reset assessment date if no results
            }
            setSummaryData(null); // Clear summary data
          })
          .catch((error) => {
            console.error("Error fetching plant data:", error);
            setPlantData(null);
            setLatestAssessmentDate("");
            setSummaryData(null); // Clear summary data on error
          });
      }
    };
  
    return (
      <MainLayout>
      <div>
        <SelectMaster onSearch={handleSearch} />
        {summaryData && <SummaryTable division="all" dataAllResults={summaryData} />}
        {plantData && (
          <ResultsDisplay
            dataResults={plantData}
            latestAssessmentDate={latestAssessmentDate}
          />
        )}
      </div></MainLayout>
    );
  }

export default PlantDashboardScreen