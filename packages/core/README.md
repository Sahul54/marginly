# @marginly-dev/core

A lightweight JavaScript library for calculating ecommerce revenue, expenses, profit, loss, and profit margin.

`@marginly-dev/core` helps developers add ecommerce profit calculations to their applications without writing the calculation logic from scratch.

## Features

- Calculate total revenue from multiple products.
- Estimate delivered and Return to Origin (RTO) orders.
- Calculate product costs, shipping costs, and RTO charges.
- Include advertising spend, platform fees, and other expenses.
- Calculate total expenses and net profit or loss.
- Calculate profit margin.
- Calculate revenue-to-ad-spend ratio.
- Calculate profit per delivered order.
- Handle blank numeric inputs as zero.
- Validate invalid and negative numeric values.
- Use the calculation engine in JavaScript projects.

## Installation

Install the package from npm:

```bash
npm install @marginly-dev/core
```

## Usage

```javascript
import { calculateProfit } from "@marginly-dev/core";

const result = calculateProfit({
  products: [
    {
      orders: 10,
      sellingPrice: 100,
      productCost: 30,
    },
  ],
  expenses: {
    deliveryRate: 100,
    shippingCharge: 10,
    rtoCharge: 20,
    adSpend: 100,
    platformFees: 50,
    otherExpenses: 25,
  },
});

console.log("Total Revenue:", result.totalRevenue);
console.log("Total Expenses:", result.totalExpenses);
console.log("Net Profit:", result.netProfit);
console.log("Profit Margin:", result.profitMargin);
```

Expected output:

```text
Total Revenue: 1000
Total Expenses: 575
Net Profit: 425
Profit Margin: 42.5
```

## Input Parameters

### Product Fields

| Field | Description |
|---|---|
| `orders` | Number of orders for the product |
| `sellingPrice` | Selling price per unit |
| `productCost` | Product cost per unit |

### Expense Fields

| Field | Description |
|---|---|
| `deliveryRate` | Expected delivery rate as a percentage |
| `shippingCharge` | Shipping charge per estimated delivered order |
| `rtoCharge` | RTO charge per estimated returned order |
| `adSpend` | Total advertising spend |
| `platformFees` | Total platform fees |
| `otherExpenses` | Other business expenses |

The default delivery rate is 70% when omitted or set to `null`. Other omitted expenses are treated as zero.

Blank strings, `null`, and `undefined` are treated as zero by numeric input handling. Negative values and non-finite numeric values throw a `TypeError`. The delivery rate is capped at 100%.

## Calculation Results

The function returns an object containing:

| Field | Description |
|---|---|
| `totalOrders` | Total orders across all products |
| `deliveredOrders` | Estimated delivered orders |
| `rtoOrders` | Estimated RTO orders |
| `deliveryRate` | Delivery rate used in the calculation |
| `totalRevenue` | Estimated revenue from delivered orders |
| `productCost` | Product costs for estimated delivered orders |
| `totalShipping` | Estimated shipping costs |
| `totalRtoCost` | Estimated RTO costs |
| `adSpend` | Advertising spend |
| `platformFees` | Platform fees |
| `otherExpenses` | Other expenses |
| `totalExpenses` | Sum of all included expenses |
| `netProfit` | Revenue minus total expenses |
| `profitMargin` | Net profit as a percentage of revenue |
| `revenueToAdSpend` | Total revenue divided by advertising spend |
| `profitPerDeliveredOrder` | Net profit divided by estimated delivered orders |

A positive `netProfit` indicates estimated profit. A negative value indicates estimated loss. Zero indicates break-even under the included assumptions.

## How Calculations Work

- **Revenue:** Sum of estimated delivered orders multiplied by each product's selling price.
- **Total expenses:** Product costs, shipping charges, RTO charges, advertising spend, platform fees, and other expenses.
- **Net profit:** Total revenue minus total expenses.
- **Profit margin:** Net profit divided by total revenue, multiplied by 100. If revenue is zero, the margin is zero.

## Calculation Assumptions

- The same delivery rate applies to all products.
- Delivered and RTO quantities may be fractional estimates.
- Product costs and shipping charges apply to estimated delivered orders.
- RTO charges apply to estimated returned orders.
- Advertising spend is treated as an expense.
- `revenueToAdSpend` uses total revenue, not advertising-attributed revenue. It should not be interpreted as true advertising-attributed ROAS.

## Local Development

From the root of the repository, run the package tests:

```bash
npm run test --prefix packages/core
```

Or run the test file directly:

```bash
npx vitest run packages/core/src/index.test.js
```

## Limitations

This package provides estimates based on supplied inputs. It does not automatically account for taxes, refunds, payment gateway fees, inventory losses, or other costs not included in the supplied expenses.

The package provides calculation logic only. It does not include a user interface, database, or product management screen.

## Project

- **Live calculator:** https://marginly-five.vercel.app/
- **npm package:** https://www.npmjs.com/package/@marginly-dev/core

Contributions, bug reports, and feature suggestions are welcome.

## License

MIT License. See the `LICENSE` file in the repository.
