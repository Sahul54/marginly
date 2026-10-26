
"use client";

import { Plus, PackageOpen } from "lucide-react";
import ProductRow from "./ProductRow";

export default function ProductList({
  products,
  onAdd,
  onUpdate,
  onRemove,
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <PackageOpen size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Products
            </h2>
            <p className="text-sm text-gray-500">
              Add your products and their order details.
            </p>
          </div>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
          {products.length} {products.length === 1 ? "product" : "products"}
        </span>
      </div>

      <div className="space-y-4">
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductRow
              key={product.id}
              product={product}
              index={index}
              onUpdate={onUpdate}
              onRemove={onRemove}
              canRemove={products.length > 1}
            />
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 px-4 py-10 text-center">
            <PackageOpen
              size={30}
              className="mx-auto mb-3 text-gray-400"
            />
            <p className="font-medium text-gray-800">
              No products added
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Add a product to calculate your estimated profit.
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-orange-300 px-4 py-3 text-sm font-semibold text-orange-700 transition hover:border-orange-500 hover:bg-orange-50 sm:w-auto"
      >
        <Plus size={18} />
        Add another product
      </button>
    </section>
  );
}
