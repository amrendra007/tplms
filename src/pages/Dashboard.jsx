import React from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  FileCheck,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Shield,
  IndianRupee,
  Activity
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts'
import {
  dashboardStats,
  monthlySpendData,
  vendorCategoryData,
  riskDistribution,
  recentActivities,
  slaRecords,
  vendors
} from '../data/mockData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
}

const StatCard = ({ icon: Icon, label, value, trend, trendValue, color, bgColor }) => (
  <motion.div 
    className="stat-card" 
    variants={itemVariants}
    style={{ '--stat-color': color, '--stat-bg': bgColor, '--stat-icon-color': color }}
  >
    <div className="stat-header">
      <div className="stat-icon">
        <Icon size={24} />
      </div>
      {trend && (
        <div className={`stat-trend ${trend}`}>
          {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {trendValue}
        </div>
      )}
    </div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </motion.div>
)

const ActivityItem = ({ activity }) => {
  const icons = {
    success: CheckCircle,
    warning: AlertTriangle,
    info: FileText,
    danger: XCircle
  }
  const Icon = icons[activity.type] || AlertCircle

  return (
    <div className="activity-item">
      <div className={`activity-icon ${activity.type}`}>
        <Icon size={18} />
      </div>
      <div className="activity-content">
        <div className="activity-title">{activity.title}</div>
        <div className="activity-time">{activity.time}</div>
      </div>
    </div>
  )
}

const RiskBar = ({ score }) => {
  const getLevel = (score) => {
    if (score <= 33) return 'low'
    if (score <= 66) return 'medium'
    return 'high'
  }
  const level = getLevel(score)

  return (
    <div className="risk-score">
      <div className="risk-bar">
        <div className={`risk-bar-fill ${level}`} style={{ width: `${score}%` }} />
      </div>
      <span className={`risk-value ${level}`}>{score}</span>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <p style={{ color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: 8 }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, fontSize: 13, margin: '4px 0' }}>
            {entry.name}: ₹{entry.value}Cr
          </p>
        ))}
      </div>
    )
  }
  return null
}

