'use server'

import { auth, currentUser } from "@clerk/nextjs/server"
import db from "../../../lib/db";

export interface Record {
  date: string | number | Date;
  id: string;
  text: string;
  amount: number;
  category: string;
  userId: string;
  createdAt: Date;
}

async function  getAllRecords() : Promise<{
    records? : Record[],
    error? : string
}> {
 const {userId} = await auth()
  if (!userId) {
    return { error: 'User not found' };
  }
  try{
    const records = await db.record.findMany({
        where : {userId},
        orderBy : { date : 'desc'},
        take : 10
    })
    return {records}
  }catch (error) {
    console.error('Error fetching records:', error); // Log the error
    return { error: 'Database error' };
  }
}

export default getAllRecords
