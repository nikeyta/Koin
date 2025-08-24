"use client"

import deleteRecord from "@/app/actions/deleteRecord";
import { Record } from "@/app/actions/getAllRecords";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RecordTableRow from "./RecordTableRow";


interface RecordsTableProps {
  records: Record[];
}

const RecordsTable = ({ records }: RecordsTableProps) => {
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

  const handleDeleteRecord = async (recordId: string) => {
    setLoadingStates(prev => ({ ...prev, [recordId]: true }));
    try {
      await deleteRecord(recordId);
    } catch (error) {
      console.error("Error deleting record:", error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [recordId]: false }));
    }
  };

  const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);

  return (

    <Table className="overflow-scroll h-3">
      <TableHeader>
        <TableRow className="dark:text-gray-100">
          <TableHead className="w-[120px] text-gray-600 dark:text-gray-100">Date</TableHead>
          <TableHead className="text-gray-600 dark:text-gray-100">Description</TableHead>
          <TableHead className="text-gray-600 dark:text-gray-100">Category</TableHead>
          <TableHead className="text-right text-gray-600 dark:text-gray-100">Amount</TableHead>
          <TableHead className="w-[60px] text-gray-600 dark:text-gray-100">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record) => (
          <RecordTableRow
            key={record.id} 
            record={record} 
            isLoading={loadingStates[record.id] || false}
            onDelete={handleDeleteRecord}
          />
        ))}
      </TableBody>
      {records.length > 0 && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="font-medium">Total</TableCell>
            <TableCell className="text-right font-bold">₹{totalAmount.toFixed(2)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
};

export default RecordsTable