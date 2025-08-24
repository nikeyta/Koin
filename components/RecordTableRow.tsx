"use client"
import { Record } from "@/app/actions/getAllRecords";
import { TableCell, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

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

const RecordTableRow = ({ 
  record, 
  isLoading, 
  onDelete 
}: { 
  record: Record; 
  isLoading: boolean; 
  onDelete: (id: string) => void; 
}) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (record?.date) {
      setFormattedDate(new Date(record.date).toLocaleDateString());
    }
  }, [record?.date]);

  return (
    <TableRow key={record.id}>
      <TableCell className="font-medium text-xs text-gray-100 uppercase">
        {formattedDate || ""}
      </TableCell>
      <TableCell>
        <div className="max-w-[200px]  text-gray-100">
          <p className="truncate break-words line-clamp-2 text-sm">
            {record?.text}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="text-base">
            {getCategoryEmoji(record?.category)}
          </span>
          <span className="text-sm font-medium text-gray-300">
            {record?.category}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <span className="text-lg font-bold text-gray-100">
          ₹{record?.amount.toFixed(2)}
        </span>
      </TableCell>
      <TableCell>
        <button
          onClick={() => onDelete(record.id)}
          disabled={isLoading}
          className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-1.5 rounded-full transition-colors duration-200"
          aria-label="Delete record"
        >
          {isLoading ? (
            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Trash2 size={14} />
          )}
        </button>
      </TableCell>
    </TableRow>
  );
};

export default RecordTableRow;