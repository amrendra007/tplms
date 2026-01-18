import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Vendors from './pages/Vendors'
import Procurement from './pages/Procurement'
import SLAManagement from './pages/SLAManagement'
import RiskCompliance from './pages/RiskCompliance'
import Billing from './pages/Billing'
import Analytics from './pages/Analytics'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      vendors: 'Vendor Management',
      procurement: 'Procurement',
      sla: 'SLA Management',
      risk: 'Risk & Compliance',
      billing: 'Billing & Payments',
      analytics: 'Analytics & MIS',
    }
    return titles[currentPage] || 'Dashboard'
  }

  return (
    <Router>
      <div className="app-layout">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="main-content">
          <Header title={getPageTitle()} />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/procurement" element={<Procurement />} />
              <Route path="/sla" element={<SLAManagement />} />
              <Route path="/risk" element={<RiskCompliance />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
