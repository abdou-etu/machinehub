import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText,
  Calendar,
  DollarSign,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  XCircle
} from 'lucide-react'
import { leases, Lease } from '../data/mockData'

type LeaseStatus = Lease['status'] | 'all'

const statusConfig = {
  active: { color: 'text-success', bg: 'bg-success/10', icon: CheckCircle2 },
  pending: { color: 'text-warning', bg: 'bg-warning/10', icon: Clock },
  expired: { color: 'text-text-disabled', bg: 'bg-text-disabled/10', icon: AlertCircle },
  terminated: { color: 'text-error', bg: 'bg-error/10', icon: XCircle },
}

export default function Leases() {
  const [selectedStatus, setSelectedStatus] = useState<LeaseStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLeases = leases
    .filter((lease) => {
      if (selectedStatus !== 'all' && lease.status !== selectedStatus) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          lease.machineName.toLowerCase().includes(query) ||
          lease.lessee.toLowerCase().includes(query) ||
          lease.id.toLowerCase().includes(query)
        )
      }
      return true
    })

  const totalMonthlyRevenue = leases
    .filter((l) => l.status === 'active')
    .reduce((sum, l) => sum + l.monthlyRate, 0)

  const totalLeaseValue = leases.reduce((sum, l) => sum + l.totalPaid, 0)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Lease Management</h1>
        <p className="text-text-secondary mt-1">
          Track and manage all active and historical leases
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-text-secondary">Total Leases</p>
              <p className="text-2xl font-bold text-text-primary">{leases.length}</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-success" />
            </div>
            <div>
              <p className="text-xs text-text-secondary">Active Leases</p>
              <p className="text-2xl font-bold text-success">
                {leases.filter((l) => l.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-text-secondary">Monthly Revenue</p>
              <p className="text-2xl font-bold text-primary">
                ${totalMonthlyRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center">
              <DollarSign size={20} className="text-text-secondary" />
            </div>
            <div>
              <p className="text-xs text-text-secondary">Total Collected</p>
              <p className="text-2xl font-bold text-text-primary">
                ${totalLeaseValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by machine, lessee, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field flex-1"
          />
          <div className="flex gap-2 flex-wrap">
            {(['all', 'active', 'pending', 'expired', 'terminated'] as LeaseStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedStatus === status
                    ? 'bg-primary text-black'
                    : 'bg-surface-2 text-text-secondary hover:text-text-primary'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leases Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-2">
              <tr>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4">Lease ID</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4">Machine</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4">Lessee</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4">Monthly Rate</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4">Duration</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4">Next Payment</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4">Status</th>
                <th className="text-left text-xs font-semibold text-text-secondary px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeases.map((lease) => {
                const config = statusConfig[lease.status]
                const StatusIcon = config.icon

                return (
                  <tr key={lease.id} className="hover:bg-surface-2/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-text-primary">{lease.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{lease.machineName}</p>
                        <p className="text-xs text-text-secondary">{lease.machineType}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-primary">{lease.lessee}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-text-primary">
                        ${lease.monthlyRate.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <Calendar size={14} />
                        <span>{lease.startDate} - {lease.endDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={14} className="text-primary" />
                        <span className="text-text-primary">{lease.nextPaymentDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${config.bg} ${config.color}`}>
                        <StatusIcon size={14} />
                        {lease.status.charAt(0).toUpperCase() + lease.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/machine/${lease.machineId}`}
                        className="flex items-center gap-1 text-sm text-primary hover:text-primary-400 transition-colors"
                      >
                        View
                        <ExternalLink size={14} />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredLeases.length === 0 && (
          <div className="p-12 text-center">
            <FileText size={48} className="mx-auto text-text-disabled mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">No leases found</h3>
            <p className="text-text-secondary">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
