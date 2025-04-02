import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="fixed top-0 flex justify-between items-center bg-[#111828] text-white px-6 py-3 shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/icons/finprep.svg"
          alt="Finprep Logo"
          className="w-24 h-auto" // Reduced size
        />
      </div>

      {/* Authentication Buttons */}
      <div>
        <SignedOut>
          <SignInButton></SignInButton>
        </SignedOut>
        <SignedIn></SignedIn>
      </div>
    </header>
  );
};

export default Header;
