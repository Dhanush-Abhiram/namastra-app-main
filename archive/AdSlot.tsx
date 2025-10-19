"use client";

import { Card, CardContent } from "@/components/ui/card";

interface AdSlotProps {
  position: "top" | "middle" | "sidebar" | "bottom";
  className?: string;
}

export function AdSlot({ position, className = "" }: AdSlotProps) {
  // In production, replace with real ad network integration
  const adContent = {
    top: {
      title: "Sponsored",
      content: "Premium Baby Naming Consultation",
      cta: "Get Personalized Names",
      size: "728x90",
    },
    middle: {
      title: "Advertisement",
      content: "Astrologer Consultation",
      cta: "Book Now",
      size: "300x250",
    },
    sidebar: {
      title: "Featured",
      content: "Baby Essentials Store",
      cta: "Shop Now",
      size: "300x600",
    },
    bottom: {
      title: "Recommended",
      content: "Naming Ceremony Services",
      cta: "Learn More",
      size: "728x90",
    },
  };

  const ad = adContent[position];

  return (
    <Card className={`border-dashed border-2 border-muted/50 ${className}`}>
      <CardContent className="p-4 text-center">
        <div className="text-xs text-muted-foreground mb-2">{ad.title}</div>
        <div className="text-sm font-medium mb-2">{ad.content}</div>
        <div className="text-xs text-muted-foreground mb-3">
          Ad Space ({ad.size})
        </div>
        <div className="bg-muted/20 rounded-lg px-3 py-2 text-xs text-muted-foreground">
          {ad.cta}
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Replace with real ad network
        </div>
      </CardContent>
    </Card>
  );
}
