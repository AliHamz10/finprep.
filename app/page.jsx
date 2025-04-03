import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-40">
      <HeroSection />

      {/* Stats Section */}
      <section className="pt-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 text-center hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl font-extrabold text-blue-600 hover:font-bold">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-base mt-3 hover:font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Organize Your Finances
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuresData.map((feature, index) => (
              <Card
                key={index}
                className="p-8 bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="flex flex-col items-center text-center">
                  <div className="mb-6 text-blue-600 text-5xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 hover:font-bold h-12 flex items-center justify-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-base hover:font-bold">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-gradient-to-r from-[#111828] to-[#50A2FF] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How it Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {howItWorksData.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-6 flex items-center justify-center text-blue-600 text-5xl">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 hover:font-bold">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base hover:font-bold">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {testimonialsData.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="flex flex-col items-center text-center">
                  {/* User Image */}
                  <div className="mb-6">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="rounded-full shadow-md"
                    />
                  </div>
                  {/* User Name and Role */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                  {/* Testimonial Quote */}
                  <p className="text-gray-600 text-base italic">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-r from-[#111828] to-[#50A2FF] text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Join thousands of users who are managing their finances smarter and
            better.
          </p>
          <Link href={"/dashboard"}>
            <Button
              size="lg"
              className="px-8 py-4 bg-[#FFA500] text-white font-semibold rounded-lg shadow-md hover:font-bold hover:scale-110 hover:shadow-2xl transition-all duration-300"
            >
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
