import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  FileCheck,
  IndianRupee,
  Shield,
  Clock,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart
} from 'recharts'
import { dashboardStats, monthlySpendData, vendorCategoryData, riskDistribution, vendors, slaRecords } from '../data/mockData'

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

// Enhanced data for analytics
const vendorGrowthData = [
  { month: 'Jan', newVendors: 12, terminated: 3, active: 210 },
  { month: 'Feb', newVendors: 8, terminated: 2, active: 216 },
  { month: 'Mar', newVendors: 15, terminated: 5, active: 226 },
  { month: 'Apr', newVendors: 10, terminated: 4, active: 232 },
  { month: 'May', newVendors: 18, terminated: 6, active: 244 },
  { month: 'Jun', newVendors: 14, terminated: 3, active: 255 },
  { month: 'Jul', newVendors: 11, terminated: 4, active: 262 },
  { month: 'Aug', newVendors: 16, terminated: 5, active: 273 },
  { month: 'Sep', newVendors: 9, terminated: 2, active: 280 },
  { month: 'Oct', newVendors: 13, terminated: 4, active: 289 },
  { month: 'Nov', newVendors: 20, terminated: 7, active: 302 },
  { month: 'Dec', newVendors: 15, terminated: 5, active: 312 },
]

const contractValueByType = [
  { type: 'IT Services', value: 450, count: 85 },
  { type: 'Cloud & Infra', value: 320, count: 42 },
  { type: 'Security', value: 180, count: 28 },
  { type: 'Non-IT Banking', value: 220, count: 56 },
  { type: 'Non-Banking', value: 150, count: 36 },
]

const slaComplianceTrend = [
  { month: 'Jan', IT: 97.5, NonIT: 94.2, NonBanking: 96.1 },
  { month: 'Feb', IT: 98.1, NonIT: 93.8, NonBanking: 95.5 },
  { month: 'Mar', IT: 96.8, NonIT: 95.1, NonBanking: 97.2 },
  { month: 'Apr', IT: 97.2, NonIT: 94.5, NonBanking: 96.8 },
  { month: 'May', IT: 98.5, NonIT: 95.8, NonBanking: 97.5 },
  { month: 'Jun', IT: 97.8, NonIT: 96.2, NonBanking: 96.2 },
]

const topVendorsBySpend = vendors.sort((a, b) => b.contractValue - a.contractValue).slice(0, 5)

const riskTrend = [
  { month: 'Jul', low: 145, medium: 58, high: 18 },
  { month: 'Aug', low: 150, medium: 55, high: 20 },
  { month: 'Sep', low: 148, medium: 60, high: 22 },
  { month: 'Oct', low: 152, medium: 62, high: 19 },
  { month: 'Nov', low: 155, medium: 65, high: 22 },
  { month: 'Dec', low: 156, medium: 67, high: 24 },
]

