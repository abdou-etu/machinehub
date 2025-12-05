import { Link } from 'react-router-dom'
import { Machine } from '../data/mockData'
import LifecycleTracker from './LifecycleTracker'
import { TrendingUp, MapPin, Building2 } from 'lucide-react'

interface MachineCardProps {
  machine: Machine
}

const categoryColors: Record<Machine['category'], string> = {
  medical: 'text-blue-400 bg-blue-400/10',
  construction: 'text-orange-400 bg-orange-400/10',
  manufacturing: 'text-purple-400 bg-purple-400/10',
  logistics: 'text-green-400 bg-green-400/10',
}

export default function MachineCard({ machine }: MachineCardProps) {
  const availablePercent = (machine.availableTokens / machine.totalTokens) * 100
  const fundedPercent = 100 - availablePercent

  return (
    <Link to={`/machine/${machine.id}`} className="block">
      <div className="glass-card overflow-hidden group animate-fade-in">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={machine.image}
            alt={machine.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Category badge */}
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${categoryColors[machine.category]}`}>
            {machine.category.charAt(0).toUpperCase() + machine.category.slice(1)}
          </span>

          {/* Status */}
          <div className="absolute bottom-3 left-3">
            <LifecycleTracker status={machine.status} compact />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
              {machine.name}
            </h3>
            <p className="text-sm text-text-secondary mt-1">{machine.type}</p>
            <p className="font-mono text-xs text-text-disabled mt-1">{machine.id}</p>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
            <MapPin size={14} />
            <span>{machine.location}</span>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-text-secondary">Total Value</p>
              <p className="text-sm font-semibold text-text-primary">
                ${machine.totalValue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Token Price</p>
              <p className="text-sm font-semibold text-text-primary">
                ${machine.tokenPrice}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Est. APY</p>
              <p className="text-sm font-semibold text-success flex items-center gap-1">
                <TrendingUp size={14} />
                {machine.estimatedAPY}%
              </p>
            </div>
          </div>

          {/* Funding progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-text-secondary">Funding Progress</span>
              <span className="text-text-primary font-medium">{fundedPercent.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary-400 rounded-full transition-all duration-500"
                style={{ width: `${fundedPercent}%` }}
              />
            </div>
            <p className="text-xs text-text-disabled mt-2">
              {machine.availableTokens.toLocaleString()} / {machine.totalTokens.toLocaleString()} tokens available
            </p>
          </div>

          {/* Lessee info */}
          {machine.lessee && (
            <div className="flex items-center gap-2 text-sm text-text-secondary pt-4 border-t border-border">
              <Building2 size={14} />
              <span>Leased to {machine.lessee}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
