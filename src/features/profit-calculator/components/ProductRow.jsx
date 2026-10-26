
"use client";

import { Trash2, Package } from "lucide-react";
import { formatCurrency } from "../lib/formatCurrency";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

function NumberField({
  label,
  value,
  onChange,
  min = 0,
  step = "1",
  placeholder = "0",
}) {
  return (
    <label className="block min-w-0 text-sm font-medium text-gray-700">
      {label}
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </label>
  );
}

export default function ProductRow({
  product,
  index,
  onUpdate,
  onRemove,
  canRemove = true,
}) {
  const update = (field, value) => {
    onUpdate(product.id, field, value);
  };

  const unitProfit =
    Number(product.sellingPrice || 0) -
    Number(product.productCost || 0);

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <Package size={20} />
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900">
              Product {index + 1}
            </h3>
            <p className="text-xs text-gray-500">
              Enter product pricing and order details
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onRemove(product.id)}
          disabled={!canRemove}
          aria-label={`Remove product ${index + 1}`}
          title={
            canRemove
              ? "Remove product"
              : "At least one product is required"
          }
          className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Product name
          <input
            type="text"
            value={product.name}
            placeholder="e.g. Cotton T-shirt"
            onChange={(event) => update("name", event.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <NumberField
          label="Total orders"
          value={product.orders}
          onChange={(value) => update("orders", value)}
          step="1"
        />

        <NumberField
          label="Selling price (₹)"
          value={product.sellingPrice}
          onChange={(value) => update("sellingPrice", value)}
          step="0.01"
        />

        <NumberField
          label="Product cost (₹)"
          value={product.productCost}
          onChange={(value) => update("productCost", value)}
          step="0.01"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3">
        <span className="text-sm text-gray-500">
          Estimated profit per delivered unit
        </span>

        <span
          className={`text-sm font-semibold ${
            unitProfit >= 0 ? "text-green-700" : "text-red-600"
          }`}
        >
          {formatCurrency(unitProfit)}
        </span>
      </div>
    </article>
  );
}
