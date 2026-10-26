
"use client";

import {
  Download,
  FileJson,
  FileSpreadsheet,
  Share2,
  Copy,
} from "lucide-react";

import { formatCurrency, formatPercentage } from "../lib/formatCurrency";
import {
  downloadCSV,
  downloadJSON,
} from "../lib/exportCalculator";
import { createShareSummary } from "../lib/shareCalculator";

export default function ExportShareActions({ products, expenses, result }) {
  const handleExportCSV = () => {
    downloadCSV({ products, expenses, result });
  };

  const handleExportJSON = () => {
    downloadJSON({ products, expenses, result });
  };

  const handleCopySummary = async () => {
    const summary = createShareSummary(result);

    try {
      await navigator.clipboard.writeText(summary);
      window.alert("Profit summary copied!");
    } catch {
      window.alert("Unable to copy. Please check browser permissions.");
    }
  };

  const handleShare = async () => {
    const summary = createShareSummary(result);

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Marginly Profit Summary",
          text: summary,
        });
      } catch (error) {
        if (error?.name !== "AbortError") {
          window.alert("Unable to share this summary.");
        }
      }

      return;
    }

    await handleCopySummary();
  };

  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div>
        <h2 className="font-semibold text-gray-900">
          Export & share
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Save your estimate or share the summary.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <FileSpreadsheet size={17} />
          Export CSV
        </button>

        <button
          type="button"
          onClick={handleExportJSON}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <FileJson size={17} />
          Export JSON
        </button>

        <button
          type="button"
          onClick={handleCopySummary}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Copy size={17} />
          Copy summary
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
        >
          <Share2 size={17} />
          Share
        </button>
      </div>
    </section>
  );
}
