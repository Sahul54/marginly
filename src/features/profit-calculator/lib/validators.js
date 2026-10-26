
export function parseNonNegativeNumber(value, fallback = 0) {
  if (value === "" || value === null || value === undefined) {
    return fallback;
  }

  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    return fallback;
  }

  return number;
}

export function validateProduct(product) {
  const errors = {};

  if (!String(product.name ?? "").trim()) {
    errors.name = "Product name is required.";
  }

  const orders = Number(product.orders);
  const sellingPrice = Number(product.sellingPrice);
  const productCost = Number(product.productCost);

  if (!Number.isFinite(orders) || orders < 0) {
    errors.orders = "Orders must be zero or greater.";
  }

  if (!Number.isFinite(sellingPrice) || sellingPrice < 0) {
    errors.sellingPrice = "Selling price must be zero or greater.";
  }

  if (!Number.isFinite(productCost) || productCost < 0) {
    errors.productCost = "Product cost must be zero or greater.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateDeliveryRate(value) {
  const rate = Number(value);

  return (
    Number.isFinite(rate) &&
    rate >= 0 &&
    rate <= 100
  );
}
