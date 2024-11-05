"use client";

import HeroSection from "../../components/HeroSection";
import CompaniesSection from "../../components/CompaniesSection";
import CategoriesSection from "../../components/CategoriesSection";
import SuccessStoriesSection from "../../components/SuccessStoriesSection";
import StatisticsSection from "../../components/StatisticsSection";
import FeaturesSection from "../../components/FeaturesSection";
import CTASection from "../../components/CTASection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <HeroSection />
      <CompaniesSection />
      <CategoriesSection />
      <SuccessStoriesSection />
      <StatisticsSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}
