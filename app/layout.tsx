import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { business } from "@/data/business";
import { localBusinessSchema, SEO } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { PageLoader } from "@/components/layout/PageLoader";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { CustomCursor } from "@/components/animations/CustomCursor";
import "@/styles/globals.css";

const cormorant = localFont({
  src: [
    { path: "./fonts/Cormorant-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Cormorant-500-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/Cormorant-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});
const nastaliq = localFont({ src: "./fonts/NotoNastaliqUrdu.woff2", weight: "400", variable: "--font-nastaliq", display: "swap", preload: false });
const manrope = localFont({ src: "./fonts/Manrope.woff2", weight: "200 800", variable: "--font-manrope", display: "swap", fallback: ["system-ui", "sans-serif"] });

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: SEO.title,
  description: SEO.description,
  keywords: SEO.keywords,
  applicationName: business.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName: business.name,
    title: SEO.title,
    description: SEO.description,
    images: [{ url: SEO.ogImage, width: 1200, height: 630, alt: business.name }],
  },
  twitter: { card: "summary_large_image", title: SEO.title, description: SEO.description, images: [SEO.ogImage] },
  icons: { icon: [{ url: "/icons/favicon.svg", type: "image/svg+xml" }, { url: "/icons/favicon-48.png", sizes: "48x48" }], apple: "/icons/apple-touch-icon.png" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#080807", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK" className={`${cormorant.variable} ${manrope.variable} ${nastaliq.variable}`} suppressHydrationWarning>
      <head>
        {/* Show the loader only on the first visit of a session. */}
        <script dangerouslySetInnerHTML={{ __html: "try{sessionStorage.getItem('ht.seen')?document.documentElement.classList.add('seen'):sessionStorage.setItem('ht.seen','1')}catch(e){}" }} />
        <link rel="preload" as="image" href="/images/hero/hero-bg.webp" fetchPriority="high" media="(min-width: 1024px)" /><link rel="preload" as="image" href="/images/hero/hero-bg-mobile.webp" fetchPriority="high" media="(max-width: 1023px)" />
      </head>
      <body>
        <PageLoader />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded-full focus:bg-ivory focus:px-5 focus:py-3 focus:text-night">Skip to content</a>
        <ScrollProgress />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MobileContactBar />
        <CustomCursor />
        <MotionProvider />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
