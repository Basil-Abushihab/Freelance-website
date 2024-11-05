"use client";

import React from "react";
import {
  Users,
  Target,
  Award,
  Briefcase,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const AboutUs = () => {
  return (
    <main className="w-full bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-blue-600 via-green-500 to-teal-500">
        <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        <div className="relative h-full max-w-7xl mx-auto px-6 py-20 flex flex-col justify-center">
          <div className="inline-block mb-6">
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              Welcome to Freebird
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Transforming Ideas <br />
            Into Digital Reality
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl leading-relaxed mb-12">
            We're a collective of passionate freelancers dedicated to crafting
            exceptional digital experiences that push boundaries and drive
            success.
          </p>
          <button
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full 
                         font-semibold hover:bg-blue-50 transition-all group w-fit"
          >
            Join Our Network
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="absolute bottom-0 w-full">
          <svg
            className="w-full h-32 text-gray-50"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,100 C20,0 50,100 100,0 L100,100 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 -mt-32 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              number: "250+",
              label: "Projects Delivered",
              color: "from-green-500 to-teal-500",
            },
            {
              number: "120+",
              label: "Happy Clients",
              color: "from-blue-500 to-green-500",
            },
            {
              number: "15+",
              label: "Countries Served",
              color: "from-teal-500 to-blue-500",
            },
            {
              number: "98%",
              label: "Client Satisfaction",
              color: "from-green-500 to-blue-500",
            },
          ].map((stat, index) => (
            <div key={index} className="relative group overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 
                           transition-opacity duration-500`}
              />
              <div
                className="relative p-8 bg-white rounded-2xl shadow-lg  
                          transition-all duration-500 transform "
              >
                <div
                  className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-500 to-blue-500 
                            bg-clip-text text-transparent  transition-colors duration-500"
                >
                  {stat.number}
                </div>
                <div className="text-gray-600 transition-colors duration-500 ">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
                  Our Mission
                </span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Empowering Innovation Through Collaboration
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We're on a mission to redefine the freelance landscape by
                bringing together exceptional talent and innovative businesses.
                Our approach combines creativity, technology, and strategic
                thinking to deliver transformative results.
              </p>
              <ul className="space-y-4">
                {[
                  "Client-Centric Solutions",
                  "Innovation at Core",
                  "Transparent Partnership",
                  "Excellence in Delivery",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-700 bg-white p-4 
                                         rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-2 bg-green-100 rounded-lg">
                      <ChevronRight className="text-green-600" size={20} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-teal-100 text-teal-600 px-4 py-2 rounded-full text-sm font-medium">
                  Our Vision
                </span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Shaping the Future of Digital Excellence
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We envision a world where exceptional freelance talent
                seamlessly connects with forward-thinking businesses to create
                groundbreaking digital solutions that drive the future of
                innovation.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: Target,
                    label: "Goal-Driven",
                    color: "from-green-500 to-blue-500",
                  },
                  {
                    icon: Users,
                    label: "Collaborative",
                    color: "from-blue-500 to-green-500",
                  },
                  {
                    icon: Award,
                    label: "Excellence",
                    color: "from-teal-500 to-blue-500",
                  },
                  {
                    icon: Briefcase,
                    label: "Professional",
                    color: "from-green-500 to-teal-500",
                  },
                ].map((item, index) => (
                  <div key={index} className="relative group overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 
                                  group-hover:opacity-10 transition-opacity duration-500`}
                    />
                    <div
                      className="relative p-6 bg-white rounded-xl shadow-sm group-hover:shadow-lg 
                                transition-all duration-500"
                    >
                      <item.icon
                        className="text-green-600 mb-3 group-hover:text-black 
                                        transition-colors duration-500"
                        size={28}
                      />
                      <div className="font-medium group-hover:text-black transition-colors duration-500">
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
              Join Freebird
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join our network of talented professionals and be part of something
            extraordinary.
          </p>
          <button
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 
                         text-white px-8 py-4 rounded-full font-semibold hover:from-green-700 
                         hover:to-blue-700 transition-all group"
          >
            Start Your Journey
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
