"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const MinecraftFeatures = () => {
  const features = [
    {
      title: "Survival Mode",
      description: "Explore, gather resources, and survive in a challenging world.",
      image: "/survival.jpg", // Replace with your image path
    },
    {
      title: "Creative Mode",
      description: "Unleash your creativity and build anything you can imagine.",
      image: "/creative.jpg", // Replace with your image path
    },
    {
      title: "Mini-games",
      description: "Compete with friends in fun and exciting mini-games.",
      image: "/minigames.jpg", // Replace with your image path
    },
    {
      title: "Community Events",
      description: "Join regular events and activities with the community.",
      image: "/events.jpg", // Replace with your image path
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
          Explore the World of OceanSMP
        </motion.h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/10 rounded-lg overflow-hidden shadow-lg backdrop-blur-md border border-white/10 hover:border-blue-400/50 transition-all duration-300 relative"
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -100 : 100, // Alternate left/right
                y: index < 2 ? -50 : 50, // Alternate top/bottom
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: false }} // Trigger every time in view
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
            >
              {/* Feature Image */}
              <div className="relative h-48">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Feature Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/80">{feature.description}</p>
              </div>

              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-1 bg-blue-400 blur-lg opacity-0 rounded-lg"
                whileHover={{ opacity: 0.3 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              ></motion.div>
            </motion.div>
          ))}
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

export default MinecraftFeatures;