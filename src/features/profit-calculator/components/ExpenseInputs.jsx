
"use client";

import {
  Truck,
  Megaphone,
  Package,
  RotateCcw,
  Receipt,
  Wallet,
  Info,
} from "lucide-react";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

const expenseFields = [
  {
    key: "adSpend",
    label: "Advertising spend",
    description: "Total ad campaign spend",
    icon: Megaphone,
    placeholder: "5000",
    step: "0.01",
  },
  {
    key: "shippingCharge",
    label: "Shipping per delivered order",
    description: "Forward shipping charge",
    icon: Truck,
    placeholder: "60",
    step: "0.01",
  },
  {
    key: "rtoCharge",
    label: "RTO charge per returned order",
    description: "Estimated return-to-origin charge",
    icon: RotateCcw,
    placeholder: "80",
    step: "0.01",
  },
  {
    key: "platformFees",
    label: "Platform fees",
    description: "Total marketplace or payment fees",
    icon: Receipt,
    placeholder: "500",
    step: "0.01",
  },
  {
    key: "otherExpenses",
    label: "Other expenses",
    description: "Packaging or miscellaneous costs",
    icon: Wallet,
    placeholder: "200",
    step: "0.01",
  },
];

export default function ExpenseInputs({ expenses, onChange }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          <Wallet size={22} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Business expenses
          </h2>
          <p className="text-sm text-gray-500">
            Enter your estimated operating costs.
          </p>
        </div>
      </div>

      {/* Delivery success rate */}
      <div className="mb-6 rounded-xl border border-orange-100 bg-orange-50/70 p-4">
        <div className="mb-3 flex items-start gap-3">
          <div className="mt-0.5 text-orange-600">
            <Package size={20} />
          </div>

          <div className="flex-1">
            <label
              htmlFor="deliveryRate"
              className="text-sm font-semibold text-gray-900"
            >
              Delivery success rate
            </label>
            <p className="mt-1 text-xs leading-5 text-gray-600">
              Percentage of orders expected to be delivered successfully.
            </p>
          </div>

          <span className="text-lg font-bold text-orange-700">
            {Number(expenses.deliveryRate ?? 0)}%
          </span>
        </div>

        <input
          id="deliveryRate"
          type="range"
          min="0"
          max="100"
          step="1"
          value={expenses.deliveryRate ?? 70}
          onChange={(event) =>
            onChange("deliveryRate", Number(event.target.value))
          }
          className="w-full cursor-pointer accent-orange-600"
        />

        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>0% delivery</span>
          <span>100% delivery</span>
        </div>

        <div className="mt-3 flex items-start gap-2 text-xs leading-5 text-orange-900">
          <Info size={15} className="mt-0.5 shrink-0" />
          <p>
            Remaining orders are estimated as RTO/undelivered orders.
          </p>
        </div>
      </div>

      {/* Expense fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {expenseFields.map((field) => {
          const Icon = field.icon;

          return (
            <div key={field.key}>
              <label
                htmlFor={field.key}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Icon size={16} className="text-gray-400" />
                {field.label}
              </label>

              <input
                id={field.key}
                type="number"
                min="0"
                step={field.step}
                inputMode="decimal"
                value={expenses[field.key] ?? ""}
                placeholder={field.placeholder}
                onChange={(event) =>
                  onChange(field.key, event.target.value)
                }
                className={inputClass}
              />

              <p className="mt-1.5 text-xs leading-5 text-gray-500">
                {field.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
