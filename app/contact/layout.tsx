import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send project requirements to Ellora Press for quote planning, print consultation, and production guidance.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Ellora Press",
    description:
      "Send project requirements to Ellora Press for quote planning, print consultation, and production guidance.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
