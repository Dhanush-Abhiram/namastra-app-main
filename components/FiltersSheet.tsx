"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  SlidersHorizontal,
  Globe2,
  Laugh,
  Search,
  RotateCcw,
} from "lucide-react";
import {
  GENDERS,
  SCRIPTS,
  DEITIES,
  SOURCES,
  type Gender,
  type Script,
  type Deity,
  type Source,
} from "@/data/names.mock";

interface WishFilters {
  gender: Gender;
  syllables?: number;
  script?: Script;
  deity?: Deity;
  sources?: Source[];
  startLetters?: string[];
  vibe?: "soft" | "strong" | "any";
  lengthMax?: number | null;
  globalPronounce?: boolean;
}

interface FiltersSheetProps {
  filters: WishFilters;
  onFiltersChange: (filters: WishFilters) => void;
  onSearch: () => void;
  onReset: () => void;
}

export function FiltersSheet({
  filters,
  onFiltersChange,
  onSearch,
  onReset,
}: FiltersSheetProps) {
  const [open, setOpen] = React.useState(false);

  const handleApply = () => {
    onSearch();
    setOpen(false);
  };

  const handleReset = () => {
    onReset();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="border-orange-200 text-orange-700 hover:bg-orange-50"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Advanced Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            Advanced Filters
          </SheetTitle>
          <SheetDescription>
            Refine your search with detailed criteria
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Gender, Syllables, Script */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                value={filters.gender}
                onValueChange={(v: Gender) =>
                  onFiltersChange({ ...filters, gender: v })
                }
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GENDERS.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Syllables</Label>
              <Select
                value={String(filters.syllables ?? "any")}
                onValueChange={(v) =>
                  onFiltersChange({
                    ...filters,
                    syllables: v === "any" ? undefined : Number(v),
                  })
                }
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {[1, 2, 3].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Script</Label>
              <Select
                value={filters.script}
                onValueChange={(v: Script) =>
                  onFiltersChange({ ...filters, script: v })
                }
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SCRIPTS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Deity & Source */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label>Deity</Label>
              <Select
                value={filters.deity ?? "None"}
                onValueChange={(v: Deity) =>
                  onFiltersChange({ ...filters, deity: v })
                }
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEITIES.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Primary source</Label>
              <Select
                value={(filters.sources?.[0] ?? "None") as Source}
                onValueChange={(v: Source) =>
                  onFiltersChange({
                    ...filters,
                    sources: v === "None" ? [] : [v],
                  })
                }
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SOURCES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Start letters (comma-separated)</Label>
            <Input
              placeholder="e.g., Va, Vi, Ve"
              value={(filters.startLetters ?? []).join(", ")}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  startLetters: e.target.value
                    .split(",")
                    .map((x) => x.trim())
                    .filter(Boolean),
                })
              }
              className="rounded-xl"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4" />
              <Label>Global pronunciation</Label>
            </div>
            <Switch
              checked={!!filters.globalPronounce}
              onCheckedChange={(v) =>
                onFiltersChange({ ...filters, globalPronounce: v })
              }
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Laugh className="h-4 w-4" />
                <Label>Max length</Label>
              </div>
              <span className="text-xs text-muted-foreground">
                {filters.lengthMax ?? "no limit"}
              </span>
            </div>
            <Slider
              defaultValue={[filters.lengthMax ?? 0]}
              max={12}
              step={1}
              onValueChange={(v) =>
                onFiltersChange({
                  ...filters,
                  lengthMax: v[0] === 0 ? null : v[0],
                })
              }
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
