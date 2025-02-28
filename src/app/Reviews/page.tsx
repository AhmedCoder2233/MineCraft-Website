"use client";

import { motion } from "framer-motion";
import Image from "next/image"
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const PlayerReviews = () => {
  const reviews = [
    {
      name: "Player1",
      role: "Builder",
      review:
        "OceanSMP is the best server I've ever played on! The community is amazing, and the builds are incredible.",
      image: "/skin1.png", // Replace with your image path
    },
    {
      name: "Player2",
      role: "Redstone Engineer",
      review:
        "I love the challenges and events here. The staff is super friendly, and the server runs smoothly!",
      image: "/skin2.png", // Replace with your image path
    },
    {
      name: "Player3",
      role: "Explorer",
      review:
        "The world is so vast and full of surprises. I've made so many friends here. Highly recommended!",
      image: "/skin3.png", // Replace with your image path
    },
    {
      name: "Player4",
      role: "PVP Enthusiast",
      review:
        "The mini-games and PVP arenas are top-notch. I can't get enough of this server!",
      image: "/skin4.png", // Replace with your image path
    },
  ];

  return (
    <section className="relative py-20 px-6 md:px-20 bg-black/80 overflow-hidden">
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
          What Our Players Say
        </motion.h2>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-blue-500/10 to-blue-900/10 rounded-lg p-8 backdrop-blur-md border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 relative overflow-hidden"
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -100 : 100, // Alternate left/right
                y: index < 2 ? -50 : 50, // Alternate top/bottom
                rotate: index % 2 === 0 ? -10 : 10, // Alternate rotation
              }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: false }} // Trigger every time in view
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-1 bg-blue-400 blur-lg opacity-0 hover:opacity-30 transition-all duration-300"
              ></motion.div>

              {/* Player Image */}
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-2 border-blue-400">
                <Image
                  src={review.image}
                  alt={review.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Review Content */}
              <div className="text-center">
                <FaQuoteLeft className="text-2xl text-blue-400 mx-auto mb-4" />
                <p className="text-white/80 italic mb-4">{review.review}</p>
                <FaQuoteRight className="text-2xl text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">{review.name}</h3>
                <p className="text-white/60 text-sm">{review.role}</p>
              </div>
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

export default PlayerReviews;