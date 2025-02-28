"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/Logo.png" // Replace with your logo path
            alt="OceanSMP Logo"
            width={50}
            height={50}
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <span className="text-white text-xl md:text-2xl font-bold ml-2">
            OceanSMP
          </span>
        </motion.div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <motion.nav
          className={`md:flex md:items-center md:space-x-8 ${
            isMenuOpen
              ? "absolute top-16 left-0 w-full bg-black/90 backdrop-blur-md py-4"
              : "hidden"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {[
            { name: "Home", link: "/" },
            { name: "Ranks", link: "/Ranks" },
            { name: "Crate Keys", link: "/Keys" },
            { name: "Mystry Box", link: "/MystryBox" },
            { name: "LeaderBoard/TopVoters", link: "/leaderboard" },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="block text-white text-lg md:text-base hover:text-blue-400 transition-all duration-300 py-2 md:py-0 text-center"
            >
              {item.name}
            </a>
          ))}
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;