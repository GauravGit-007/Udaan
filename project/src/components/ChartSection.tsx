import React from 'react';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';

const ChartSection: React.FC = () => {
  // Mock data for the chart
  const mockRoutes = [
    { route: 'LAX → JFK', passengers: 2450, growth: 12.5 },
    { route: 'LHR → CDG', passengers: 2200, growth: 8.2 },
    { route: 'DXB → LHR', passengers: 2100, growth: 15.8 },
    { route: 'NRT → SIN', passengers: 1950, growth: -2.1 },
    { route: 'FRA → JFK', passengers: 1800, growth: 6.7 },
    { route: 'CDG → DXB', passengers: 1650, growth: 9.4 },
    { route: 'SIN → NRT', passengers: 1500, growth: 4.3 },
    { route: 'JFK → LHR', passengers: 1420, growth: 11.2 },
    { route: 'LAX → NRT', passengers: 1350, growth: 7.8 },
    { route: 'LHR → DXB', passengers: 1200, growth: 13.6 },
  ];

  const maxPassengers = Math.max(...mockRoutes.map(r => r.passengers));

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
              <p className="text-gray-600">Passenger volume and growth trends</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Activity className="w-4 h-4" />
            <span>Last updated: 2 min ago</span>
          </div>
        </div>

        {/* Chart Container */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
          <div className="space-y-4">
            {mockRoutes.map((route, index) => (
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
                      style={{ width: `${(route.passengers / maxPassengers) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart.js Placeholder */}
        <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="p-4 bg-blue-100 rounded-full inline-block mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Chart.js Integration Ready</h3>
            <p className="text-gray-600 text-sm">
              This section will be replaced with dynamic Chart.js visualizations connected to your Flask backend API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;