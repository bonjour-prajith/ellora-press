import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Ellora Press product capabilities across publications, packaging, branding, and promotional print.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Products | Ellora Press",
    description:
      "Explore Ellora Press product capabilities across publications, packaging, branding, and promotional print.",
    url: "/products",
    type: "website",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
