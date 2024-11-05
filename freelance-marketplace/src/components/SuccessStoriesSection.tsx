"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const SuccessStoriesSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="container mx-auto px-24 py-16 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-900 aspect-video"
      >
        {!isVideoPlaying ? (
          <>
            <img
              src="/api/placeholder/600/400"
              alt="Success story video thumbnail"
              className="w-full h-full object-cover opacity-90"
            />
            <button
              onClick={() => setIsVideoPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <Play size={32} className="text-blue-600 ml-1" />
              </div>
            </button>
          </>
        ) : (
          <video
            src="/video/freelance.mp4" // Path from the public directory
            controls
            autoPlay
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>
    </section>
  );
};

export default SuccessStoriesSection;
