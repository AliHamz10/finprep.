"use client"; // Enables client-side rendering for this component

import { Button } from "@/components/ui/button"; // Importing reusable Button component
import Image from "next/image";
import Link from "next/link"; // Importing Link for client-side navigation
import { useEffect, useRef } from "react";

// HeroSection Component: Displays the main hero section of the page
const HeroSection = () => {
  const imageRef = useRef();
  const lastScrollY = useRef(0); // To track the last scroll position

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > lastScrollY.current) {
        // Scrolling down: fade in
        if (imageElement) {
          imageElement.classList.add("fade-in");
          imageElement.classList.remove("fade-out");
        }
      } else {
        // Scrolling up: fade out
        if (imageElement) {
          imageElement.classList.add("fade-out");
          imageElement.classList.remove("fade-in");
        }
      }

      lastScrollY.current = scrollPosition; // Update the last scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-gradient-to-r from-[#111828] to-[#50A2FF] text-white">
      {/* Container for the hero content */}
      <div className="max-w-6xl mx-auto px-4 py-24 text-center">
        {/* Hero Heading */}
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title font-bold">
          Finally, u can <span className="text-blue-400">MANAGE</span> <br />{" "}
          FINANCES.
        </h1>

        {/* Hero Subheading */}
        <p className="text-xl md:text-2xl font-semibold text-gray-400 mb-8 max-w-2xl mx-auto">
          Track. Save. Budget. Spend Smart. Thrive.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex justify-center space-x-4">
          {/* Button to navigate to the dashboard */}
          <Link href="/dashboard">
            <Button
              size="lg"
              className="px-8 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Get Started
            </Button>
          </Link>

          {/* Button to navigate to the GitHub repository */}
          <Link href="https://github.com/AliHamz10/finprep.">
            <Button
              size="lg"
              variant="outline"
              className="px-8 border-gray-400 text-gray-400 hover:border-black hover:text-black"
            >
              Under the Hood
            </Button>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="hero-image-wrapper">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/assets/Money.png"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="mx-auto mt-10 rounded-lg shadow-lg shadow-gray-800"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; // Exporting the HeroSection component for use in other parts of the app
