
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Marginly - Free Ecommerce Profit Calculator",
    template: "%s | Marginly",
  },

  description:
    "Calculate ecommerce profit, product costs, delivery charges, RTO losses, ad spend and profit margins with Marginly's free ecommerce profit calculator.",

  applicationName: "Marginly",

  keywords: [
    "ecommerce profit calculator",
    "ecommerce profit margin calculator",
    "online seller profit calculator",
    "RTO calculator India",
    "COD profit calculator",
    "ecommerce cost calculator",
    "product profit calculator",
    "D2C profit calculator",
    "ecommerce business tools",
  ],

  authors: [{ name: "Marginly" }],
  creator: "Marginly",
  publisher: "Marginly",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Marginly",
    title: "Marginly — Free Ecommerce Profit Calculator",
    description:
      "Know your estimated profit before you scale. Calculate revenue, product costs, delivery expenses, RTO charges and profit margins in one place.",
    images: [
      {
        url: "/logo.png",
        alt: "Marginly Ecommerce Profit Calculator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Marginly — Ecommerce Profit Calculator",
    description:
      "Calculate ecommerce profit, delivery costs, RTO charges and profit margins for your business.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "business",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
