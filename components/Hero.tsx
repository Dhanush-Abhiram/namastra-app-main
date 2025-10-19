"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative py-20 px-4 text-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
    >
      <div className="max-w-4xl mx-auto">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Heart className="w-5 h-5 text-pink-500" />
          <span className="text-pink-600 font-medium italic">
            Elegant, calm & spiritual
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
        >
          Find an auspicious name
          <br />
          <span className="text-orange-500">your family will love</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          AI-powered • Rooted in tradition • Modern & Simple
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Finding Names
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-2 border-orange-200 text-orange-700 hover:bg-orange-50 px-8 py-4 text-lg font-semibold"
          >
            Explore Categories
          </Button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-20"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20"
        />
      </div>
    </motion.section>
  );
}
