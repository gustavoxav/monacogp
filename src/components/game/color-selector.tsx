"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ColorSelectorProps {
  colors: { name: string; value: string }[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export function ColorSelector({
  colors,
  selectedColor,
  onColorSelect,
}: Readonly<ColorSelectorProps>) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="absolute z-50 top-4 left-4 bg-black/80 rounded-lg border-2 border-cyan-500 overflow-hidden">
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        variant="ghost"
        size="sm"
        className="w-full flex items-center justify-between text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 px-3 py-2">
        <span className="text-sm font-bold font-mono">CORES</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </Button>

      {isExpanded && (
        <div className="p-3 pt-0">
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => onColorSelect(color.value)}
                className={`w-8 h-8 rounded transition-all ${
                  selectedColor === color.value
                    ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110"
                    : "hover:scale-105"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
