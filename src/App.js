import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';
import { initializeDummyData } from './data/DummyData';
import { auth } from './utils/Auth';

// Auth
import { Login } from './pages/auth/Login';

// Manager Pages
import { ManagerLayout } from './components/lawyer/LawyerLayout';
import { ManagerDashboard } from './pages/Manager/Dashboard';

// Employee Pages  
import { EmployeeLayout } from './components/client/ClientLayout';
import { EmployeeDashboard } from './pages/employee/Dashboard';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const user = auth.getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'lawyer' ? '/lawyer' : '/client'} replace />;
  }
  
  return children;
};

function App() {
  useEffect(() => {
    initializeDummyData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Manager Routes */}
          <Route 
            path="/lawyer/*" 
            element={
              <ProtectedRoute requiredRole="lawyer">
                <ManagerLayout />
              </ProtectedRoute>
            } 
          />
          
          {/* Employee Routes */}
          <Route 
            path="/client/*" 
            element={
              <ProtectedRoute requiredRole="client">
                <EmployeeLayout />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;