import { useState, useEffect } from 'react';
import { Typography, Card, CardHeader, CardContent, Avatar, IconButton } from '@mui/material';
import { getuserEXAM } from '../../services/Api/Get/GetRMCOP';
import { getPlantNo } from '../../services/Storage/PlantService';
import { red, green, yellow } from '@mui/material/colors';
import PropTypes from 'prop-types';
import LoadingCircle from './../Loading/LoadingCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function UserExamCard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoriesCount, setCategoriesCount] = useState({
    EXAM: 0,
    OJT: 0,
    PRACTICE: 0,
    RESKILL: 0  
  });
  const [expanded, setExpanded] = useState(false); // State for expanded card

  const plantNo = getPlantNo();

  useEffect(() => {
    setLoading(true);
    async function fetchUserData() {
      try {
        const data = await getuserEXAM(plantNo);
        if (data) {
          const counts = {
            EXAM: data.filter(item => item.EXAM === 1).length,
            OJT: data.filter(item => item.OJT === 1).length,
            PRACTICE: data.filter(item => item.PRACTICE === 1).length,
            RESKILL: data.filter(item => item.RESKILL === 1).length
          };
          setCategoriesCount(counts);
          setUserData(data); // Keep original data in state if needed elsewhere
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch data: ', err);
        setError(err.toString());
        setLoading(false);
      }
    }

    fetchUserData();
  }, [plantNo]); // Dependency array includes plantNo

  return (
    <Card sx={{ width: 350 }}>
      <CardHeader
        title="การพัฒนาพนักงาน"
        subheader="ข้อมูลวันที่ 22 พฤษภาคม 2567"
        sx={{ textAlign: 'center' }}
        action={ // Add action prop to include the expand button
          <IconButton onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-label="show more">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
      />
      {(expanded || (!loading && !error)) && 
        <CardContent>
          {loading && <LoadingCircle />}
          {error && <Typography>Error: {error}</Typography>}
          {!loading && !error && (
            <>
              {Object.entries(categoriesCount).map(([category, count]) => (
                <AvatarContent
                  key={category}
                  label={category}
                  count={count}
                  total={userData ? userData.length : 0}
                />
              ))}
            </>
          )}
        </CardContent>
      }
    </Card>
  );
}

const AvatarContent = ({ label, count, total }) => {
  // Calculate percentage
  const percentage = total !== 0 ? (count / total) * 100 : 0;
  // Determine color based on percentage
  let avatarColor;
  if (percentage >= 75) {
    avatarColor = green[500];
  } else if (percentage >= 50) {
    avatarColor = yellow[500];
  } else {
    avatarColor = red[500];
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
      <Avatar sx={{ bgcolor: avatarColor, marginRight: 2 }}>
        {count}/{total}
      </Avatar>
      <Typography component="span">{label}</Typography>
    </div>
  );
};

AvatarContent.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,   
};

export default UserExamCard;
