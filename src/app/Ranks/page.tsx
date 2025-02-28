"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import Link from "next/link";

// Define types for Rank
type Rank = {
  id: number;
  title: string;
  price: string;
  features: string[];
};

const RanksPage = () => {
  const [selectedRank, setSelectedRank] = useState<Rank | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Rank Data
  const ranks: Rank[] = [
    {
        id: 1,
        title: "Elite Rank",
        price: "$100",
        features: ["24/7 Support", "Exclusive Items", "VIP Access", "Early Access"],
      },
      {
        id: 2,
        title: "Pro Rank",
        price: "$75",
        features: ["Priority Support", "Special Items", "Premium Access"],
      },
    {
      id: 3,
      title: "Top Rank",
      price: "$50",
      features: ["Priority Support", "Exclusive Items", "VIP Access"],
    },
    {
      id: 4,
      title: "Medium Rank",
      price: "$30",
      features: ["Regular Support", "Special Items", "Premium Access"],
    },
    {
      id: 5,
      title: "Low Rank",
      price: "$10",
      features: ["Basic Support", "Standard Items", "Normal Access"],
    },
 
    {
      id: 6,
      title: "Starter Rank",
      price: "$5",
      features: ["Basic Support", "Standard Items"],
    },
  ];

  // Handle Buy Now Button Click
  const handleBuyNow = (rank: Rank) => {
    setSelectedRank(rank);
    localStorage.setItem("selectedRank", JSON.stringify(rank));
  };

  // Validate Email
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle Stripe Payment
  const handleStripePayment = async () => {
    if (!selectedRank || !username || !email) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      // Load Stripe
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

      // Create a Checkout Session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: selectedRank.title,
          price: selectedRank.price,
          username,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session.");
      }

      const session = await response.json();

      // Redirect to Stripe Checkout
      if (session.id) {
        const result = await stripe?.redirectToCheckout({ sessionId: session.id });

        if (result?.error) {
          toast.error("Payment failed. Please try again.");
        }
      } else {
        toast.error("Failed to create payment session.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black py-20 px-6 md:px-20">
      {/* Section Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-white text-center mb-12 mt-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Choose Your Rank
      </motion.h1>

      {/* Rank Cards */}
      <div className="justify-center flex flex-wrap gap-8">
        {ranks.map((rank: Rank) => (
          <motion.div
            key={rank.id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 backdrop-blur-md border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: rank.id * 0.2 }}
            viewport={{ once: false }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-1 bg-blue-400 blur-lg opacity-0 hover:opacity-30 transition-all duration-300"
            ></motion.div>

            {/* Rank Content */}
            <h2 className="text-2xl font-bold text-white mb-4">{rank.title}</h2>
            <p className="text-blue-400 text-3xl font-bold mb-6">{rank.price}</p>
            <ul className="text-white/80 mb-6">
              {rank.features.map((feature: string, index: number) => (
                <li key={index} className="mb-2">
                  ✔️ {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleBuyNow(rank)}
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all relative z-10"
            >
              Buy Now
            </button>
          </motion.div>
        ))}
      </div>

      {/* Rank Details Modal */}
      {selectedRank && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
          <motion.div
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 backdrop-blur-md border border-blue-400/20 w-full max-w-md mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              {selectedRank.title}
            </h2>
            <p className="text-blue-400 text-3xl font-bold mb-6">
              {selectedRank.price}
            </p>
            <ul className="text-white/80 mb-6">
              {selectedRank.features.map((feature: string, index: number) => (
                <li key={index} className="mb-2">
                  ✔️ {feature}
                </li>
              ))}
            </ul>

            {/* User Details Form */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Minecraft Username"
                className="w-full px-4 py-3 bg-black/20 border border-blue-400/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-black/20 border border-blue-400/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Stripe Payment Button */}
            <button
              onClick={handleStripePayment}
              disabled={isLoading || !username || !validateEmail(email)}
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Buy Now"}
            </button>

            {/* Close Button */}
            <button
              onClick={() => setSelectedRank(null)}
              className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all mt-4"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RanksPage;