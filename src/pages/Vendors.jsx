import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  X,
  Building,
  FileText,
  Shield,
  CheckCircle
} from 'lucide-react'
import { vendors } from '../data/mockData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

const VendorCard = ({ vendor, onClick }) => {
  const getRiskColor = (score) => {
    if (score <= 33) return 'var(--color-accent-success)'
    if (score <= 66) return 'var(--color-accent-warning)'
    return 'var(--color-accent-danger)'
  }

  const getTypeGradient = (type) => {
    if (type === 'IT') return 'var(--gradient-primary)'
    if (type === 'Non-IT') return 'var(--gradient-secondary)'
    return 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'
  }

  return (
    <motion.div
      className="card"
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{ cursor: 'pointer' }}
      onClick={() => onClick(vendor)}
    >
      <div className="card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 'var(--radius-md)',
              background: getTypeGradient(vendor.type),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 700,
              color: vendor.type === 'IT' ? 'var(--color-bg-primary)' : 'white'
            }}>
              {vendor.name.charAt(0)}
            </div>
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>
                {vendor.name}
              </h4>
              <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{vendor.id}</p>
            </div>
          </div>
          <span className={`status-badge ${vendor.status.toLowerCase().replace(' ', '-')}`}>
            {vendor.status}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          <span style={{
            padding: '4px 10px',
            borderRadius: 6,
            fontSize: 12,
            background: 'rgba(100, 116, 139, 0.15)',
            color: 'var(--color-text-secondary)'
          }}>
            {vendor.category}
          </span>
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
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Contract Value</p>
            <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              ₹{(vendor.contractValue / 10000000).toFixed(1)}Cr
            </p>
          </div>
          <div>
            <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>SLA Compliance</p>
            <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {vendor.slaCompliance}%
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Risk Score</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 80,
                height: 6,
                background: 'var(--color-bg-tertiary)',
                borderRadius: 3,
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${vendor.riskScore}%`,
                  height: '100%',
                  background: getRiskColor(vendor.riskScore),
                  borderRadius: 3
                }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: getRiskColor(vendor.riskScore) }}>
                {vendor.riskScore}
              </span>
            </div>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={(e) => { e.stopPropagation() }}>
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const VendorModal = ({ vendor, onClose }) => {
  if (!vendor) return null

  const getRiskColor = (score) => {
    if (score <= 33) return 'var(--color-accent-success)'
    if (score <= 66) return 'var(--color-accent-warning)'
    return 'var(--color-accent-danger)'
  }

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal"
        style={{ maxWidth: 720 }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">Vendor Details</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {/* Vendor Header */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: 'var(--radius-lg)',
              background: vendor.type === 'IT' ? 'var(--gradient-primary)' :
                          vendor.type === 'Non-IT' ? 'var(--gradient-secondary)' :
                          'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
              color: vendor.type === 'IT' ? 'var(--color-bg-primary)' : 'white'
            }}>
              {vendor.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>
                {vendor.name}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 8 }}>{vendor.id}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className={`status-badge ${vendor.status.toLowerCase().replace(' ', '-')}`}>
                  {vendor.status}
                </span>
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
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
            <div style={{ background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', padding: 16 }}>
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>Contract Value</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                ₹{(vendor.contractValue / 10000000).toFixed(1)}Cr
              </p>
            </div>
            <div style={{ background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', padding: 16 }}>
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>SLA Compliance</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-accent-success)' }}>
                {vendor.slaCompliance}%
              </p>
            </div>
            <div style={{ background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', padding: 16 }}>
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>Risk Score</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: getRiskColor(vendor.riskScore) }}>
                {vendor.riskScore}/100
              </p>
            </div>
            <div style={{ background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', padding: 16 }}>
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>Category</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {vendor.category}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Building size={16} /> Contact Information
            </h4>
            <div style={{ background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', padding: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Users size={16} style={{ color: 'var(--color-text-muted)' }} />
                  <div>
                    <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Primary Contact</p>
                    <p style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>{vendor.primaryContact}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Mail size={16} style={{ color: 'var(--color-text-muted)' }} />
                  <div>
                    <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Email</p>
                    <p style={{ fontSize: 14, color: 'var(--color-accent-primary)' }}>{vendor.email}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Phone size={16} style={{ color: 'var(--color-text-muted)' }} />
                  <div>
                    <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Phone</p>
                    <p style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>{vendor.phone}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <MapPin size={16} style={{ color: 'var(--color-text-muted)' }} />
                  <div>
                    <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Location</p>
                    <p style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>{vendor.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contract Timeline */}
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={16} /> Contract Timeline
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', padding: 16 }}>
                <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>Onboard Date</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {new Date(vendor.onboardDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div style={{ background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', padding: 16 }}>
                <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>Renewal Date</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-accent-warning)' }}>
                  {new Date(vendor.renewalDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award size={16} /> Certifications
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {vendor.certifications.map((cert, index) => (
                <span key={index} style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 13,
                  background: 'rgba(0, 212, 170, 0.1)',
                  color: 'var(--color-accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}>
                  <CheckCircle size={14} />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button className="btn btn-primary">
            <Edit size={16} />
            Edit Vendor
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Vendors = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedVendor, setSelectedVendor] = useState(null)

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || vendor.type === selectedType
    const matchesStatus = selectedStatus === 'all' || vendor.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

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
              Vendor Management
            </h2>
            <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
              Manage all third-party vendors across IT, Non-IT, and Non-Banking operations
            </p>
          </div>
          <button className="btn btn-primary">
            <Plus size={18} />
            Add New Vendor
          </button>
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
            placeholder="Search vendors by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: 44 }}
          />
        </div>
        
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

        <select 
          className="form-select" 
          style={{ width: 160 }}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Under Review">Under Review</option>
        </select>

        <button className="btn btn-secondary">
          <Filter size={18} />
          More Filters
        </button>

        <button className="btn btn-secondary">
          <Download size={18} />
          Export
        </button>
      </motion.div>

      {/* Stats Summary */}
      <motion.div variants={itemVariants} style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: 16, 
        marginBottom: 24 
      }}>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>Total Vendors</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-primary)' }}>{vendors.length}</p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>Active</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-accent-success)' }}>
            {vendors.filter(v => v.status === 'Active').length}
          </p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>Under Review</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-accent-warning)' }}>
            {vendors.filter(v => v.status === 'Under Review').length}
          </p>
        </div>
        <div style={{ 
          background: 'var(--color-bg-card)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16,
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>Total Contract Value</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-accent-primary)' }}>
            ₹{(vendors.reduce((sum, v) => sum + v.contractValue, 0) / 10000000).toFixed(1)}Cr
          </p>
        </div>
      </motion.div>

      {/* Vendor Grid */}
      <motion.div 
        variants={containerVariants}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
          gap: 24 
        }}
      >
        {filteredVendors.map((vendor) => (
          <VendorCard 
            key={vendor.id} 
            vendor={vendor} 
            onClick={setSelectedVendor}
          />
        ))}
      </motion.div>

      {filteredVendors.length === 0 && (
        <motion.div 
          variants={itemVariants}
          style={{ 
            textAlign: 'center', 
            padding: 60,
            color: 'var(--color-text-muted)'
          }}
        >
          <Users size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
          <h3 style={{ fontSize: 18, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
            No vendors found
          </h3>
          <p>Try adjusting your search or filter criteria</p>
        </motion.div>
      )}

      {/* Vendor Detail Modal */}
      <AnimatePresence>
        {selectedVendor && (
          <VendorModal 
            vendor={selectedVendor} 
            onClose={() => setSelectedVendor(null)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Vendors
