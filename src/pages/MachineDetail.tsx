import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  Building2,
  Calendar,
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  Users,
  FileText,
  ExternalLink
} from 'lucide-react'
import LifecycleTracker from '../components/LifecycleTracker'
import { machines } from '../data/mockData'

export default function MachineDetail() {
  const { id } = useParams<{ id: string }>()
  const [investAmount, setInvestAmount] = useState('')
  const [showInvestModal, setShowInvestModal] = useState(false)

  const machine = machines.find((m) => m.id === id)

  if (!machine) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Machine not found</h2>
        <Link to="/marketplace" className="btn-primary">
          Back to Marketplace
        </Link>
      </div>
    )
  }

  const fundedPercent = ((machine.totalTokens - machine.availableTokens) / machine.totalTokens) * 100
  const tokenAmount = investAmount ? Math.floor(parseFloat(investAmount) / machine.tokenPrice) : 0
  const ownershipPercent = tokenAmount > 0 ? ((tokenAmount / machine.totalTokens) * 100).toFixed(4) : '0'

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Back Button */}
      <Link
        to="/marketplace"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Marketplace
      </Link>

      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="glass-card overflow-hidden">
          <div className="aspect-video">
            <img
              src={machine.image}
              alt={machine.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Lifecycle Status</h2>
            <LifecycleTracker status={machine.status} />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
              <span className="font-mono">{machine.id}</span>
              <span>|</span>
              <span>{machine.type}</span>
            </div>
            <h1 className="text-3xl font-bold text-text-primary">{machine.name}</h1>
            <p className="text-text-secondary mt-2">{machine.description}</p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center">
                <MapPin size={18} className="text-text-secondary" />
              </div>
              <div>
                <p className="text-xs text-text-disabled">Location</p>
                <p className="text-sm text-text-primary">{machine.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center">
                <Building2 size={18} className="text-text-secondary" />
              </div>
              <div>
                <p className="text-xs text-text-disabled">Manufacturer</p>
                <p className="text-sm text-text-primary">{machine.manufacturer}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center">
                <Calendar size={18} className="text-text-secondary" />
              </div>
              <div>
                <p className="text-xs text-text-disabled">Year</p>
                <p className="text-sm text-text-primary">{machine.yearManufactured}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center">
                <FileText size={18} className="text-text-secondary" />
              </div>
              <div>
                <p className="text-xs text-text-disabled">Model</p>
                <p className="text-sm text-text-primary">{machine.model}</p>
              </div>
            </div>
          </div>

          {/* Investment Stats */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Total Value</span>
              <span className="text-2xl font-bold text-text-primary">
                ${machine.totalValue.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Token Price</span>
              <span className="text-lg font-semibold text-text-primary">
                ${machine.tokenPrice}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Estimated APY</span>
              <span className="text-lg font-semibold text-success flex items-center gap-1">
                <TrendingUp size={18} />
                {machine.estimatedAPY}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Monthly Lease Rate</span>
              <span className="text-lg font-semibold text-text-primary">
                ${machine.monthlyRate.toLocaleString()}
              </span>
            </div>

            {/* Progress */}
            <div className="pt-4 border-t border-border">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary">Funding Progress</span>
                <span className="text-text-primary font-medium">{fundedPercent.toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-surface-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary-400 rounded-full"
                  style={{ width: `${fundedPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-text-disabled mt-2">
                <span>{(machine.totalTokens - machine.availableTokens).toLocaleString()} tokens sold</span>
                <span>{machine.availableTokens.toLocaleString()} available</span>
              </div>
            </div>
          </div>

          {/* Lessee Info */}
          {machine.lessee && (
            <div className="glass-card p-6">
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Shield size={18} className="text-success" />
                Active Lease
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Lessee</span>
                  <span className="text-text-primary">{machine.lessee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Lease Period</span>
                  <span className="text-text-primary">
                    {machine.leaseStartDate} - {machine.leaseEndDate}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Investment Section */}
      {machine.availableTokens > 0 && (
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Invest in This Machine</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Investment Amount (USD)
                </label>
                <div className="relative">
                  <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-disabled" />
                  <input
                    type="number"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="0"
                    max={machine.availableTokens * machine.tokenPrice}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface-2 rounded-lg">
                  <p className="text-sm text-text-secondary">Tokens to Receive</p>
                  <p className="text-2xl font-bold text-primary">{tokenAmount.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-surface-2 rounded-lg">
                  <p className="text-sm text-text-secondary">Ownership Percentage</p>
                  <p className="text-2xl font-bold text-text-primary">{ownershipPercent}%</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="btn-primary flex-1"
                  disabled={tokenAmount <= 0}
                  onClick={() => setShowInvestModal(true)}
                >
                  Invest Now
                </button>
                <button className="btn-secondary flex-1">
                  Add to Watchlist
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-surface-2 rounded-lg flex items-start gap-3">
                <Clock size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Smart Contract</p>
                  <p className="text-xs text-text-secondary">
                    Yield distributed automatically via Daml smart contracts
                  </p>
                </div>
              </div>
              <div className="p-4 bg-surface-2 rounded-lg flex items-start gap-3">
                <Shield size={18} className="text-success shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Canton Privacy</p>
                  <p className="text-xs text-text-secondary">
                    Your investment data is kept private on the Canton Network
                  </p>
                </div>
              </div>
              <div className="p-4 bg-surface-2 rounded-lg flex items-start gap-3">
                <Users size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Fractional Ownership</p>
                  <p className="text-xs text-text-secondary">
                    Own a piece of industrial equipment with as little as ${machine.tokenPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Investment Modal */}
      {showInvestModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass-card p-8 max-w-md w-full animate-fade-in">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Confirm Investment</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-text-secondary">Machine</span>
                <span className="text-text-primary font-medium">{machine.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-text-secondary">Investment Amount</span>
                <span className="text-text-primary font-medium">${parseFloat(investAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-text-secondary">Tokens to Receive</span>
                <span className="text-primary font-medium">{tokenAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-text-secondary">Est. Annual Yield</span>
                <span className="text-success font-medium">
                  ${((parseFloat(investAmount) * machine.estimatedAPY) / 100).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowInvestModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button className="btn-primary flex-1">
                Confirm Investment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
