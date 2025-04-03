// FIXME: Padding problem
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { LayoutDashboard, Link, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    <header className="fixed top-0 w-full bg-black text-white px-8 py-4 z-50 flex justify-between items-center">
      {/* Navigation Links */}
      <nav className="flex space-x-8 text-sm font-medium">
        <a href="http://localhost:3000/" className="hover:text-gray-400">
          Home
        </a>
        <a href="#" className="hover:text-gray-400">
          About
        </a>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <SignedIn>
          {/* Dashboard Button */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <Button className="border border-white text-white bg-black hover:bg-gray-200 hover:text-black">
              <LayoutDashboard size={18} />
              <span className="hidden md:inline">Dashboard</span>
            </Button>
          </Link>

          {/* Add Transaction Button */}
          <a href="/transaction/create">
            <Button className="border border-white text-white bg-black flex items-center gap-2 hover:bg-gray-200 hover:text-black">
              <PenBox size={18} />
              <span className="hidden md:inline">Add Transaction</span>
            </Button>
          </a>

          {/* User Profile */}
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
        </SignedIn>

        <SignedOut>
          {/* Login Button */}
          <div className="ml-auto">
            <SignInButton forceRedirectUrl="/dashboard">
              <Button className="border border-white text-black bg-white hover:bg-gray-200">
                Login
              </Button>
            </SignInButton>
          </div>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
