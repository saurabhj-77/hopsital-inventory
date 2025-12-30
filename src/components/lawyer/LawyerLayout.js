import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Dashboard,
  SmartToy,
  LocalHospital,
  Inventory2,
  ShoppingCart,
  MedicalServices,
  Science,
  CalendarMonth,
  EventBusy,
  Business,
  Gavel,
  AccountTree,
  Timeline,
  ManageAccounts,
  Build
} from '@mui/icons-material';
import { Layout } from '../common/Layout';
import { auth } from '../../utils/Auth';
import InventoryDashboard from '../../pages/hospital/InventoryDashborad';
import CareTrackAIAssistant from '../../pages/hospital/AIAssistant';
import MedicalInventory from '../../pages/hospital/MedicalInventory';
import OrdersRestock from '../../pages/hospital/OrderRestock';
import SurgicalEquipment from '../../pages/hospital/SurgicalEquipment';
import PharmacyLaboratory from '../../pages/hospital/PharmacyLaboratory';
import EmergencyCriticalCare from '../../pages/hospital/EmergencyCriticalCare';
import ExpiryRecallManagement from '../../pages/hospital/ExpiryRecallManagement';
import SupplierVendorManagement from '../../pages/hospital/SupplierVendorManagement';
import AuditComplianceLog from '../../pages/hospital/AuditCompliance';
import DepartmentalInventoryAllocation from '../../pages/hospital/DepartmentalInventoryAllocation';
import ForecastingDemandPlanning from '../../pages/hospital/ForecastingDemandPlanning';
import UserRoleManagement from '../../pages/hospital/UserRoleManagement';
import MaintenanceCalibrationTracker from '../../pages/hospital/MaintananceCalibrationTracker';

const managerSidebarItems = [
{ title: 'Dashboard', path: '/lawyer', icon: <Dashboard /> },

  { title: 'AI Assistant', path: '/lawyer/estimator', icon: <SmartToy /> },

  { title: 'Critical Care', path: '/lawyer/library', icon: <LocalHospital /> },

  { title: 'Medical Inventory', path: '/lawyer/consultation', icon: <Inventory2 /> },

  { title: 'Order & Restock', path: '/lawyer/client', icon: <ShoppingCart /> },

  { title: 'Surgical Equipment', path: '/lawyer/progress', icon: <MedicalServices /> },

  { title: 'Pharmacy & Laboratory', path: '/lawyer/chat', icon: <Science /> },

  { title: 'Expiry & Recall', path: '/lawyer/expiry', icon: <EventBusy /> },

  { title: 'Supplier & Vendor', path: '/lawyer/supplier', icon: <Business /> },

  { title: 'Audit & Compliance', path: '/lawyer/audit', icon: <Gavel /> },

  {
    title: 'Department & Inventory Allocation',
    path: '/lawyer/departmental-inventory-allocation',
    icon: <AccountTree />
  },

  {
    title: 'Forecasting Demand Planning',
    path: '/lawyer/forecasting-demand-planning',
    icon: <Timeline />
  },

  {
    title: 'User Role Management',
    path: '/lawyer/user-role-management',
    icon: <ManageAccounts />
  },

  {
    title: 'Maintanance & Calibration Tracker',
    path: '/lawyer/maintenance-calibration-tracker',
    icon: <Build />
  }
];

export const ManagerLayout = () => {
  const user = auth.getCurrentUser();

  return (
    <Layout user={user} sidebarItems={managerSidebarItems}>
      <Routes>
        <Route path="/" element={<InventoryDashboard />} />
        <Route path="/estimator" element={<CareTrackAIAssistant />} />
        <Route path="/library" element={<EmergencyCriticalCare />} />
        <Route path="/consultation" element={<MedicalInventory />} />
        <Route path="/client" element={<OrdersRestock />} />
        <Route path="/progress" element={<SurgicalEquipment />} />
        <Route path="/chat" element={<PharmacyLaboratory />} />
        <Route path="/expiry" element={<ExpiryRecallManagement />} />
        <Route path="/supplier" element={<SupplierVendorManagement />} />
        <Route path="/audit" element={<AuditComplianceLog />} />
        <Route path="/departmental-inventory-allocation" element={<DepartmentalInventoryAllocation />} />
        <Route path="/forecasting-demand-planning" element={<ForecastingDemandPlanning />} />
        <Route path="/user-role-management" element={<UserRoleManagement />} />
        <Route path="/maintenance-calibration-tracker" element={<MaintenanceCalibrationTracker />} />
      </Routes>
    </Layout>
  );
};