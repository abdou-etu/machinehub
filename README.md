# Machine-as-a-Service (MaaS) Protocol

## 1. Project Details

### Selected Ideathon track
Tokenized Real-World Assets

### Project Title & Description
**Machine-as-a-Service (MaaS) Protocol**

"Capital expenditure (CapEx) is dead." We are building a fractional leasing protocol that allows enterprises to move to OpEx (Operational Expenditure). Instead of a hospital buying an MRI machine or a construction firm buying a crane, they "subscribe" to it via a tokenized lease. Investors fund the machine and earn the lease payments. Smart contracts automatically route usage fees from the lessee to the token holders, unlocking liquidity for hard assets.

### Key problem being addressed
High upfront capital costs (CapEx) prevent businesses from accessing necessary heavy machinery. Additionally, hard assets lack liquidity for investors.

### Proposed solution and concept highlights
- **Tokenized Leasing:** Investors fund machinery in exchange for tokenized shares.
- **Smart Contract Automation:** Usage fees are automatically routed to investors.
- **Lifecycle Management:** Full tracking of asset status from purchase to retirement.

### Tools, technologies, or methods
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Ledger Technology:** Daml & Canton

**Why Canton/Daml?**
- **Privacy:** The construction company (Lessee) does not want the public to see their specific usage data or lease rates. Canton keeps this private.
- **Lifecycle Management:** Daml is perfect for modeling the state of the machine: Ordered -> Delivered -> Active -> Maintenance -> Retired.
- **Atomic Lifecycle:** Daml is perfect for modeling the state of the machine: Purchased -> Leased -> Maintenance -> Retired.

## 2. Project-Prototype Demo Link

**Demo URL:** https://machinehub.vercel.app/
**Pitchdesk URL:** https://machinehub.vercel.app/pitch