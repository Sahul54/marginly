
"use client";

import { useMemo, useState } from "react";
import { calculateProfit } from "../lib/calculateProfit";
import {
  createInitialCalculatorState,
  createDefaultProduct,
} from "../constants/calculatorDefaults";

export function useProfitCalculator() {
  const [initialState] = useState(() =>
    createInitialCalculatorState()
  );

  const [products, setProducts] = useState(initialState.products);
  const [expenses, setExpenses] = useState(initialState.expenses);

  const addProduct = () => {
    // ID is generated only after the user clicks Add Product.
    const id = crypto.randomUUID();

    setProducts((currentProducts) => [
      ...currentProducts,
      {
        ...createDefaultProduct(id),
        name: `Product ${currentProducts.length + 1}`,
      },
    ]);
  };

  const updateProduct = (productId, field, value) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? { ...product, [field]: value }
          : product
      )
    );
  };

  const removeProduct = (productId) => {
    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== productId
      )
    );
  };

  const updateExpense = (field, value) => {
    setExpenses((currentExpenses) => ({
      ...currentExpenses,
      [field]: value,
    }));
  };

  const result = useMemo(
    () => calculateProfit({ products, expenses }),
    [products, expenses]
  );

  const resetCalculator = () => {
    const defaults = createInitialCalculatorState();

    setProducts(defaults.products);
    setExpenses(defaults.expenses);
  };

  return {
    products,
    expenses,
    result,
    addProduct,
    updateProduct,
    removeProduct,
    updateExpense,
    resetCalculator,
  };
}
