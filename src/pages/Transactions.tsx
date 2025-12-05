import { useState } from 'react'
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Copy,
  Filter
} from 'lucide-react'
import { transactions, Transaction } from '../data/mockData'

type TransactionType = Transaction['type'] | 'all'
type TransactionStatus = Transaction['status'] | 'all'

const typeConfig = {
  investment: { color: 'text-primary', bg: 'bg-primary/10', icon: ArrowUpRight, label: 'Investment' },
  yield: { color: 'text-success', bg: 'bg-success/10', icon: TrendingUp, label: 'Yield' },
  withdrawal: { color: 'text-warning', bg: 'bg-warning/10', icon: ArrowDownRight, label: 'Withdrawal' },
  lease_payment: { color: 'text-primary', bg: 'bg-primary/10', icon: Clock, label: 'Lease Payment' },
}

const statusConfig = {
  completed: { color: 'text-success', bg: 'bg-success/10', icon: CheckCircle2 },
  pending: { color: 'text-warning', bg: 'bg-warning/10', icon: Clock },
  failed: { color: 'text-error', bg: 'bg-error/10', icon: XCircle },
}

export default function Transactions() {
  const [selectedType, setSelectedType] = useState<TransactionType>('all')
  const [selectedStatus, setSelectedStatus] = useState<TransactionStatus>('all')
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  const filteredTransactions = transactions
    .filter((tx) => {
      if (selectedType !== 'all' && tx.type !== selectedType) return false
      if (selectedStatus !== 'all' && tx.status !== selectedStatus) return false
      return true
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const totalInvested = transactions
    .filter((tx) => tx.type === 'investment' && tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const totalYield = transactions
    .filter((tx) => tx.type === 'yield' && tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const copyToClipboard = (hash: string) => {
    navigator.clipboard.writeText(hash)
    setCopiedHash(hash)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Transactions</h1>
        <p className="text-text-secondary mt-1">
          View all your investment and yield transactions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <p className="text-sm text-text-secondary mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-text-primary">{transactions.length}</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-sm text-text-secondary mb-1">Total Invested</p>
          <p className="text-2xl font-bold text-primary">${totalInvested.toLocaleString()}</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-sm text-text-secondary mb-1">Total Yield Received</p>
          <p className="text-2xl font-bold text-success">${totalYield.toLocaleString()}</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-sm text-text-secondary mb-1">Pending</p>
          <p className="text-2xl font-bold text-warning">
            {transactions.filter((tx) => tx.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2 text-text-secondary">
            <Filter size={18} />
            <span className="text-sm font-medium">Filter by:</span>
          </div>

          {/* Type filter */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm text-text-secondary self-center">Type:</span>
            {(['all', 'investment', 'yield', 'lease_payment'] as TransactionType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  selectedType === type
                    ? 'bg-primary text-black'
                    : 'bg-surface-2 text-text-secondary hover:text-text-primary'
                }`}
              >
                {type === 'all' ? 'All' : type === 'lease_payment' ? 'Lease' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm text-text-secondary self-center">Status:</span>
            {(['all', 'completed', 'pending', 'failed'] as TransactionStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
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

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.map((tx) => {
          const typeConf = typeConfig[tx.type]
          const statusConf = statusConfig[tx.status]
          const TypeIcon = typeConf.icon
          const StatusIcon = statusConf.icon

          return (
            <div
              key={tx.id}
              className="glass-card p-6 hover:border-primary/30 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Type Icon */}
                <div className={`w-12 h-12 rounded-full ${typeConf.bg} flex items-center justify-center shrink-0`}>
                  <TypeIcon size={24} className={typeConf.color} />
                </div>

                {/* Main Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-text-primary">{typeConf.label}</h3>
                    <span className={`badge ${statusConf.bg} ${statusConf.color}`}>
                      <StatusIcon size={12} />
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mt-1">{tx.machineName}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-mono text-xs text-text-disabled truncate max-w-[200px]">
                      {tx.txHash}
                    </span>
                    <button
                      onClick={() => copyToClipboard(tx.txHash)}
                      className="text-text-disabled hover:text-text-primary transition-colors"
                    >
                      {copiedHash === tx.txHash ? (
                        <CheckCircle2 size={14} className="text-success" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                    <a
                      href="#"
                      className="text-primary hover:text-primary-400 transition-colors"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-left lg:text-right">
                  <p className={`text-xl font-bold ${
                    tx.type === 'yield' ? 'text-success' :
                    tx.type === 'withdrawal' ? 'text-error' : 'text-text-primary'
                  }`}>
                    {tx.type === 'yield' ? '+' : tx.type === 'withdrawal' ? '-' : ''}
                    ${tx.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-text-secondary mt-1">
                    {new Date(tx.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Clock size={48} className="mx-auto text-text-disabled mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">No transactions found</h3>
          <p className="text-text-secondary">
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  )
}
