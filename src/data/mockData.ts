// Machine lifecycle states
export type MachineStatus = 'ordered' | 'delivered' | 'active' | 'maintenance' | 'retired';

export interface Machine {
  id: string;
  name: string;
  type: string;
  category: 'medical' | 'construction' | 'manufacturing' | 'logistics';
  image: string;
  totalValue: number;
  availableTokens: number;
  totalTokens: number;
  tokenPrice: number;
  estimatedAPY: number;
  status: MachineStatus;
  lessee?: string;
  leaseStartDate?: string;
  leaseEndDate?: string;
  monthlyRate: number;
  location: string;
  manufacturer: string;
  model: string;
  yearManufactured: number;
  description: string;
}

export interface Investment {
  machineId: string;
  machineName: string;
  machineType: string;
  tokensOwned: number;
  totalTokens: number;
  investmentValue: number;
  currentValue: number;
  earnedYield: number;
  pendingYield: number;
  status: MachineStatus;
  apy: number;
}

export interface Transaction {
  id: string;
  type: 'investment' | 'yield' | 'withdrawal' | 'lease_payment';
  machineId: string;
  machineName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  txHash: string;
}

export interface Lease {
  id: string;
  machineId: string;
  machineName: string;
  machineType: string;
  lessee: string;
  monthlyRate: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'expired' | 'terminated';
  nextPaymentDate: string;
  totalPaid: number;
  remainingPayments: number;
}

// Mock machines data
export const machines: Machine[] = [
  {
    id: 'MRI-001',
    name: 'Siemens MAGNETOM Vida',
    type: 'MRI Scanner',
    category: 'medical',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80',
    totalValue: 2500000,
    availableTokens: 1250,
    totalTokens: 5000,
    tokenPrice: 500,
    estimatedAPY: 8.5,
    status: 'active',
    lessee: 'Metro General Hospital',
    leaseStartDate: '2024-01-15',
    leaseEndDate: '2029-01-15',
    monthlyRate: 45000,
    location: 'New York, USA',
    manufacturer: 'Siemens Healthineers',
    model: 'MAGNETOM Vida 3T',
    yearManufactured: 2023,
    description: 'Advanced 3T MRI system with BioMatrix technology for precision imaging.'
  },
  {
    id: 'CT-002',
    name: 'GE Revolution CT',
    type: 'CT Scanner',
    category: 'medical',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&auto=format&fit=crop&q=80',
    totalValue: 1800000,
    availableTokens: 3000,
    totalTokens: 6000,
    tokenPrice: 300,
    estimatedAPY: 7.8,
    status: 'delivered',
    monthlyRate: 32000,
    location: 'Los Angeles, USA',
    manufacturer: 'GE Healthcare',
    model: 'Revolution CT',
    yearManufactured: 2024,
    description: 'High-speed CT scanner with cardiac imaging capabilities.'
  },
  {
    id: 'CRN-003',
    name: 'Liebherr LTM 1300-6.2',
    type: 'Mobile Crane',
    category: 'construction',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
    totalValue: 3200000,
    availableTokens: 800,
    totalTokens: 8000,
    tokenPrice: 400,
    estimatedAPY: 9.2,
    status: 'active',
    lessee: 'BuildRight Construction Co.',
    leaseStartDate: '2024-03-01',
    leaseEndDate: '2027-03-01',
    monthlyRate: 58000,
    location: 'Houston, USA',
    manufacturer: 'Liebherr',
    model: 'LTM 1300-6.2',
    yearManufactured: 2023,
    description: '300-tonne capacity mobile crane for heavy lifting operations.'
  },
  {
    id: 'EXC-004',
    name: 'Caterpillar 390F L',
    type: 'Hydraulic Excavator',
    category: 'construction',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&auto=format&fit=crop&q=80',
    totalValue: 850000,
    availableTokens: 4250,
    totalTokens: 8500,
    tokenPrice: 100,
    estimatedAPY: 10.5,
    status: 'active',
    lessee: 'Pacific Mining Corp',
    leaseStartDate: '2024-02-01',
    leaseEndDate: '2026-02-01',
    monthlyRate: 18000,
    location: 'Denver, USA',
    manufacturer: 'Caterpillar',
    model: '390F L',
    yearManufactured: 2022,
    description: 'Large hydraulic excavator for mining and heavy construction.'
  },
  {
    id: 'CNC-005',
    name: 'DMG MORI NLX 2500',
    type: 'CNC Lathe',
    category: 'manufacturing',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&auto=format&fit=crop&q=80',
    totalValue: 420000,
    availableTokens: 2100,
    totalTokens: 4200,
    tokenPrice: 100,
    estimatedAPY: 11.2,
    status: 'maintenance',
    lessee: 'Precision Parts Inc.',
    leaseStartDate: '2023-06-01',
    leaseEndDate: '2026-06-01',
    monthlyRate: 9500,
    location: 'Detroit, USA',
    manufacturer: 'DMG MORI',
    model: 'NLX 2500/700',
    yearManufactured: 2022,
    description: 'High-precision CNC turning center for complex parts manufacturing.'
  },
  {
    id: 'FLT-006',
    name: 'Konecranes Reach Stacker',
    type: 'Container Handler',
    category: 'logistics',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    totalValue: 680000,
    availableTokens: 6800,
    totalTokens: 6800,
    tokenPrice: 100,
    estimatedAPY: 8.8,
    status: 'ordered',
    monthlyRate: 12000,
    location: 'Long Beach, USA',
    manufacturer: 'Konecranes',
    model: 'SMV 4531 TC5',
    yearManufactured: 2024,
    description: '45-tonne capacity reach stacker for port container operations.'
  },
  {
    id: 'XRY-007',
    name: 'Philips DigitalDiagnost C90',
    type: 'Digital X-Ray System',
    category: 'medical',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&auto=format&fit=crop&q=80',
    totalValue: 380000,
    availableTokens: 1900,
    totalTokens: 3800,
    tokenPrice: 100,
    estimatedAPY: 7.5,
    status: 'active',
    lessee: 'Valley Medical Center',
    leaseStartDate: '2024-04-01',
    leaseEndDate: '2028-04-01',
    monthlyRate: 6800,
    location: 'Chicago, USA',
    manufacturer: 'Philips',
    model: 'DigitalDiagnost C90',
    yearManufactured: 2023,
    description: 'Advanced digital radiography system with AI-powered imaging.'
  },
  {
    id: 'RBT-008',
    name: 'FANUC M-2000iA/2300',
    type: 'Industrial Robot',
    category: 'manufacturing',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
    totalValue: 520000,
    availableTokens: 2600,
    totalTokens: 5200,
    tokenPrice: 100,
    estimatedAPY: 9.8,
    status: 'retired',
    monthlyRate: 11000,
    location: 'San Jose, USA',
    manufacturer: 'FANUC',
    model: 'M-2000iA/2300',
    yearManufactured: 2019,
    description: 'Heavy-duty industrial robot for automotive manufacturing.'
  }
];

