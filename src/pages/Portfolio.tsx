import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  DollarSign,
  TrendingUp,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Coins
} from 'lucide-react'
import StatCard from '../components/StatCard'
import LifecycleTracker from '../components/LifecycleTracker'
import { investments, portfolioSummary } from '../data/mockData'
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

// Fix for Recharts + React 18 type compatibility
const PieComponent = Pie as any
const TooltipComponent = Tooltip as any

const COLORS = ['#00A79D', '#00E0CF', '#10B981', '#F59E0B']

export default function Portfolio() {
  const [selectedView, setSelectedView] = useState<'all' | 'active' | 'pending'>('all')

  const pieData = investments.map((inv, index) => ({
    name: inv.machineName,
    value: inv.currentValue,
    color: COLORS[index % COLORS.length]
  }))

  const totalGains = portfolioSummary.currentValue - portfolioSummary.totalInvested
  const totalGainsPercent = ((totalGains / portfolioSummary.totalInvested) * 100).toFixed(2)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Portfolio</h1>
          <p className="text-text-secondary mt-1">
            Manage your tokenized machine investments
          </p>
        </div>
        <Link to="/marketplace" className="btn-primary">
          <Coins size={20} />
          Invest in Machines
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Portfolio Value"
          value={`$${portfolioSummary.currentValue.toLocaleString()}`}
          icon={DollarSign}
          variant="primary"
        />
        <StatCard
          title="Total Invested"
          value={`$${portfolioSummary.totalInvested.toLocaleString()}`}
          icon={ArrowUpRight}
        />
        <StatCard
          title="Total Gains"
          value={`$${totalGains.toLocaleString()}`}
          subtitle={`+${totalGainsPercent}% return`}
          icon={TrendingUp}
          variant="success"
        />
        <StatCard
          title="Pending Yield"
          value={`$${portfolioSummary.pendingYield.toLocaleString()}`}
          subtitle="Claimable now"
          icon={Coins}
          variant="primary"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Allocation Chart */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Portfolio Allocation</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <PieComponent
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </PieComponent>
                <TooltipComponent
                  contentStyle={{
                    backgroundColor: '#1E1E1E',
                    border: '1px solid #2D2D2D',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-text-secondary truncate max-w-[150px]">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-text-primary">${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Investments List */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">Your Investments</h2>
            <div className="flex gap-2">
              {(['all', 'active', 'pending'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setSelectedView(view)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedView === view
                      ? 'bg-primary text-black'
                      : 'bg-surface-2 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {investments.map((investment) => {
              const gains = investment.currentValue - investment.investmentValue
              const gainsPercent = ((gains / investment.investmentValue) * 100).toFixed(2)
              const isPositive = gains >= 0

              return (
                <Link
                  key={investment.machineId}
                  to={`/machine/${investment.machineId}`}
                  className="block p-4 rounded-lg bg-surface-2 hover:bg-surface-2/80 border border-transparent hover:border-primary/30 transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Machine Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-text-primary truncate">
                          {investment.machineName}
                        </h3>
                        <ExternalLink size={14} className="text-text-disabled shrink-0" />
                      </div>
                      <p className="text-sm text-text-secondary">{investment.machineType}</p>
                      <p className="font-mono text-xs text-text-disabled mt-1">{investment.machineId}</p>
                    </div>

                    {/* Tokens */}
                    <div className="text-left lg:text-center">
                      <p className="text-xs text-text-secondary">Tokens Owned</p>
                      <p className="font-semibold text-text-primary">
                        {investment.tokensOwned.toLocaleString()}
                        <span className="text-text-disabled font-normal">
                          /{investment.totalTokens.toLocaleString()}
                        </span>
                      </p>
                      <p className="text-xs text-text-disabled">
                        {((investment.tokensOwned / investment.totalTokens) * 100).toFixed(1)}% ownership
                      </p>
                    </div>

                    {/* Value */}
                    <div className="text-left lg:text-center">
                      <p className="text-xs text-text-secondary">Current Value</p>
                      <p className="font-semibold text-text-primary">
                        ${investment.currentValue.toLocaleString()}
                      </p>
                      <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-success' : 'text-error'}`}>
                        {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        <span>{isPositive ? '+' : ''}{gainsPercent}%</span>
                      </div>
                    </div>

                    {/* Yield */}
                    <div className="text-left lg:text-center">
                      <p className="text-xs text-text-secondary">Earned Yield</p>
                      <p className="font-semibold text-success">
                        ${investment.earnedYield.toLocaleString()}
                      </p>
                      <p className="text-xs text-primary">
                        +${investment.pendingYield.toLocaleString()} pending
                      </p>
                    </div>

                    {/* Status */}
                    <div className="text-left lg:text-right">
                      <p className="text-xs text-text-secondary mb-2">Status</p>
                      <LifecycleTracker status={investment.status} compact />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Claim Yield CTA */}
      {portfolioSummary.pendingYield > 0 && (
        <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <TrendingUp size={24} className="text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">Pending Yield Available</h3>
              <p className="text-sm text-text-secondary">
                You have <span className="text-success font-medium">${portfolioSummary.pendingYield.toLocaleString()}</span> in unclaimed yield
              </p>
            </div>
          </div>
          <button className="btn-primary">
            Claim All Yield
          </button>
        </div>
      )}
    </div>
  )
}
