import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import './HomeScreen.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FactoryIcon from '@mui/icons-material/Factory';
import DescriptionIcon from '@mui/icons-material/Description';
import TableChartIcon from '@mui/icons-material/TableChart';
import FactCheckIcon from '@mui/icons-material/FactCheck';

function HomeScreen() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <section className="cards-container">
        <div className="card" onClick={() => navigate('/selectPlant')}>
          <div className="card-content">
            <LocationOnIcon className="icon" />
            <h1>เลือกโรงงาน</h1>
          </div>
        </div>
        <div className="card" onClick={() => navigate('/factoryactual')}>
          <div className="card-content">
            <FactoryIcon className="icon" />
            <h1>ผลปฏิบัติงานในโรงงาน</h1>
          </div>
        </div>
        <div className="card" onClick={() => navigate('/auditform')}>
          <div className="card-content">
            <FactCheckIcon className="icon" />
            <h1>แบบฟอร์ม</h1>
          </div>
        </div>
        <div className="card" onClick={() => navigate('/auditresult')}>
          <div className="card-content">
            <DescriptionIcon className="icon" />
            <h1>ผล Verify / Line Walk</h1>
          </div>
        </div>
        <div className="card" onClick={() => navigate('/dashboard/plants')}>
          <div className="card-content">
            <TableChartIcon className="icon" />
            <h1>ผลสรุปรายโรงงาน</h1>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default HomeScreen;
