import { GoogleGenAI } from "@google/genai";
import { SentimentData } from "../models/sentiment";
import config from "../config/config";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({
  apiKey: config.googleApiKey,
});

export async function analyseTextWithGemini(
  text: string
): Promise<SentimentData> {
  try {
    const prompt = `
            Analyze the following text and return a JSON with keys:
            - content : the actual text as it is
            - summary : 1-2 sentences summary
            - tags : an array of keywords
            - name : name mentioned in the text, if present
            - email : email mentioned in the text , if present
            - purpose : motive of the text in 1 or 2 words at max
            - sentiment : positive , negative and neutral
            
            Text:"${text}"
            Return strictly valid JSON
        `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    if (!response.text) {
      throw new Error("No response content received from Gemini");
    }

    try {
      const jsonString = response.text.replace(/```json\n?|\n?```/g, "").trim();
      const result = JSON.parse(jsonString) as any;

    //  if (
    //    typeof result.sentiment !== "string" ||
    //    typeof result.summary !== "string" ||
    //    !Array.isArray(result.tags) ||
    //    typeof result.priority !== "string"
    //  ) {
    //    throw new Error(
    //      "Invalid response format from Gemini: Missing required fields"
    //    );
    //  }


      return result;
    } catch (parseError) {
      if (parseError instanceof SyntaxError) {
        throw new Error(
          `Failed to parse Gemini response: Invalid JSON format. Raw response: ${response.text}`
        );
      }
      throw parseError;
    }
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        throw new Error(
          "Invalid or missing Google API key. Please check your environment variables"
        );
      }
      throw new Error("Failed to analyze with Gemini: " + error.message);
    }
    throw new Error("Failed to analyze with Gemini");
  }
}
