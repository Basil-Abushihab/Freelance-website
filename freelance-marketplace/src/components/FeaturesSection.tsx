"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "High-quality matches",
    description:
      "Our AI-powered matching system connects you with the perfect projects",
    icon: "🎯",
  },
  {
    title: "Secure payments",
    description: "Get paid on time, every time with our secure payment system",
    icon: "🔒",
  },
  {
    title: "Global opportunities",
    description: "Access jobs from companies worldwide, work from anywhere",
    icon: "🌍",
  },
];

export default function FeaturesSection() {
  return (
    <section className="container mx-auto px-24 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We've built a platform that connects talented freelancers with amazing
          opportunities.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
