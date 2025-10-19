"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Flower, Star, Heart, Baby, Users, Calendar } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: "vishnu",
    title: "Vishnu",
    description: "Names inspired by the Preserver",
    icon: Flower,
    href: "/deity/vishnu",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "shiva",
    title: "Shiva",
    description: "Names inspired by the Destroyer",
    icon: Star,
    href: "/deity/shiva",
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-50",
  },
  {
    id: "lakshmi",
    title: "Lakshmi",
    description: "Names inspired by the Goddess of Wealth",
    icon: Heart,
    href: "/deity/lakshmi",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
  },
  {
    id: "modern-boys",
    title: "Modern Boys",
    description: "Contemporary names for boys",
    icon: Baby,
    href: "/list/modern-boys",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
  },
  {
    id: "modern-girls",
    title: "Modern Girls",
    description: "Contemporary names for girls",
    icon: Users,
    href: "/list/modern-girls",
    color: "from-orange-500 to-yellow-500",
    bgColor: "bg-orange-50",
  },
  {
    id: "nakshatra",
    title: "By Nakshatra",
    description: "Names based on birth star",
    icon: Calendar,
    href: "/nakshatra",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50",
  },
];

export function Categories() {
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
            Browse by Blessing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with tradition. Explore by deity or nakshatra.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={category.href}>
                <Card className="h-full cursor-pointer group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <category.icon
                        className={`w-8 h-8 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                      />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                      {category.title}
                    </h3>

                    <p className="text-gray-600 mb-4">{category.description}</p>

                    <div className="flex items-center text-orange-500 font-medium group-hover:text-orange-600 transition-colors duration-300">
                      <span>Explore Names</span>
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
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
            Can&apos;t find what you&apos;re looking for?
          </p>
          <Link
            href="/search"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300"
          >
            Browse all names
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
