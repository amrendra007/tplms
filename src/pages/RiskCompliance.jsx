import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
  RefreshCw,
  FileText,
  AlertCircle,
  TrendingUp,
  Activity,
  Lock,
  Unlock,
  Calendar
} from 'lucide-react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts'
import { riskAssessments, complianceChecks, vendors } from '../data/mockData'

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

const riskRadarData = [
  { category: 'Financial', score: 75 },
  { category: 'Operational', score: 85 },
  { category: 'Security', score: 90 },
  { category: 'Compliance', score: 82 },
  { category: 'Strategic', score: 70 },
  { category: 'Reputational', score: 88 },
]

const riskDistributionData = [
  { name: 'Low Risk', value: 156, color: '#10b981' },
  { name: 'Medium Risk', value: 67, color: '#f59e0b' },
  { name: 'High Risk', value: 24, color: '#ef4444' },
]

const RiskCard = ({ assessment }) => {
  const getRiskStyle = (level) => {
    switch (level.toLowerCase()) {
      case 'low':
        return { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-accent-success)', icon: ShieldCheck }
      case 'medium':
        return { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-accent-warning)', icon: Shield }
      case 'high':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-accent-danger)', icon: ShieldAlert }
      default:
        return { bg: 'rgba(100, 116, 139, 0.1)', color: 'var(--color-text-muted)', icon: Shield }
    }
  }

  const riskStyle = getRiskStyle(assessment.riskLevel)
  const RiskIcon = riskStyle.icon

  return (
    <motion.div className="card" variants={itemVariants} whileHover={{ y: -4 }}>
      <div className="card-body">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{assessment.id}</span>
              <span style={{
                padding: '2px 8px',
                borderRadius: 4,
                fontSize: 11,
                background: 'rgba(100, 116, 139, 0.15)',
                color: 'var(--color-text-secondary)'
              }}>
                {assessment.category}
              </span>
            </div>
            <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>
              {assessment.vendorName}
            </h4>
            <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{assessment.vendorId}</p>
          </div>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 'var(--radius-md)',
            background: riskStyle.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: riskStyle.color }}>{assessment.score}</span>
          </div>
        </div>

        {/* Risk Level Badge */}
        <div style={{
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          background: riskStyle.bg,
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <RiskIcon size={20} style={{ color: riskStyle.color }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: riskStyle.color }}>
              {assessment.riskLevel} Risk
            </span>
          </div>
          <div style={{ 
            width: 80,
            height: 6,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 3,
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${assessment.score}%`,
              height: '100%',
              background: riskStyle.color,
              borderRadius: 3
            }} />
          </div>
        </div>

        {/* Risk Factors */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>Risk Factors</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {assessment.factors.map((factor, index) => (
              <span key={index} style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 12,
                background: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-secondary)'
              }}>
                {factor}
              </span>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: 12,
          padding: 12,
          background: 'var(--color-bg-tertiary)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calendar size={14} style={{ color: 'var(--color-text-muted)' }} />
            <div>
              <p style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>Last Assessed</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {new Date(assessment.lastAssessed).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RefreshCw size={14} style={{ color: 'var(--color-text-muted)' }} />
            <div>
              <p style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>Next Review</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-warning)' }}>
                {new Date(assessment.nextReview).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
            <Eye size={14} />
            View Details
          </button>
          <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>
            <RefreshCw size={14} />
            Re-assess
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const ComplianceItem = ({ check }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'passed':
        return { icon: CheckCircle, color: 'var(--color-accent-success)', bg: 'rgba(16, 185, 129, 0.1)' }
      case 'failed':
        return { icon: XCircle, color: 'var(--color-accent-danger)', bg: 'rgba(239, 68, 68, 0.1)' }
      case 'pending':
        return { icon: Clock, color: 'var(--color-accent-warning)', bg: 'rgba(245, 158, 11, 0.1)' }
      default:
        return { icon: AlertCircle, color: 'var(--color-text-muted)', bg: 'rgba(100, 116, 139, 0.1)' }
    }
  }

  const statusStyle = getStatusStyle(check.status)
  const StatusIcon = statusStyle.icon

  return (
    <div className="compliance-item">
      <div className="compliance-label">
        <div className="compliance-check" style={{ background: statusStyle.bg }}>
          <StatusIcon size={12} style={{ color: statusStyle.color }} />
        </div>
        <span>{check.name}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
          {new Date(check.lastChecked).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
        </span>
        <span style={{
          padding: '4px 10px',
          borderRadius: 'var(--radius-sm)',
          fontSize: 12,
          fontWeight: 600,
          background: statusStyle.bg,
          color: statusStyle.color,
          textTransform: 'capitalize'
        }}>
          {check.status}
        </span>
      </div>
    </div>
  )
}

const RiskCompliance = () => {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAssessments = riskAssessments.filter(assessment => {
    const matchesSearch = assessment.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.vendorId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedRiskLevel === 'all' || assessment.riskLevel.toLowerCase() === selectedRiskLevel.toLowerCase()
    return matchesSearch && matchesLevel
  })

  const stats = {
    totalAssessments: riskAssessments.length,
    lowRisk: riskAssessments.filter(r => r.riskLevel === 'Low').length,
    mediumRisk: riskAssessments.filter(r => r.riskLevel === 'Medium').length,
    highRisk: riskAssessments.filter(r => r.riskLevel === 'High').length,
    compliancePassed: complianceChecks.filter(c => c.status === 'passed').length,
    complianceTotal: complianceChecks.length,
    avgRiskScore: Math.round(riskAssessments.reduce((sum, r) => sum + r.score, 0) / riskAssessments.length)
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
              Risk & Compliance
            </h2>
            <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
              Monitor vendor risks and ensure regulatory compliance
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-secondary">
              <FileText size={18} />
              Generate Report
            </button>
            <button className="btn btn-primary">
              <RefreshCw size={18} />
              Run Assessment
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)', 
        gap: 16, 
        marginBottom: 24 
      }}>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Avg Risk Score</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-accent-warning)' }}>{stats.avgRiskScore}</p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Low Risk</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-accent-success)' }}>{stats.lowRisk}</p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Medium Risk</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-accent-warning)' }}>{stats.mediumRisk}</p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>High Risk</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-accent-danger)' }}>{stats.highRisk}</p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Compliance Score</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-accent-primary)' }}>
            {Math.round((stats.compliancePassed / stats.complianceTotal) * 100)}%
          </p>
        </div>
      </motion.div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Risk Radar */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <h3 className="card-title">
              <Activity className="card-title-icon" />
              Risk Assessment Overview
            </h3>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riskRadarData}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }} />
                  <Radar
                    name="Risk Score"
                    dataKey="score"
                    stroke="#00d4aa"
                    fill="#00d4aa"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'var(--color-bg-secondary)', 
                      border: '1px solid var(--color-border)',
                      borderRadius: 8
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Compliance Checklist */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <h3 className="card-title">
              <Shield className="card-title-icon" />
              Compliance Checklist
            </h3>
            <button className="btn btn-secondary btn-sm">
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>
          <div className="card-body" style={{ maxHeight: 340, overflowY: 'auto' }}>
            <div className="compliance-list">
              {complianceChecks.map((check, index) => (
                <ComplianceItem key={index} check={check} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Risk Distribution Pie Chart */}
      <motion.div className="card" variants={itemVariants} style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h3 className="card-title">
            <TrendingUp className="card-title-icon" />
            Vendor Risk Distribution
          </h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
            <div style={{ width: 200, height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {riskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {riskDistributionData.map((item, index) => (
                <div key={index} style={{ 
                  background: 'var(--color-bg-tertiary)', 
                  borderRadius: 'var(--radius-md)',
                  padding: 20,
                  borderLeft: `4px solid ${item.color}`
                }}>
                  <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 8 }}>{item.name}</p>
                  <p style={{ fontSize: 32, fontWeight: 700, color: item.color }}>{item.value}</p>
                  <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                    {((item.value / 247) * 100).toFixed(1)}% of total
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

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
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: 44 }}
          />
        </div>
        
        <div className="tabs" style={{ marginBottom: 0 }}>
          {['all', 'low', 'medium', 'high'].map((level) => (
            <button
              key={level}
              className={`tab ${selectedRiskLevel === level ? 'active' : ''}`}
              onClick={() => setSelectedRiskLevel(level)}
            >
              {level === 'all' ? 'All Risks' : `${level.charAt(0).toUpperCase() + level.slice(1)} Risk`}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Risk Assessment Cards */}
      <motion.div 
        variants={containerVariants}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
          gap: 24 
        }}
      >
        {filteredAssessments.map((assessment) => (
          <RiskCard key={assessment.id} assessment={assessment} />
        ))}
      </motion.div>

      {filteredAssessments.length === 0 && (
        <motion.div 
          variants={itemVariants}
          style={{ 
            textAlign: 'center', 
            padding: 60,
            color: 'var(--color-text-muted)'
          }}
        >
          <Shield size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
          <h3 style={{ fontSize: 18, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
            No risk assessments found
          </h3>
          <p>Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default RiskCompliance
