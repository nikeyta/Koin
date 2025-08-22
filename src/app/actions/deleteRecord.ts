'use server'
import { auth } from '@clerk/nextjs/server'

import db from '../../../lib/db'
import { checkUser } from '../../../lib/checkUser'
import { revalidatePath } from 'next/cache'

const deleteRecord = async (recordId : string) : Promise<{
    message?: string,
    error?: string
}> => {
    const {userId} = await auth()
    if(!userId){
        return {error : 'user not found'}
    }
    const user = await checkUser()
 try{
   
    await db.record.delete({
        where : {
            id : recordId,
            userId : user?.clerkUserId
        }
    })
    revalidatePath('/')
    return {message : 'Record deleted'}
 }catch(error){
    return {error : "error in deleting record"}
 }
}

export default deleteRecord
