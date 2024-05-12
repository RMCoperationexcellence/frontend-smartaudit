import ChoiceLayout from '../../../layouts/ChoiceLayout';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';

function AuditChoiceScreen() {
    const location = useLocation();
    const { name } = location.state;
  return (
    <ChoiceLayout>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "30px" }}>
            <paper>
                                
            </paper>
        </div>
    </ChoiceLayout>
  )
}

export default AuditChoiceScreen