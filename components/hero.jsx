"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-20 pb-20 px-4 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Control of Your Finances.
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            I’m an author, YouTuber, and Notion expert. I create in-depth{" "}
            <span className="font-semibold">tutorials</span> and{" "}
            <span className="font-semibold">templates</span> for Notion that
            help people be more productive and organized.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link href="/learn-notion">
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md"
              >
                Learn Notion →
              </Button>
            </Link>
            <Link href="/notion-templates">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-md"
              >
                Notion Templates →
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
          <div
            ref={imageRef}
            className="hero-image rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              src="/banner.png"
              width={600}
              height={400}
              alt="Dashboard Preview"
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
