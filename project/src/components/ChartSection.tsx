import { apiService, RouteData, Filters } from '../services/api';
import GlassCard from './GlassCard';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

interface ChartSectionProps {
  filters: Filters;
}

const ChartSection: React.FC<ChartSectionProps> = ({ filters }) => {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        setLoading(true);
        const data = await apiService.fetchTopRoutes(filters);
        setRoutes(data.routes);
      } catch (err) {
        console.error('Failed to load routes:', err);
        setError('Could not fetch popular routes.');
      } finally {
        setLoading(false);
      }
    };

    loadRoutes();
  }, [filters]);

  if (loading) return null;

  const chartData = routes.map(r => ({
    name: r.route.split(' → ')[0],
    fullName: r.route,
    volume: r.passengers,
    growth: r.growth
  }));

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Route Analytics</h2>
        <p className="text-gray-500">Volume distribution across top performing paths</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <GlassCard className="p-8 h-[500px]" delay={0.3}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-800">Passenger Volume Distribution</h3>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>High Demand</span>
              </div>
            </div>
          </div>

          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: '#1e40af', fontWeight: 700 }}
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorVolume)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Detailed List inside GlassCard */}
        <GlassCard className="p-8" delay={0.4}>
          <h3 className="text-xl font-bold text-gray-800 mb-6">Detailed Route Performance</h3>
          <div className="space-y-4">
            {routes.map((route, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/20 hover:bg-white/60 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-200">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{route.route}</div>
                    <div className="text-xs text-gray-400 font-semibold uppercase">{route.departure_code} to {route.arrival_code}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{route.passengers.toLocaleString()}</div>
                  <div className="text-xs font-bold text-green-500 uppercase">Growth Active</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ChartSection;