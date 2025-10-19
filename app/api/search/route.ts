import { NextResponse } from "next/server";
import { MOCK_NAMES, type NameRecord, type Gender, type Deity, type Source } from "@/data/names.mock";

export type SearchFilters = {
  gender?: Gender;
  syllables?: number;
  script?: string;
  deity?: Deity;
  sources?: Source[];
  themes?: string[];
  startLetters?: string[];
  vibe?: "soft" | "strong" | "any";
  lengthMax?: number | null;
  globalPronounce?: boolean;
  startSounds?: string[];
  nakshatra?: string;
  limit?: number;
  offset?: number;
};

export type SearchResponse = {
  results: NameRecord[];
  total: number;
  tookMs: number;
  filters: SearchFilters;
};

export async function POST(req: Request) {
  const startTime = Date.now();
  
  try {
    const filters: SearchFilters = await req.json();
    
    // Start with all names
    let results = [...MOCK_NAMES];
    
    // Apply filters
    if (filters.gender) {
      results = results.filter(n => n.gender === filters.gender || n.gender === "unisex");
    }
    
    if (filters.syllables) {
      results = results.filter(n => n.syllables === filters.syllables);
    }
    
    if (filters.deity && filters.deity !== "None") {
      results = results.filter(n => 
        n.deityAffinity === filters.deity || n.deityAffinity === "Multiple"
      );
    }
    
    if (filters.sources && filters.sources.length > 0) {
      results = results.filter(n => 
        n.sources.some(s => filters.sources!.includes(s))
      );
    }
    
    if (filters.startLetters && filters.startLetters.length > 0) {
      results = results.filter(n => 
        filters.startLetters!.some(letter => 
          n.name.toLowerCase().startsWith(letter.toLowerCase())
        )
      );
    }
    
    if (filters.startSounds && filters.startSounds.length > 0) {
      results = results.filter(n => 
        filters.startSounds!.some(sound => 
          n.phoneticStart.toLowerCase().startsWith(sound.toLowerCase())
        )
      );
    }
    
    if (filters.lengthMax) {
      results = results.filter(n => n.name.length <= filters.lengthMax!);
    }
    
    if (filters.globalPronounce) {
      results = results.filter(n => n.globalPronounce >= 3);
    }
    
    // Sort by popularity and modernity
    results.sort((a, b) => {
      const popularityOrder = { common: 3, uncommon: 2, rare: 1 };
      const aPop = popularityOrder[a.popularity || "uncommon"];
      const bPop = popularityOrder[b.popularity || "uncommon"];
      
      if (aPop !== bPop) return bPop - aPop;
      return b.modernity - a.modernity;
    });
    
    // Apply pagination
    const offset = filters.offset || 0;
    const limit = filters.limit || 40;
    const paginatedResults = results.slice(offset, offset + limit);
    
    const tookMs = Date.now() - startTime;
    
    return NextResponse.json({
      results: paginatedResults,
      total: results.length,
      tookMs,
      filters
    } as SearchResponse);
    
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { 
        error: "Search failed", 
        results: [], 
        total: 0, 
        tookMs: Date.now() - startTime 
      },
      { status: 500 }
    );
  }
}

// GET endpoint for simple searches
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  
  if (!query) {
    return NextResponse.json({ results: [], total: 0, tookMs: 0 });
  }
  
  const startTime = Date.now();
  
  // Simple text search
  const results = MOCK_NAMES.filter(name => 
    name.name.toLowerCase().includes(query.toLowerCase()) ||
    name.meaning.toLowerCase().includes(query.toLowerCase()) ||
    name.nicknames.some(nick => nick.toLowerCase().includes(query.toLowerCase()))
  );
  
  const tookMs = Date.now() - startTime;
  
  return NextResponse.json({
    results: results.slice(0, 20), // Limit to 20 for GET requests
    total: results.length,
    tookMs,
    query
  });
}
