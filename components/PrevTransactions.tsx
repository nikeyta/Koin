import getAllRecords, { Record } from '@/app/actions/getAllRecords'
import React from 'react'
import RecordsTable from './RecordsTable';

const PrevTransactions = async () => {
  const { records, error } = await getAllRecords()

  if (error) {
    return (
      <div className="shadow-lg 
                     
           glass-card rounded-2xl p-6 m-6 md:mx-35 ">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white text-lg">📝</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Expense History
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your spending timeline
            </p>
          </div>
        </div>
        <div className="bg-red-50/80 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-lg flex items-center justify-center">
              <span className="text-lg">⚠️</span>
            </div>
            <h4 className="font-semibold text-red-700 dark:text-red-300">
              Error loading expense history
            </h4>
          </div>
          <p className="text-red-600 dark:text-red-400 ml-10 text-sm">
            {error}
          </p>
        </div>
      </div>
    )
  }

  if (!records || records.length === 0) {
    return (
      <div className="   glass-card rounded-2xl p-6 m-6 md:mx-35 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white text-lg">📝</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Expense History
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-100/60 to-green-100/60 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-3xl">📊</span>
          </div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            No Expense Records Found
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
            Start tracking your expenses to see your spending history and
            patterns here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div id='expenses' className="  glass-card rounded-2xl p-6 m-6 md:mx-35">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10  rounded-xl flex items-center justify-center shadow-md">
          <span className="text-white text-lg">📝</span>
        </div>
        <div>
          <h3 className="text-xl  bg-gradient-to-r from-gray-800 via-emerald-700 to-teal-700  dark:from-gray-100 dark:via-emerald-300 dark:to-teal-300  bg-clip-text  text-transparent font-semibold ">
            Expense History
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your spending timeline
          </p>
        </div>
      </div>
      <div>
        <RecordsTable records={records} />
      </div>
    </div>
  )
}

export default PrevTransactions
