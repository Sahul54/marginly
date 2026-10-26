
import {
  Package,
  Truck,
  RotateCcw,
  Megaphone,
  Receipt,
  Wallet,
} from "lucide-react";

import { formatCurrency } from "../lib/formatCurrency";

const expenseConfig = [
  {
    key: "productCost",
    label: "Product cost",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    key: "totalShipping",
    label: "Shipping charges",
    icon: Truck,
    color: "bg-violet-500",
  },
  {
    key: "totalRtoCost",
    label: "RTO charges",
    icon: RotateCcw,
    color: "bg-amber-500",
  },
  {
    key: "adSpend",
    label: "Advertising",
    icon: Megaphone,
    color: "bg-orange-500",
  },
  {
    key: "platformFees",
    label: "Platform fees",
    icon: Receipt,
    color: "bg-pink-500",
  },
  {
    key: "otherExpenses",
    label: "Other expenses",
    icon: Wallet,
    color: "bg-gray-500",
  },
];

export default function ExpenseBreakdown({ result }) {
  const totalExpenses = Math.max(
    0,
    Number(result?.totalExpenses) || 0
  );

  const rows = expenseConfig.map((expense) => ({
    ...expense,
    amount: Math.max(0, Number(result?.[expense.key]) || 0),
  }));

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Expense breakdown
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          See where your estimated business expenses are going.
        </p>
      </div>

      <div className="mb-6 rounded-xl bg-gray-50 p-4">
        <p className="text-sm text-gray-500">
          Total expenses
        </p>
        <p className="mt-1 text-2xl font-bold text-gray-900">
          {formatCurrency(totalExpenses)}
        </p>
      </div>

      <div className="space-y-5">
        {rows.map((expense) => {
          const Icon = expense.icon;

          const percentage =
            totalExpenses > 0
              ? (expense.amount / totalExpenses) * 100
              : 0;

          return (
            <div key={expense.key}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-600">
                    <Icon size={17} aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800">
                      {expense.label}
                    </p>
                    <p className="text-xs text-gray-500">
                      {percentage.toFixed(1)}% of expenses
                    </p>
                  </div>
                </div>

                <p className="shrink-0 text-sm font-semibold text-gray-900">
                  {formatCurrency(expense.amount)}
                </p>
              </div>

              <div
                className="h-2 overflow-hidden rounded-full bg-gray-100"
                role="progressbar"
                aria-label={`${expense.label} share of total expenses`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Number(percentage.toFixed(1))}
              >
                <div
                  className={`h-full rounded-full transition-all duration-300 ${expense.color}`}
                  style={{
                    width: `${Math.min(100, percentage)}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