const Dashboard = () => {
  const formatCurrency = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)}Cr`
    }
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`
    }
    return `₹${value.toLocaleString()}`
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          icon={Users}
          label="Total Vendors"
          value={dashboardStats.totalVendors}
          trend="up"
          trendValue="+12%"
          color="var(--color-accent-primary)"
          bgColor="rgba(0, 212, 170, 0.1)"
        />
        <StatCard
          icon={FileCheck}
          label="Active Contracts"
          value={dashboardStats.activeContracts}
          trend="up"
          trendValue="+8%"
          color="var(--color-accent-secondary)"
          bgColor="rgba(59, 130, 246, 0.1)"
        />
        <StatCard
          icon={Clock}
          label="Pending Approvals"
          value={dashboardStats.pendingApprovals}
          trend="down"
          trendValue="-15%"
          color="var(--color-accent-warning)"
          bgColor="rgba(245, 158, 11, 0.1)"
        />
        <StatCard
          icon={AlertTriangle}
          label="SLA Breaches"
          value={dashboardStats.slaBreach}
          trend="down"
          trendValue="-5%"
          color="var(--color-accent-danger)"
          bgColor="rgba(239, 68, 68, 0.1)"
        />
      </div>

      {/* Secondary Stats */}
      <motion.div className="stats-grid" variants={containerVariants} style={{ marginBottom: 32 }}>
        <StatCard
          icon={IndianRupee}
          label="Total Spend (YTD)"
          value={formatCurrency(dashboardStats.totalSpend)}
          color="var(--color-accent-tertiary)"
          bgColor="rgba(139, 92, 246, 0.1)"
        />
        <StatCard
          icon={Shield}
          label="Risk Alerts"
          value={dashboardStats.riskAlerts}
          color="var(--color-accent-danger)"
          bgColor="rgba(239, 68, 68, 0.1)"
        />
        <StatCard
          icon={CheckCircle}
          label="Compliance Score"
          value={`${dashboardStats.complianceScore}%`}
          color="var(--color-accent-success)"
          bgColor="rgba(16, 185, 129, 0.1)"
        />
        <StatCard
          icon={Activity}
          label="Avg SLA Compliance"
          value={`${dashboardStats.avgSlaCompliance}%`}
          color="var(--color-accent-primary)"
          bgColor="rgba(0, 212, 170, 0.1)"
        />
      </motion.div>

      {/* Charts Section */}
      <div className="dashboard-grid">
        {/* Spend Trend Chart */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <h3 className="card-title">
              <TrendingUp className="card-title-icon" />
              Monthly Spend Trend
            </h3>
            <select className="form-select" style={{ width: 'auto', padding: '8px 12px' }}>
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlySpendData}>
                  <defs>
                    <linearGradient id="colorIT" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNonIT" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNonBanking" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-text-muted)" fontSize={12} />
                  <YAxis stroke="var(--color-text-muted)" fontSize={12} tickFormatter={(v) => `₹${v}Cr`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="monotone" dataKey="IT" stroke="#00d4aa" fillOpacity={1} fill="url(#colorIT)" strokeWidth={2} />
                  <Area type="monotone" dataKey="NonIT" stroke="#3b82f6" fillOpacity={1} fill="url(#colorNonIT)" strokeWidth={2} name="Non-IT" />
                  <Area type="monotone" dataKey="NonBanking" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorNonBanking)" strokeWidth={2} name="Non-Banking" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Vendor Distribution */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <h3 className="card-title">
              <Users className="card-title-icon" />
              Vendor Distribution
            </h3>
          </div>
          <div className="card-body">
            <div className="chart-container" style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vendorCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {vendorCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 16 }}>
              {vendorCategoryData.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: item.color }} />
                  <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <h3 className="card-title">
              <Activity className="card-title-icon" />
              Recent Activities
            </h3>
            <button className="btn btn-secondary btn-sm">View All</button>
          </div>
          <div className="card-body">
            <div className="activity-feed">
              {recentActivities.slice(0, 5).map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Risk Distribution */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <h3 className="card-title">
              <Shield className="card-title-icon" />
              Risk Distribution
            </h3>
          </div>
          <div className="card-body">
            <div className="chart-container" style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskDistribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                  <XAxis type="number" stroke="var(--color-text-muted)" fontSize={12} />
                  <YAxis type="category" dataKey="level" stroke="var(--color-text-muted)" fontSize={12} width={60} />
                  <Tooltip />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: 16 }}>
              {riskDistribution.map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: index < riskDistribution.length - 1 ? '1px solid var(--color-border)' : 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                    <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{item.level} Risk</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.count} vendors</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* SLA Overview */}
        <motion.div className="card dashboard-grid-full" variants={itemVariants}>
          <div className="card-header">
            <h3 className="card-title">
              <FileCheck className="card-title-icon" />
              SLA Performance Overview
            </h3>
            <button className="btn btn-secondary btn-sm">View All SLAs</button>
          </div>
          <div className="card-body">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Vendor</th>
                    <th>Service</th>
                    <th>Metric</th>
                    <th>Target</th>
                    <th>Actual</th>
                    <th>Status</th>
                    <th>Penalty</th>
                  </tr>
                </thead>
                <tbody>
                  {slaRecords.map((sla) => (
                    <tr key={sla.id}>
                      <td>
                        <div className="vendor-info">
                          <div className="vendor-avatar">{sla.vendorName.charAt(0)}</div>
                          <div className="vendor-details">
                            <span className="vendor-name">{sla.vendorName}</span>
                            <span className="vendor-id">{sla.vendorId}</span>
                          </div>
                        </div>
                      </td>
                      <td>{sla.serviceName}</td>
                      <td>{sla.metric}</td>
                      <td>{sla.target}{sla.unit ? ` ${sla.unit}` : '%'}</td>
                      <td>{sla.actual}{sla.unit ? ` ${sla.unit}` : '%'}</td>
                      <td>
                        <span className={`status-badge ${sla.status.toLowerCase().replace(' ', '-')}`}>
                          {sla.status}
                        </span>
                      </td>
                      <td style={{ 
                        color: sla.penalty > 0 ? 'var(--color-accent-danger)' : 'var(--color-text-muted)',
                        fontWeight: sla.penalty > 0 ? 600 : 400
                      }}>
                        {sla.penalty > 0 ? `₹${(sla.penalty / 100000).toFixed(1)}L` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Top Vendors by Contract Value */}
        <motion.div className="card dashboard-grid-full" variants={itemVariants}>
          <div className="card-header">
            <h3 className="card-title">
              <Users className="card-title-icon" />
              Top Vendors by Contract Value
            </h3>
            <button className="btn btn-secondary btn-sm">View All Vendors</button>
          </div>
          <div className="card-body">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Vendor</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Contract Value</th>
                    <th>SLA Compliance</th>
                    <th>Risk Score</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.slice(0, 5).map((vendor) => (
                    <tr key={vendor.id}>
                      <td>
                        <div className="vendor-info">
                          <div className="vendor-avatar" style={{ 
                            background: vendor.type === 'IT' ? 'var(--gradient-primary)' : 
                                        vendor.type === 'Non-IT' ? 'var(--gradient-secondary)' : 
                                        'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'
                          }}>
                            {vendor.name.charAt(0)}
                          </div>
                          <div className="vendor-details">
                            <span className="vendor-name">{vendor.name}</span>
                            <span className="vendor-id">{vendor.id}</span>
                          </div>
                        </div>
                      </td>
                      <td>{vendor.category}</td>
                      <td>
                        <span style={{ 
                          padding: '4px 10px', 
                          borderRadius: 6, 
                          fontSize: 12,
                          background: vendor.type === 'IT' ? 'rgba(0, 212, 170, 0.1)' : 
                                      vendor.type === 'Non-IT' ? 'rgba(59, 130, 246, 0.1)' : 
                                      'rgba(139, 92, 246, 0.1)',
                          color: vendor.type === 'IT' ? 'var(--color-accent-primary)' : 
                                 vendor.type === 'Non-IT' ? 'var(--color-accent-secondary)' : 
                                 'var(--color-accent-tertiary)'
                        }}>
                          {vendor.type}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        ₹{(vendor.contractValue / 10000000).toFixed(1)}Cr
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="progress-bar" style={{ width: 80 }}>
                            <div 
                              className="progress-fill" 
                              style={{ 
                                width: `${vendor.slaCompliance}%`,
                                background: vendor.slaCompliance >= 98 ? 'var(--color-accent-success)' :
                                           vendor.slaCompliance >= 95 ? 'var(--color-accent-warning)' :
                                           'var(--color-accent-danger)'
                              }} 
                            />
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 500 }}>{vendor.slaCompliance}%</span>
                        </div>
                      </td>
                      <td>
                        <RiskBar score={vendor.riskScore} />
                      </td>
                      <td>
                        <span className={`status-badge ${vendor.status.toLowerCase().replace(' ', '-')}`}>
                          {vendor.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Dashboard
