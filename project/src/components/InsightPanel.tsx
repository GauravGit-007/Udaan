import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, Lightbulb, Loader2 } from 'lucide-react';
import { apiService, InsightData, Filters } from '../services/api';
import GlassCard from './GlassCard';

interface InsightPanelProps {
    filters: Filters;
}

const InsightPanel: React.FC<InsightPanelProps> = ({ filters }) => {
    const [insights, setInsights] = useState<InsightData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInsights = async () => {
            try {
                setLoading(true);
                const data = await apiService.fetchInsights(filters);
                setInsights(data);
            } catch (err) {
                console.error('Failed to load insights:', err);
            } finally {
                setLoading(false);
            }
        };
        loadInsights();
    }, [filters]);

    if (loading) {
        return (
            <GlassCard className="p-8 flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin mr-3" />
                <span className="text-gray-600 font-medium">Generating AI Insights...</span>
            </GlassCard>
        );
    }

    if (!insights) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Insight Card */}
            <GlassCard className="lg:col-span-2 p-8" delay={0.1}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-500/20 rounded-2xl">
                        <Sparkles className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">AI Market Insights</h2>
                        <p className="text-gray-500 text-sm">Real-time analysis based on current flight volume</p>
                    </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {insights.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {insights.highlights.map((item, idx) => (
                        <div key={idx} className="bg-white/40 p-4 rounded-2xl border border-white/20">
                            <div className="text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold">
                                {item.label}
                            </div>
                            <div className={cn(
                                "text-xl font-bold",
                                item.type === 'positive' ? "text-green-600" :
                                    item.type === 'negative' ? "text-red-600" : "text-blue-600"
                            )}>
                                {item.value}
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>

            {/* Recommendations Card */}
            <GlassCard className="p-8 flex flex-col" delay={0.2}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-amber-500/20 rounded-2xl">
                        <Lightbulb className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Growth Actions</h3>
                </div>

                <div className="space-y-4 flex-1">
                    {insights.recommendations.map((rec, idx) => (
                        <div key={idx} className="flex gap-3 group">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <p className="text-gray-600 text-sm leading-snug group-hover:text-gray-800 transition-colors">
                                {rec}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                    <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                        Export Strategy
                    </button>
                </div>
            </GlassCard>
        </div>
    );
};

// Helper for conditional classes
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}

export default InsightPanel;
