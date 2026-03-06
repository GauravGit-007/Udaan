import { useState } from 'react';
import HeroSection from './components/HeroSection';
import FilterPanel from './components/FilterPanel';
import ChartSection from './components/ChartSection';
import SummaryCards from './components/SummaryCards';
import InsightPanel from './components/InsightPanel';
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
    <div className="min-h-screen mesh-gradient font-sans text-gray-900 border-t-8 border-blue-600">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-10">
        <FilterPanel onSearch={handleSearch} onClear={handleClear} />

        <div className="mt-12 space-y-12 pb-24">
          <InsightPanel filters={filters} />
          <SummaryCards filters={filters} />
          <ChartSection filters={filters} />
        </div>
      </div>

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