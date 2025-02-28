"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const TopContributors = () => {
  const contributors = [
    {
      name: "Player1",
      role: "Builder Extraordinaire",
      image: "/skin1.png", // Replace with your image path
      contributions: "500+ Builds",
    },
    {
      name: "Player2",
      role: "Redstone Genius",
      image: "/skin2.png", // Replace with your image path
      contributions: "300+ Redstone Projects",
    },
    {
      name: "Player3",
      role: "Community Leader",
      image: "/skin3.png", // Replace with your image path
      contributions: "200+ Events Hosted",
    },
    {
      name: "Player4",
      role: "Exploration Master",
      image: "/skin4.png", // Replace with your image path
      contributions: "1000+ Biomes Discovered",
    },
  ];

  return (
    <section className="relative py-20 px-6 md:px-20 bg-black/90 overflow-hidden">
      {/* Background Particles */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full opacity-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false }} // Trigger every time in view
      ></motion.div>

      {/* Section Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }} // Trigger every time in view
        >
          Top Contributors
        </motion.h2>

        {/* Infinite Scroll Container */}
        <div className="relative w-full overflow-hidden">
          {/* First Row */}
          <motion.div
            className="flex gap-8 mb-8"
            animate={{
              x: ["0%", "-100%"], // Scroll left
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...contributors, ...contributors].map((contributor, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-72 bg-white/10 rounded-lg overflow-hidden shadow-lg backdrop-blur-md border border-white/10 hover:border-blue-400/50 transition-all duration-300 relative"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              >
                {/* Contributor Image */}
                <div className="relative h-48 mt-6">
                  <Image
                    src={contributor.image}
                    alt={contributor.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Contributor Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {contributor.name}
                  </h3>
                  <p className="text-white/80">{contributor.role}</p>
                  <p className="text-white/60 text-sm mt-2">
                    {contributor.contributions}
                  </p>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute -inset-1 bg-blue-400 blur-lg opacity-0 rounded-lg"
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                ></motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Second Row (Reverse Scroll) */}
          <motion.div
            className="flex gap-8"
            animate={{
              x: ["-100%", "0%"], // Scroll right
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...contributors, ...contributors].map((contributor, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-72 bg-white/10 rounded-lg overflow-hidden shadow-lg backdrop-blur-md border border-white/10 hover:border-blue-400/50 transition-all duration-300 relative"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              >
                {/* Contributor Image */}
                <div className="relative h-48 mt-6">
                  <Image
                    src={contributor.image}
                    alt={contributor.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Contributor Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {contributor.name}
                  </h3>
                  <p className="text-white/80">{contributor.role}</p>
                  <p className="text-white/60 text-sm mt-2">
                    {contributor.contributions}
                  </p>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute -inset-1 bg-blue-400 blur-lg opacity-0 rounded-lg"
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                ></motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(10)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-4 h-4 bg-blue-400 rounded-full blur-sm"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: Math.random() * 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          viewport={{ once: false }} // Trigger every time in view
        ></motion.div>
      ))}
    </section>
  );
};

export default TopContributors;