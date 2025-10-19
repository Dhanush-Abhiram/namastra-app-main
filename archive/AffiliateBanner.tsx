"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, Users, Clock } from "lucide-react";

interface AffiliateBannerProps {
  campaign: "astrologer" | "consultation" | "ceremony" | "essentials";
  className?: string;
}

export function AffiliateBanner({
  campaign,
  className = "",
}: AffiliateBannerProps) {
  const campaigns = {
    astrologer: {
      title: "Get Personalized Names from Expert Astrologer",
      description:
        "Our certified Vedic astrologers will create a custom list of names based on your baby's birth chart, nakshatra, and family preferences.",
      cta: "Book Consultation",
      price: "₹2,999",
      features: [
        "Birth Chart Analysis",
        "Nakshatra-based Names",
        "Family Consultation",
        "Detailed Report",
      ],
      icon: "🔮",
      color: "from-purple-500 to-pink-500",
    },
    consultation: {
      title: "Premium Baby Naming Consultation",
      description:
        "Get expert guidance on choosing the perfect name with detailed analysis of meaning, numerology, and cultural significance.",
      cta: "Schedule Call",
      price: "₹1,999",
      features: [
        "1-on-1 Consultation",
        "Name Analysis",
        "Cultural Guidance",
        "Follow-up Support",
      ],
      icon: "👶",
      color: "from-blue-500 to-cyan-500",
    },
    ceremony: {
      title: "Traditional Naming Ceremony Services",
      description:
        "Complete naming ceremony package with priest services, rituals, and traditional elements for your baby's special day.",
      cta: "Book Service",
      price: "₹5,999",
      features: [
        "Priest Services",
        "Ritual Materials",
        "Venue Setup",
        "Photography",
      ],
      icon: "🕉️",
      color: "from-orange-500 to-red-500",
    },
    essentials: {
      title: "Baby Essentials & Naming Gifts",
      description:
        "Beautiful traditional gifts and essentials for your baby, including personalized items with their chosen name.",
      cta: "Shop Now",
      price: "From ₹499",
      features: [
        "Personalized Items",
        "Traditional Gifts",
        "Fast Delivery",
        "Gift Wrapping",
      ],
      icon: "🎁",
      color: "from-green-500 to-emerald-500",
    },
  };

  const config = campaigns[campaign];

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 border-2 ${className}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{config.icon}</div>
          <div>
            <CardTitle className="text-lg">{config.title}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                <Star className="h-3 w-3 mr-1" />
                4.9/5
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Users className="h-3 w-3 mr-1" />
                500+ families
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{config.description}</p>

        <div className="flex flex-wrap gap-2">
          {config.features.map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              ✓ {feature}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              {config.price}
            </span>
            <span className="text-sm text-muted-foreground">one-time</span>
          </div>
          <Button
            className={`bg-gradient-to-r ${config.color} hover:opacity-90 text-white gap-2`}
          >
            {config.cta}
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          <Clock className="h-3 w-3 inline mr-1" />
          Instant booking • 24/7 support • Money-back guarantee
        </div>
      </CardContent>
    </Card>
  );
}
