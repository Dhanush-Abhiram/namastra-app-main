"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NameCard } from "@/components/NameCard";
import { NameRecord } from "@/data/names.mock";
import { Loader2 } from "lucide-react";

interface ResultsProps {
  results: NameRecord[];
  total: number;
  query?: string;
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function Results({
  results,
  total,
  query,
  isLoading = false,
  onLoadMore,
  hasMore = false,
}: ResultsProps) {
  if (isLoading) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                Finding the perfect names...
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  if (!results || results.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No names found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {query
                ? `We couldn't find any names matching "${query}". Try adjusting your search.`
                : "Try searching with different criteria or browse our categories."}
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-orange-200 text-orange-700 hover:bg-orange-50"
            >
              Try Again
            </Button>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-16 px-4 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {query ? `Results for "${query}"` : "Popular Names (AI-curated)"}
          </h2>
          <p className="text-gray-600 text-lg">
            {total} {total === 1 ? "name" : "names"} found
            {query && " matching your criteria"}
          </p>
        </motion.div>

        {/* Results Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {results.map((name, index) => (
            <motion.div
              key={name.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -2 }}
            >
              <NameCard name={name} />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {hasMore && onLoadMore && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center"
          >
            <Button
              onClick={onLoadMore}
              size="lg"
              variant="outline"
              className="border-2 border-orange-200 text-orange-700 hover:bg-orange-50 px-8 py-3 text-lg font-semibold"
            >
              Load More Names
            </Button>
          </motion.div>
        )}

        {/* Results Footer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-600 mb-4">
            Still looking for the perfect name?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="border-orange-200 text-orange-700 hover:bg-orange-50"
            >
              Try Different Filters
            </Button>
            <Button
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              Browse All Categories
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
