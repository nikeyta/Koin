'use client'

import {useState, useEffect} from 'react'
import { AIInsight } from '../lib/ai';
import getAIinsights from '@/app/actions/getAIinsights';

const AIInsights = () => {

   const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await getAIinsights();
        setInsights(data);
      } catch (error) {
        console.error("Failed to load AI insights:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading insights...</p>;
  }

  return (
    <div className="space-y-4">
      {insights.map((insight) => (
        <div
          key={insight.id}
          className="p-4 rounded-lg shadow-md border bg-white"
        >
          <h3 className="font-semibold text-lg">{insight.title}</h3>
          <p className="text-gray-700">{insight.message}</p>
          <p className="text-sm text-gray-500 italic">👉 {insight.action}</p>
        </div>
      ))}
    </div>
  );
}


export default AIInsights
