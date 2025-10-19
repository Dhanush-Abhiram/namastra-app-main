"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, Users, Shield } from "lucide-react";

export function ConsultBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-16 px-4 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          {/* Main CTA */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              💫 Need a personalized list from an astrologer?
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Get expert guidance tailored to your child&apos;s birth chart and
              family traditions
            </p>
          </div>

          {/* Price and Features */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  ₹2,999
                </div>
                <div className="text-gray-600 mb-4">one-time consultation</div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>4.9★ rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>500+ families</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Money-back guarantee</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book Consultation →
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Instant booking • 30-min session
                </p>
              </div>
            </div>
          </div>

          {/* What You Get */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Birth Chart Analysis
              </h3>
              <p className="text-sm text-gray-600">
                Detailed analysis of your child&apos;s nakshatra and planetary
                positions
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Personalized List
              </h3>
              <p className="text-sm text-gray-600">
                20+ carefully selected names with meanings and significance
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Family Consultation
              </h3>
              <p className="text-sm text-gray-600">
                Include family traditions and preferences in the selection
              </p>
            </div>
          </motion.div>

          {/* Bottom Note */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500">
              All consultations are conducted by certified Vedic astrologers
              with 10+ years of experience
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
