import { describe, it, expect } from "vitest";
import { calculateProfit } from "./index.js";

describe("calculateProfit", () => {
  it("calculates profit correctly", () => {
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

    expect(result.totalOrders).toBe(100);
    expect(result.deliveredOrders).toBe(70);
    expect(result.rtoOrders).toBeCloseTo(30);
    expect(result.totalRevenue).toBe(41930);
    expect(result.totalExpenses).toBeCloseTo(24400);
    expect(result.netProfit).toBeCloseTo(17530);
    expect(result.profitMargin).toBeCloseTo(41.8078, 3);
  });

  it("calculates a loss when expenses exceed revenue", () => {
    const result = calculateProfit({
      products: [
        { orders: 10, sellingPrice: 100, productCost: 30 },
      ],
      expenses: {
        deliveryRate: 100,
        shippingCharge: 0,
        adSpend: 1000,
      },
    });

    expect(result.totalRevenue).toBe(1000);
    expect(result.totalExpenses).toBe(1300);
    expect(result.netProfit).toBe(-300);
    expect(result.profitMargin).toBe(-30);
  });

  it("calculates results for multiple products", () => {
    const result = calculateProfit({
      products: [
        { orders: 10, sellingPrice: 100, productCost: 30 },
        { orders: 5, sellingPrice: 200, productCost: 80 },
      ],
      expenses: {
        deliveryRate: 100,
        shippingCharge: 10,
        rtoCharge: 20,
        adSpend: 100,
      },
    });

    expect(result.totalOrders).toBe(15);
    expect(result.deliveredOrders).toBe(15);
    expect(result.totalRevenue).toBe(2000);
    expect(result.productCost).toBe(700);
    expect(result.totalShipping).toBe(150);
    expect(result.totalExpenses).toBe(950);
    expect(result.netProfit).toBe(1050);
  });

  it("handles empty inputs", () => {
    const result = calculateProfit();

    expect(result.totalOrders).toBe(0);
    expect(result.totalRevenue).toBe(0);
    expect(result.totalExpenses).toBe(0);
    expect(result.netProfit).toBe(0);
    expect(result.profitMargin).toBe(0);
  });

  it("treats blank product and expense values as zero", () => {
    const result = calculateProfit({
      products: [
        { orders: "", sellingPrice: "", productCost: "" },
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

    expect(result.totalOrders).toBe(0);
    expect(result.totalRevenue).toBe(0);
    expect(result.totalExpenses).toBe(0);
    expect(result.netProfit).toBe(0);
  });

  it("throws an error for negative product values", () => {
    expect(() =>
      calculateProfit({
        products: [
          { orders: -1, sellingPrice: 100, productCost: 30 },
        ],
      })
    ).toThrow("products[0].orders must be a finite, non-negative number.");
  });

  it("throws an error for invalid expense values", () => {
    expect(() =>
      calculateProfit({
        products: [],
        expenses: { adSpend: -100 },
      })
    ).toThrow("adSpend must be a finite, non-negative number.");
  });

  it("throws an error when products is not an array", () => {
    expect(() =>
      calculateProfit({ products: {} })
    ).toThrow("products must be an array.");
  });

  it("throws an error when a product is not an object", () => {
    expect(() =>
      calculateProfit({ products: [null] })
    ).toThrow("products[0] must be an object.");
  });

  it("throws an error when expenses is not an object", () => {
    expect(() =>
      calculateProfit({ expenses: [] })
    ).toThrow("expenses must be an object.");
  });

  it("caps delivery rate at 100", () => {
    const result = calculateProfit({
      products: [
        { orders: 10, sellingPrice: 100, productCost: 30 },
      ],
      expenses: { deliveryRate: 150 },
    });

    expect(result.deliveryRate).toBe(100);
    expect(result.deliveredOrders).toBe(10);
    expect(result.rtoOrders).toBe(0);
  });
});
