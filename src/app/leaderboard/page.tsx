"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Define types for Player and Voter
type Player = {
  id: number;
  name: string;
  kills: number;
  money: number;
  playtime: string;
  wins: number;
};

type Voter = {
  id: number;
  name: string;
  votes: number;
};

// Random Minecraft-style names
const randomNames = [
  "EnderWarrior", "NetherKing", "CreeperSlayer", "DiamondMiner", "RedstoneGuru",
  "TheArchitect", "PigRider", "GhastHunter", "WitherDestroyer", "EndermanStalker",
  "BlazeMaster", "ZombieKiller", "SkeletonSniper", "Herobrine", "Notch",
  "Steve", "Alex", "CraftyCrafter", "TheBuilder", "MineMaster",
];

// Generate random leaderboard data
const generateLeaderboardData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: randomNames[Math.floor(Math.random() * randomNames.length)],
    kills: Math.floor(Math.random() * 1000),
    money: Math.floor(Math.random() * 100000),
    playtime: `${Math.floor(Math.random() * 800)}h`,
    wins: Math.floor(Math.random() * 300),
  }));
};

// Generate top voters data
const generateTopVoters = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: randomNames[Math.floor(Math.random() * randomNames.length)],
    votes: Math.floor(Math.random() * 100),
  }));
};

const LeaderboardVotePage = () => {
  const [leaderboardData, setLeaderboardData] = useState<{
    weekly: Player[];
    monthly: Player[];
    allTime: Player[];
  }>({ weekly: [], monthly: [], allTime: [] });
  const [topVoters, setTopVoters] = useState<Voter[]>([]);
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly" | "allTime">("weekly");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visiblePlayers, setVisiblePlayers] = useState<number>(10);

  // Generate data on the client side after the component mounts
  useEffect(() => {
    setLeaderboardData({
      weekly: generateLeaderboardData(20),
      monthly: generateLeaderboardData(20),
      allTime: generateLeaderboardData(20),
    });
    setTopVoters(generateTopVoters(5));
  }, []);

  // Filter players based on search query
  const filteredPlayers = leaderboardData[activeTab].filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Load more players
  const loadMorePlayers = () => {
    setVisiblePlayers((prev) => prev + 10);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Glowing Background */}
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
        className="text-4xl md:text-5xl font-bold text-white text-center mb-12 relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Leaderboard & Vote 🏆🎁
      </motion.h1>

      {/* Leaderboard Section */}
      <motion.div
        className="w-full max-w-6xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 shadow-2xl relative z-10 mb-12 mx-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Leaderboard</h2>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab("weekly");
              setVisiblePlayers(10);
            }}
            className={`px-6 py-3 ${
              activeTab === "weekly" ? "bg-blue-600" : "bg-gray-700"
            } text-white font-semibold rounded-lg hover:bg-blue-700 transition-all whitespace-nowrap`}
          >
            Weekly
          </button>
          <button
            onClick={() => {
              setActiveTab("monthly");
              setVisiblePlayers(10);
            }}
            className={`px-6 py-3 ${
              activeTab === "monthly" ? "bg-blue-600" : "bg-gray-700"
            } text-white font-semibold rounded-lg hover:bg-blue-700 transition-all whitespace-nowrap`}
          >
            Monthly
          </button>
          <button
            onClick={() => {
              setActiveTab("allTime");
              setVisiblePlayers(10);
            }}
            className={`px-6 py-3 ${
              activeTab === "allTime" ? "bg-blue-600" : "bg-gray-700"
            } text-white font-semibold rounded-lg hover:bg-blue-700 transition-all whitespace-nowrap`}
          >
            All Time
          </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search players..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Leaderboard Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3">Rank</th>
                <th className="py-3">Name</th>
                <th className="py-3">Kills</th>
                <th className="py-3">Money</th>
                <th className="py-3">Playtime</th>
                <th className="py-3">Wins</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredPlayers.slice(0, visiblePlayers).map((player, index) => (
                  <motion.tr
                    key={player.id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="py-3 text-center">{index + 1}</td>
                    <td className="py-3 text-center">{player.name}</td>
                    <td className="py-3 text-center">{player.kills}</td>
                    <td className="py-3 text-center">${player.money}</td>
                    <td className="py-3 text-center">{player.playtime}</td>
                    <td className="py-3 text-center">{player.wins}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Load More Button */}
        {visiblePlayers < filteredPlayers.length && (
          <motion.button
            onClick={loadMorePlayers}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More
          </motion.button>
        )}
      </motion.div>

      {/* Vote & Rewards Section */}
      <motion.div
        className="w-full max-w-6xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 shadow-2xl relative z-10 mb-12 mx-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Vote & Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top Voters */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Top Voters of the Month</h3>
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3">Rank</th>
                  <th className="py-3">Name</th>
                  <th className="py-3">Votes</th>
                </tr>
              </thead>
              <tbody>
                {topVoters.map((voter, index) => (
                  <motion.tr
                    key={voter.id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <td className="py-3 text-center">{index + 1}</td>
                    <td className="py-3 text-center">{voter.name}</td>
                    <td className="py-3 text-center">{voter.votes}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vote Buttons */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Vote for Rewards</h3>
            <a
              href="https://example.com/vote1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all text-center"
            >
              Vote on Site 1
            </a>
            <a
              href="https://example.com/vote2"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all text-center"
            >
              Vote on Site 2
            </a>
            <a
              href="https://example.com/vote3"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all text-center"
            >
              Vote on Site 3
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LeaderboardVotePage;