
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartReply = async (context: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this conversation history, suggest a single, short, friendly response as if you are the user: \n\n${context}`,
      config: {
        systemInstruction: "You are a helpful assistant in a messaging app named 'Crops'. Keep replies short, professional yet warm, and relevant to agriculture or nature if applicable.",
        maxOutputTokens: 100,
      }
    });
    return response.text?.trim() || "I'll look into it.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Got it, thanks!";
  }
};

export const getConversationSummary = async (messages: any[]): Promise<string> => {
  try {
    const context = messages.map(m => `${m.senderId === 'me' ? 'Me' : 'Contact'}: ${m.text}`).join('\n');
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize this chat in 2-3 concise bullet points:\n\n${context}`,
      config: {
        systemInstruction: "Provide a quick recap of the conversation for the user."
      }
    });
    return response.text || "No summary available.";
  } catch (error) {
    return "Unable to generate summary at this time.";
  }
};

export const generateCropImage = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A beautiful, stylized agricultural or nature sticker of: ${prompt}. High quality, white background, vibrant colors.` }]
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};
