import AuditResultTable from "../../../components/AuditResultTable";
import MainLayout from "../../../layouts/MainLayout";
import { getPlantName } from "../../../services/Storage/PlantService";

function AuditResultScreen() {

  const PlantName = getPlantName();

  return (
    <MainLayout>
      <div className="centerContent">
        โรงงาน : {PlantName}
        <AuditResultTable />
        </div>
    </MainLayout>
  )
}

export default AuditResultScreen