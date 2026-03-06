import React from 'react';
import { Plane, Route, Clock, TrendingUp, Users, Calendar } from 'lucide-react';

const SummaryCards: React.FC = () => {
  const summaryData = [
    {
      title: 'Total Flights',
      value: '24,567',
      change: '+12.5%',
      changeType: 'positive',
      icon: Plane,
      color: 'blue',
      subtitle: 'This month'
    },
    {
      title: 'Most Popular Route',
      value: 'LAX → JFK',
      change: '2,450 passengers',
      changeType: 'neutral',
      icon: Route,
      color: 'green',
      subtitle: 'Highest volume'
    },
    {
      title: 'Peak Demand Period',
      value: '2:00 PM - 4:00 PM',
      change: '+28% above average',
      changeType: 'positive',
      icon: Clock,
      color: 'purple',
      subtitle: 'Daily peak hours'
    },
    {
      title: 'Average Growth',
      value: '8.7%',
      change: 'vs last quarter',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'orange',
      subtitle: 'Quarterly trend'
    },
    {
      title: 'Active Routes',
      value: '1,247',
      change: '+45 new routes',
      changeType: 'positive',
      icon: Users,
      color: 'teal',
      subtitle: 'Currently monitored'
    },
    {
      title: 'Data Freshness',
      value: '2 min ago',
      change: 'Real-time updates',
      changeType: 'neutral',
      icon: Calendar,
      color: 'indigo',
      subtitle: 'Last refresh'
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Market Summary</h2>
        <p className="text-gray-600">Key metrics and performance indicators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryData.map((item, index) => {
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
                    className={`text-sm font-medium ${
                      item.changeType === 'positive'
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

      {/* Flask Backend Integration Note */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Backend Integration Ready</h3>
        </div>
        <p className="text-gray-600 leading-relaxed">
          These summary cards are designed to receive real-time data from your Python Flask backend. 
          Replace the mock data with API calls to endpoints like <code className="bg-white px-2 py-1 rounded text-sm">/api/summary</code>, 
          <code className="bg-white px-2 py-1 rounded text-sm">/api/routes</code>, and <code className="bg-white px-2 py-1 rounded text-sm">/api/metrics</code>.
        </p>
      </div>
    </div>
  );
};

export default SummaryCards;