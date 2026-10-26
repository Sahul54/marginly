
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "./formatCurrency";

export function createShareSummary(result = {}) {
  const netProfit = Number(result.netProfit) || 0;
  const isProfit = netProfit >= 0;

  return [
    "Marginly — Ecommerce Profit Summary",
    "",
    `Estimated ${isProfit ? "Net Profit" : "Net Loss"}: ${formatCurrency(Math.abs(netProfit))}`,
    `Total Revenue: ${formatCurrency(result.totalRevenue)}`,
    `Total Expenses: ${formatCurrency(result.totalExpenses)}`,
    `Profit Margin: ${formatPercentage(result.profitMargin)}`,
    `Total Orders: ${formatNumber(result.totalOrders)}`,
    `Estimated Delivered Orders: ${formatNumber(result.deliveredOrders)}`,
    `Estimated RTO Orders: ${formatNumber(result.rtoOrders)}`,
    `Delivery Rate: ${formatPercentage(result.deliveryRate)}`,
    `Revenue / Ad Spend: ${formatNumber(result.revenueToAdSpend)}x`,
    "",
    "Note: These are estimates based on entered values. Revenue / Ad Spend uses total revenue, not necessarily ad-attributed revenue.",
  ].join("\n");
}
