import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "finprep",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
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
                >
                  <img src="/youtube.svg" alt="YouTube" className="h-8 w-8" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img src="/twitter.svg" alt="Twitter" className="h-8 w-8" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/instagram.svg"
                    alt="Instagram"
                    className="h-8 w-8"
                  />
                </a>
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img src="/spotify.svg" alt="Spotify" className="h-8 w-8" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img src="/facebook.svg" alt="Facebook" className="h-8 w-8" />
                </a>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
