import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover Ellora Press heritage, print philosophy, and process standards built since 1989.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Ellora Press",
    description:
      "Discover Ellora Press heritage, print philosophy, and process standards built since 1989.",
    url: "/about",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
