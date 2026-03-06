import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import FilterPanel from './components/FilterPanel';
import ChartSection from './components/ChartSection';
import SummaryCards from './components/SummaryCards';
import { Filters } from './services/api';

function App() {
  const [filters, setFilters] = useState<Filters>({});

  const handleSearch = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleClear = () => {
    setFilters({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <HeroSection />
      <div className="max-w-7xl mx-auto">
        <FilterPanel onSearch={handleSearch} onClear={handleClear} />
      </div>
      <SummaryCards filters={filters} />
      <ChartSection filters={filters} />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Airline Market Demand Tracker. Professional analytics for aviation industry.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;