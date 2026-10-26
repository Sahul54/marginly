
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

const toneStyles = {
  orange: {
    icon: "bg-orange-50 text-orange-600",
    value: "text-orange-700",
  },
  green: {
    icon: "bg-green-50 text-green-700",
    value: "text-green-700",
  },
  red: {
    icon: "bg-red-50 text-red-700",
    value: "text-red-700",
  },
  blue: {
    icon: "bg-blue-50 text-blue-700",
    value: "text-blue-700",
  },
  gray: {
    icon: "bg-gray-100 text-gray-600",
    value: "text-gray-900",
  },
};

export default function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "gray",
  trend,
}) {
  const styles = toneStyles[tone] ?? toneStyles.gray;

  const TrendIcon =
    trend > 0
      ? ArrowUpRight
      : trend < 0
        ? ArrowDownRight
        : Minus;

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p
            className={`mt-2 break-words text-2xl font-bold tracking-tight sm:text-3xl ${styles.value}`}
          >
            {value}
          </p>
        </div>

        {Icon && (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
          >
            <Icon size={21} aria-hidden="true" />
          </div>
        )}
      </div>

      {(description || typeof trend === "number") && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {typeof trend === "number" && (
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                trend < 0 ? "text-red-600" : "text-green-700"
              }`}
            >
              <TrendIcon size={14} />
              {Math.abs(trend)}%
            </span>
          )}

          {description && (
            <p className="text-xs leading-5 text-gray-500">
              {description}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
