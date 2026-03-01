import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import WebVitalsReporter from "@/components/monitoring/WebVitalsReporter";
import BackToTop from "@/components/BackToTop";
import OpeningIntro from "@/components/OpeningIntro";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ellorapress.com";
const sanitizedSiteUrl = siteUrl.replace(/\/$/, "");

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ellora Press",
    url: sanitizedSiteUrl,
    logo: `${sanitizedSiteUrl}/logo.svg`,
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Ellora Press",
    url: sanitizedSiteUrl,
    telephone: "+91 89390 00230",
    email: "solutions@ellorapress.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "19, Mayor Chittibabu St, Triplicane",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    areaServed: "India",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ellora Press",
    url: sanitizedSiteUrl,
    inLanguage: "en-IN",
  },
];

const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ellora Press",
    template: "%s | Ellora Press",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  description:
    "Commercial print specialists for packaging, publications, technical manuals, and high-volume production with precision color control.",
  keywords: [
    "commercial printing",
    "packaging printing",
    "technical publication printing",
    "bulk printing",
    "Ellora Press",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ellora Press",
    description:
      "Commercial print specialists for packaging, publications, technical manuals, and high-volume production.",
    url: "/",
    siteName: "Ellora Press",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ellora Press",
    description:
      "Commercial print specialists for packaging, publications, technical manuals, and high-volume production.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
        <a
          href="#main-content"
          className="fixed left-4 top-2 z-[10000] -translate-y-24 rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          enableColorScheme={false}
          storageKey="my-app-theme"
          disableTransitionOnChange
        >
          <OpeningIntro />
          <WebVitalsReporter />
          {/* Navbar must be inside the ThemeProvider to use the Toggle logic */}
          <Navbar />
          <BackToTop />
          
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
