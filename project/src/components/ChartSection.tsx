import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Activity, Loader2 } from 'lucide-react';
import { apiService, RouteData, Filters } from '../services/api';

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

  const maxPassengers = routes.length > 0 ? Math.max(...routes.map(r => r.passengers)) : 0;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl border border-gray-100 mt-8">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Analyzing flight routes...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Top 10 Popular Routes</h2>
              <p className="text-gray-600">Passenger volume and growth trends from backend</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Activity className="w-4 h-4" />
            <span>Updated: Just now</span>
          </div>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : routes.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <p className="text-gray-600">No route data available at the moment.</p>
          </div>
        ) : (
          /* Chart Container */
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
            <div className="space-y-4">
              {routes.map((route, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-800">{route.route}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">{route.passengers.toLocaleString()} passengers</span>
                      <div className={`flex items-center gap-1 ${route.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <TrendingUp className={`w-4 h-4 ${route.growth < 0 ? 'rotate-180' : ''}`} />
                        <span className="text-sm font-medium">{route.growth >= 0 ? '+' : ''}{route.growth}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out group-hover:from-blue-400 group-hover:to-blue-500"
                        style={{ width: `${(route.passengers / (maxPassengers || 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!error && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <p className="text-blue-800 text-sm">
              Live data connection established with Flask Backend.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartSection;