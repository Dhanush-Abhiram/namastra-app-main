"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { AIInput } from "@/components/AIInput";
import { Categories } from "@/components/Categories";
import { Results } from "@/components/Results";
import { ConsultBanner } from "@/components/ConsultBanner";
import { Guides } from "@/components/Guides";
import { FiltersSheet } from "@/components/FiltersSheet";
import {
  NameRecord,
  searchNames,
  type Gender,
  type Script,
  type Deity,
  type Source,
} from "@/data/names.mock";

interface WishFilters {
  gender: Gender;
  syllables?: number;
  script?: Script;
  deity?: Deity;
  sources?: Source[];
  startLetters?: string[];
  vibe?: "soft" | "strong" | "any";
  lengthMax?: number | null;
  globalPronounce?: boolean;
}

export default function HomePage() {
  const [results, setResults] = useState<NameRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [filters, setFilters] = useState<WishFilters>({
    gender: "any",
    syllables: undefined,
    script: "Sanskrit",
    deity: undefined,
    sources: [],
    startLetters: [],
    vibe: "any",
    lengthMax: null,
    globalPronounce: false,
  });

  // Load initial popular names
  useEffect(() => {
    const loadPopularNames = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gender: "any",
            limit: 12,
            sortBy: "popularity",
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setResults(data.results || []);
          setTotal(data.total || 0);
        }
      } catch (error) {
        console.error("Error loading popular names:", error);
        // Fallback to local search
        const localResults = searchNames({ gender: "any" }, 12);
        setResults(localResults);
        setTotal(localResults.length);
      } finally {
        setIsLoading(false);
      }
    };

    loadPopularNames();
  }, []);

  const handleSearch = async (query: string, searchFilters?: any) => {
    setIsLoading(true);
    setCurrentQuery(query);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...searchFilters,
          query: query,
          limit: 20,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
        setTotal(data.total || 0);
      } else {
        // Fallback to local search
        const localResults = searchNames(searchFilters || {}, 20);
        setResults(localResults);
        setTotal(localResults.length);
      }
    } catch (error) {
      console.error("Error searching names:", error);
      // Fallback to local search
      const localResults = searchNames(searchFilters || {}, 20);
      setResults(localResults);
      setTotal(localResults.length);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdvancedSearch = async () => {
    await handleSearch(currentQuery, filters);
  };

  const handleResetFilters = () => {
    setFilters({
      gender: "any",
      syllables: undefined,
      script: "Sanskrit",
      deity: undefined,
      sources: [],
      startLetters: [],
      vibe: "any",
      lengthMax: null,
      globalPronounce: false,
    });
  };

  const handleLoadMore = async () => {
    // Implement pagination if needed
    console.log("Load more functionality to be implemented");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* AI Input Section */}
      <AIInput onSearch={handleSearch} isLoading={isLoading} />

      {/* Advanced Filters */}
      <div className="py-8 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <FiltersSheet
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={handleAdvancedSearch}
            onReset={handleResetFilters}
          />
        </div>
      </div>

      {/* Categories Section */}
      <Categories />

      {/* Results Section */}
      <Results
        results={results}
        total={total}
        query={currentQuery}
        isLoading={isLoading}
        onLoadMore={handleLoadMore}
        hasMore={false} // Implement pagination logic
      />

      {/* Consultation Banner */}
      <ConsultBanner />

      {/* Guides Section */}
      <Guides />
    </div>
  );
}
