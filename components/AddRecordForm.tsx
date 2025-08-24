"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import addRecord from "@/app/actions/addRecordtoDb";
import suggestCategory from "@/app/actions/suggestCategory";

declare type AlertType = "error" | "success" | "";

declare interface ExpenseFormData {
  text: string;
  date: string;
  category: string;
  amount: number;
}

const AddRecordForm = () => {
  const [alertType, setAlertType] = useState<AlertType>("");
  const [isLoading, setisLoading] = useState(false);
  const [isCategorising, setisCategorising] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: "",
      date: "",
      category: "",
      amount: 0,
    },
  });

  const description = watch("text");

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      setisLoading(true);

      const formData = new FormData();
      Object.entries(data).forEach(([Key, value]) => {
        formData.append(Key, value.toString());
      });

      const { error } = await addRecord(formData);
      if (error) {
        setAlertMessage(`Error : ${error}`);
        setAlertType("error");
      } else {
        setAlertType("success");
        setAlertMessage("Expense added successfully");
        reset();
      }
    } catch {
      setAlertMessage("An unexpected error occurred. Please try again.");
    } finally {
      setisLoading(false);
    }
  };

  const handleAISuggestCategory = async () => {
    if (!description?.trim()) {
      setAlertMessage("Please enter a description");
      setAlertType("error");
      return;
    }

    setisCategorising(true);

    try {
      const { category, error } = await suggestCategory(description);
      if (error) {
        setAlertMessage(`AI Suggestion error : ${error}`);
        setAlertType("error");
      } else {
        setValue("category", category!);
        setAlertType("success");
        setAlertMessage(`AI successfully suggested a category`);
      }
    } catch (error) {
      setAlertMessage("Failed to get AI category");
      setAlertType("error");
    } finally {
      setisCategorising(false);
    }
  };

  return (
    <div className="max-w-md mb-5 mr-5 md:ml-15 md:mt-15 ml-5 mt-5 rounded-2xl shadow-lg p-8
                    bg-white/10 dark:bg-neutral-800/20 
                    backdrop-blur-xl border border-white/20 dark:border-gray-700/30">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
     
        <h2 className="text-center text-lg font-semibold text-gray-100 mb-4 drop-shadow-md">
          Add New Transaction
        </h2>

       
        <div className="text-xl font-bold text-center mb-6 text-white flex">
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("amount", { required: true })}
            className="w-full text-center text-3xl font-bold bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

    
        <input
          type="date"
          {...register("date", { required: true })}
          className="w-full rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-300 px-3 py-2 
                     focus:ring-2 focus:ring-emerald-400 focus:outline-none backdrop-blur-sm"
        />

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Description"
            {...register("text", { required: true })}
            className="flex-1 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-300 px-3 py-2 
                       focus:ring-2 focus:ring-emerald-400 focus:outline-none backdrop-blur-sm"
          />
          <button
            type="button"
            onClick={handleAISuggestCategory}
            disabled={isCategorising || !description?.trim()}
            className="px-3 py-2 rounded-lg border border-white/30 bg-white/10 text-white 
                       hover:bg-white/20 transition backdrop-blur-sm"
          >
            {isCategorising ? (
              <div className="w-4 h-4 border-2 border-white border-t-emerald-400 rounded-full animate-spin"></div>
            ) : (
              "✨"
            )}
          </button>
        </div>

     
        <select
          {...register("category", { required: true })}
          className="w-full rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-300 px-3 py-2 
                     focus:ring-2 focus:ring-emerald-400 focus:outline-none backdrop-blur-sm"
        >
          <option value="">Select category</option>
          <option value="Food">🍔 Food & Dining</option>
          <option value="Transportation">🚗 Transportation</option>
          <option value="Shopping">🛒 Shopping</option>
          <option value="Entertainment">🎬 Entertainment</option>
          <option value="Bills">💡 Bills & Utilities</option>
          <option value="Healthcare">🏥 Healthcare</option>
          <option value="Other">📦 Other</option>
        </select>

       
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-emerald-500/80 text-white py-3 font-medium hover:bg-emerald-600/90 
                     transition disabled:opacity-50 backdrop-blur-sm shadow-lg"
        >
          {isLoading ? "Adding..." : "Add Transaction"}
        </button>
      </form>

  
      {alertMessage && (
        <div
          className={`mt-4 p-3 rounded-lg border-l-4 text-sm backdrop-blur-md ${
            alertType === "success"
              ? "bg-emerald-500/20 border-l-emerald-400 text-emerald-200"
              : "bg-red-500/20 border-l-red-400 text-red-200"
          }`}
        >
          <p>{alertMessage}</p>
        </div>
      )}
    </div>
  );
};

export default AddRecordForm;
