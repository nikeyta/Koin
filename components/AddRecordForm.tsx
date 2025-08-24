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
    <div
      className="relative md:mt-15 m-6 md:mx-25  rounded-3xl p-8 md:px-10 md:max-h-96
                glass-card"
    >
      <div className="absolute inset-0 rounded-3xl pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent opacity-20 rounded-t-3xl" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-5">
        <h2 className="text-center text-lg font-semibold  dark:text-white/90  bg-gradient-to-r from-gray-800 via-emerald-700 to-teal-700 
                                   dark:from-gray-100 dark:via-emerald-300 dark:to-teal-300 
                                   bg-clip-text text-transparent mb-4 drop-shadow">
          Add New Transaction
        </h2>

        <div className="text-xl font-bold text-center mb-6 ">
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("amount", { required: true })}
            className="w-full text-center text-3xl font-extrabold bg-transparent border-none 
                       dark:text-white text-black flex placeholder-white/40 focus:outline-none"
          />
        </div>

        <input
          type="date"
          {...register("date", { required: true })}
          className="w-full rounded-lg border border-white/30 bg-white/10 dark:text-white text-gray-600 flex placeholder-gray-300 px-3 py-2 
                     focus:ring-2 focus:ring-emerald-400 focus:outline-none backdrop-blur-md shadow-sm"
        />

  
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Description"
            {...register("text", { required: true })}
            className="flex-1 rounded-lg border border-white/30 bg-white/10 dark:text-white text-gray-600 dark:placeholder-gray-300 placeholder-gray-600 px-3 py-2 
                       focus:ring-2 focus:ring-emerald-400 focus:outline-none backdrop-blur-md shadow-sm"
          />
          <button
            type="button"
            onClick={handleAISuggestCategory}
            disabled={isCategorising || !description?.trim()}
            className="px-3 py-2 rounded-lg border border-white/30 bg-white/10 dark:text-white text-gray-600 
                       hover:bg-white/20 transition backdrop-blur-md shadow-sm"
          >
            {isCategorising ? (
              <div className="w-4 h-4 border-2 border-white border-t-emerald-400 rounded-full animate-spin"></div>
            ) : (
              "✨"
            )}
          </button>
        </div>

        {/* Category */}
        <select
          {...register("category", { required: true })}
          className="w-full rounded-lg border border-white/30 bg-white/10 dark:text-white text-gray-600 placeholder-gray-600 dark:placeholder-gray-300 px-3 py-2 
                     focus:ring-2 focus:ring-emerald-400 focus:outline-none backdrop-blur-md shadow-sm"
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
          className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 
                     font-medium hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] 
                     transition disabled:opacity-50 backdrop-blur-md shadow-lg"
        >
          {isLoading ? "Adding..." : "Add Transaction"}
        </button>
      </form>

      {alertMessage && (
        <div
          className={`mt-4 p-3 rounded-lg border-l-4 text-sm backdrop-blur-md shadow-inner ${
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
