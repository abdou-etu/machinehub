import { useState } from 'react'
import { Search, SlidersHorizontal, Grid3X3, List, TrendingUp, Package } from 'lucide-react'
import MachineCard from '../components/MachineCard'
import { machines, Machine } from '../data/mockData'

type Category = 'all' | Machine['category']
type Status = 'all' | 'available' | 'active' | 'coming_soon'

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [selectedStatus, setSelectedStatus] = useState<Status>('all')
  const [sortBy, setSortBy] = useState<'apy' | 'value' | 'available'>('apy')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'medical', label: 'Medical' },
    { value: 'construction', label: 'Construction' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'logistics', label: 'Logistics' },
  ]

  const statuses: { value: Status; label: string }[] = [
    { value: 'all', label: 'All Status' },
    { value: 'available', label: 'Available Now' },
    { value: 'active', label: 'Active' },
    { value: 'coming_soon', label: 'Coming Soon' },
  ]

  const filteredMachines = machines
    .filter((machine) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          machine.name.toLowerCase().includes(query) ||
          machine.type.toLowerCase().includes(query) ||
          machine.id.toLowerCase().includes(query)
        )
      }
      return true
    })
    .filter((machine) => {
      // Category filter
      if (selectedCategory !== 'all') {
        return machine.category === selectedCategory
      }
      return true
    })
    .filter((machine) => {
      // Status filter
      if (selectedStatus === 'available') {
        return machine.availableTokens > 0
      }
      if (selectedStatus === 'active') {
        return machine.status === 'active'
      }
      if (selectedStatus === 'coming_soon') {
        return machine.status === 'ordered' || machine.status === 'delivered'
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'apy':
          return b.estimatedAPY - a.estimatedAPY
        case 'value':
          return b.totalValue - a.totalValue
        case 'available':
          return b.availableTokens - a.availableTokens
        default:
          return 0
      }
    })

  const totalAvailable = machines.reduce((sum, m) => sum + m.availableTokens * m.tokenPrice, 0)
  const avgAPY = machines.reduce((sum, m) => sum + m.estimatedAPY, 0) / machines.length

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Marketplace</h1>
        <p className="text-text-secondary mt-1">
          Browse and invest in tokenized industrial machinery
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Package size={24} className="text-primary" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Available Machines</p>
            <p className="text-2xl font-bold text-text-primary">{machines.length}</p>
          </div>
        </div>
        <div className="glass-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
            <TrendingUp size={24} className="text-success" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Average APY</p>
            <p className="text-2xl font-bold text-success">{avgAPY.toFixed(1)}%</p>
          </div>
        </div>
        <div className="glass-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <TrendingUp size={24} className="text-primary" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Total Available Investment</p>
            <p className="text-2xl font-bold text-text-primary">${(totalAvailable / 1000000).toFixed(2)}M</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-disabled" />
            <input
              type="text"
              placeholder="Search machines by name, type, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12"
            />
          </div>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category)}
            className="input-field w-full lg:w-48"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as Status)}
            className="input-field w-full lg:w-40"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="input-field w-full lg:w-40"
          >
            <option value="apy">Highest APY</option>
            <option value="value">Highest Value</option>
            <option value="available">Most Available</option>
          </select>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-primary text-black'
                  : 'bg-surface-2 text-text-secondary hover:text-text-primary'
              }`}
            >
              <Grid3X3 size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-primary text-black'
                  : 'bg-surface-2 text-text-secondary hover:text-text-primary'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-text-secondary">
          Showing <span className="text-text-primary font-medium">{filteredMachines.length}</span> machines
        </p>
        {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setSelectedStatus('all')
            }}
            className="text-sm text-primary hover:text-primary-400 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Machine Grid */}
      {filteredMachines.length > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1'
        }`}>
          {filteredMachines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center">
          <SlidersHorizontal size={48} className="mx-auto text-text-disabled mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">No machines found</h3>
          <p className="text-text-secondary">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  )
}
