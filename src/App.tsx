import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import Marketplace from './pages/Marketplace'
import MachineDetail from './pages/MachineDetail'
import Leases from './pages/Leases'
import Transactions from './pages/Transactions'
import PitchDeck from './pages/PitchDeck'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pitch" element={<PitchDeck />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="machine/:id" element={<MachineDetail />} />
          <Route path="leases" element={<Leases />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
