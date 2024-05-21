// Router.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Suspense, lazy } from "react";
import { isPlantChecked } from "./services/Storage/PlantService";
import LinearProgress from '@mui/material/LinearProgress';

const LoginScreen = lazy(() => import("./pages/Screen/LoginScreen"));
const SelectPlantScreen = lazy(() => import("./pages/Screen/SelectPlantScreen"));
const NotfoundScreen = lazy(() => import("./pages/Screen/NotfoundScreen"));
const AuditMenu = lazy(() => import("./pages/Screen/AuditMenuScreen"));
const FactoryResultScreen = lazy(() => import("./pages/Screen/Results/FactoryResultScreen"));
const AuditResultScreen = lazy(() => import("./pages/Screen/Results/AuditResultScreen"));
const AuditFormScreen = lazy(() => import("./pages/Screen/Form/AuditFormScreen"));
const AuditChoiceScreen = lazy(() => import("./pages/Screen/Form/AuditChoiceScreen"));
const QuestionManagementScreen = lazy(() => import("./pages/web-master/QuestionManagement"));

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
      <Suspense fallback={<LinearProgress />}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SelectPlantScreen />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/selectPlant"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SelectPlantScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/menu"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isPlantRequired>
                <AuditMenu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/factoryactual"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isPlantRequired>
                <FactoryResultScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auditresult"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isPlantRequired>
                <AuditResultScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auditform"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isPlantRequired>
                <AuditFormScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auditform/form"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isPlantRequired>
                <AuditChoiceScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/QuestionManagement"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isPlantRequired>
                <QuestionManagementScreen />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotfoundScreen />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

Router.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
