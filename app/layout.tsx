import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NamAstra - Hindu Baby Names with Meaning & Origin",
  description:
    "Discover beautiful Hindu baby names with deep meanings, origins, and spiritual significance. Find the perfect name for your little one with our AI-powered search and Vedic astrology guidance.",
  keywords: [
    "Hindu baby names",
    "Indian baby names",
    "Sanskrit names",
    "baby name meanings",
    "Vedic astrology names",
    "traditional names",
    "modern Hindu names",
  ],
  authors: [{ name: "NamAstra" }],
  creator: "NamAstra",
  publisher: "NamAstra",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://namastra.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NamAstra - Hindu Baby Names with Meaning & Origin",
    description:
      "Discover beautiful Hindu baby names with deep meanings, origins, and spiritual significance.",
    url: "https://namastra.com",
    siteName: "NamAstra",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NamAstra - Hindu Baby Names",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NamAstra - Hindu Baby Names with Meaning & Origin",
    description:
      "Discover beautiful Hindu baby names with deep meanings, origins, and spiritual significance.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
