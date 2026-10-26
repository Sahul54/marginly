
export const DEFAULT_EXPENSES = {
  deliveryRate: 70,
  adSpend: "",
  shippingCharge: "",
  rtoCharge: "",
  platformFees: "",
  otherExpenses: "",
};

export function createDefaultProduct(id = "product-1") {
  return {
    id,
    name: "Product",
    orders: 0,
    sellingPrice: 0,
    productCost: 0,
  };
}

export function createInitialCalculatorState() {
  return {
    products: [
      {
        ...createDefaultProduct("product-1"),
        name: "Product 1",
        orders: 100,
        sellingPrice: 599,
        productCost: 200,
      },
    ],
    expenses: { ...DEFAULT_EXPENSES },
  };
}
