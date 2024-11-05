"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to start your freelancing journey?
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of freelancers who have found success on our platform.
          It's free to get started!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 mx-auto"
        >
          Get Started Now
          <ArrowUpRight size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
}
