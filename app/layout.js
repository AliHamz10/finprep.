import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Finprep.",
  description: "All your finance needs in one place.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* header */}
          <Header />
          <main className="min-h-screen bg-gray-900 text-white py-4 border-b border-gray-700">
            {children}
          </main>
          <Toaster richColors />
          {/* footer */}
          <footer className="bg-gray-900 text-white py-6 border-t border-gray-700">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
              {/* Left Side: Text */}
              <div className="text-sm text-gray-400">
                &copy; 2025 Ali Hamza & Zarmeena Jawad —
                <a href="#" className="text-white hover:underline mx-2">
                  Privacy Policy
                </a>{" "}
                |
                <a href="#" className="text-white hover:underline mx-2">
                  Terms
                </a>{" "}
                |
                <a href="#" className="text-white hover:underline mx-2">
                  Cookie Preferences
                </a>
              </div>

              {/* Right Side: Social Media Icons */}
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="hover:opacity-70">
                  <img
                    src="/icons/youtube.svg"
                    alt="YouTube"
                    className="w-6 h-6"
                  />
                </a>
                <a href="#" className="hover:opacity-70">
                  <img
                    src="/icons/twitter.svg"
                    alt="Twitter"
                    className="w-6 h-6"
                  />
                </a>
                <a href="#" className="hover:opacity-70">
                  <img
                    src="/icons/instagram.svg"
                    alt="Instagram"
                    className="w-6 h-6"
                  />
                </a>
                <a href="#" className="hover:opacity-70">
                  <img
                    src="/icons/spotify.svg"
                    alt="Spotify"
                    className="w-6 h-6"
                  />
                </a>
                <a href="#" className="hover:opacity-70">
                  <img
                    src="/icons/facebook.svg"
                    alt="Facebook"
                    className="w-6 h-6"
                  />
                </a>
              </div>
            </div>
          </footer>
          -
        </body>
      </html>
    </ClerkProvider>
  );
}
