'use server'

import { auth } from "@clerk/nextjs/server"
import { checkUser } from "../../../lib/checkUser"
import db from "../../../lib/db"
import { generateAiInsights, ExpenseRecord } from "../../../lib/ai"

const getAIinsights = async () => {
    try{
        const {userId} = await auth()
        const user = await checkUser()
        if (!user) { throw new Error('User not authenticated') }

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const expenses = await db.record.findMany({
            where : {
                userId : user.clerkUserId, // to match ids
                createdAt : {
                    gte : thirtyDaysAgo,
                },
            },
            orderBy : {
                createdAt : 'desc'
            },
            take : 50

        })

          if (expenses.length === 0) {
      // Return default insights for new users
      return [
        {
          id: 'welcome-1',
          type: 'info',
          title: 'Welcome to ExpenseTracker AI!',
          message:
            'Start adding your expenses to get personalized AI insights about your spending patterns.',
          action: 'Add your first expense',
          confidence: 1.0,
        },
        {
          id: 'welcome-2',
          type: 'tip',
          title: 'Track Regularly',
          message:
            'For best results, try to log expenses daily. This helps our AI provide more accurate insights.',
          action: 'Set daily reminders',
          confidence: 1.0,
        },
      ];
    }

    //conver to format ai will accept
    const Data : ExpenseRecord[] =expenses.map((expense) => ({
      id: expense.id,
      amount: expense.amount,
      category: expense.category || 'Other',
      description: expense.text,
      date: expense.createdAt.toISOString(),
    }));


    //generate insigts 
    const insights = await generateAiInsights(Data)
return insights
    }catch(error){
         console.error('Error getting AI insights:', error);

    // Return fallback insights
    return [
      {
        id: 'error-1',
        type: 'warning',
        title: 'Insights Temporarily Unavailable',
        message:
          "We're having trouble analyzing your expenses right now. Please try again in a few minutes.",
        action: 'Retry analysis',
        confidence: 0.5,
      },
    ];
    }
 
}

export default getAIinsights
