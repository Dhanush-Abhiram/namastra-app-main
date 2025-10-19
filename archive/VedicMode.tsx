"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar, Search } from "lucide-react";

interface VedicModeProps {
  birth: { date?: string; time?: string; place?: string } | null;
  onBirthChange: (
    birth: { date?: string; time?: string; place?: string } | null
  ) => void;
  onSearch: () => void;
}

export const VedicMode: React.FC<VedicModeProps> = ({
  birth,
  onBirthChange,
  onSearch,
}) => {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" /> Birth details
        </CardTitle>
        <CardDescription>
          We&apos;ll compute Nakshatra → Pada → starting sounds (you can
          override anytime).
        </CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-3 gap-3">
        <div className="space-y-2">
          <Label>Date</Label>
          <Input
            type="date"
            className="rounded-xl"
            value={birth?.date || ""}
            onChange={(e) =>
              onBirthChange({ ...(birth || {}), date: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Time</Label>
          <Input
            type="time"
            className="rounded-xl"
            value={birth?.time || ""}
            onChange={(e) =>
              onBirthChange({ ...(birth || {}), time: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Place</Label>
          <Input
            placeholder="City, Country"
            className="rounded-xl"
            value={birth?.place || ""}
            onChange={(e) =>
              onBirthChange({ ...(birth || {}), place: e.target.value })
            }
          />
        </div>
        <div className="md:col-span-3 flex items-center gap-2">
          <Button onClick={onSearch} className="rounded-full gap-2">
            <Search className="h-4 w-4" /> Compute & Search
          </Button>
          <span className="text-xs text-muted-foreground">
            We&apos;ll suggest starting sounds like <i>Hu, He, Ho, Da</i> for
            Pushya.
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
