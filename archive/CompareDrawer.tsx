"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Stars, X, CheckCircle2, ListFilter } from "lucide-react";
import { NameRecord } from "@/data/names.mock";

interface CompareDrawerProps {
  items: NameRecord[];
  onRemove: (id: string) => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  items,
  onRemove,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-full gap-2">
          <ListFilter className="h-4 w-4" /> Compare ({items.length})
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Stars className="h-5 w-5" /> Compare shortlist
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-3">
          {items.length === 0 && (
            <div className="text-sm text-muted-foreground">
              No names added yet.
            </div>
          )}
          {items.map((n) => (
            <div
              key={n.id}
              className="border rounded-xl p-4 flex items-start justify-between gap-3"
            >
              <div>
                <div className="font-semibold text-lg">{n.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {n.meaning}
                </div>
                <div className="flex gap-2 mt-2 text-xs">
                  <Badge variant="outline">{n.syllables} syllables</Badge>
                  <Badge variant="outline">Start {n.phoneticStart}</Badge>
                  {n.deityAffinity !== "None" && (
                    <Badge variant="outline">{n.deityAffinity}</Badge>
                  )}
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onRemove(n.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Separator className="my-4" />
        <SheetFooter>
          <Button className="w-full rounded-full gap-2">
            <CheckCircle2 className="h-4 w-4" /> Save & Share
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
