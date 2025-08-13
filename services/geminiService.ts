import { GoogleGenAI, Type } from "@google/genai";
import type { VideoSummary } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        videoTitle: {
            type: Type.STRING,
            description: "A plausible title for a video at the given URL. Be creative and relevant."
        },
        coreConcept: {
            type: Type.STRING,
            description: "The central idea of the video, explained in the simplest possible terms as if explaining it to a complete beginner (Feynman Technique)."
        },
        firstPrinciples: {
            type: Type.ARRAY,
            description: "A list of fundamental truths or basic principles discussed in the video.",
            items: {
                type: Type.OBJECT,
                properties: {
                    principle: {
                        type: Type.STRING,
                        description: "The name of the fundamental principle."
                    },
                    explanation: {
                        type: Type.STRING,
                        description: "A simple explanation of this principle."
                    }
                },
                required: ["principle", "explanation"]
            }
        },
        summaryPoints: {
            type: Type.ARRAY,
            description: "A bulleted list of the key takeaways or main points from the video.",
            items: {
                type: Type.STRING
            }
        },
        analogies: {
            type: Type.ARRAY,
            description: "A list of simple analogies used to explain complex topics in the video.",
            items: {
                type: Type.STRING
            }
        }
    },
    required: ["videoTitle", "coreConcept", "firstPrinciples", "summaryPoints", "analogies"]
};


export const generateVideoSummary = async (videoUrl: string): Promise<VideoSummary> => {
    const prompt = `You are an expert educator and content analyst. Your task is to analyze a hypothetical YouTube video based on its URL and produce a structured summary.
    
    The user has provided this URL: "${videoUrl}".
    
    Even though you cannot access the URL, act as if you have watched the video. Infer the likely topic and content from a typical video that might have such a URL or title. Generate a plausible, high-quality summary that helps a user deeply understand the content.
    
    The summary must be structured using these two techniques:
    1.  **The Feynman Technique:** Explain concepts in simple, clear language, avoiding jargon.
    2.  **First-Principles Thinking:** Break down the topic into its most fundamental truths or elements.
    
    The output must be a JSON object that strictly follows the provided schema.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });

        const jsonText = response.text.trim();
        if (!jsonText) {
             throw new Error("The API returned an empty response. The video topic might be too niche or the URL is invalid. Please try another.");
        }
        
        const parsedJson = JSON.parse(jsonText);
        return parsedJson as VideoSummary;

    } catch (error: unknown) {
        console.error("Error generating video summary:", error);
        if(error instanceof Error && error.message.includes('SAFETY')) {
            throw new Error("The request was blocked due to safety concerns. Please modify your topic and try again.");
        }
        throw new Error("Failed to generate video summary from AI. Please try again later.");
    }
};