// Mock investments data
export const investments: Investment[] = [
  {
    machineId: 'MRI-001',
    machineName: 'Siemens MAGNETOM Vida',
    machineType: 'MRI Scanner',
    tokensOwned: 250,
    totalTokens: 5000,
    investmentValue: 125000,
    currentValue: 137500,
    earnedYield: 8850,
    pendingYield: 937.50,
    status: 'active',
    apy: 8.5
  },
  {
    machineId: 'CRN-003',
    machineName: 'Liebherr LTM 1300-6.2',
    machineType: 'Mobile Crane',
    tokensOwned: 500,
    totalTokens: 8000,
    investmentValue: 200000,
    currentValue: 218400,
    earnedYield: 15340,
    pendingYield: 1533.33,
    status: 'active',
    apy: 9.2
  },
  {
    machineId: 'EXC-004',
    machineName: 'Caterpillar 390F L',
    machineType: 'Hydraulic Excavator',
    tokensOwned: 1000,
    totalTokens: 8500,
    investmentValue: 100000,
    currentValue: 110500,
    earnedYield: 8750,
    pendingYield: 875.00,
    status: 'active',
    apy: 10.5
  },
  {
    machineId: 'CNC-005',
    machineName: 'DMG MORI NLX 2500',
    machineType: 'CNC Lathe',
    tokensOwned: 200,
    totalTokens: 4200,
    investmentValue: 20000,
    currentValue: 22240,
    earnedYield: 1867,
    pendingYield: 186.67,
    status: 'maintenance',
    apy: 11.2
  }
];

