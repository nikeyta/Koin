//server actions | Api routes

"use server";
import { auth } from "@clerk/nextjs/server";
import db from "../../../lib/db";
import { revalidatePath } from "next/cache";
import { parseISO } from "date-fns";
import { checkUser } from "../../../lib/checkUser";

interface RecordData {
  text: string;
  amount: number;
  category: string;
  date: string;
}

interface RecordResult {
  data?: RecordData;
  error?: string;
}

export default async function addRecord(
  formData: FormData
): Promise<RecordResult> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "User not found" };
  }

  // ✅ Ensure the user exists in the DB (creates if missing)
  const user = await checkUser();
  if (!user) {
    return { error: "Unable to verify user in database" };
  }  

  console.log("Clerk userId:", userId);
console.log("DB user:", user);

  //get values from form
  const nameval = formData.get("text");
  const amountval = formData.get("amount");
  const categoryval = formData.get("category");
  const dateval = formData.get("date");

  //server side validation
  if (!nameval || nameval === "") return { error: "name of item is missing" };
  if (!amountval || amountval === "")
    return { error: "amount of item is missing" };
  if (!categoryval || categoryval === "")
    return { error: "category of item is missing" };
  if (!dateval || dateval === "") return { error: "date of item is missing" };

  const text: string = nameval.toString();
  const amount: number = parseFloat(amountval.toString());
  const category: string = categoryval.toString();

  const inputDate = dateval.toString(); // "2025-08-20"
  const date = parseISO(inputDate).toISOString();



  try {
    const recordCreated = await db.record.create({
      data: {
        text,
        amount,
        category,
        date,
        userId  //check in db
      },
    });
    const recordData: RecordData = {
      text: recordCreated.text,
      amount: recordCreated.amount,
      category: recordCreated.category,
      date: recordCreated.date.toISOString(),
    };

    revalidatePath("/"); //refresh the home page, so the new expense shows up immediately."
    return { data: recordData };
  } catch (error) {
    return { error: `error in adding expense record ${error}` };
  }
}
