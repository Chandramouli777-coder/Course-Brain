import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const generateNotes = async (topic: string, content?: string) => {
  const model = "gemini-3-flash-preview";
  const prompt = `Generate comprehensive, well-structured student notes for the topic: "${topic}". 
  ${content ? `Use the following content as reference: ${content}` : ""}
  Include:
  - Introduction
  - Key Concepts (bullet points)
  - Detailed Explanations
  - Summary
  - 3-5 Practice Questions
  Use Markdown formatting for headings, bold text, and lists.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return response.text;
};

export const solveDoubt = async (question: string, context?: string) => {
  const model = "gemini-3-flash-preview";
  const prompt = `You are an expert academic tutor. Answer the following student question clearly and concisely: "${question}".
  ${context ? `Context from student's study material: ${context}` : ""}
  If the question is not related to education or learning, politely redirect the student.
  Use Markdown for formatting.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return response.text;
};
