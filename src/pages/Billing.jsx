import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CreditCard,
  IndianRupee,
  Receipt,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Send,
  Calendar,
  Building,
  TrendingUp
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { billingRecords } from '../data/mockData'

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

const monthlyBillingData = [
  { month: 'Jul', invoiced: 85, paid: 78, pending: 7 },
  { month: 'Aug', invoiced: 92, paid: 85, pending: 7 },
  { month: 'Sep', invoiced: 88, paid: 82, pending: 6 },
  { month: 'Oct', invoiced: 105, paid: 95, pending: 10 },
  { month: 'Nov', invoiced: 98, paid: 88, pending: 10 },
  { month: 'Dec', invoiced: 115, paid: 92, pending: 23 },
]

const BillingCard = ({ bill }) => {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-accent-success)', icon: CheckCircle }
      case 'approved':
        return { bg: 'rgba(0, 212, 170, 0.1)', color: 'var(--color-accent-primary)', icon: CheckCircle }
      case 'pending':
        return { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-accent-warning)', icon: Clock }
      case 'on hold':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-accent-danger)', icon: AlertTriangle }
      case 'rejected':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-accent-danger)', icon: XCircle }
      default:
        return { bg: 'rgba(100, 116, 139, 0.1)', color: 'var(--color-text-muted)', icon: Clock }
    }
  }

  const statusStyle = getStatusStyle(bill.status)
  const StatusIcon = statusStyle.icon

  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`
    return `₹${amount.toLocaleString()}`
  }

  return (
    <motion.div className="card" variants={itemVariants} whileHover={{ y: -4 }}>
      <div className="card-body">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Receipt size={14} style={{ color: 'var(--color-text-muted)' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {bill.invoiceNo}
              </span>
            </div>
            <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>
              {bill.vendorName}
            </h4>
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{bill.vendorId}</p>
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
            {bill.status}
          </div>
        </div>

        {/* Amount Breakdown */}
        <div style={{ 
          background: 'var(--color-bg-tertiary)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16, 
          marginBottom: 16 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Base Amount</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {formatCurrency(bill.amount)}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>GST (18%)</span>
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
              + {formatCurrency(bill.gst)}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>TDS (10%)</span>
            <span style={{ fontSize: 13, color: 'var(--color-accent-danger)' }}>
              - {formatCurrency(bill.tds)}
            </span>
          </div>
          <div style={{ 
            borderTop: '1px solid var(--color-border)', 
            paddingTop: 12, 
            display: 'flex', 
            justifyContent: 'space-between' 
          }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>Net Payable</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-accent-primary)' }}>
              {formatCurrency(bill.netPayable)}
            </span>
          </div>
        </div>

        {/* Hold Reason (if applicable) */}
        {bill.holdReason && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: 'var(--radius-sm)',
            padding: 12,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <AlertTriangle size={16} style={{ color: 'var(--color-accent-danger)' }} />
            <span style={{ fontSize: 13, color: 'var(--color-accent-danger)' }}>{bill.holdReason}</span>
          </div>
        )}

        {/* Dates */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calendar size={14} style={{ color: 'var(--color-text-muted)' }} />
            <div>
              <p style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>Submitted</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {new Date(bill.submittedDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={14} style={{ color: 'var(--color-text-muted)' }} />
            <div>
              <p style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>Due Date</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-warning)' }}>
                {new Date(bill.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
            <Eye size={14} />
            View
          </button>
          {bill.status === 'Approved' && (
            <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>
              <Send size={14} />
              Process Payment
            </button>
          )}
          {bill.status === 'Pending' && (
            <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>
              <CheckCircle size={14} />
              Approve
            </button>
          )}
          {bill.status === 'On Hold' && (
            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
              <AlertTriangle size={14} />
              Review
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const Billing = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredBills = billingRecords.filter(bill => {
    const matchesSearch = bill.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.vendorId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || bill.status.toLowerCase() === selectedStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
    return `₹${amount.toLocaleString()}`
  }

  const stats = {
    totalInvoiced: billingRecords.reduce((sum, b) => sum + b.amount, 0),
    totalPayable: billingRecords.reduce((sum, b) => sum + b.netPayable, 0),
    paid: billingRecords.filter(b => b.status === 'Paid').reduce((sum, b) => sum + b.netPayable, 0),
    pending: billingRecords.filter(b => b.status === 'Pending' || b.status === 'Approved').reduce((sum, b) => sum + b.netPayable, 0),
    onHold: billingRecords.filter(b => b.status === 'On Hold').reduce((sum, b) => sum + b.netPayable, 0),
    invoiceCount: billingRecords.length
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
              Billing & Payments
            </h2>
            <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
              Manage vendor invoices, payments, and financial reconciliation
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-secondary">
              <Download size={18} />
              Export
            </button>
            <button className="btn btn-primary">
              <Plus size={18} />
              New Invoice
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)', 
        gap: 16, 
        marginBottom: 24 
      }}>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 20,
          border: '1px solid var(--color-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Receipt size={16} style={{ color: 'var(--color-text-muted)' }} />
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Total Invoices</p>
          </div>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)' }}>{stats.invoiceCount}</p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 20,
          border: '1px solid var(--color-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <IndianRupee size={16} style={{ color: 'var(--color-text-muted)' }} />
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Total Payable</p>
          </div>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {formatCurrency(stats.totalPayable)}
          </p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 20,
          border: '1px solid var(--color-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <CheckCircle size={16} style={{ color: 'var(--color-accent-success)' }} />
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Paid</p>
          </div>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-accent-success)' }}>
            {formatCurrency(stats.paid)}
          </p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 20,
          border: '1px solid var(--color-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Clock size={16} style={{ color: 'var(--color-accent-warning)' }} />
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Pending</p>
          </div>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-accent-warning)' }}>
            {formatCurrency(stats.pending)}
          </p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 20,
          border: '1px solid var(--color-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <AlertTriangle size={16} style={{ color: 'var(--color-accent-danger)' }} />
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>On Hold</p>
          </div>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-accent-danger)' }}>
            {formatCurrency(stats.onHold)}
          </p>
        </div>
      </motion.div>

      {/* Monthly Billing Chart */}
      <motion.div className="card" variants={itemVariants} style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h3 className="card-title">
            <TrendingUp className="card-title-icon" />
            Monthly Billing Overview (in Lakhs)
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
              <BarChart data={monthlyBillingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-text-muted)" fontSize={12} />
                <YAxis stroke="var(--color-text-muted)" fontSize={12} tickFormatter={(v) => `₹${v}L`} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--color-bg-secondary)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: 8
                  }}
                  formatter={(value) => [`₹${value}L`]}
                />
                <Legend />
                <Bar dataKey="invoiced" name="Invoiced" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="paid" name="Paid" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
            placeholder="Search by vendor or invoice number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: 44 }}
          />
        </div>
        
        <div className="tabs" style={{ marginBottom: 0 }}>
          {['all', 'pending', 'approved', 'paid', 'on hold'].map((status) => (
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

      {/* Billing Cards Grid */}
      <motion.div 
        variants={containerVariants}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
          gap: 24 
        }}
      >
        {filteredBills.map((bill) => (
          <BillingCard key={bill.id} bill={bill} />
        ))}
      </motion.div>

      {filteredBills.length === 0 && (
        <motion.div 
          variants={itemVariants}
          style={{ 
            textAlign: 'center', 
            padding: 60,
            color: 'var(--color-text-muted)'
          }}
        >
          <CreditCard size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
          <h3 style={{ fontSize: 18, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
            No invoices found
          </h3>
          <p>Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Billing
