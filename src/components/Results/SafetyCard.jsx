import { Typography, Card, CardHeader, CardContent, Avatar, IconButton, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LoadingCircle from '../Loading/LoadingCircle';
import { getSafety } from '../../services/Api/Get/GetRMCOP';
import { getPlantNo } from '../../services/Storage/PlantService';
import { red, orange, green, yellow, grey } from '@mui/material/colors';

function SafetyCard() {

  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const plantNo = getPlantNo();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getSafety(plantNo);
        setPlantData(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [plantNo, expanded]);

  return (
    <Card sx={{ width: 350 }}>
      <CardHeader
        title="ความปลอดภัย"
        sx={{ textAlign: 'center', backgroundColor: '#00BBF2', color: 'white' }}
        action={
          <IconButton onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-label="show more">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
      />
      {(expanded || (!loading && !error)) &&
        <CardContent>
          {plantData ? (
            plantData.map((item) => (
              <AvatarContent key={item.life_saving_rule_group_id} label={item.life_saving_rule_group_title} count={item['data-result']} />
            ))
          ) : loading ? (
            <LoadingCircle />
          ) : error ? (
            <Typography variant="body1" color="error">
              เกิดข้อผิดพลาด: {error}
            </Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">
              ไม่มีข้อมูล
            </Typography>
          )}
        </CardContent>
      }
    </Card>
  )
}

const AvatarContent = ({ label }) => {

  let avatarColor;

  if (label === 'ตรวจแล้ว-ปกติ') {
    avatarColor = green[500];
  } else if (label === 'ตรวจแล้ว-ผิดปกติ') {
    avatarColor = orange[500];
  } else {
    avatarColor = grey[500];
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
      <Avatar sx={{ bgcolor: avatarColor, marginRight: 2, color: avatarColor }}>
      </Avatar>
      <Typography component="span">{label}</Typography>
    </div>
  );
};

export default SafetyCard;
