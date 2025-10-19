"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Sparkles, Info, Plus, Minus } from "lucide-react";
import { NameRecord } from "@/data/names.mock";

interface NameCardProps {
  rec: NameRecord;
  onCompareToggle: (id: string) => void;
  inCompare: boolean;
}

export const NameCard: React.FC<NameCardProps> = ({
  rec,
  onCompareToggle,
  inCompare,
}) => {
  return (
    <Card className="group hover:shadow-xl transition-shadow rounded-2xl border-muted/40">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5" /> {rec.name}
          </CardTitle>
          <Badge variant="secondary" className="rounded-full">
            {rec.syllables} syllables
          </Badge>
        </div>
        <CardDescription className="flex flex-wrap gap-2 pt-2">
          {rec.scripts?.Devanagari && (
            <Badge variant="outline">{rec.scripts.Devanagari}</Badge>
          )}
          {rec.deityAffinity !== "None" && (
            <Badge variant="outline">{rec.deityAffinity}</Badge>
          )}
          {rec.sources.slice(0, 2).map((s) => (
            <Badge key={s} variant="outline">
              {s}
            </Badge>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{rec.meaning}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{rec.language}</Badge>
          <Badge variant="secondary">{rec.regionTags.join(" · ")}</Badge>
          {rec.popularity && <Badge variant="outline">{rec.popularity}</Badge>}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Info className="h-4 w-4" /> Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-5 w-5" /> {rec.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Start: {rec.phoneticStart}</Badge>
                <Badge variant="outline">{rec.syllables} syllables</Badge>
                {rec.deityAffinity !== "None" && (
                  <Badge variant="outline">{rec.deityAffinity}</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {rec.meaning}
              </p>
              <div>
                <Label>Nicknames</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {rec.nicknames.map((n) => (
                    <Badge key={n} variant="secondary">
                      {n}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Related</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {rec.related.map((n) => (
                    <Badge key={n} variant="outline">
                      {n}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          onClick={() => onCompareToggle(rec.id)}
          variant={inCompare ? "secondary" : "default"}
          size="sm"
          className="gap-2 rounded-full"
        >
          {inCompare ? (
            <Minus className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}{" "}
          Compare
        </Button>
      </CardFooter>
    </Card>
  );
};
