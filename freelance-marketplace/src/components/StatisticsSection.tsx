"use client";

import { motion } from "framer-motion";

const statistics = [
  { value: "40K+", label: "Active Freelancers" },
  { value: "$1.2M+", label: "Paid to Freelancers" },
  { value: "95%", label: "Client Satisfaction" },
  { value: "50K+", label: "Completed Projects" },
];

export default function StatisticsSection() {
  return (
    <section className="bg-blue-600 py-20 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center text-white"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-blue-100">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
