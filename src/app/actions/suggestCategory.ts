'use server';

import { categorizeExpense } from "../../../lib/ai";

interface CategoryReturnType{
    category?: string;
    error?: string;
}

async function suggestCategory(description : string) : Promise<CategoryReturnType> {
    try{
        if(!description || description.trim().length<2) {
            return { category : 'other', error : 'Description is too short to be ananlysed by AI'}
        }
        const category = await categorizeExpense(description.trim())
        return { category}
    }catch(error){
        return{
            category : 'other',
            error : 'some error occured, unable to suggest a category rn'
        }
    }
}

export default suggestCategory
