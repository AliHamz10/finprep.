import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 text-center">
      {/* 404 Title */}
      <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 mb-6">
        404
      </h1>
      {/* Subtitle */}
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      {/* Description */}
      <p className="text-gray-400 mb-8 max-w-md">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
        moved. Let&apos;s get you back on track.
      </p>
      {/* Return Home Button */}
      <Link href="/">
        <Button className="px-6 py-3 text-lg font-medium border border-white bg-transparent hover:bg-white hover:text-black transition-all">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
