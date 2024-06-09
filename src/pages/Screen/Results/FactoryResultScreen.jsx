// FactoryResultScreen.jsx
import MainLayout from './../../../layouts/MainLayout';
import UserExamCard from '../../../components/Results/userexam';

function FactoryResultScreen() {
  return (
    <MainLayout>
       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "50px", cursor: "pointer" }}>
        <UserExamCard/>
      </div>
    </MainLayout>
  )
}

export default FactoryResultScreen