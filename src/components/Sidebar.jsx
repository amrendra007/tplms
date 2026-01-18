import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  FileText,
  ClipboardCheck,
  ShieldAlert,
  CreditCard,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Building2,
  Bell
} from 'lucide-react'

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'vendors', label: 'Vendor Management', icon: Users, path: '/vendors', badge: 3 },
    { id: 'procurement', label: 'Procurement', icon: FileText, path: '/procurement' },
    { id: 'sla', label: 'SLA Management', icon: ClipboardCheck, path: '/sla' },
    { id: 'risk', label: 'Risk & Compliance', icon: ShieldAlert, path: '/risk', badge: 5 },
    { id: 'billing', label: 'Billing & Payments', icon: CreditCard, path: '/billing' },
    { id: 'analytics', label: 'Analytics & MIS', icon: BarChart3, path: '/analytics' },
  ]

  const secondaryNavItems = [
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications', badge: 12 },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, path: '/help' },
  ]

  const handleNavClick = (item) => {
    setCurrentPage(item.id)
    navigate(item.path)
  }

  const isActive = (path) => location.pathname === path

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Building2 size={24} />
          </div>
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-title">TPLMS</span>
            <span className="sidebar-logo-subtitle">State Bank of India</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-title">Main Menu</div>
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
            >
              <item.icon className="nav-icon" size={20} />
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </div>

        <div className="nav-section">
          <div className="nav-section-title">System</div>
          {secondaryNavItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
            >
              <item.icon className="nav-icon" size={20} />
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ padding: '16px 12px', borderTop: '1px solid var(--color-border)' }}>
        <button className="nav-item" style={{ color: 'var(--color-accent-danger)' }}>
          <LogOut className="nav-icon" size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
