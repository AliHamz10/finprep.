import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Hero Section */}
      <HeroSection />
      {/* Stats Section */}
      <section className="py-20 bg-gray-100 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 px-6 md:px-12">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-extrabold text-black mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-20 bg-white w-full">
        <h2 className="text-4xl font-extrabold text-center text-black mb-12">
          Everything You Need to Manage Your Finances
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-12">
          {featuresData.map((feature, index) => (
            <Card
              className="p-6 shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 bg-gray-50 rounded-lg"
              key={index}
            >
              <CardContent className="space-y-4 pt-4">
                <div className="text-blue-600">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-black">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 w-full">
        <h2 className="text-4xl font-extrabold text-center text-black mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 md:px-12">
          {howItWorksData.map((step, index) => (
            <div
              key={index}
              className="text-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:scale-105"
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-semibold text-black mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20 bg-white w-full">
        <h2 className="text-4xl font-extrabold text-center text-black mb-16">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-12">
          {testimonialsData.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 bg-gray-50 rounded-lg"
            >
              <CardContent className="pt-4">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <div className="font-semibold text-black">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-100 w-full text-center">
        <h2 className="text-4xl font-extrabold text-black mb-6">
          Ready to Take Control of Your Finances?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already managing their finances
          smarter with finprep.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-8 py-4 rounded-lg"
            >
              Start Free Trial
            </Button>
          </Link>
          <Link href="/learn-more">
            <Button
              size="lg"
              variant="outline"
              className="text-blue-600 border-blue-600 hover:bg-blue-100 px-8 py-4 rounded-lg"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
