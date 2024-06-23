import { useState, useEffect } from 'react';
import { Typography, Card, CardHeader, CardContent, Avatar, IconButton, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { getuserEXAM } from '../../services/Api/Get/GetRMCOP';
import { getPlantNo } from '../../services/Storage/PlantService';
import { red, green, yellow } from '@mui/material/colors';
import PropTypes from 'prop-types';
import LoadingCircle from '../Loading/LoadingCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function UserExamCard() {
  const getEmoji = (value) => (value === 1 ? '🟢' : '🔴');

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoriesCount, setCategoriesCount] = useState({
    EXAM: 0,
    OJT: 0,
    PRACTICE: 0,
    RESKILL: 0
  });
  const [expanded, setExpanded] = useState(false);
  const [userDevelopments, setUserDevelopments] = useState([]);

  const plantNo = getPlantNo();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
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
          setUserData(data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch data: ', err);
        setError(err.toString());
        setLoading(false);
      }
    };

    const fetchUserDevelopments = async () => {
      try {
        const data = await getuserEXAM(plantNo);
        setUserDevelopments(data);
      } catch (err) {
        console.error('Failed to fetch user developments: ', err);
      }
    };

    if (expanded) {
      fetchUserDevelopments();
    } else {
      setUserDevelopments([]);
    }

    fetchUserData();
  }, [plantNo, expanded]);

  const groupCategoriesInPairs = (categories) => {
    const pairs = [];
    for (let i = 0; i < categories.length; i += 2) {
      pairs.push(categories.slice(i, i + 2));
    }
    return pairs;
  };


  const categoryTranslations = {
    EXAM: 'ภาคทฤษฎี',
    OJT: 'การ OJT',
    PRACTICE: 'ภาคปฏิบัติ',
    RESKILL: 'การ Reskill'
  };

  return (
    <Card sx={{ width: 350 }}>
      <CardHeader
        title="การพัฒนาพนักงาน"
        sx={{ textAlign: 'center', backgroundColor: '#00BBF2', color: 'white' }}
        action={
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
              {groupCategoriesInPairs(Object.entries(categoriesCount)).map((pair, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'left' }}>
                  {pair.map(([category, count]) => (
                    <AvatarContent
                      key={category}
                      label={categoryTranslations[category]}
                      count={count}
                      total={userData ? userData.length : 0}
                      sx={{ margin: '10px' }}
                    />
                  ))}
                </div>
              ))}
              {expanded && (
                <Table sx={{ margin: '10px', width: '90%' }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ชื่อ-นามสกุล</TableCell>
                      <TableCell align="center">ภาคทฤษฎี</TableCell>
                      <TableCell align="center">OJT</TableCell>
                      <TableCell align="center">ภาคปฏิบัติ</TableCell>
                      <TableCell align="center">Reskill</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userDevelopments.map((row, index) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {row.fullname}
                        </TableCell>
                        <TableCell align="center">{getEmoji(row.EXAM)}</TableCell>
                        <TableCell align="center">{getEmoji(row.OJT)}</TableCell>
                        <TableCell align="center">{getEmoji(row.PRACTICE)}</TableCell>
                        <TableCell align="center">{getEmoji(row.RESKILL)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </>
          )}
        </CardContent>
      }
    </Card>
  );
}

const AvatarContent = ({ label, count, total }) => {
  const percentage = total !== 0 ? (count / total) * 100 : 0;
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
