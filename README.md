# XRPL Control Room

A comprehensive monitoring and analysis dashboard for the XRP Ledger ecosystem. Built with professional ergonomics inspired by Bloomberg terminals, IDE interfaces, and high-performance financial tools.

![XRPL Control Room](https://img.shields.io/badge/XRPL-Control%20Room-00c3ff?style=for-the-badge)

## Features

### 5 Comprehensive Tabs

1. **Contributors & Community**
   - Key XRPL developers and community leaders
   - Core repository tracking with stars, forks, and activity
   - Community timeline and ecosystem milestones
   - Links to XRPL Commons, Reddit communities, and events

2. **Technical Features**
   - XRPL EVM Sidechain metrics and comparison
   - Interledger Protocol (ILP) overview
   - Network statistics for mainnet and sidechain
   - Guided learning paths for developers

3. **Regulations & Executive Orders**
   - US regulatory landscape (SEC, GENIUS Act, EO 14178)
   - Global jurisdiction comparison
   - Regulatory alerts and timeline
   - Compliance guidance

4. **Stablecoins & ETFs**
   - RLUSD market cap and distribution
   - Spot XRP ETF tracking with inflows
   - Price projections from analysts
   - Stablecoin comparison tables

5. **Resources**
   - GitHub repositories and SDKs
   - Reddit communities
   - YouTube channels and tutorials
   - Documentation and tools
   - BlackRock institutional perspective

### Professional UI Features

- **Panel Dock**: Pin important items for quick reference across tabs
- **Scanner Mode**: Focus on specific data with dimming of non-relevant content
- **Guided Paths**: Optional learning flows with progress tracking
- **Real-time Feeds**: Twitter/X, GitHub activity, and regulatory alerts
- **Keyboard Shortcuts**: Press 1-5 to switch tabs, S for Scanner Mode

### Design Principles

- ✅ Assumes good intent and treats users as adults
- ✅ Factual, substantiated claims without moralizing
- ✅ Professional cockpit aesthetic (not gamified)
- ✅ Low cognitive load with predictable navigation
- ✅ State persistence across sessions
- ✅ Focus indicators and hover highlights

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/xrpl-control-panel.git
cd xrpl-control-panel

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand with persistence
- **Data Fetching**: TanStack React Query
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/
│   ├── shared/          # Reusable UI components
│   │   ├── PanelDock.tsx
│   │   ├── ScannerMode.tsx
│   │   ├── GuidedPath.tsx
│   │   ├── DataTable.tsx
│   │   ├── Timeline.tsx
│   │   ├── Feeds.tsx
│   │   └── Charts.tsx
│   └── tabs/            # Tab content components
│       ├── ContributorsTab.tsx
│       ├── TechnicalTab.tsx
│       ├── RegulationsTab.tsx
│       ├── StablecoinsTab.tsx
│       └── ResourcesTab.tsx
├── data/                # Static data and mock feeds
│   ├── contributors.ts
│   ├── technical.ts
│   ├── regulations.ts
│   ├── stablecoins.ts
│   ├── resources.ts
│   └── feeds.ts
├── store/               # Zustand state management
│   └── index.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and theme
```

## Data Sources

The application is designed to integrate with:

- **GitHub API**: Repository activity, releases, and contributors
- **Twitter/X API**: Community updates and announcements
- **Regulatory Feeds**: SEC, CFTC, White House announcements
- **XRPL APIs**: Network statistics and metrics

Currently uses mock data for demonstration. See `src/data/feeds.ts` for API integration stubs.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1` | Contributors & Community tab |
| `2` | Technical Features tab |
| `3` | Regulations tab |
| `4` | Stablecoins & ETFs tab |
| `5` | Resources tab |
| `S` | Toggle Scanner Mode |
| `Esc` | Exit Scanner Mode |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Disclaimer

This dashboard is for informational purposes only. It does not constitute financial advice. Price targets and projections are from third-party analysts and are speculative. Always do your own research.

## Acknowledgments

- [XRPL Foundation](https://xrplf.org) for maintaining the XRP Ledger
- [Ripple](https://ripple.com) for XRPL development and RLUSD
- The XRPL developer community for their contributions
- All the contributors mentioned in the dashboard

---

Built with ❤️ for the XRPL community
