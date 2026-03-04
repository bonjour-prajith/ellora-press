import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing",
  description:
    "Explore Ellora Press digital marketing services including social media management, SEO, and performance ads.",
  alternates: {
    canonical: "/digital-marketing",
  },
  openGraph: {
    title: "Digital Marketing | Ellora Press",
    description:
      "Explore Ellora Press digital marketing services including social media management, SEO, and performance ads.",
    url: "/digital-marketing",
    type: "website",
  },
};

export default function DigitalMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
