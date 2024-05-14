// Router.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import LoginScreen from "./pages/Screen/LoginScreen";
import SelectPlantScreen from "./pages/Screen/SelectPlantScreen";
import NotfoundScreen from "./pages/Screen/NotfoundScreen";
import AuditMenu from "./pages/Screen/AuditMenuScreen";
import FactoryResultScreen from "./pages/Screen/Results/FactoryResultScreen";
import AuditResultScreen from './pages/Screen/Results/AuditResultScreen';
import AuditFormScreen from "./pages/Screen/Form/AuditFormScreen";
import { isPlantChecked } from "./services/Storage/PlantService";
import AuditChoiceScreen from "./pages/Screen/Form/AuditChoiceScreen";

const ProtectedRoute = ({ children, isAuthenticated, isPlantRequired = false }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (isPlantRequired && !isPlantChecked()) {
        return <Navigate to="/selectPlant" replace />;
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isPlantRequired: PropTypes.bool,
};

export default function Router({ isAuthenticated }) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}><SelectPlantScreen /></ProtectedRoute>} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/selectPlant" element={<ProtectedRoute isAuthenticated={isAuthenticated}><SelectPlantScreen /></ProtectedRoute>} />
                <Route path="/menu" element={<ProtectedRoute isAuthenticated={isAuthenticated} isPlantRequired><AuditMenu /></ProtectedRoute>} />
                <Route path="/factoryactual" element={<ProtectedRoute isAuthenticated={isAuthenticated} isPlantRequired><FactoryResultScreen /></ProtectedRoute>} />
                <Route path="/auditresult" element={<ProtectedRoute isAuthenticated={isAuthenticated} isPlantRequired><AuditResultScreen /></ProtectedRoute>} />
                <Route path="/auditform" element={<ProtectedRoute isAuthenticated={isAuthenticated} isPlantRequired><AuditFormScreen /></ProtectedRoute>} />
                <Route path="/auditform/:AUDIT_GROUP_ID" element={<ProtectedRoute isAuthenticated={isAuthenticated} isPlantRequired><AuditChoiceScreen /></ProtectedRoute>} />
                <Route path="*" element={<NotfoundScreen />} />
            </Routes>
        </BrowserRouter>
    );
}

Router.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};
