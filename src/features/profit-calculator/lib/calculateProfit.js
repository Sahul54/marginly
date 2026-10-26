
const toNumber = (value) => {
  const number = Number(value);

  return Number.isFinite(number) && number >= 0
    ? number
    : 0;
};

export function calculateProfit({
  products = [],
  expenses = {},
} = {}) {
  const deliveryRate = Math.min(
    100,
    toNumber(expenses.deliveryRate ?? 70)
  );

  const deliveryMultiplier = deliveryRate / 100;

  // 1. Total orders
  const totalOrders = products.reduce(
    (total, product) => total + toNumber(product.orders),
    0
  );

  // 2. Estimated delivered and RTO orders
  const deliveredOrders = totalOrders * deliveryMultiplier;
  const rtoOrders = totalOrders - deliveredOrders;

  // 3. Estimated revenue from delivered orders
  const totalRevenue = products.reduce((total, product) => {
    const orders = toNumber(product.orders);
    const sellingPrice = toNumber(product.sellingPrice);
    const delivered = orders * deliveryMultiplier;

    return total + delivered * sellingPrice;
  }, 0);

  // 4. Product cost for delivered units only
  const productCost = products.reduce((total, product) => {
    const delivered =
      toNumber(product.orders) * deliveryMultiplier;

    return total + delivered * toNumber(product.productCost);
  }, 0);

  // 5. Other business expenses
  const shippingCharge = toNumber(expenses.shippingCharge);
  const rtoCharge = toNumber(expenses.rtoCharge);
  const adSpend = toNumber(expenses.adSpend);
  const platformFees = toNumber(expenses.platformFees);
  const otherExpenses = toNumber(expenses.otherExpenses);

  const totalShipping = deliveredOrders * shippingCharge;
  const totalRtoCost = rtoOrders * rtoCharge;

  // 6. Total expenses
  const totalExpenses =
    productCost +
    totalShipping +
    totalRtoCost +
    adSpend +
    platformFees +
    otherExpenses;

  // 7. Profit and profitability metrics
  const netProfit = totalRevenue - totalExpenses;

  const profitMargin =
    totalRevenue > 0
      ? (netProfit / totalRevenue) * 100
      : 0;

  const revenueToAdSpend =
    adSpend > 0
      ? totalRevenue / adSpend
      : 0;

  const profitPerDeliveredOrder =
    deliveredOrders > 0
      ? netProfit / deliveredOrders
      : 0;

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
