
function downloadFile(content, fileName, mimeType) {
  const blob = new Blob([content], {
    type: `${mimeType};charset=utf-8;`,
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function escapeCSV(value) {
  const text = String(value ?? "");

  // Escape quotes and wrap values containing CSV special characters.
  return `"${text.replace(/"/g, '""')}"`;
}

export function downloadCSV({ products = [], expenses = {}, result = {} }) {
  const rows = [
    ["Marginly - Ecommerce Profit Calculator"],
    ["Generated At", new Date().toISOString()],
    [],
    ["PRODUCT DETAILS"],
    ["Product Name", "Orders", "Selling Price (INR)", "Product Cost (INR)"],
    ...products.map((product) => [
      product.name,
      product.orders,
      product.sellingPrice,
      product.productCost,
    ]),
    [],
    ["EXPENSE INPUTS"],
    ["Expense", "Value"],
    ["Delivery Rate (%)", expenses.deliveryRate],
    ["Advertising Spend (INR)", expenses.adSpend],
    ["Shipping per Delivered Order (INR)", expenses.shippingCharge],
    ["RTO per Returned Order (INR)", expenses.rtoCharge],
    ["Platform Fees (INR)", expenses.platformFees],
    ["Other Expenses (INR)", expenses.otherExpenses],
    [],
    ["CALCULATED RESULTS"],
    ["Metric", "Value"],
    ["Total Orders", result.totalOrders],
    ["Estimated Delivered Orders", result.deliveredOrders],
    ["Estimated RTO Orders", result.rtoOrders],
    ["Estimated Revenue (INR)", result.totalRevenue],
    ["Product Cost (INR)", result.productCost],
    ["Shipping Costs (INR)", result.totalShipping],
    ["RTO Costs (INR)", result.totalRtoCost],
    ["Advertising Spend (INR)", result.adSpend],
    ["Platform Fees (INR)", result.platformFees],
    ["Other Expenses (INR)", result.otherExpenses],
    ["Total Expenses (INR)", result.totalExpenses],
    ["Net Profit / Loss (INR)", result.netProfit],
    ["Profit Margin (%)", result.profitMargin],
    ["Revenue / Ad Spend", result.revenueToAdSpend],
  ];

  const csv = rows
    .map((row) => row.map(escapeCSV).join(","))
    .join("\r\n");

  // BOM helps spreadsheet apps detect UTF-8 correctly.
  downloadFile(
    `\uFEFF${csv}`,
    "marginly-profit-report.csv",
    "text/csv"
  );
}

export function downloadJSON({ products = [], expenses = {}, result = {} }) {
  const report = {
    app: "Marginly",
    reportType: "Ecommerce Profit Estimate",
    generatedAt: new Date().toISOString(),
    inputs: {
      products,
      expenses,
    },
    results: result,
    assumptions: [
      "Delivered and RTO quantities are estimates based on delivery rate.",
      "Product cost is counted for delivered units only.",
      "Shipping applies per estimated delivered order.",
      "RTO charges apply per estimated returned order.",
      "Revenue divided by ad spend is not necessarily ad-attributed ROAS.",
    ],
  };

  downloadFile(
    JSON.stringify(report, null, 2),
    "marginly-profit-report.json",
    "application/json"
  );
}
