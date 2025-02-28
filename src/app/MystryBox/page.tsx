"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaBoxOpen, FaGem, FaCoins, FaStar, FaCrown } from "react-icons/fa";
import { GiDiamondTrophy, GiDiamonds, GiTrident, GiKey, GiBookCover, GiShinyApple, GiEyeOfHorus } from "react-icons/gi";

// Define types for Crate Item
type CrateItem = {
  id: number;
  name: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  icon: JSX.Element;
};

// Crate Data
const crateItems: CrateItem[] = [
  {
    id: 1,
    name: "Diamond",
    rarity: "common",
    icon: <GiDiamondTrophy className="text-blue-400 w-12 h-12" />,
  },
  {
    id: 2,
    name: "Diamond Sword",
    rarity: "rare",
    icon: <GiDiamonds className="text-blue-600 w-12 h-12" />,
  },
  {
    id: 3,
    name: "Netherite Trident",
    rarity: "epic",
    icon: <GiTrident className="text-purple-600 w-12 h-12" />,
  },
  {
    id: 4,
    name: "Rare Key",
    rarity: "rare",
    icon: <GiKey className="text-yellow-400 w-12 h-12" />,
  },
  {
    id: 5,
    name: "Ultimate Key",
    rarity: "legendary",
    icon: <GiKey className="text-red-600 w-12 h-12" />,
  },
  {
    id: 6,
    name: "Enchanted Book",
    rarity: "epic",
    icon: <GiBookCover className="text-green-400 w-12 h-12" />,
  },
  {
    id: 7,
    name: "Golden Apple",
    rarity: "rare",
    icon: <GiShinyApple className="text-yellow-500 w-12 h-12" />,
  },
  {
    id: 8,
    name: "Ender Pearl",
    rarity: "epic",
    icon: <GiEyeOfHorus className="text-purple-500 w-12 h-12" />,
  },
];

const MysteryBoxPage = () => {
  const [isCrateOpen, setIsCrateOpen] = useState<boolean>(false);
  const [revealedItem, setRevealedItem] = useState<CrateItem | null>(null);

  // Open the crate and reveal a random item
  const openCrate = () => {
    if (isCrateOpen) return; // Prevent opening if already open

    // Simulate crate opening animation
    setIsCrateOpen(true);

    // Reveal a random item after a delay
    setTimeout(() => {
      const randomItem = crateItems[Math.floor(Math.random() * crateItems.length)];
      setRevealedItem(randomItem);
    }, 2000); // 2 seconds delay for animation
  };

  // Reset the crate
  const resetCrate = () => {
    setIsCrateOpen(false);
    setRevealedItem(null);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Gradient Circles */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute w-64 h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl top-20 left-20 animate-move-circle-1"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full opacity-20 blur-3xl top-60 right-20 animate-move-circle-2"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full opacity-20 blur-3xl bottom-20 left-1/2 animate-move-circle-3"></div>
      </motion.div>

      {/* Section Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-white text-center mb-12 mt-28 relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Mystery Box Simulator
      </motion.h1>

      {/* Crate */}
      <motion.div
        className="relative z-10 cursor-pointer"
        onClick={openCrate}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="w-48 h-48 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg flex items-center justify-center shadow-2xl"
          animate={{
            rotate: isCrateOpen ? [0, 10, -10, 0] : 0,
            y: isCrateOpen ? [0, -20, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <FaBoxOpen className="text-white w-24 h-24" />
        </motion.div>
      </motion.div>

      {/* Revealed Item */}
      {revealedItem && (
        <motion.div
          className="mt-8 text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-2xl font-bold text-white mb-4">
            You got:
          </div>
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center mx-auto shadow-2xl"
            whileHover={{ scale: 1.1 }}
          >
            {revealedItem.icon}
          </motion.div>
          <div className="text-xl font-bold text-white mt-4">
            {revealedItem.name}
          </div>
          <div className="text-sm text-gray-400">
            Rarity: {revealedItem.rarity}
          </div>
        </motion.div>
      )}

      {/* Reset Button */}
      {revealedItem && (
        <motion.button
          className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all relative z-10"
          onClick={resetCrate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Open Another Crate
        </motion.button>
      )}

      {/* Item Preview */}
      <div className="mt-12 mb-10 relative z-10">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Possible Items
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {crateItems.map((item) => (
            <motion.div
              key={item.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 flex flex-col items-center justify-center shadow-2xl"
              whileHover={{ scale: 1.05 }}
            >
              {item.icon}
              <div className="text-lg font-bold text-white mt-2">
                {item.name}
              </div>
              <div className="text-sm text-gray-400">
                {item.rarity}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MysteryBoxPage;