import ChoiceLayout from '../../../layouts/ChoiceLayout';
import { useLocation } from 'react-router-dom';
import FormTable from '../../../components/FormTable';
import Data from '../../../data/sample.json';


console.log(Data);
function AuditChoiceScreen() {
    const location = useLocation();
    const { name } = location.state;
  return (
    <ChoiceLayout>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "30px" }}>
                <FormTable data={Data}/>
        </div>
    </ChoiceLayout>
  )
}

export default AuditChoiceScreen