"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const SuccessPage = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [rankTitle, setRankTitle] = useState<string | null>(null);

  useEffect(() => {
    // Extract session_id from the URL query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const sessionId = queryParams.get("session_id");
    setSessionId(sessionId);

    // Retrieve the selected rank from localStorage
    const selectedRank = localStorage.getItem("selectedRank");
    if (selectedRank) {
      const rank = JSON.parse(selectedRank);
      setRankTitle(rank.title);
    }

    // Clear the selected rank from localStorage after displaying it
    localStorage.removeItem("selectedRank");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <motion.div
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 backdrop-blur-md border border-blue-400/20 w-full max-w-md mx-4 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Payment Successful!</h2>
        <p className="text-white/80 mb-6">
          Thank you for your purchase. Your transaction ID is:{" "}
          <span className="text-blue-400 text-[10px]">{sessionId}</span>
        </p>
        {rankTitle && (
          <p className="text-white/80 mb-6">
            Your <span className="text-blue-400">{rankTitle}</span> will be delivered within{" "}
            <span className="text-blue-400">24 hours</span>.
          </p>
        )}
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default SuccessPage;