import { Typography, Card, CardHeader, CardContent, Avatar, IconButton, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LoadingCircle from '../Loading/LoadingCircle';

function MachineCard() {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);


  return (
    <Card sx={{ width: 350 }}>
    <CardHeader
      title="การบำรุงรักษาเครื่องจักร"
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
       
      </CardContent>
    }
  </Card>
  )
}

export default MachineCard