const KPICard = ({ icon: Icon, label, value, subValue, trend, trendValue, color }) => (
  <motion.div 
    variants={itemVariants}
    style={{
      background: 'var(--color-bg-card)',
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      border: '1px solid var(--color-border)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: 4,
      height: '100%',
      background: color || 'var(--color-accent-primary)'
    }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-md)',
            background: `${color}20` || 'rgba(0, 212, 170, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={20} style={{ color: color || 'var(--color-accent-primary)' }} />
          </div>
          <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{label}</span>
        </div>
        <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 4 }}>
          {value}
        </p>
        {subValue && (
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{subValue}</p>
        )}
      </div>
      {trend && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '4px 8px',
          borderRadius: 'var(--radius-sm)',
          background: trend === 'up' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          color: trend === 'up' ? 'var(--color-accent-success)' : 'var(--color-accent-danger)',
          fontSize: 12,
          fontWeight: 600
        }}>
          {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {trendValue}
        </div>
      )}
    </div>
  </motion.div>
)

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months')

  const formatCurrency = (value) => {
    if (value >= 100) return `₹${value}Cr`
    if (value >= 1) return `₹${value}Cr`
    return `₹${(value * 100).toFixed(0)}L`
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
              Analytics & MIS
            </h2>
            <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
              Comprehensive insights and performance metrics across all operations
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <select 
              className="form-select" 
              style={{ width: 'auto' }}
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
            <button className="btn btn-secondary">
              <RefreshCw size={18} />
              Refresh
            </button>
            <button className="btn btn-primary">
              <Download size={18} />
              Export Report
            </button>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={containerVariants} style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: 20, 
        marginBottom: 24 
      }}>
        <KPICard
          icon={Users}
          label="Total Active Vendors"
          value="312"
          subValue="Across all categories"
          trend="up"
          trendValue="+8.2%"
          color="#00d4aa"
        />
        <KPICard
          icon={IndianRupee}
          label="Total Contract Value"
          value="₹892Cr"
          subValue="YTD Spend: ₹567Cr"
          trend="up"
          trendValue="+12.5%"
          color="#3b82f6"
        />
        <KPICard
          icon={FileCheck}
          label="SLA Compliance"
          value="96.8%"
          subValue="8 breaches this month"
          trend="up"
          trendValue="+2.1%"
          color="#10b981"
        />
        <KPICard
          icon={Shield}
          label="Avg Risk Score"
          value="34"
          subValue="24 high-risk vendors"
          trend="down"
          trendValue="-5.3%"
          color="#f59e0b"
        />
      </motion.div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Vendor Growth Trend */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <h3 className="card-title">
              <TrendingUp className="card-title-icon" />
              Vendor Growth Trend
            </h3>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={vendorGrowthData}>
                  <defs>
                    <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-text-muted)" fontSize={12} />
                  <YAxis yAxisId="left" stroke="var(--color-text-muted)" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="var(--color-text-muted)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'var(--color-bg-secondary)', 
                      border: '1px solid var(--color-border)',
                      borderRadius: 8
                    }}
                  />
                  <Legend />
                  <Area yAxisId="right" type="monotone" dataKey="active" fill="url(#activeGradient)" stroke="#00d4aa" name="Active Vendors" />
                  <Bar yAxisId="left" dataKey="newVendors" fill="#3b82f6" name="New Vendors" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="left" dataKey="terminated" fill="#ef4444" name="Terminated" radius={[4, 4, 0, 0]} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Contract Value by Type */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <h3 className="card-title">
              <PieChartIcon className="card-title-icon" />
              Contract Value by Type
            </h3>
          </div>
          <div className="card-body">
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contractValueByType}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {contractValueByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#00d4aa', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'][index]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`₹${value}Cr`]}
                    contentStyle={{ 
                      background: 'var(--color-bg-secondary)', 
                      border: '1px solid var(--color-border)',
                      borderRadius: 8
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
              {contractValueByType.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ 
                      width: 10, 
                      height: 10, 
                      borderRadius: 2, 
                      background: ['#00d4aa', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'][index] 
                    }} />
                    <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{item.type}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    ₹{item.value}Cr
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* SLA Compliance Trend */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <h3 className="card-title">
              <Activity className="card-title-icon" />
              SLA Compliance by Category
            </h3>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={slaComplianceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-text-muted)" fontSize={12} />
                  <YAxis stroke="var(--color-text-muted)" fontSize={12} domain={[90, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`]}
                    contentStyle={{ 
                      background: 'var(--color-bg-secondary)', 
                      border: '1px solid var(--color-border)',
                      borderRadius: 8
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="IT" stroke="#00d4aa" strokeWidth={2} dot={{ fill: '#00d4aa' }} />
                  <Line type="monotone" dataKey="NonIT" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} name="Non-IT" />
                  <Line type="monotone" dataKey="NonBanking" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} name="Non-Banking" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Risk Distribution Trend */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <h3 className="card-title">
              <Shield className="card-title-icon" />
              Risk Distribution Trend
            </h3>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={riskTrend}>
                  <defs>
                    <linearGradient id="lowRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="mediumRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="highRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-text-muted)" fontSize={12} />
                  <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'var(--color-bg-secondary)', 
                      border: '1px solid var(--color-border)',
                      borderRadius: 8
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="low" stackId="1" stroke="#10b981" fill="url(#lowRisk)" name="Low Risk" />
                  <Area type="monotone" dataKey="medium" stackId="1" stroke="#f59e0b" fill="url(#mediumRisk)" name="Medium Risk" />
                  <Area type="monotone" dataKey="high" stackId="1" stroke="#ef4444" fill="url(#highRisk)" name="High Risk" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Vendors Table */}
      <motion.div className="card" variants={itemVariants}>
        <div className="card-header">
          <h3 className="card-title">
            <Users className="card-title-icon" />
            Top Vendors by Contract Value
          </h3>
          <button className="btn btn-secondary btn-sm">View All</button>
        </div>
        <div className="card-body">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Rank</th>
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
                {topVendorsBySpend.map((vendor, index) => (
                  <tr key={vendor.id}>
                    <td>
                      <div style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: index === 0 ? 'linear-gradient(135deg, #ffd700, #ffaa00)' :
                                   index === 1 ? 'linear-gradient(135deg, #c0c0c0, #a0a0a0)' :
                                   index === 2 ? 'linear-gradient(135deg, #cd7f32, #b87333)' :
                                   'var(--color-bg-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 700,
                        color: index < 3 ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)'
                      }}>
                        {index + 1}
                      </div>
                    </td>
                    <td>
                      <div className="vendor-info">
                        <div className="vendor-avatar" style={{
                          background: vendor.type === 'IT' ? 'var(--gradient-primary)' :
                                      vendor.type === 'Non-IT' ? 'var(--gradient-secondary)' :
                                      'linear-gradient(135deg, #f59e0b, #ef4444)'
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
                        <div style={{
                          width: 60,
                          height: 6,
                          background: 'var(--color-bg-tertiary)',
                          borderRadius: 3,
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${vendor.slaCompliance}%`,
                            height: '100%',
                            background: vendor.slaCompliance >= 98 ? 'var(--color-accent-success)' :
                                       vendor.slaCompliance >= 95 ? 'var(--color-accent-warning)' :
                                       'var(--color-accent-danger)',
                            borderRadius: 3
                          }} />
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{vendor.slaCompliance}%</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 50,
                          height: 6,
                          background: 'var(--color-bg-tertiary)',
                          borderRadius: 3,
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${vendor.riskScore}%`,
                            height: '100%',
                            background: vendor.riskScore <= 33 ? 'var(--color-accent-success)' :
                                       vendor.riskScore <= 66 ? 'var(--color-accent-warning)' :
                                       'var(--color-accent-danger)',
                            borderRadius: 3
                          }} />
                        </div>
                        <span style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: vendor.riskScore <= 33 ? 'var(--color-accent-success)' :
                                 vendor.riskScore <= 66 ? 'var(--color-accent-warning)' :
                                 'var(--color-accent-danger)'
                        }}>
                          {vendor.riskScore}
                        </span>
                      </div>
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
    </motion.div>
  )
}

export default Analytics
