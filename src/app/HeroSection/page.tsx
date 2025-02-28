"use client";

import { motion } from "framer-motion";
import { FaDiscord, FaTwitter, FaYoutube, FaCopy, FaCheck } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const serverIP = "play.oceansmp.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative mt-16 flex flex-col items-center justify-center text-white text-center py-32 px-6 md:px-20 overflow-hidden h-[570px]">
    {/* Background Video */}
    <video 
      autoPlay 
      loop 
      muted 
      playsInline 
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/bg.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
      {/* Overlay Blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-0"></div>

      {/* Floating Animated Particles */}
      <motion.div
        className="absolute top-10 left-10 w-10 h-10 bg-blue-400 rounded-full blur-2xl opacity-50"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
      <motion.div
        className="absolute bottom-10 right-20 w-14 h-14 bg-blue-500 rounded-full blur-2xl opacity-40"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center justify-center gap-8">
        {/* Center: Logo and Text */}
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Logo */}
          <motion.div
            className="relative"
            initial={{ scale: 0, rotateY: 180, opacity: 0, x: -100 }}
            whileInView={{ scale: 1, rotateY: 0, opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false }} // Trigger every time in view
          >
            <Image
              src="/Logo.png"
              alt="Ocean SMP Logo"
              width={320}
              height={320}
              className="w-56 md:w-80 drop-shadow-lg"
            />
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-4 bg-blue-400 blur-2xl opacity-30 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>
          </motion.div>

          {/* Floating Text */}
          <motion.div
            className="text-white text-lg font-semibold"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: false }} // Trigger every time in view
          >
            Join the Adventure Today!
          </motion.div>
        </div>

        {/* Server IP Box and Social Media Icons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Server IP Box */}
          <motion.div
            className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg border border-white/20 backdrop-blur-md hover:shadow-blue-400/50 transition-all duration-300 cursor-pointer"
            onClick={copyToClipboard}
            initial={{ x: -100, rotateY: -90, opacity: 0 }}
            whileInView={{ x: 0, rotateY: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: false }} // Trigger every time in view
            whileHover={{ scale: 1.05, rotateY: 10 }}
          >
            <span className="text-white">{serverIP}</span>
            {copied ? <FaCheck className="text-green-400 text-xl" /> : <FaCopy className="text-xl" />}
          </motion.div>

          {/* Social Media Icons */}
          <motion.div
            className="flex space-x-6"
            initial={{ x: 100, rotateY: 90, opacity: 0 }}
            whileInView={{ x: 0, rotateY: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: false }} // Trigger every time in view
          >
            {[
              { icon: <FaDiscord />, link: "#", color: "text-blue-400" },
              { icon: <FaTwitter />, link: "#", color: "text-blue-300" },
              { icon: <FaYoutube />, link: "#", color: "text-red-400" },
            ].map(({ icon, link, color }, index) => (
              <motion.a
                key={index}
                href={link}
                className={`text-3xl ${color} hover:scale-125 transition-all duration-300 drop-shadow-lg`}
                whileHover={{ rotate: 15, scale: 1.2 }}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Oceanic Glow Effect */}
      <motion.div
        className="absolute bottom-10 w-60 h-2 bg-blue-400 blur-lg opacity-60 rounded-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false }} // Trigger every time in view
      ></motion.div>
    </section>
  );
};

export default Hero;