
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Truck,
  RotateCcw,
  Percent,
  Megaphone,
} from "lucide-react";

import MetricCard from "./MetricCard";
import ExpenseBreakdown from "./ExpenseBreakdown";
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "../lib/formatCurrency";

export default function ProfitSummary({ result }) {
  const isProfitable = result.netProfit >= 0;

  const profitTone = isProfitable ? "green" : "red";
  const ProfitIcon = isProfitable ? TrendingUp : TrendingDown;

  const metrics = [
    {
      title: "Total revenue",
      value: formatCurrency(result.totalRevenue),
      description: "Estimated delivered sales",
      icon: IndianRupee,
      tone: "blue",
    },
    {
      title: "Total expenses",
      value: formatCurrency(result.totalExpenses),
      description: "All included costs",
      icon: ShoppingBag,
      tone: "orange",
    },
    {
      title: "Profit margin",
      value: formatPercentage(result.profitMargin),
      description: "Profit as a share of revenue",
      icon: Percent,
      tone: "gray",
    },
    {
      title: "Revenue / ad spend",
      value: `${formatNumber(result.revenueToAdSpend)}×`,
      description: "Total revenue divided by ad spend",
      icon: Megaphone,
      tone: "gray",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Main profit card */}
      <section
        className={`overflow-hidden rounded-2xl border p-5 shadow-sm sm:p-6 ${
          isProfitable
            ? "border-green-200 bg-green-50"
            : "border-red-200 bg-red-50"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p
              className={`text-sm font-semibold ${
                isProfitable ? "text-green-800" : "text-red-800"
              }`}
            >
              ESTIMATED NET {isProfitable ? "PROFIT" : "LOSS"}
            </p>

            <p
              className={`mt-2 break-words text-3xl font-bold tracking-tight sm:text-4xl ${
                isProfitable ? "text-green-700" : "text-red-700"
              }`}
            >
              {formatCurrency(Math.abs(result.netProfit))}
            </p>

            <p
              className={`mt-2 text-sm ${
                isProfitable ? "text-green-800" : "text-red-800"
              }`}
            >
              {isProfitable
                ? "Your estimated revenue exceeds your expenses."
                : "Your estimated expenses exceed your revenue."}
            </p>
          </div>

          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              isProfitable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <ProfitIcon size={25} aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Main metrics */}
      <section
        aria-label="Profit metrics"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </section>

      {/* Order summary */}
      <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="text-base font-semibold text-gray-900">
          Order summary
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <OrderMetric
            label="Total orders"
            value={formatNumber(result.totalOrders)}
            icon={ShoppingBag}
          />

          <OrderMetric
            label="Delivered (estimated)"
            value={formatNumber(result.deliveredOrders)}
            icon={Truck}
          />

          <OrderMetric
            label="RTO (estimated)"
            value={formatNumber(result.rtoOrders)}
            icon={RotateCcw}
          />
        </div>
      </section>

      {/* Expense breakdown */}
      <ExpenseBreakdown result={result} />

      <p className="text-xs leading-5 text-gray-500">
        Estimates depend on your inputs. Revenue / ad spend uses total
        revenue, not necessarily ad-attributed revenue. Taxes, refunds,
        actual courier billing and inventory recovery may change final
        profitability.
      </p>
    </div>
  );
}

function OrderMetric({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <div className="flex items-center gap-2 text-gray-500">
        <Icon size={16} aria-hidden="true" />
        <span className="text-xs font-medium">{label}</span>
      </div>

      <p className="mt-2 text-xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}
