"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Star, Heart } from "lucide-react";
import Link from "next/link";

const guides = [
  {
    id: "krishna-108-names",
    title: "108 Names of Lord Krishna",
    description: "Complete list with meanings and significance",
    icon: BookOpen,
    href: "/guide/krishna-108-names",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    readTime: "5 min read",
  },
  {
    id: "nakshatra-names",
    title: "How to Choose Names by Nakshatra",
    description: "Astrological guide for selecting auspicious names",
    icon: Star,
    href: "/guide/nakshatra-names",
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-50",
    readTime: "7 min read",
  },
  {
    id: "modern-girl-names",
    title: "Modern Hindu Girl Names",
    description: "Contemporary names loved globally",
    icon: Heart,
    href: "/guide/modern-girl-names",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    readTime: "4 min read",
  },
];

export function Guides() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-16 px-4 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Naming Guides & Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn the art of choosing meaningful names with our expert guides
          </p>
        </motion.div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={guide.href}>
                <Card className="h-full cursor-pointer group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 ${guide.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <guide.icon
                        className={`w-8 h-8 bg-gradient-to-r ${guide.color} bg-clip-text text-transparent`}
                      />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                      {guide.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {guide.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-orange-500 font-medium group-hover:text-orange-600 transition-colors duration-300">
                        <span>Read Guide</span>
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.div>
                      </div>
                      <span className="text-sm text-gray-400">
                        {guide.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Want to learn more about Hindu naming traditions?
          </p>
          <Link
            href="/guides"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300"
          >
            View All Guides
            <motion.div
              className="ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
