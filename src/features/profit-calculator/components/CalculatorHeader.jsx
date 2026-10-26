
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RotateCcw, TrendingUp } from "lucide-react";

export default function CalculatorHeader({ onReset }) {
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = () => {
    if (isResetting) return;

    setIsResetting(true);
    onReset?.();

    window.setTimeout(() => {
      setIsResetting(false);
    }, 600);
  };

  return (
    <header className="sticky top-0 z-50 mb-6 border-b border-gray-200/80 bg-gray-50/90 py-2 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white/95 px-4 py-3 shadow-sm sm:px-5"
      >
        {/* Brand */}
        <Link
          href="/"
          aria-label="Marginly home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-orange-50">
            <Image
              src="/logo.png"
              alt="Marginly logo"
              width={40}
              height={40}
              priority
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <h1 className="whitespace-nowrap text-xl font-extrabold tracking-tight text-gray-950">
              Margin<span className="inline-block bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 bg-clip-text pr-1 text-transparent">ly</span>
            </h1>
            <p className="text-xs text-gray-500">Profit Calculator</p>
          </div>
        </Link>

        {/* Center title */}
        <div className="hidden min-w-0 flex-1 text-center md:block">
          <p className="text-sm font-semibold text-gray-900">
            Ecommerce Profit Calculator
          </p>
          <p className="text-xs text-gray-500">
            Calculate before you scale
          </p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <div
            className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-medium text-green-700"
            aria-label="Live calculation enabled"
          >
            <TrendingUp size={15} aria-hidden="true" />
            <span className="hidden sm:inline">Live calculation</span>
            <span className="sm:hidden">Live</span>
            <span
              className="h-2 w-2 animate-pulse rounded-full bg-green-500"
              aria-hidden="true"
            />
          </div>

          <button
            type="button"
            onClick={handleReset}
            disabled={isResetting}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 active:translate-y-0 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
          >
            <RotateCcw
              size={15}
              aria-hidden="true"
              className={`transition-transform duration-500 ${
                isResetting ? "rotate-[-360deg]" : ""
              }`}
            />
            <span>{isResetting ? "Resetting..." : "Reset"}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
