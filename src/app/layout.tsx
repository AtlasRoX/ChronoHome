import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "CHRONOSTRIDER // Competitive Tech Team",
  description: "A team of time-traveling technologists documenting their existence inside a futuristic pixel universe.",
  keywords: ["ChronoStrider", "Hackathons", "Software Competitions", "Engineering", "Research"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "CHRONOSTRIDER // Competitive Tech Team",
    description: "A team of time-traveling technologists documenting their existence inside a futuristic pixel universe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col relative bg-obsidian-deep text-text-phosphor overflow-hidden"
        suppressHydrationWarning
      >
        {/* Clean, un-obscured content canvas */}
        <div className="relative z-10 w-full h-full flex flex-col flex-1">
          {children}
        </div>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-96WFPDMQ15"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-96WFPDMQ15');
          `}
        </Script>
      </body>
    </html>
  );
}
