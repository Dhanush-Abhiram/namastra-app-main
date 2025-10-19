"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const QuickPick: React.FC = () => {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Quick Pick</CardTitle>
        <CardDescription>
          Use the filters above or natural language to refine results.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          Nothing else to configure here — you&apos;re good to go!
        </div>
      </CardContent>
    </Card>
  );
};
