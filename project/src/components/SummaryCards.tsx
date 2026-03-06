import React, { useEffect, useState } from 'react';
import { Plane, Route, Clock, TrendingUp, Users, Calendar } from 'lucide-react';
import { apiService, SummaryData, MetricData, Filters } from '../services/api';
import GlassCard from './GlassCard';

interface SummaryCardsProps {
  filters: Filters;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ filters }) => {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [loading, setLoading] = useState(true);

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
      change: '+12.5%',
      changeType: 'positive',
      icon: Plane,
      color: 'blue'
    },
    {
      title: 'Most Popular Route',
      value: summary?.most_popular_route || 'N/A',
      change: 'Highest volume',
      changeType: 'neutral',
      icon: Route,
      color: 'green'
    },
    {
      title: 'Peak Demand Date',
      value: summary?.peak_demand_date || 'N/A',
      change: 'Busiest day',
      changeType: 'positive',
      icon: Clock,
      color: 'purple'
    },
    {
      title: 'Unique Airlines',
      value: metrics?.unique_airlines.toLocaleString() || '0',
      change: 'Active carriers',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'orange'
    },
    {
      title: 'Countries Served',
      value: metrics?.countries_served.toLocaleString() || '0',
      change: 'Global reach',
      changeType: 'positive',
      icon: Users,
      color: 'teal'
    },
    {
      title: 'Last Updated',
      value: 'Just now',
      change: 'Real-time',
      changeType: 'neutral',
      icon: Calendar,
      color: 'indigo'
    }
  ];

  if (loading) return null;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Market Pulse</h2>
        <p className="text-gray-500">Real-time aviation performance indicators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryCards.map((item, index) => (
          <GlassCard
            key={index}
            delay={index * 0.1}
            className="p-6 group hover:scale-[1.02] transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl bg-${item.color}-500/10 border border-${item.color}-500/20 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-6 h-6 text-${item.color}-600`} />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                {item.change}
              </span>
            </div>

            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">
              {item.title}
            </h3>
            <div className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">
              {item.value}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;