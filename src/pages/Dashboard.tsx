import {
  DollarSign,
  TrendingUp,
  Activity,
  Users,
  BarChart3,
  ArrowUpRight,
  Clock
} from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import MachineCard from '../components/MachineCard'
import { machines, portfolioSummary, platformStats, transactions } from '../data/mockData'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

// Fix for Recharts + React 18 type compatibility
const XAxisComponent = XAxis as any
const YAxisComponent = YAxis as any
const TooltipComponent = Tooltip as any
const AreaComponent = Area as any

// Mock chart data
const yieldData = [
  { month: 'Jun', yield: 2400 },
  { month: 'Jul', yield: 3200 },
  { month: 'Aug', yield: 4100 },
  { month: 'Sep', yield: 3800 },
  { month: 'Oct', yield: 5200 },
  { month: 'Nov', yield: 4800 },
]

export default function Dashboard() {
  const activeMachines = machines.filter(m => m.status === 'active')
  const recentTransactions = transactions.slice(0, 4)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-1">
          Welcome back! Here's your portfolio overview.
        </p>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Portfolio Value"
          value={`$${portfolioSummary.currentValue.toLocaleString()}`}
          subtitle={`Invested: $${portfolioSummary.totalInvested.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 9.8, positive: true }}
          variant="primary"
        />
        <StatCard
          title="Total Yield Earned"
          value={`$${portfolioSummary.totalEarned.toLocaleString()}`}
          subtitle={`Pending: $${portfolioSummary.pendingYield.toLocaleString()}`}
          icon={TrendingUp}
          variant="success"
        />
        <StatCard
          title="Average APY"
          value={`${portfolioSummary.averageAPY}%`}
          subtitle="Across all investments"
          icon={BarChart3}
          trend={{ value: 0.5, positive: true }}
        />
        <StatCard
          title="Active Investments"
          value={portfolioSummary.machinesInvested}
          subtitle={`${portfolioSummary.activeLeases} with active leases`}
          icon={Activity}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Yield Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Yield Performance</h2>
              <p className="text-sm text-text-secondary">Monthly yield distribution</p>
            </div>
            <select className="input-field w-auto text-sm py-2">
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yieldData}>
                <defs>
                  <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A79D" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00A79D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxisComponent
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A1A1AA', fontSize: 12 }}
                />
                <YAxisComponent
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A1A1AA', fontSize: 12 }}
                  tickFormatter={(value: number) => `$${value}`}
                />
                <TooltipComponent
                  contentStyle={{
                    backgroundColor: '#1E1E1E',
                    border: '1px solid #2D2D2D',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                  }}
                  labelStyle={{ color: '#E4E4E7' }}
                  itemStyle={{ color: '#00A79D' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Yield']}
                />
                <AreaComponent
                  type="monotone"
                  dataKey="yield"
                  stroke="#00A79D"
                  strokeWidth={2}
                  fill="url(#yieldGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">Recent Activity</h2>
            <Link to="/transactions" className="text-sm text-primary hover:text-primary-400 transition-colors">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-4 p-3 rounded-lg bg-surface-2 hover:bg-surface-2/80 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'yield' ? 'bg-success/10' :
                  tx.type === 'investment' ? 'bg-primary/10' : 'bg-warning/10'
                }`}>
                  {tx.type === 'yield' ? (
                    <TrendingUp size={18} className="text-success" />
                  ) : tx.type === 'investment' ? (
                    <ArrowUpRight size={18} className="text-primary" />
                  ) : (
                    <Clock size={18} className="text-warning" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {tx.type === 'yield' ? 'Yield Received' :
                     tx.type === 'investment' ? 'Investment' : 'Lease Payment'}
                  </p>
                  <p className="text-xs text-text-secondary truncate">{tx.machineName}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${
                    tx.type === 'yield' ? 'text-success' : 'text-text-primary'
                  }`}>
                    {tx.type === 'yield' ? '+' : ''}${tx.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-text-disabled">
                    {new Date(tx.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Platform Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">${(platformStats.totalValueLocked / 1000000).toFixed(1)}M</p>
            <p className="text-sm text-text-secondary mt-1">Total Value Locked</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text-primary">{platformStats.activeMachines}</p>
            <p className="text-sm text-text-secondary mt-1">Active Machines</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text-primary">{platformStats.totalInvestors.toLocaleString()}</p>
            <p className="text-sm text-text-secondary mt-1">Total Investors</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{platformStats.averageAPY}%</p>
            <p className="text-sm text-text-secondary mt-1">Avg. APY</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text-primary">${(platformStats.monthlyVolume / 1000000).toFixed(1)}M</p>
            <p className="text-sm text-text-secondary mt-1">Monthly Volume</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text-primary">${(platformStats.totalLeasePayments / 1000000).toFixed(1)}M</p>
            <p className="text-sm text-text-secondary mt-1">Total Lease Payments</p>
          </div>
        </div>
      </div>

      {/* Featured Machines */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Featured Opportunities</h2>
            <p className="text-sm text-text-secondary">High-yield machines available for investment</p>
          </div>
          <Link to="/marketplace" className="btn-secondary btn-sm">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeMachines.slice(0, 3).map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>
      </div>
    </div>
  )
}
