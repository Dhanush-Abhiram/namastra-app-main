"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2 } from "lucide-react";

interface AIInputProps {
  onSearch: (query: string, filters?: any) => void;
  isLoading?: boolean;
}

export function AIInput({ onSearch, isLoading = false }: AIInputProps) {
  const [query, setQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const quickFilters = [
    { id: "boy", label: "Boy", icon: "👦" },
    { id: "girl", label: "Girl", icon: "👧" },
    { id: "deity", label: "By Deity", icon: "🕉️" },
    { id: "nakshatra", label: "By Nakshatra", icon: "⭐" },
  ];

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Call the parse-wishes API to convert natural language to structured filters
    try {
      const response = await fetch("/api/parse-wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: query }),
      });

      const parsedFilters = await response.json();

      // Merge with selected quick filters
      const mergedFilters = {
        ...parsedFilters,
        gender: selectedFilters.includes("boy")
          ? "male"
          : selectedFilters.includes("girl")
          ? "female"
          : parsedFilters.gender,
        deity: selectedFilters.includes("deity")
          ? parsedFilters.deity
          : parsedFilters.deity,
        nakshatra: selectedFilters.includes("nakshatra")
          ? parsedFilters.nakshatra
          : parsedFilters.nakshatra,
      };

      onSearch(query, mergedFilters);
    } catch (error) {
      console.error("Error parsing wishes:", error);
      // Fallback to simple search
      onSearch(query, {
        gender: selectedFilters.includes("boy")
          ? "male"
          : selectedFilters.includes("girl")
          ? "female"
          : null,
      });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-16 px-4 bg-white"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Wand2 className="w-6 h-6 text-purple-500" />
            <h2 className="text-3xl font-bold text-gray-900">
              Tell us what you have in mind
            </h2>
          </motion.div>
          <p className="text-gray-600 text-lg">
            Describe your perfect name and let AI find the best matches
          </p>
        </div>

        {/* Main Input Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Textarea */}
          <div className="relative">
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Baby girl, inspired by Lakshmi, 2 syllables, modern vibe..."
              className="min-h-[120px] text-lg p-6 border-2 border-gray-200 focus:border-orange-400 rounded-xl resize-none"
            />
            <div className="absolute bottom-4 right-4 text-sm text-gray-400">
              {query.length}/500
            </div>
          </div>

          {/* Quick Filter Chips */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {quickFilters.map((filter) => (
              <Badge
                key={filter.id}
                variant={
                  selectedFilters.includes(filter.id) ? "default" : "outline"
                }
                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedFilters.includes(filter.id)
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "border-orange-200 text-orange-700 hover:bg-orange-50"
                }`}
                onClick={() => handleFilterToggle(filter.id)}
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.label}
              </Badge>
            ))}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-center"
          >
            <Button
              type="submit"
              size="lg"
              disabled={!query.trim() || isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Finding Names...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Ask AI to suggest names
                </>
              )}
            </Button>
          </motion.div>
        </motion.form>

        {/* Example Prompts */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500 mb-3">Try these examples:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "Baby boy, 2 syllables, modern",
              "Girl name inspired by Krishna",
              "Traditional name for nakshatra Pushya",
              "Short name starting with A",
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => setQuery(example)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full transition-colors duration-200"
              >
                {example}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
