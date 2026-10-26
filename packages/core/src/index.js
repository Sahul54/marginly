function toNumber(value, fieldName) {
  if (value === "" || value === null || value === undefined) {
    return 0;
  }

  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    throw new TypeError(
      `${fieldName} must be a finite, non-negative number.`
    );
  }

  return number;
}

export function calculateProfit({ products = [], expenses = {} } = {}) {
  if (!Array.isArray(products)) {
    throw new TypeError("products must be an array.");
  }

  if (!expenses || typeof expenses !== "object" || Array.isArray(expenses)) {
    throw new TypeError("expenses must be an object.");
  }

  const deliveryRate = Math.min(
    100,
    toNumber(expenses.deliveryRate ?? 70, "deliveryRate")
  );

  const deliveryMultiplier = deliveryRate / 100;

  const normalizedProducts = products.map((product, index) => {
    if (!product || typeof product !== "object" || Array.isArray(product)) {
      throw new TypeError(`products[${index}] must be an object.`);
    }

    return {
      orders: toNumber(product.orders, `products[${index}].orders`),
      sellingPrice: toNumber(
        product.sellingPrice,
        `products[${index}].sellingPrice`
      ),
      productCost: toNumber(
        product.productCost,
        `products[${index}].productCost`
      ),
    };
  });

  const totalOrders = normalizedProducts.reduce(
    (total, product) => total + product.orders,
    0
  );

  const deliveredOrders = totalOrders * deliveryMultiplier;
  const rtoOrders = totalOrders - deliveredOrders;

  const totalRevenue = normalizedProducts.reduce(
    (total, product) =>
      total + product.orders * deliveryMultiplier * product.sellingPrice,
    0
  );

  const productCost = normalizedProducts.reduce(
    (total, product) =>
      total + product.orders * deliveryMultiplier * product.productCost,
    0
  );

  const totalShipping =
    deliveredOrders * toNumber(expenses.shippingCharge, "shippingCharge");

  const totalRtoCost =
    rtoOrders * toNumber(expenses.rtoCharge, "rtoCharge");

  const adSpend = toNumber(expenses.adSpend, "adSpend");
  const platformFees = toNumber(expenses.platformFees, "platformFees");
  const otherExpenses = toNumber(expenses.otherExpenses, "otherExpenses");

  const totalExpenses =
    productCost +
    totalShipping +
    totalRtoCost +
    adSpend +
    platformFees +
    otherExpenses;

  const netProfit = totalRevenue - totalExpenses;

  const profitMargin =
    totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  const revenueToAdSpend =
    adSpend > 0 ? totalRevenue / adSpend : 0;

  const profitPerDeliveredOrder =
    deliveredOrders > 0 ? netProfit / deliveredOrders : 0;

  return {
    totalOrders,
    deliveredOrders,
    rtoOrders,
    deliveryRate,
    totalRevenue,
    productCost,
    totalShipping,
    totalRtoCost,
    adSpend,
    platformFees,
    otherExpenses,
    totalExpenses,
    netProfit,
    profitMargin,
    revenueToAdSpend,
    profitPerDeliveredOrder,
  };
}
