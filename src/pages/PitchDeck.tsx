import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Shield,
  Zap,
  TrendingUp,
  Building2,
  Users,
  Lock,
  RefreshCw,
  DollarSign,
  Target,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Globe,
  Cpu
} from 'lucide-react'

interface Slide {
  id: number
  title: string
  content: React.ReactNode
}

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides: Slide[] = [
    {
      id: 1,
      title: 'Title',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mb-8">
            <Layers size={40} className="text-black" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-4">
            Machine-as-a-Service
          </h1>
          <p className="text-2xl md:text-3xl text-primary font-semibold mb-6">
            Smart Leasing Protocol
          </p>
          <p className="text-xl text-text-secondary max-w-2xl">
            Tokenized Fractional Ownership of Industrial Equipment
          </p>
          <div className="mt-12 flex items-center gap-4">
            <div className="px-4 py-2 bg-surface-2 rounded-lg border border-border">
              <span className="text-sm text-text-secondary">Built on</span>
              <span className="text-sm text-primary font-semibold ml-2">Canton Network</span>
            </div>
            <div className="px-4 py-2 bg-surface-2 rounded-lg border border-border">
              <span className="text-sm text-text-secondary">Powered by</span>
              <span className="text-sm text-primary font-semibold ml-2">Daml Smart Contracts</span>
            </div>
          </div>
          <p className="mt-12 text-sm text-text-disabled">Canton Construct Ideathon 2025</p>
        </div>
      )
    },
    {
      id: 2,
      title: 'Problem',
      content: (
        <div className="h-full flex flex-col justify-center px-8 md:px-16">
          <div className="flex items-center gap-3 mb-8">
            <Target size={32} className="text-error" />
            <h2 className="text-4xl font-bold text-text-primary">The Problem</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <Building2 className="text-warning" size={24} />
                  For Enterprises
                </h3>
                <ul className="space-y-3 text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-error mt-1">•</span>
                    Heavy CapEx burden for industrial equipment ($100K - $5M+)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-error mt-1">•</span>
                    Assets depreciate while sitting idle
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-error mt-1">•</span>
                    Complex maintenance and lifecycle management
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-error mt-1">•</span>
                    Limited flexibility in scaling operations
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <Users className="text-warning" size={24} />
                  For Investors
                </h3>
                <ul className="space-y-3 text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-error mt-1">•</span>
                    Limited access to real asset investments
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-error mt-1">•</span>
                    High minimum investment thresholds
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-error mt-1">•</span>
                    Illiquid positions in traditional leasing
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-error mt-1">•</span>
                    Lack of transparency in fee distribution
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 p-6 bg-error/10 border border-error/30 rounded-xl">
            <p className="text-xl text-center text-text-primary">
              <span className="font-bold text-error">$2.1 Trillion</span> in global equipment leasing market lacks efficient tokenization and fractional ownership solutions
            </p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'Solution',
      content: (
        <div className="h-full flex flex-col justify-center px-8 md:px-16">
          <div className="flex items-center gap-3 mb-8">
            <Lightbulb size={32} className="text-success" />
            <h2 className="text-4xl font-bold text-text-primary">Our Solution</h2>
          </div>
          <div className="text-center mb-8">
            <p className="text-2xl text-text-secondary">
              A <span className="text-primary font-semibold">tokenized leasing protocol</span> that transforms CapEx into OpEx
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <DollarSign size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Fractional Investment</h3>
              <p className="text-text-secondary">
                Investors buy tokenized shares of industrial machinery starting from $100
              </p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <RefreshCw size={32} className="text-success" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Automatic Distribution</h3>
              <p className="text-text-secondary">
                Smart contracts route lease payments directly to token holders
              </p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
                <Zap size={32} className="text-warning" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Subscribe & Operate</h3>
              <p className="text-text-secondary">
                Enterprises lease equipment on-demand without massive upfront costs
              </p>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-4 px-6 py-4 bg-surface-2 rounded-xl border border-primary/30">
              <span className="text-text-secondary">Hospital</span>
              <ArrowRight className="text-primary" />
              <span className="text-primary font-semibold">Subscribes to MRI</span>
              <ArrowRight className="text-primary" />
              <span className="text-text-secondary">Investors Earn Yield</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Why Canton',
      content: (
        <div className="h-full flex flex-col justify-center px-8 md:px-16">
          <div className="flex items-center gap-3 mb-8">
            <Shield size={32} className="text-primary" />
            <h2 className="text-4xl font-bold text-text-primary">Why Canton & Daml?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6 border-l-4 border-l-primary">
              <div className="flex items-center gap-3 mb-4">
                <Lock size={28} className="text-primary" />
                <h3 className="text-xl font-semibold text-text-primary">Privacy-First Architecture</h3>
              </div>
              <p className="text-text-secondary mb-4">
                Canton's sub-transaction privacy ensures lessees' operational data stays confidential.
              </p>
              <div className="bg-surface-2 p-3 rounded-lg">
                <p className="text-sm text-text-disabled">
                  "Construction company lease rates and usage data remain private - only relevant parties see what they need."
                </p>
              </div>
            </div>
            <div className="glass-card p-6 border-l-4 border-l-success">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw size={28} className="text-success" />
                <h3 className="text-xl font-semibold text-text-primary">Lifecycle Management</h3>
              </div>
              <p className="text-text-secondary mb-4">
                Daml perfectly models machine states and transitions with guaranteed consistency.
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {['Ordered', 'Delivered', 'Active', 'Maintenance', 'Retired'].map((state, i) => (
                  <span key={state} className="px-3 py-1 bg-surface-2 rounded-full text-sm text-text-secondary flex items-center gap-1">
                    {state}
                    {i < 4 && <ArrowRight size={12} className="text-primary" />}
                  </span>
                ))}
              </div>
            </div>
            <div className="glass-card p-6 border-l-4 border-l-warning">
              <div className="flex items-center gap-3 mb-4">
                <Cpu size={28} className="text-warning" />
                <h3 className="text-xl font-semibold text-text-primary">Atomic Smart Contracts</h3>
              </div>
              <p className="text-text-secondary">
                Program contracts to automatically lock/unlock machine access based on payment status. No intermediaries required.
              </p>
            </div>
            <div className="glass-card p-6 border-l-4 border-l-error">
              <div className="flex items-center gap-3 mb-4">
                <Globe size={28} className="text-error" />
                <h3 className="text-xl font-semibold text-text-primary">Regulatory Compliance</h3>
              </div>
              <p className="text-text-secondary">
                Canton's permissioned architecture enables compliant tokenization of real-world assets across jurisdictions.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: 'How It Works',
      content: (
        <div className="h-full flex flex-col justify-center px-8 md:px-16">
          <div className="flex items-center gap-3 mb-8">
            <Zap size={32} className="text-primary" />
            <h2 className="text-4xl font-bold text-text-primary">How It Works</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
            <div className="space-y-6">
              {[
                { step: 1, title: 'Asset Onboarding', desc: 'Industrial equipment is tokenized and listed on the protocol', icon: Layers },
                { step: 2, title: 'Investor Funding', desc: 'Investors purchase fractional tokens representing ownership shares', icon: Users },
                { step: 3, title: 'Enterprise Lease', desc: 'Hospital/construction firm subscribes via tokenized lease agreement', icon: Building2 },
                { step: 4, title: 'Automatic Yield', desc: 'Smart contracts distribute lease payments to token holders', icon: TrendingUp },
                { step: 5, title: 'Lifecycle Tracking', desc: 'Machine status updates trigger contract state changes automatically', icon: RefreshCw },
              ].map((item, i) => (
                <div key={item.step} className="flex items-start gap-6">
                  <div className="relative z-10 w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <item.icon size={28} className="text-black" />
                  </div>
                  <div className="glass-card p-5 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-primary font-bold">Step {item.step}</span>
                      <h3 className="text-xl font-semibold text-text-primary">{item.title}</h3>
                    </div>
                    <p className="text-text-secondary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: 'Market Opportunity',
      content: (
        <div className="h-full flex flex-col justify-center px-8 md:px-16">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp size={32} className="text-success" />
            <h2 className="text-4xl font-bold text-text-primary">Market Opportunity</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6 text-center">
              <p className="text-5xl font-bold text-primary mb-2">$2.1T</p>
              <p className="text-text-secondary">Global Equipment Leasing Market</p>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-5xl font-bold text-success mb-2">8-12%</p>
              <p className="text-text-secondary">Target APY for Investors</p>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-5xl font-bold text-warning mb-2">$500B</p>
              <p className="text-text-secondary">RWA Tokenization by 2030</p>
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4">Target Sectors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Medical Equipment', examples: 'MRI, CT Scanners, X-Ray' },
                { name: 'Construction', examples: 'Cranes, Excavators, Loaders' },
                { name: 'Manufacturing', examples: 'CNC, Robots, 3D Printers' },
                { name: 'Logistics', examples: 'Forklifts, Trucks, Handlers' },
              ].map((sector) => (
                <div key={sector.name} className="p-4 bg-surface-2 rounded-lg">
                  <p className="font-semibold text-text-primary mb-1">{sector.name}</p>
                  <p className="text-sm text-text-disabled">{sector.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: 'Competitive Edge',
      content: (
        <div className="h-full flex flex-col justify-center px-8 md:px-16">
          <div className="flex items-center gap-3 mb-8">
            <Shield size={32} className="text-primary" />
            <h2 className="text-4xl font-bold text-text-primary">Our Competitive Edge</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-text-secondary font-medium">Feature</th>
                  <th className="text-center p-4 text-text-secondary font-medium">Traditional Leasing</th>
                  <th className="text-center p-4 text-text-secondary font-medium">Other DeFi</th>
                  <th className="text-center p-4 text-primary font-semibold">MaaS Protocol</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Privacy Protection', '❌', '❌', '✅'],
                  ['Fractional Ownership', '❌', '✅', '✅'],
                  ['Regulatory Compliance', '✅', '❌', '✅'],
                  ['Real Asset Backing', '✅', '❌', '✅'],
                  ['Automatic Yield', '❌', '✅', '✅'],
                  ['Lifecycle Management', '❌', '❌', '✅'],
                  ['Low Minimum Investment', '❌', '✅', '✅'],
                ].map(([feature, trad, defi, maas], i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="p-4 text-text-primary">{feature}</td>
                    <td className="p-4 text-center text-2xl">{trad}</td>
                    <td className="p-4 text-center text-2xl">{defi}</td>
                    <td className="p-4 text-center text-2xl bg-primary/5">{maas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: 'Prototype',
      content: (
        <div className="h-full flex flex-col justify-center px-8 md:px-16">
          <div className="flex items-center gap-3 mb-8">
            <Cpu size={32} className="text-primary" />
            <h2 className="text-4xl font-bold text-text-primary">Working Prototype</h2>
          </div>
          <div className="glass-card p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">Features Implemented</h3>
                <ul className="space-y-3">
                  {[
                    'Dashboard with portfolio analytics',
                    'Machine marketplace with filtering',
                    'Investment flow with token calculation',
                    'Lifecycle status tracker',
                    'Lease management interface',
                    'Transaction history',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-text-secondary">
                      <CheckCircle2 size={18} className="text-success" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">Technical Stack</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-surface-2 rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">CN</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Canton Network</p>
                      <p className="text-sm text-text-disabled">Privacy-preserving blockchain</p>
                    </div>
                  </div>
                  <div className="p-3 bg-surface-2 rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <span className="text-success font-bold">DM</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Daml Smart Contracts</p>
                      <p className="text-sm text-text-disabled">Lifecycle & payment logic</p>
                    </div>
                  </div>
                  <div className="p-3 bg-surface-2 rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                      <span className="text-warning font-bold">RC</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">React + TypeScript</p>
                      <p className="text-sm text-text-disabled">Frontend application</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <a href="/" className="btn-primary inline-flex items-center gap-2">
              View Live Demo
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: 'Roadmap',
      content: (
        <div className="h-full flex flex-col justify-center px-8 md:px-16">
          <div className="flex items-center gap-3 mb-8">
            <Target size={32} className="text-primary" />
            <h2 className="text-4xl font-bold text-text-primary">Roadmap</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { phase: 'Q1 2026', title: 'Foundation', items: ['Core Daml contracts', 'Canton integration', 'MVP frontend'], status: 'current' },
              { phase: 'Q2 2026', title: 'Pilot', items: ['Partner onboarding', 'First machine tokenization', 'Beta testing'], status: 'upcoming' },
              { phase: 'Q3 2026', title: 'Scale', items: ['Multi-asset support', 'Secondary market', 'Mobile app'], status: 'upcoming' },
              { phase: 'Q4 2026', title: 'Expand', items: ['Cross-border leasing', 'Institutional partners', 'DAO governance'], status: 'upcoming' },
            ].map((phase) => (
              <div key={phase.phase} className={`glass-card p-5 ${phase.status === 'current' ? 'border-primary border-2' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm font-semibold ${phase.status === 'current' ? 'text-primary' : 'text-text-disabled'}`}>
                    {phase.phase}
                  </span>
                  {phase.status === 'current' && (
                    <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">Current</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="text-sm text-text-secondary flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${phase.status === 'current' ? 'bg-primary' : 'bg-text-disabled'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 10,
      title: 'Call to Action',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8">
          <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center mb-8">
            <Layers size={48} className="text-black" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
            Machine-as-a-Service
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mb-8">
            Transforming industrial equipment ownership through tokenization on Canton Network
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="px-6 py-3 bg-primary/10 border border-primary/30 rounded-xl">
              <p className="text-primary font-semibold">Real-World Assets</p>
            </div>
            <div className="px-6 py-3 bg-success/10 border border-success/30 rounded-xl">
              <p className="text-success font-semibold">Privacy-Preserving</p>
            </div>
            <div className="px-6 py-3 bg-warning/10 border border-warning/30 rounded-xl">
              <p className="text-warning font-semibold">Automated Yield</p>
            </div>
          </div>
          <div className="glass-card p-8 max-w-lg">
            <p className="text-lg text-text-primary mb-4">
              "Capital expenditure is dead. Welcome to the future of fractional machine ownership."
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="/" className="btn-primary">
                Try the Demo
              </a>
              <a href="https://github.com" target="_blank" className="btn-secondary">
                View GitHub
              </a>
            </div>
          </div>
          <p className="mt-8 text-text-disabled">
            Canton Construct Ideathon 2025 | Tokenized Real-World Assets Track
          </p>
        </div>
      )
    },
  ]

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-surface-2">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Slide content */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full animate-fade-in" key={currentSlide}>
          {slides[currentSlide].content}
        </div>
      </div>

      {/* Navigation */}
      <div className="h-16 bg-surface border-t border-border flex items-center justify-between px-6">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-2 text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentSlide ? 'bg-primary w-6' : 'bg-border hover:bg-text-disabled'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-primary-400"
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 right-4 px-3 py-1 bg-surface-2 rounded-lg border border-border">
        <span className="text-sm text-text-secondary">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>

      {/* Keyboard navigation hint */}
      <div className="absolute bottom-20 left-6 text-xs text-text-disabled">
        Use arrow keys to navigate
      </div>
    </div>
  )
}
