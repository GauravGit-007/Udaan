import React, { useEffect, useState } from 'react';
import { Plane, Route, Clock, TrendingUp, Users, Calendar, Loader2 } from 'lucide-react';
import { apiService, SummaryData, MetricData, Filters } from '../services/api';

interface SummaryCardsProps {
  filters: Filters;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ filters }) => {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [summaryData, metricsData] = await Promise.all([
          apiService.fetchSummary(filters),
          apiService.fetchMetrics(filters)
        ]);
        setSummary(summaryData);
        setMetrics(metricsData);
      } catch (err) {
        console.error('Failed to load summary data:', err);
        setError('Connection to backend failed. Please ensure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters]);

  const summaryCards = [
    {
      title: 'Total Flights',
      value: summary?.total_flights.toLocaleString() || '0',
      change: '+12.5%', // Placeholder as backend doesn't provide growth yet
      changeType: 'positive',
      icon: Plane,
      color: 'blue',
      subtitle: 'Real-time volume'
    },
    {
      title: 'Most Popular Route',
      value: summary?.most_popular_route || 'N/A',
      change: 'Highest volume',
      changeType: 'neutral',
      icon: Route,
      color: 'green',
      subtitle: 'Most active path'
    },
    {
      title: 'Peak Demand Date',
      value: summary?.peak_demand_date || 'N/A',
      change: 'Busiest day',
      changeType: 'positive',
      icon: Clock,
      color: 'purple',
      subtitle: 'Demand peak'
    },
    {
      title: 'Unique Airlines',
      value: metrics?.unique_airlines.toLocaleString() || '0',
      change: 'Active carriers',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'orange',
      subtitle: 'Market diversity'
    },
    {
      title: 'Countries Served',
      value: metrics?.countries_served.toLocaleString() || '0',
      change: 'Global reach',
      changeType: 'positive',
      icon: Users,
      color: 'teal',
      subtitle: 'Network scope'
    },
    {
      title: 'Data Freshness',
      value: 'Just now',
      change: 'Real-time updates',
      changeType: 'neutral',
      icon: Calendar,
      color: 'indigo',
      subtitle: 'Last sync'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-600',
      green: 'bg-green-50 border-green-200 text-green-600',
      purple: 'bg-purple-50 border-purple-200 text-purple-600',
      orange: 'bg-orange-50 border-orange-200 text-orange-600',
      teal: 'bg-teal-50 border-teal-200 text-teal-600',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Fetching market insights...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Market Summary</h2>
          <p className="text-gray-600">Key metrics and performance indicators from backend API</p>
        </div>
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-100 animate-pulse">
            {error}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryCards.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl border-2 ${getColorClasses(item.color)} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">{item.subtitle}</div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <div className="text-3xl font-bold text-gray-900">{item.value}</div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${item.changeType === 'positive'
                        ? 'text-green-600'
                        : item.changeType === 'negative'
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }`}
                  >
                    {item.change}
                  </span>
                  {item.changeType === 'positive' && (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SummaryCards;