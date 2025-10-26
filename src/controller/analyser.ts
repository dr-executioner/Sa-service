import { analyseTextWithGemini } from "../middleware/gemini";
import { SentimentData } from "../models/sentiment";
import { Request, Response } from "express";

export async function sentimentAnalyzer(
  req: Request,
  res: Response
): Promise<void> {

  const { text } = req.body;

  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "Missing or invalid text input." });
    return;
  }

  try {
    const result: SentimentData | null = await analyseTextWithGemini(text);

    if (!result) {
      res.status(500).json({ error: "Analysis failed." });
      return;
    }

    res.json({ sentiment: result });
    return;
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to analyze sentiment.", details: error?.message });
    return;
  }
}
