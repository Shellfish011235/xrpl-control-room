import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Custom tooltip component
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded p-2 shadow-lg">
      <p className="text-[10px] text-[var(--text-muted)] mb-1">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {typeof entry.value === 'number' 
            ? entry.value.toLocaleString() 
            : entry.value}
        </p>
      ))}
    </div>
  );
}

// ETF Inflows Chart
interface InflowData {
  date: string;
  amount: number;
  cumulative: number;
}

export function ETFInflowsChart({ data }: { data: InflowData[] }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="inflowGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00c3ff" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00c3ff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis 
            tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
            tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="cumulative" 
            stroke="#00c3ff" 
            fill="url(#inflowGradient)"
            name="Cumulative Inflows"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Market Cap Growth Chart
interface MarketCapData {
  date: string;
  value: number;
}

export function MarketCapChart({ data }: { data: MarketCapData[] }) {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
          />
          <YAxis 
            tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
            tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#3fb950" 
            strokeWidth={2}
            dot={false}
            name="Market Cap"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Chain Distribution Pie Chart
interface DistributionData {
  name: string;
  value: number;
  [key: string]: string | number;
}

const PIE_COLORS = ['#00c3ff', '#3fb950', '#d29922', '#f85149', '#8b949e'];

export function DistributionChart({ data }: { data: { name: string; value: number }[] }) {
  // Add index signature to data
  const chartData: DistributionData[] = data.map(d => ({ ...d }));
  
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name || ''}: ${((percent ?? 0) * 100).toFixed(0)}%`}
            labelLine={{ stroke: 'var(--text-muted)' }}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Network Comparison Bar Chart
interface NetworkData {
  metric: string;
  xrpl: number;
  evm: number;
}

export function NetworkComparisonChart({ data }: { data: NetworkData[] }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 80, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" horizontal={false} />
          <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
          <YAxis 
            type="category" 
            dataKey="metric" 
            tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: 10, color: 'var(--text-muted)' }}
          />
          <Bar dataKey="xrpl" name="XRPL Mainnet" fill="#00c3ff" radius={[0, 2, 2, 0]} />
          <Bar dataKey="evm" name="EVM Sidechain" fill="#3fb950" radius={[0, 2, 2, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Simple Metric Sparkline
interface SparklineData {
  value: number;
}

export function Sparkline({ data, color = '#00c3ff' }: { data: SparklineData[]; color?: string }) {
  return (
    <div className="h-8 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Large number metric display
interface MetricDisplayProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  prefix?: string;
  suffix?: string;
}

export function MetricDisplay({ label, value, change, changeLabel, prefix, suffix }: MetricDisplayProps) {
  const formattedValue = typeof value === 'number' 
    ? value.toLocaleString() 
    : value;
  
  return (
    <div className="metric">
      <span className="metric-label">{label}</span>
      <span className="metric-value">
        {prefix}{formattedValue}{suffix}
      </span>
      {change !== undefined && (
        <span className={`metric-change ${change >= 0 ? 'positive' : 'negative'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
          {changeLabel && <span className="text-[var(--text-muted)] ml-1">{changeLabel}</span>}
        </span>
      )}
    </div>
  );
}
