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
  const [isLoading, setisLoading] = useState(false); // spinner for submit
  const [isCategorising, setisCategorising] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); //Stores success/error messages to show users

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

  const description = watch("text"); // monitors the description input field, to enable ai btn

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      setisLoading(true);

      const formData = new FormData();
      Object.entries(data).forEach(([Key, value]) => {
        formData.append(Key, value.toString());
      });

      const { error } = await addRecord(formData); //Send data to server
      if (error) {
        setAlertMessage(`Error : ${error}`);
        setAlertType("error");
      } else {
        setAlertType("success");
        setAlertMessage("expense added successfully");
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
      setAlertMessage("please enter a description");
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
    <div className="max-w-md  mb-5 mr-5 md:ml-15 md:mt-15 ml-5 mt-5 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Big amount display */}
        <h2 className="text-center text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Add New Transaction
        </h2>
        <div className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-gray-50 flex">
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("amount", { required: true })}
            className="w-full text-center text-2xl font-bold bg-transparent border-none focus:outline-none"
          />
        </div>

        {/* Date */}
        <input
          type="date"
          {...register("date", { required: true })}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Description + AI Suggest */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Description"
            {...register("text", { required: true })}
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAISuggestCategory}
            disabled={isCategorising || !description?.trim()}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700"
          >
            {isCategorising ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            ) : (
              "✨"
            )}
          </button>
        </div>

        {/* Category */}
        <select
          {...register("category", { required: true })}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
          className="w-full rounded-xl bg-[#004838] dark:bg-[#EBEDE8] text-white dark:text-black py-3 font-medium hover:bg-gray-800 transition disabled:opacity-50"
        >
          {isLoading ? "Adding..." : "Add Transaction"}
        </button>
      </form>

      {/* Alert */}
      {alertMessage && (
        <div
          className={`mt-4 p-3 rounded-lg border-l-4 ${
            alertType === "success"
              ? "bg-green-50 border-l-green-500 text-green-800"
              : "bg-red-50 border-l-red-500 text-red-800"
          }`}
        >
          <p className="text-sm">{alertMessage}</p>
        </div>
      )}
    </div>
  );
};

export default AddRecordForm;
