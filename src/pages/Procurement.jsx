import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Calendar,
  IndianRupee,
  ArrowRight,
  Eye,
  Edit,
  MoreVertical,
  Briefcase,
  FileCheck
} from 'lucide-react'
import { procurements } from '../data/mockData'

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

const stages = [
  { id: 'requirement', label: 'Requirement Gathering', icon: FileText },
  { id: 'committee', label: 'Committee Review', icon: Users },
  { id: 'rfp', label: 'RFP Published', icon: Briefcase },
  { id: 'evaluation', label: 'Technical Evaluation', icon: FileCheck },
  { id: 'finalization', label: 'Contract Finalization', icon: CheckCircle },
]

const getStageIndex = (stageName) => {
  const stageMap = {
    'Requirement Gathering': 0,
    'Committee Review': 1,
    'RFP Published': 2,
    'Technical Evaluation': 3,
    'Contract Finalization': 4,
  }
  return stageMap[stageName] || 0
}

const ProcurementCard = ({ procurement }) => {
  const currentStage = getStageIndex(procurement.stage)
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <CheckCircle size={16} />
      case 'In Progress': return <Clock size={16} />
      case 'Pending': return <AlertCircle size={16} />
      case 'Draft': return <FileText size={16} />
      default: return <Clock size={16} />
    }
  }

  const getTypeColor = (type) => {
    if (type === 'IT') return { bg: 'rgba(0, 212, 170, 0.1)', color: 'var(--color-accent-primary)' }
    if (type === 'Non-IT') return { bg: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-accent-secondary)' }
    return { bg: 'rgba(139, 92, 246, 0.1)', color: 'var(--color-accent-tertiary)' }
  }

  const typeStyle = getTypeColor(procurement.type)

  return (
    <motion.div className="card" variants={itemVariants}>
      <div className="card-body">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{procurement.id}</span>
              <span style={{
                padding: '2px 8px',
                borderRadius: 4,
                fontSize: 11,
                background: typeStyle.bg,
                color: typeStyle.color
              }}>
                {procurement.type}
              </span>
            </div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>
              {procurement.title}
            </h4>
            <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{procurement.department}</p>
          </div>
          <span className={`status-badge ${procurement.status.toLowerCase().replace(' ', '-')}`}>
            {getStatusIcon(procurement.status)}
            {procurement.status}
          </span>
        </div>

        {/* Stage Progress */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Current Stage</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-accent-primary)' }}>
              {procurement.stage}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {stages.map((stage, index) => (
              <div key={stage.id} style={{ flex: 1, position: 'relative' }}>
                <div style={{
                  height: 4,
                  borderRadius: 2,
                  background: index <= currentStage ? 'var(--color-accent-primary)' : 'var(--color-bg-tertiary)',
                  transition: 'background 0.3s ease'
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <IndianRupee size={12} style={{ color: 'var(--color-text-muted)' }} />
              <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Est. Value</span>
            </div>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              ₹{(procurement.estimatedValue / 10000000).toFixed(0)}Cr
            </p>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <Users size={12} style={{ color: 'var(--color-text-muted)' }} />
              <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Vendors</span>
            </div>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {procurement.vendorCount}
            </p>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <Calendar size={12} style={{ color: 'var(--color-text-muted)' }} />
              <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Submitted</span>
            </div>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {procurement.submittedDate ? 
                new Date(procurement.submittedDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 
                '-'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary btn-sm">
              <Eye size={14} />
              View
            </button>
            <button className="btn btn-secondary btn-sm">
              <Edit size={14} />
              Edit
            </button>
          </div>
          <button className="btn btn-primary btn-sm">
            Next Stage
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const Procurement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  const filteredProcurements = procurements.filter(proc => {
    const matchesSearch = proc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proc.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || proc.status === selectedStatus
    const matchesType = selectedType === 'all' || proc.type === selectedType
    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    total: procurements.length,
    approved: procurements.filter(p => p.status === 'Approved').length,
    inProgress: procurements.filter(p => p.status === 'In Progress').length,
    pending: procurements.filter(p => p.status === 'Pending').length,
    totalValue: procurements.reduce((sum, p) => sum + p.estimatedValue, 0),
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
              Procurement Management
            </h2>
            <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
              Manage RFPs, vendor evaluations, and procurement workflows
            </p>
          </div>
          <button className="btn btn-primary">
            <Plus size={18} />
            New Procurement
          </button>
        </div>
      </motion.div>

      {/* Stats */}
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
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>Total Procurements</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)' }}>{stats.total}</p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 20,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>Approved</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-accent-success)' }}>{stats.approved}</p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 20,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>In Progress</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-accent-secondary)' }}>{stats.inProgress}</p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 20,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>Pending Approval</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-accent-warning)' }}>{stats.pending}</p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 20,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>Total Est. Value</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-accent-primary)' }}>
            ₹{(stats.totalValue / 10000000).toFixed(0)}Cr
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} style={{ 
        display: 'flex', 
        gap: 16, 
        marginBottom: 24, 
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 280 }}>
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
            placeholder="Search procurements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: 44 }}
          />
        </div>
        
        <select 
          className="form-select" 
          style={{ width: 160 }}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Approved">Approved</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
          <option value="Draft">Draft</option>
        </select>

        <select 
          className="form-select" 
          style={{ width: 160 }}
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="IT">IT</option>
          <option value="Non-IT">Non-IT</option>
          <option value="Non-Banking">Non-Banking</option>
        </select>

        <button className="btn btn-secondary">
          <Filter size={18} />
          More Filters
        </button>
      </motion.div>

      {/* Procurement Cards Grid */}
      <motion.div 
        variants={containerVariants}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
          gap: 24 
        }}
      >
        {filteredProcurements.map((procurement) => (
          <ProcurementCard key={procurement.id} procurement={procurement} />
        ))}
      </motion.div>

      {filteredProcurements.length === 0 && (
        <motion.div 
          variants={itemVariants}
          style={{ 
            textAlign: 'center', 
            padding: 60,
            color: 'var(--color-text-muted)'
          }}
        >
          <FileText size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
          <h3 style={{ fontSize: 18, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
            No procurements found
          </h3>
          <p>Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Procurement
