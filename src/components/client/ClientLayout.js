import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Dashboard,
  Assignment,
  TrendingUp,
  Chat,
  Schedule,
  Build,
} from '@mui/icons-material';
import { Layout } from '../common/Layout';
import { auth } from '../../utils/Auth';
import ClientDashboard from '../../pages/client/ClientDashboard';
import DocumentReview from '../../pages/client/DocumentReview';
import DocumentRequest from '../../pages/client/DocumentRequest';
import ConsultationSchedule from '../../pages/client/ConsultationScheduling';
import ClientCaseProgress from '../../pages/client/CaseProgress';


const employeeSidebarItems = [
  { title: 'Dashboard', path: '/client', icon: <Dashboard /> },
  { title: 'Document Review', path: '/client/documents', icon: <Assignment /> },
  { title: 'Case Progress', path: '/client/progress', icon: <TrendingUp /> },
  { title: 'Document Request', path: '/client/document/request', icon: <Assignment /> },
  { title: 'Consultation Scheduler', path: '/client/schedular', icon: <Schedule /> },
];

export const EmployeeLayout = () => {
  const user = auth.getCurrentUser();

  return (
    <Layout user={user} sidebarItems={employeeSidebarItems}>
      <Routes>
        <Route path="/" element={<ClientDashboard />} />
        <Route path="/documents" element={<DocumentReview />} />
        <Route path="/progress" element={<ClientCaseProgress />} />
        <Route path="/document/request" element={<DocumentRequest />} />
        <Route path="/schedular" element={<ConsultationSchedule />} />
      </Routes>
    </Layout>
  );
};