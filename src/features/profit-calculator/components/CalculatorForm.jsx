
"use client";

import { useProfitCalculator } from "../hooks/useProfitCalculator";
import CalculatorHeader from "./CalculatorHeader";
import ProductList from "./ProductList";
import ExpenseInputs from "./ExpenseInputs";
import ProfitSummary from "./ProfitSummary";
import ExportShareActions from "./ExportShareActions";

export default function CalculatorForm() {
  const {
    products,
    expenses,
    result,
    addProduct,
    updateProduct,
    removeProduct,
    updateExpense,
    resetCalculator,
  } = useProfitCalculator();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-1 sm:px-6 lg:px-8 lg:py-1">
        <CalculatorHeader onReset={resetCalculator} />

        {/* Calculator dashboard */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.85fr)]">
          {/* Inputs */}
          <div className="min-w-0 space-y-5">
            <ProductList
              products={products}
              onAdd={addProduct}
              onUpdate={updateProduct}
              onRemove={removeProduct}
            />

            <ExpenseInputs
              expenses={expenses}
              onChange={updateExpense}
            />
          </div>

          {/* Live results */}
          <aside className="min-w-0 space-y-5 lg:sticky lg:top-6">
            <ProfitSummary result={result} />
          </aside>
        </div>

        {/* Export and share */}
        <div className="mt-6">
          <ExportShareActions
            products={products}
            expenses={expenses}
            result={result}
          />
        </div>

        <footer className="mt-6 border-t border-gray-200 pt-4 text-center">
          <p className="text-xs leading-5 text-gray-500">
            Marginly provides estimates, not accounting or tax advice.
            Actual courier charges, taxes, refunds and inventory recovery
            may affect your final profit.
          </p>
        </footer>
      </div>
    </main>
  );
}
