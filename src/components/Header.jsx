import React from 'react'
import { Search, Bell, Settings, ChevronDown, ChevronRight } from 'lucide-react'

const Header = ({ title }) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">{title}</h1>
        <div className="header-breadcrumb">
          <span>TPLMS</span>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--color-text-secondary)' }}>{title}</span>
        </div>
      </div>

      <div className="header-right">
        <div className="header-search">
          <Search className="header-search-icon" />
          <input
            type="text"
            placeholder="Search vendors, contracts, RFPs..."
          />
        </div>

        <div className="header-actions">
          <button className="header-btn">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
          <button className="header-btn">
            <Settings size={20} />
          </button>
        </div>

        <div className="header-profile">
          <div className="header-profile-avatar">RK</div>
          <div className="header-profile-info">
            <span className="header-profile-name">Rajiv Kumar</span>
            <span className="header-profile-role">Chief Manager, VMCC</span>
          </div>
          <ChevronDown size={16} style={{ color: 'var(--color-text-muted)' }} />
        </div>
      </div>
    </header>
  )
}

export default Header
