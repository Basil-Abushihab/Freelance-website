"use client";

const companies = ["Adobe", "Deloitte", "IBM", "Meta", "Microsoft", "Google"];

const CompaniesSection = () => (
  <section className="container mx-auto px-24 py-8">
    <div className="flex flex-wrap justify-center gap-12 grayscale opacity-50">
      {companies.map((company) => (
        <div
          key={company}
          className="text-lg md:text-xl font-bold text-center flex-1 min-w-[120px]" // Set a min-width for better responsiveness
        >
          {company}
        </div>
      ))}
    </div>
  </section>
);

export default CompaniesSection;
