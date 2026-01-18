import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ClipboardCheck,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Bell,
  Calendar,
  Target,
  BarChart3
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts'
import { slaRecords, vendors } from '../data/mockData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

const slaComplianceTrend = [
  { month: 'Jul', compliance: 95.2 },
  { month: 'Aug', compliance: 96.8 },
  { month: 'Sep', compliance: 94.5 },
  { month: 'Oct', compliance: 97.2 },
  { month: 'Nov', compliance: 96.5 },
  { month: 'Dec', compliance: 96.8 },
]

const slaByCategory = [
  { name: 'IT Services', value: 98.5, fill: '#00d4aa' },
  { name: 'Non-IT', value: 94.2, fill: '#3b82f6' },
  { name: 'Non-Banking', value: 96.8, fill: '#8b5cf6' },
]

const SLACard = ({ sla }) => {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'exceeded':
        return { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-accent-success)', icon: TrendingUp }
      case 'on track':
        return { bg: 'rgba(0, 212, 170, 0.1)', color: 'var(--color-accent-primary)', icon: CheckCircle }
      case 'at risk':
        return { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-accent-warning)', icon: AlertTriangle }
      case 'breached':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-accent-danger)', icon: XCircle }
      default:
        return { bg: 'rgba(100, 116, 139, 0.1)', color: 'var(--color-text-muted)', icon: Clock }
    }
  }

  const statusStyle = getStatusStyle(sla.status)
  const StatusIcon = statusStyle.icon
  const performance = ((sla.actual / sla.target) * 100).toFixed(1)
  const isPercentMetric = !sla.unit

  return (
    <motion.div className="card" variants={itemVariants} whileHover={{ y: -4 }}>
      <div className="card-body">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{sla.id}</span>
            </div>
            <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>
              {sla.serviceName}
            </h4>
            <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{sla.vendorName}</p>
          </div>
          <div style={{
            padding: '6px 12px',
            borderRadius: 'var(--radius-md)',
            background: statusStyle.bg,
            color: statusStyle.color,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            fontWeight: 600
          }}>
            <StatusIcon size={14} />
            {sla.status}
          </div>
        </div>

        {/* Metric Info */}
        <div style={{ 
          background: 'var(--color-bg-tertiary)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16,
          marginBottom: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Target size={16} style={{ color: 'var(--color-accent-primary)' }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>{sla.metric}</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Target</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {sla.target}{isPercentMetric ? '%' : ` ${sla.unit}`}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Actual</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: statusStyle.color }}>
                {sla.actual}{isPercentMetric ? '%' : ` ${sla.unit}`}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Period</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {sla.period}
              </p>
            </div>
          </div>
        </div>

        {/* Penalty Info */}
        {sla.penalty > 0 && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: 'var(--radius-sm)',
            padding: 12,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={16} style={{ color: 'var(--color-accent-danger)' }} />
              <span style={{ fontSize: 13, color: 'var(--color-accent-danger)' }}>Penalty Applied</span>
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-accent-danger)' }}>
              ₹{(sla.penalty / 100000).toFixed(2)}L
            </span>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
            <Eye size={14} />
            View Details
          </button>
          <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
            <BarChart3 size={14} />
            History
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const SLAManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredSLAs = slaRecords.filter(sla => {
    const matchesSearch = sla.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sla.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sla.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || sla.status.toLowerCase() === selectedStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: slaRecords.length,
    exceeded: slaRecords.filter(s => s.status === 'Exceeded').length,
    onTrack: slaRecords.filter(s => s.status === 'On Track').length,
    atRisk: slaRecords.filter(s => s.status === 'At Risk').length,
    breached: slaRecords.filter(s => s.status === 'Breached').length,
    totalPenalty: slaRecords.reduce((sum, s) => sum + s.penalty, 0),
    avgCompliance: (slaRecords.reduce((sum, s) => sum + (s.actual / s.target) * 100, 0) / slaRecords.length).toFixed(1)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, fontFamily: 'var(--font-serif)' }}>
              SLA Management
            </h2>
            <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
              Monitor and manage Service Level Agreements across all vendors
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-secondary">
              <Bell size={18} />
              Alert Settings
            </button>
            <button className="btn btn-primary">
              <Plus size={18} />
              New SLA
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(6, 1fr)', 
        gap: 16, 
        marginBottom: 24 
      }}>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Total SLAs</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-primary)' }}>{stats.total}</p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Exceeded</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-accent-success)' }}>{stats.exceeded}</p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>On Track</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-accent-primary)' }}>{stats.onTrack}</p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>At Risk</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-accent-warning)' }}>{stats.atRisk}</p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Breached</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-accent-danger)' }}>{stats.breached}</p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Total Penalties</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-accent-danger)' }}>
            ₹{(stats.totalPenalty / 100000).toFixed(1)}L
          </p>
        </div>
      </motion.div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Compliance Trend */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <h3 className="card-title">
              <TrendingUp className="card-title-icon" />
              SLA Compliance Trend
            </h3>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={slaComplianceTrend}>
                  <defs>
                    <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-text-muted)" fontSize={12} />
                  <YAxis stroke="var(--color-text-muted)" fontSize={12} domain={[90, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'var(--color-bg-secondary)', 
                      border: '1px solid var(--color-border)',
                      borderRadius: 8
                    }}
                    formatter={(value) => [`${value}%`, 'Compliance']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="compliance" 
                    stroke="#00d4aa" 
                    fillOpacity={1} 
                    fill="url(#colorCompliance)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Compliance by Category */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <h3 className="card-title">
              <BarChart3 className="card-title-icon" />
              Compliance by Category
            </h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {slaByCategory.map((category, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{category.name}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: category.fill }}>{category.value}%</span>
                  </div>
                  <div style={{ 
                    height: 8, 
                    background: 'var(--color-bg-tertiary)', 
                    borderRadius: 4, 
                    overflow: 'hidden' 
                  }}>
                    <div style={{ 
                      width: `${category.value}%`, 
                      height: '100%', 
                      background: category.fill,
                      borderRadius: 4,
                      transition: 'width 0.5s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ 
              marginTop: 24, 
              padding: 16, 
              background: 'var(--color-bg-tertiary)', 
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>
                Overall Compliance
              </p>
              <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-accent-primary)' }}>
                {stats.avgCompliance}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div variants={itemVariants} style={{ 
        display: 'flex', 
        gap: 16, 
        marginBottom: 24, 
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 400 }}>
          <Search size={18} style={{ 
            position: 'absolute', 
            left: 14, 
            top: '50%', 
            transform: 'translateY(-50%)', 
            color: 'var(--color-text-muted)' 
          }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search SLAs by vendor or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: 44 }}
          />
        </div>
        
        <div className="tabs" style={{ marginBottom: 0 }}>
          {['all', 'exceeded', 'on track', 'at risk', 'breached'].map((status) => (
            <button
              key={status}
              className={`tab ${selectedStatus === status ? 'active' : ''}`}
              onClick={() => setSelectedStatus(status)}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* SLA Cards Grid */}
      <motion.div 
        variants={containerVariants}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', 
          gap: 24 
        }}
      >
        {filteredSLAs.map((sla) => (
          <SLACard key={sla.id} sla={sla} />
        ))}
      </motion.div>

      {filteredSLAs.length === 0 && (
        <motion.div 
          variants={itemVariants}
          style={{ 
            textAlign: 'center', 
            padding: 60,
            color: 'var(--color-text-muted)'
          }}
        >
          <ClipboardCheck size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
          <h3 style={{ fontSize: 18, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
            No SLAs found
          </h3>
          <p>Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default SLAManagement
