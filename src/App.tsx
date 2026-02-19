
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './views/LandingPage';
import Dashboard from './views/Dashboard';
import About from './views/About';
import ClientsFeedback from './views/ClientsFeedback';
import AiAssistant from './views/AiAssistant';
import { View } from './types';

// Admin Imports
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './views/admin/Dashboard';
import Inventory from './views/admin/Inventory';
import Quotations from './views/admin/Quotations';
import Concerns from './views/admin/Concerns';
import Sales from './views/admin/Sales';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);

  return (
    <div className="min-h-screen">
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="quotations" element={<Quotations />} />
          <Route path="concerns" element={<Concerns />} />
          <Route path="sales" element={<Sales />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<ClientsFeedback />} />
        <Route path="/assistant" element={<AiAssistant />} />
        <Route path="/" element={
          currentView === View.LANDING ? (
            <LandingPage onLogin={() => setCurrentView(View.DASHBOARD)} />
          ) : (
            <Dashboard onLogout={() => setCurrentView(View.LANDING)} />
          )
        } />
      </Routes>
    </div>
  );
};

export default App;
