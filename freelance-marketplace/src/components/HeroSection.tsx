"use client";

import { useState } from "react";

const HeroSection = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Freelancer");

  return (
    <section className="container mx-auto px-6 md:px-12 lg:px-24 py-8 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          Find{" "}
          <span className="relative">
            Freelance
            <div className="absolute -top-1 right-0 w-full h-2 bg-green-400 -rotate-2"></div>
          </span>{" "}
          Jobs
          <br />
          that you'll actually love
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
          Join a network of over 40,000 freelancers that are finding work they
          love and making a great living
        </p>

        <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row gap-2">
          <select
            className="p-2 border rounded-md flex-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Freelancer</option>
            <option>Client</option>
          </select>
          <input
            type="text"
            placeholder="Job Title or Keyword"
            className="p-2 border rounded-md flex-1"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>

      <div className="relative flex justify-center">
        <img
          src="https://mandarinlaco.com/asset/img/about-1.png"
          alt="Freelancer working"
          className="w-full md:w-3/4 h-auto rounded-lg shadow-xl"
        />
        <div className="absolute top-4 right-4 bg-red-500 w-6 md:w-8 h-6 md:h-8 rounded-full"></div>
      </div>
    </section>
  );
};

export default HeroSection;
