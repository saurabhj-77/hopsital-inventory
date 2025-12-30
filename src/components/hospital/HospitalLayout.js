import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Dashboard,
  Assessment,
  People,
  Assignment,
  TrendingUp,
  Build,
  Chat,
  Schedule,
  DirectionsCar,
  LibraryBooks,
  CalendarMonth
} from '@mui/icons-material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Layout } from '../common/Layout';
import { auth } from '../../utils/Auth';
import LawyerDashboard from '../../pages/lawyer/LawyerDashboard';
import LegalEstimator from '../../pages/lawyer/LegalEstimator';
import Consultation from '../../pages/lawyer/Consultation';
import ClientManagement from '../../pages/lawyer/ClientManagement';
import CaseProgress from '../../pages/lawyer/CaseProgress';
import ClientChat from '../../pages/lawyer/ClientChat';
import TravelManagement from '../../pages/lawyer/TravelManagement';
import Library from '../../pages/lawyer/Library';

const managerSidebarItems = [
  { title: 'Dashboard', path: '/lawyer', icon: <Dashboard /> },
  { title: 'Legal Estimator', path: '/lawyer/estimator', icon: <Assessment /> },
  { title: 'Consultation', path: '/lawyer/consultation', icon: <CalendarMonth /> },
  { title: 'Client Management', path: '/lawyer/client', icon: <People /> },
  { title: 'Case progress', path: '/lawyer/progress', icon: <TrendingUp /> },
  { title: 'Client Chat', path: '/lawyer/chat', icon: <Chat /> },
  { title: 'Library', path: '/lawyer/library', icon: <LibraryBooks /> },
  { title: 'TravelManagement', path: '/lawyer/travel', icon: <DirectionsCar /> },
];

export const HospitalLayout = () => {
  const user = auth.getCurrentUser();

  return (
    <Layout user={user} sidebarItems={managerSidebarItems}>
      <Routes>
        <Route path="/" element={<LawyerDashboard />} />
        <Route path="/estimator" element={<LegalEstimator />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/client" element={<ClientManagement />} />
        <Route path="/progress" element={<CaseProgress />} />
        <Route path="/chat" element={<ClientChat />} />
        <Route path="/travel" element={<TravelManagement />} />
        <Route path="/library" element={<Library />} />

      </Routes>
    </Layout>
  );
};