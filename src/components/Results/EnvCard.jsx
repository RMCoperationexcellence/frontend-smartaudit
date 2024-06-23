import { Typography, Card, CardHeader, CardContent, Avatar, IconButton, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LoadingCircle from '../Loading/LoadingCircle';
import { getENV } from '../../services/Api/Get/GetRMCOP';
import { getPlantNo } from '../../services/Storage/PlantService';
import { red, green, yellow } from '@mui/material/colors';

function EnvCard() {

  
  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const [categoriesCount, setCategoriesCount] = useState({
  'ตรวจแล้ว-ปกติ': 0,
  'ตรวจแล้ว-ผิดปกติ': 0,
  'ไม่มีข้อมูล': 0
  });


  const plantNo = getPlantNo();


  useEffect(()=>{
    const fetchData = async () =>{
      setLoading(true);
      try{
        const data = await getENV(plantNo);
        setPlantData(data);
        const groupedData = groupByResult();
        setCategoriesCount({
          'ตรวจแล้ว-ผิดปกติ': groupedData['ตรวจแล้ว-ผิดปกติ'] ? groupedData['ตรวจแล้ว-ผิดปกติ'].length : 0,
          'ตรวจแล้ว-ปกติ': groupedData['ตรวจแล้ว-ปกติ'] ? groupedData['ตรวจแล้ว-ปกติ'].length : 0,
          'ไม่มีผลตรวจ': groupedData['ไม่มีผลตรวจ'] ? groupedData['ไม่มีผลตรวจ'].length : 0
        });
        setLoading(false);
      }
      catch(err){
        console.error('Error fetching data:', err);
        setError(err.toString());
        setLoading(false);
      }
    }
  
    fetchData();
  }, [plantNo, expanded]);
  


  const groupByResult = () => {
    if (!plantData) return {};
  
    return plantData.reduce((acc, item) => {
      const result = item['data-result'];
      let group;
      switch(result) {
        case 'ตรวจแล้ว-ปกติ':
          group = 'ตรวจแล้ว-ปกติ';
          break;
        case 'ตรวจแล้ว-ผิดปกติ':
          group = 'ตรวจแล้ว-ผิดปกติ';
          break;
        default:
          group = 'ไม่มีผลตรวจ';
      }
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(item);
      return acc;
    }, {});
  };

  const groupedData = groupByResult();



  return (
    <Card sx={{ width: 350 }}>
    <CardHeader
      title="สิ่งแวดล้อม"
      // subheader={`ข้อมูลวันที่ ${currentDate}`}
      sx={{ textAlign: 'center', backgroundColor: '#00BBF2', color: 'white' }}
      action={
        <IconButton onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-label="show more">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      }
    />
    {(expanded || (!loading && !error)) && 
        <CardContent>
        {loading ? (
          <LoadingCircle />
        ) : error ? (
          <Typography variant="body1" color="error">{error}</Typography>
        ) : (
          Object.keys(groupedData).map((result, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              <AvatarContent
                label={result}
                count={groupedData[result].length}
              />
            </div>
          ))
        )}
      </CardContent>
    }
  </Card>
  )
}

const AvatarContent = ({ label, count }) => {
  let avatarColor;

  // Check if count is available, if not, set it to 0
  const countToShow = count || 0;

  if (label === 'ตรวจแล้ว-ปกติ') {
    avatarColor = green[500];
  } else if (label === 'ตรวจแล้ว-ผิดปกติ') {
    avatarColor = red[500];
  } else {
    avatarColor = yellow[500];
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
      <Avatar sx={{ bgcolor: avatarColor, marginRight: 2 }}>
        {countToShow}
      </Avatar>
      <Typography component="span">{label}</Typography>
    </div>
  );
};


export default EnvCard