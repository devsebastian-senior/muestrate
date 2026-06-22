"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton({ children }: { children: React.ReactNode }) {
  return (
    <Button onClick={() => window.print()} variant="glass">
      <Download className="size-4" /> {children}
    </Button>
  );
}
