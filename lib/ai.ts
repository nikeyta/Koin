import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export interface ExpenseRecord {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string | Date;
  // userId: string;
  // createdAt: Date;
}

export interface RawInsight {
  title: string;
  message: string;
  action: string;
  confidence: number;
}

export interface AIInsight extends RawInsight {
  id: string;
}

export async function categorizeExpense(description: string): Promise<string> {
  try {
    const prompt = ` Categorize the following expense description into one of:
      Food, Travel, Shopping, Entertainment, Bills, Health, Other.
      Just return the category name.

      Description: "${description}"`;
    const result = await model.generateContent([prompt]);
    const text = result.response.text().trim();
    return text || "other";
  } catch (error) {
    console.log("error in generating category");
    return "other";
  }
}

export async function generateAiInsights(
  expenses: ExpenseRecord[]
): Promise<AIInsight[]> {
  try {
    const expenseSummary = expenses.map((eachExpense) => ({
      amount: eachExpense.amount,
      category: eachExpense.category,
      description: eachExpense.description,
      date: eachExpense.date,
    }));

    const prompt = `You are a financial advisor AI who talks in genz language to relate to the users of app based in India. Analyze the following expense data and provide 3–4 actionable financial insights. 
Focus specifically on:
1. Where the user spent money unnecessarily or more than usual.
2. How they could have saved money in those cases.
3. Highlight good financial habits if any.
4. Suggest practical actions to reduce wasteful spending.

Return ONLY a JSON array of insights with this exact structure:
[
  {
    "title": "Brief title",
    "message": "Detailed insight message with specific numbers when possible",
    "action": "Clear and actionable suggestion",
    "confidence": 0.8
  }
]

Expense Data:
${JSON.stringify(expenseSummary, null, 2)}

IMPORTANT: Respond ONLY with valid JSON. Do not include extra text, explanations, or markdown code blocks.`;

    const result = await model.generateContent([prompt])

    //cleaning
    const response = result.response.text()
    let cleanedResponse = response.trim();
    if (cleanedResponse.startsWith("```json")) {
      cleanedResponse = cleanedResponse
        .replace(/^```json\s*/, "")
        .replace(/\s*```$/, "");
    } else if (cleanedResponse.startsWith("```")) {
      cleanedResponse = cleanedResponse
        .replace(/^```\s*/, "")
        .replace(/\s*```$/, "");
    }

    const insights = JSON.parse(cleanedResponse);

    //convert ai response to feedable data to ui
    const formattedInsights: AIInsight[] = insights.map(
      (insight: RawInsight, index: number) => ({
        id: `ai-${Date.now()}-${index}`, // format ai-1693256543871-0
        title: insight.title || "AI Insight",
        message: insight.message || "Analysis complete",
        action: insight.action || "Review spending habits",
        confidence: insight.confidence || 0.8,
      })
    );

    return formattedInsights;
  } catch (error) {
    console.log("error in generating ai insights");
    return [
      {
        id: "fallback-1",
        title: "AI Analysis Unavailable",
        message:
          "Unable to generate personalized insights at this time. Please try again later.",
        action: "Refresh insights",
        confidence: 0.5,
      },
    ];
  }
}
