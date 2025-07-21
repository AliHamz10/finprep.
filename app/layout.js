import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: "finprep",
  description: "One stop Finance Platform",
  metadataBase: new URL('https://finprep.com'),
  openGraph: {
    title: "finprep",
    description: "One stop Finance Platform",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "finprep",
    description: "One stop Finance Platform",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://randomuser.me" />
          <link rel="dns-prefetch" href="https://randomuser.me" />
          {/* Preload critical assets */}
          <link rel="preload" href="/banner.png" as="image" type="image/png" />
        </head>
        <body className={`${inter.className} bg-gray-50 text-gray-800`}>
          <Header />
          <main className="min-h-screen px-6 md:px-16 py-10 bg-white shadow-md">
            {children}
          </main>
          <Toaster richColors />

          <footer className="bg-gray-900 py-10">
            <div className="container mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between text-gray-400">
              <p className="text-sm text-center md:text-left mb-6 md:mb-0">
                © 2023 finprep. by Ali Hamza and Zarmeena Jawad
              </p>
              <div className="flex space-x-8">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="YouTube"
                >
                  <img src="/youtube.svg" alt="YouTube" className="h-8 w-8" loading="lazy" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Twitter"
                >
                  <img src="/twitter.svg" alt="Twitter" className="h-8 w-8" loading="lazy" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Instagram"
                >
                  <img
                    src="/instagram.svg"
                    alt="Instagram"
                    className="h-8 w-8"
                    loading="lazy"
                  />
                </a>
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Spotify"
                >
                  <img src="/spotify.svg" alt="Spotify" className="h-8 w-8" loading="lazy" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Facebook"
                >
                  <img src="/facebook.svg" alt="Facebook" className="h-8 w-8" loading="lazy" />
                </a>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
