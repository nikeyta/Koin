"use client";

import deleteRecord from "@/app/actions/deleteRecord";
import { Record } from "@/app/actions/getAllRecords";
import { Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
const getCategoryEmoji = (category: string) => {
  switch (category) {
    case "Food":
      return "🍔";
    case "Transportation":
      return "🚗";
    case "Shopping":
      return "🛒";
    case "Entertainment":
      return "🎬";
    case "Bills":
      return "💡";
    case "Healthcare":
      return "🏥";
    default:
      return "📦";
  }
};
const RecordItem = ({ record }: { record: Record }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    if (record?.date) {
      setFormattedDate(new Date(record.date).toLocaleDateString());
    }
  }, [record?.date]);
  const handleDeleteRecord = async (recordId: string) => {
    setIsLoading(true);
    deleteRecord(recordId)
  };
  return (
    <li className="flex items-start justify-between">
      <button
        onClick={() => handleDeleteRecord(record.id)}
        disabled={isLoading}
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
      >
        {isLoading ? (
          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <Trash2 size={14} />
        )}
      </button>

      <div className="flex relative flex-col">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          {formattedDate || ""}
        </span>

        <div className="flex items-center gap-3 mt-1">
          <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 max-w-[60%]">
            ₹{record?.amount.toFixed(2)}
          </span>
          <div className="max-w-[60%]">
            <p className="truncate break-words line-clamp-2">{record?.text}</p>
          </div>
         
          <div className="flex items-center justify-end gap-2 ">
          
            <p>|</p>
            <span className="text-base sm:text-lg ">
              {getCategoryEmoji(record?.category)}
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {record?.category}
            </span>
          </div>
        </div>
      </div>

      
    </li>
  );
};
export default RecordItem;
