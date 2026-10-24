/**
 * Reference Hugging Face Inference configuration for Google Gemma 4 (31B-it Novita)
 * Supplied directly from specification:
 */

import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

export async function testGemmaInference() {
  const chatCompletion = await client.chat.completions.create({
    model: "google/gemma-4-31B-it:novita",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Explain the difference between JEE Main and Advanced in one concise paragraph for a Class 10 student.",
          },
        ],
      },
    ],
  });

  return chatCompletion.choices[0].message;
}
