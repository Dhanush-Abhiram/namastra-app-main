import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client only if API key is available
const getOpenAIClient = () => {
    if (!process.env.OPENAI_API_KEY) {
        return null;
    }
    return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
};

export async function POST(req: Request) {
    const { text } = await req.json();

    const client = getOpenAIClient();
    
    // If no API key, return mock response for development
    if (!client) {
        console.warn("OpenAI API key not found. Using mock response for development.");
        
        // Enhanced mock response with better pattern matching
        const mockResponse = {
            gender: text.toLowerCase().includes("girl") ? "girl" : 
                   text.toLowerCase().includes("boy") ? "boy" : "boy",
            syllables: text.includes("2") ? 2 : text.includes("3") ? 3 : text.includes("1") ? 1 : undefined,
            deity: text.toLowerCase().includes("vishnu") ? "Vishnu" :
                  text.toLowerCase().includes("shiva") ? "Shiva" :
                  text.toLowerCase().includes("devi") ? "Devi" :
                  text.toLowerCase().includes("ganesha") ? "Ganesha" :
                  text.toLowerCase().includes("krishna") ? "Krishna" :
                  text.toLowerCase().includes("rama") ? "Rama" : "None",
            sources: [
                text.toLowerCase().includes("veda") ? "Vedas" : null,
                text.toLowerCase().includes("sahasranama") ? "Sahasranama" : null,
                text.toLowerCase().includes("upanishad") ? "Upanishads" : null,
                text.toLowerCase().includes("purana") ? "Puranas" : null,
                text.toLowerCase().includes("epic") ? "Epics" : null,
            ].filter(Boolean),
            startLetters: text.match(/[A-Z][a-z]+/g) || [],
            vibe: text.toLowerCase().includes("modern") ? "strong" : 
                  text.toLowerCase().includes("soft") ? "soft" : 
                  text.toLowerCase().includes("traditional") ? "any" : "any",
            raw: text
        };
        
        return NextResponse.json(mockResponse);
    }

    try {
        // Create a response using the new Responses API
        const response = await client.responses.create({
            model: "gpt-4o-mini", // corrected model name
            input: `Parse this baby naming request into JSON with these exact keys:
                gender: "boy" | "girl" | "unisex",
                syllables: number | null,
                deity: "None" | "Vishnu" | "Shiva" | "Devi" | "Ganesha" | "Murugan" | "Rama" | "Krishna" | "Multiple",
                sources: string[],
                startLetters: string[],
                vibe: "soft" | "strong" | "any",
                raw: string
                
                Text: "${text}"
                
                Return only valid JSON.`,
        });

        // Extract plain text from the response
        const content = response.output_text ?? "";

        // Try to parse JSON from the model output safely
        let parsed;
        try {
            parsed = JSON.parse(content);
        } catch (parseError) {
            console.warn("Failed to parse OpenAI response as JSON:", parseError);
            // Fallback to enhanced mock parsing
            parsed = {
                gender: text.toLowerCase().includes("girl") ? "girl" : 
                       text.toLowerCase().includes("boy") ? "boy" : "boy",
                syllables: text.includes("2") ? 2 : text.includes("3") ? 3 : text.includes("1") ? 1 : null,
                deity: text.toLowerCase().includes("vishnu") ? "Vishnu" :
                      text.toLowerCase().includes("shiva") ? "Shiva" :
                      text.toLowerCase().includes("devi") ? "Devi" :
                      text.toLowerCase().includes("ganesha") ? "Ganesha" :
                      text.toLowerCase().includes("krishna") ? "Krishna" :
                      text.toLowerCase().includes("rama") ? "Rama" : "None",
                sources: [
                    text.toLowerCase().includes("veda") ? "Vedas" : null,
                    text.toLowerCase().includes("sahasranama") ? "Sahasranama" : null,
                    text.toLowerCase().includes("upanishad") ? "Upanishads" : null,
                    text.toLowerCase().includes("purana") ? "Puranas" : null,
                    text.toLowerCase().includes("epic") ? "Epics" : null,
                ].filter(Boolean),
                startLetters: text.match(/[A-Z][a-z]+/g) || [],
                vibe: text.toLowerCase().includes("modern") ? "strong" : 
                      text.toLowerCase().includes("soft") ? "soft" : 
                      text.toLowerCase().includes("traditional") ? "any" : "any",
                raw: text
            };
        }

        // Validate and sanitize the response
        const safeResponse = {
            gender: ["boy", "girl", "unisex"].includes(parsed.gender) ? parsed.gender : "boy",
            syllables: typeof parsed.syllables === "number" && parsed.syllables > 0 && parsed.syllables <= 5 ? parsed.syllables : null,
            deity: ["None", "Vishnu", "Shiva", "Devi", "Ganesha", "Murugan", "Rama", "Krishna", "Multiple"].includes(parsed.deity) ? parsed.deity : "None",
            sources: Array.isArray(parsed.sources) ? parsed.sources.filter((s: unknown) => typeof s === "string") : [],
            startLetters: Array.isArray(parsed.startLetters) ? parsed.startLetters.filter((s: unknown) => typeof s === "string") : [],
            vibe: ["soft", "strong", "any"].includes(parsed.vibe) ? parsed.vibe : "any",
            raw: text
        };

        return NextResponse.json(safeResponse);
    } catch (error) {
        console.error("OpenAI API error:", error);
        
        // Always return a safe fallback response
        const fallbackResponse = {
            gender: "boy",
            syllables: null,
            deity: "None",
            sources: [],
            startLetters: [],
            vibe: "any",
            raw: text,
            error: "Using fallback parsing due to API error"
        };
        
        return NextResponse.json(fallbackResponse);
    }
}
