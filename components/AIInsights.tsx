'use client'

import { useState, useEffect } from 'react'
import { AIInsight } from '../lib/ai'
import getAIinsights from '@/app/actions/getAIinsights'

const AIInsights = () => {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [loading, setLoading] = useState(true)
  const [openIds, setOpenIds] = useState<string[]>([]) // track expanded insights on mobile

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await getAIinsights()
        setInsights(data)
      } catch (error) {
        console.error('Failed to load AI insights:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchInsights()
  }, [])

  const toggleInsight = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  if (loading) {
    return (
      <p className="text-gray-500 space-y-4 text-center m-5">
        Loading insights...
      </p>
    )
  }

  return (
    <div className="space-y-4  m-6 md:mx-35">
      <div className="md:text-4xl text-lg font-bold  bg-gradient-to-r from-emerald-900 via-emerald-300 to-teal-100 
                                   
                                   bg-clip-text text-transparent drop-shadow-sm dark:text-[#EBEDE8]">
        AI Insights
      </div>
      <div className="hidden md:block space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="p-4 rounded-lg shadow-md border bg-[#f6f6f6] dark:bg-[#c6c6c6]"
          >
            <h3 className="font-semibold text-lg text-[#073127]">
              {insight.title}
            </h3>
            <p className="text-gray-700">{insight.message}</p>
            <p className="text-xs text-gray-500 italic">Tip: {insight.action}</p>
          </div>
        ))}
      </div>
      <div className="block md:hidden space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="p-2 rounded-lg shadow-md border bg-[#EBEDE8]"
          >
            <h3
              className="font-semibold text-lg text-[#073127] cursor-pointer"
              onClick={() => toggleInsight(insight.id)}
            >
              {insight.title}
            </h3>
            {openIds.includes(insight.id) && (
              <>
                <p className="text-gray-700 mt-2">{insight.message}</p>
                <p className="text-sm text-gray-500 italic">
                  Tip: {insight.action}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AIInsights
