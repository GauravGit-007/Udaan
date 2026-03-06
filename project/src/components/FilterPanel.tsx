import React, { useState } from 'react';
import { Search, Calendar, MapPin, Filter } from 'lucide-react';

const FilterPanel: React.FC = () => {
  const [selectedDeparture, setSelectedDeparture] = useState('');
  const [selectedArrival, setSelectedArrival] = useState('');
  const [dateRange, setDateRange] = useState('');

  const airports = [
    { code: 'LAX', name: 'Los Angeles International' },
    { code: 'JFK', name: 'John F. Kennedy International' },
    { code: 'LHR', name: 'London Heathrow' },
    { code: 'CDG', name: 'Charles de Gaulle' },
    { code: 'DXB', name: 'Dubai International' },
    { code: 'NRT', name: 'Tokyo Narita' },
    { code: 'SIN', name: 'Singapore Changi' },
    { code: 'FRA', name: 'Frankfurt Airport' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mx-4 -mt-8 relative z-10 border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Filter Routes</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Departure Airport */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            <MapPin className="w-4 h-4 inline mr-2 text-blue-600" />
            Departure Airport
          </label>
          <select
            value={selectedDeparture}
            onChange={(e) => setSelectedDeparture(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-blue-400"
          >
            <option value="">Select departure airport</option>
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.code} - {airport.name}
              </option>
            ))}
          </select>
        </div>

        {/* Arrival Airport */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            <MapPin className="w-4 h-4 inline mr-2 text-green-600" />
            Arrival Airport
          </label>
          <select
            value={selectedArrival}
            onChange={(e) => setSelectedArrival(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-blue-400"
          >
            <option value="">Select arrival airport</option>
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.code} - {airport.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4 inline mr-2 text-purple-600" />
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-blue-400"
          >
            <option value="">Select date range</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="custom">Custom range</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
          <Search className="w-4 h-4" />
          Search Routes
        </button>
        <button className="px-6 py-3 border border-gray-300 hover:border-blue-400 text-gray-700 font-medium rounded-lg transition-colors duration-200">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;