# TPLMS - Third Party Lifecycle Management System

A comprehensive enterprise-grade Proof of Concept for managing third-party vendor relationships across IT, Non-IT, and Non-Banking operations. Built for State Bank of India's TPLMS requirements.

## 🎯 Features

### Core Modules

1. **Dashboard**
   - Real-time KPIs and metrics
   - Vendor distribution charts
   - Spend trend analysis
   - Risk distribution overview
   - Recent activities feed

2. **Vendor Management**
   - Comprehensive vendor profiles
   - Search and filter capabilities
   - Contract value tracking
   - SLA compliance monitoring
   - Risk score visualization

3. **Procurement**
   - RFP lifecycle management
   - Multi-stage workflow tracking
   - Approval status monitoring
   - Vendor evaluation pipeline

4. **SLA Management**
   - SLA performance tracking
   - Breach detection and alerts
   - Penalty calculations
   - Compliance trend analysis

5. **Risk & Compliance**
   - Automated risk scoring
   - Compliance checklist management
   - Risk radar visualization
   - Regulatory compliance tracking

6. **Billing & Payments**
   - Invoice management
   - GST/TDS calculations
   - Payment status tracking
   - Monthly billing analytics

7. **Analytics & MIS**
   - Comprehensive reporting
   - Trend analysis
   - Performance metrics
   - Export capabilities

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router v6
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: Custom CSS with CSS Variables

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd TPLMS

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
TPLMS/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── pages/
│   │   ├── Analytics.jsx
│   │   ├── Billing.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Procurement.jsx
│   │   ├── RiskCompliance.jsx
│   │   ├── SLAManagement.jsx
│   │   └── Vendors.jsx
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design System

### Color Palette

- **Primary**: `#00d4aa` (Teal)
- **Secondary**: `#3b82f6` (Blue)
- **Tertiary**: `#8b5cf6` (Purple)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Orange)
- **Danger**: `#ef4444` (Red)

### Typography

- **Sans-serif**: DM Sans
- **Serif**: Instrument Serif (for headings)

## 📋 Reference Document

This POC is based on SBI's EOI document:
- Reference: SBI:TPM:CC:EOI:2025-26:01
- Dated: 05.12.2025

## 📄 License

This is a Proof of Concept developed for demonstration purposes.