// Mock transactions data
export const transactions: Transaction[] = [
  {
    id: 'TXN-001',
    type: 'investment',
    machineId: 'MRI-001',
    machineName: 'Siemens MAGNETOM Vida',
    amount: 125000,
    date: '2024-01-15T10:30:00Z',
    status: 'completed',
    txHash: '0x8f7d3a2b1c4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a'
  },
  {
    id: 'TXN-002',
    type: 'yield',
    machineId: 'MRI-001',
    machineName: 'Siemens MAGNETOM Vida',
    amount: 937.50,
    date: '2024-11-01T00:00:00Z',
    status: 'completed',
    txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b'
  },
  {
    id: 'TXN-003',
    type: 'investment',
    machineId: 'CRN-003',
    machineName: 'Liebherr LTM 1300-6.2',
    amount: 200000,
    date: '2024-03-01T14:45:00Z',
    status: 'completed',
    txHash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c'
  },
  {
    id: 'TXN-004',
    type: 'yield',
    machineId: 'CRN-003',
    machineName: 'Liebherr LTM 1300-6.2',
    amount: 1533.33,
    date: '2024-11-01T00:00:00Z',
    status: 'completed',
    txHash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d'
  },
  {
    id: 'TXN-005',
    type: 'lease_payment',
    machineId: 'MRI-001',
    machineName: 'Siemens MAGNETOM Vida',
    amount: 45000,
    date: '2024-11-15T09:00:00Z',
    status: 'pending',
    txHash: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e'
  },
  {
    id: 'TXN-006',
    type: 'investment',
    machineId: 'EXC-004',
    machineName: 'Caterpillar 390F L',
    amount: 100000,
    date: '2024-02-01T11:20:00Z',
    status: 'completed',
    txHash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f'
  }
];

// Mock leases data
export const leases: Lease[] = [
  {
    id: 'LSE-001',
    machineId: 'MRI-001',
    machineName: 'Siemens MAGNETOM Vida',
    machineType: 'MRI Scanner',
    lessee: 'Metro General Hospital',
    monthlyRate: 45000,
    startDate: '2024-01-15',
    endDate: '2029-01-15',
    status: 'active',
    nextPaymentDate: '2024-12-15',
    totalPaid: 495000,
    remainingPayments: 50
  },
  {
    id: 'LSE-002',
    machineId: 'CRN-003',
    machineName: 'Liebherr LTM 1300-6.2',
    machineType: 'Mobile Crane',
    lessee: 'BuildRight Construction Co.',
    monthlyRate: 58000,
    startDate: '2024-03-01',
    endDate: '2027-03-01',
    status: 'active',
    nextPaymentDate: '2024-12-01',
    totalPaid: 522000,
    remainingPayments: 27
  },
  {
    id: 'LSE-003',
    machineId: 'EXC-004',
    machineName: 'Caterpillar 390F L',
    machineType: 'Hydraulic Excavator',
    lessee: 'Pacific Mining Corp',
    monthlyRate: 18000,
    startDate: '2024-02-01',
    endDate: '2026-02-01',
    status: 'active',
    nextPaymentDate: '2024-12-01',
    totalPaid: 180000,
    remainingPayments: 14
  },
  {
    id: 'LSE-004',
    machineId: 'CNC-005',
    machineName: 'DMG MORI NLX 2500',
    machineType: 'CNC Lathe',
    lessee: 'Precision Parts Inc.',
    monthlyRate: 9500,
    startDate: '2023-06-01',
    endDate: '2026-06-01',
    status: 'active',
    nextPaymentDate: '2024-12-01',
    totalPaid: 171000,
    remainingPayments: 18
  },
  {
    id: 'LSE-005',
    machineId: 'XRY-007',
    machineName: 'Philips DigitalDiagnost C90',
    machineType: 'Digital X-Ray System',
    lessee: 'Valley Medical Center',
    monthlyRate: 6800,
    startDate: '2024-04-01',
    endDate: '2028-04-01',
    status: 'active',
    nextPaymentDate: '2024-12-01',
    totalPaid: 54400,
    remainingPayments: 40
  }
];

// Portfolio summary
export const portfolioSummary = {
  totalInvested: 445000,
  currentValue: 488640,
  totalEarned: 34807,
  pendingYield: 3532.50,
  averageAPY: 9.3,
  machinesInvested: 4,
  activeLeases: 4
};

// Platform statistics
export const platformStats = {
  totalValueLocked: 12850000,
  activeMachines: 156,
  totalInvestors: 2847,
  averageAPY: 8.9,
  monthlyVolume: 2340000,
  totalLeasePayments: 48500000
};
