import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { testimonialsData } from "@/data/landing";

const TestimonialsSection = () => {
  return (
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
                  loading="lazy"
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
  );
};

export default TestimonialsSection;