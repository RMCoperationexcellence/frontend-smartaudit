import { useState, useEffect } from 'react';
import ChoiceLayout from '../../../layouts/ChoiceLayout';
import { useLocation } from 'react-router-dom';
import FormTable from '../../../components/FormTable';
import { getAuditQuestion } from '../../../services/Api/Get/GetAuditForm';
import FormProgress from '../../../components/FormProgress';

function AuditChoiceScreen() {
    const location = useLocation();
    const { name } = location.state;
    const { GroupId } = location.state;
    const [auditData, setAuditData] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(GroupId)


    useEffect(() => {
      // Fetch data from API
      const fetchData = async () => {
          try {
              const data = await getAuditQuestion(GroupId);
              setAuditData(data);
              setLoading(false);
          } catch (error) {
              console.error('Error fetching audit data:', error);
              setLoading(false);
          }
      };

      fetchData();
  }, []);


  return (
    <ChoiceLayout>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "30px" }}>
                <FormProgress/>
                <FormTable data={auditData}/>
        </div>
    </ChoiceLayout>
  )
}

export default AuditChoiceScreen