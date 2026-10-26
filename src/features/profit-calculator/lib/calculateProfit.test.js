
import { describe, it, expect } from "vitest";
import { calculateProfit } from "./calculateProfit";

describe("calculateProfit", () => {
  it("calculates revenue and profit correctly", () => {
    const result = calculateProfit({
      products: [
        { orders: 100, sellingPrice: 599, productCost: 200 },
      ],
      expenses: {
        deliveryRate: 70,
        shippingCharge: 50,
        rtoCharge: 30,
        adSpend: 5000,
        platformFees: 1000,
        otherExpenses: 0,
      },
    });

    expect(result.totalRevenue).toBe(41930);
    expect(result.deliveredOrders).toBe(70);
    expect(result.rtoOrders).toBe(30);
    expect(result.totalExpenses).toBe(24400);
    expect(result.netProfit).toBe(17530);
    expect(result.profitMargin).toBeCloseTo(41.8078, 3);
  });

 it("returns zero revenue when delivery rate is zero", () => {
  const result = calculateProfit({
    products: [
      { orders: 100, sellingPrice: 500, productCost: 200 },
    ],
    expenses: {
      deliveryRate: 0,
      rtoCharge: 30,
    },
  });

  expect(result.totalRevenue).toBe(0);
  expect(result.deliveredOrders).toBe(0);
  expect(result.rtoOrders).toBe(100);
  expect(result.totalRtoCost).toBe(3000);
  expect(result.netProfit).toBe(-3000);
});

  it("handles empty products and expenses", () => {
    const result = calculateProfit({});

    expect(result.totalRevenue).toBe(0);
    expect(result.totalExpenses).toBe(0);
    expect(result.netProfit).toBe(0);
    expect(result.profitMargin).toBe(0);
  });

  it("handles blank expense inputs as zero", () => {
    const result = calculateProfit({
      products: [
        { orders: 10, sellingPrice: 100, productCost: 30 },
      ],
      expenses: {
        deliveryRate: 100,
        shippingCharge: "",
        rtoCharge: "",
        adSpend: "",
        platformFees: "",
        otherExpenses: "",
      },
    });

    expect(result.totalRevenue).toBe(1000);
    expect(result.totalExpenses).toBe(300);
    expect(result.netProfit).toBe(700);
  });
});
