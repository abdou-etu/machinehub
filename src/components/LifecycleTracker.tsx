import { MachineStatus } from '../data/mockData'
import { Package, Truck, Activity, Wrench, Archive } from 'lucide-react'

interface LifecycleTrackerProps {
  status: MachineStatus
  compact?: boolean
}

const stages: { key: MachineStatus; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { key: 'ordered', label: 'Ordered', icon: Package },
  { key: 'delivered', label: 'Delivered', icon: Truck },
  { key: 'active', label: 'Active', icon: Activity },
  { key: 'maintenance', label: 'Maintenance', icon: Wrench },
  { key: 'retired', label: 'Retired', icon: Archive },
]

const statusIndex: Record<MachineStatus, number> = {
  ordered: 0,
  delivered: 1,
  active: 2,
  maintenance: 3,
  retired: 4,
}

export default function LifecycleTracker({ status, compact = false }: LifecycleTrackerProps) {
  const currentIndex = statusIndex[status]

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {stages.map((stage, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          const Icon = stage.icon

          return (
            <div key={stage.key} className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'bg-success text-black animate-pulse-glow'
                    : isCompleted
                    ? 'bg-text-disabled/50 text-text-disabled'
                    : 'border border-border text-text-disabled'
                }`}
              >
                <Icon size={12} />
              </div>
              {index < stages.length - 1 && (
                <div
                  className={`w-4 h-0.5 ${
                    index < currentIndex ? 'bg-success' : 'bg-border'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-success transition-all duration-500"
          style={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
        />

        {stages.map((stage, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          const Icon = stage.icon

          return (
            <div key={stage.key} className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'bg-success text-black animate-pulse-glow'
                    : isCompleted
                    ? 'bg-text-disabled/50 text-text-disabled'
                    : 'bg-surface border border-border text-text-disabled'
                }`}
              >
                <Icon size={16} />
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isCurrent
                    ? 'text-success'
                    : isCompleted
                    ? 'text-text-disabled'
                    : 'text-text-disabled'
                }`}
              >
                {stage.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
