import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: number
    positive: boolean
  }
  variant?: 'default' | 'primary' | 'success' | 'warning'
}

const variantStyles = {
  default: 'text-text-primary',
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
}

const iconBgStyles = {
  default: 'bg-surface-2',
  primary: 'bg-primary/10',
  success: 'bg-success/10',
  warning: 'bg-warning/10',
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default'
}: StatCardProps) {
  return (
    <div className="stat-card animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-text-secondary mb-1">{title}</p>
          <p className={`text-2xl font-bold ${variantStyles[variant]}`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="text-xs text-text-disabled mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trend.positive ? 'text-success' : 'text-error'}`}>
              <span>{trend.positive ? '+' : ''}{trend.value}%</span>
              <span className="text-text-disabled">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconBgStyles[variant]}`}>
          <Icon size={24} className={variantStyles[variant]} />
        </div>
      </div>
    </div>
  )
}
