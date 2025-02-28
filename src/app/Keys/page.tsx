"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import Image from "next/image";

// Define types for Key
type Key = {
  id: number;
  title: string;
  price: string;
  features: string[];
  image: string; // URL of the key image
};

const KeysPage = () => {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Key Data
  const keys: Key[] = [
    {
      id: 1,
      title: "Ultimate Key",
      price: "$80",
      features: ["Access to all features", "Exclusive items", "VIP support"],
      image: "/key2.png", // Replace with your image path
    },
    {
        id: 2,
        title: "Custom Key",
        price: "$60",
        features: ["Fully customizable", "Priority support", "Exclusive items"],
        image: "/key3.jpg", // Replace with your image path
      },
    {
      id: 2,
      title: "Ruby Key",
      price: "$30",
      features: ["Access to Ruby items", "Priority support"],
      image: "/key4.jpg", // Replace with your image path
    },
    {
      id: 3,
      title: "Dragon Key",
      price: "$20",
      features: ["Access to Dragon items", "Exclusive dragon skins"],
      image: "/key1.jpg", // Replace with your image path
    },
    {
      id: 4,
      title: "Love Key",
      price: "$20",
      features: ["Access to Love-themed items", "Special emotes"],
      image: "/key5.png", // Replace with your image path
    },

    {
      id: 6,
      title: "Rare Key",
      price: "$10",
      features: ["Fully customizable", "Priority support", "Exclusive items"],
      image: "/key6.jpg", // Replace with your image path
    },
  ];

  // Handle Buy Now Button Click
  const handleBuyNow = (key: Key) => {
    setSelectedKey(key);
    localStorage.setItem("selectedKey", JSON.stringify(key));
  };

  // Validate Email
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle Stripe Payment
  const handleStripePayment = async () => {
    if (!selectedKey || !username || !email) {
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
          title: selectedKey.title,
          price: selectedKey.price,
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
    <div className="bg-gradient-to-br from-gray-900 to-black py-20 px-6 md:px-20 relative overflow-hidden">
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
        className="text-4xl md:text-5xl font-bold text-white text-center mb-12 mt-12 relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Choose Your Key
      </motion.h1>

      {/* Key Cards */}
      <div className="justify-center flex flex-wrap gap-8 relative z-10">
        {keys.map((key: Key) => (
          <motion.div
            key={key.id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 backdrop-blur-md border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: key.id * 0.2 }}
            viewport={{ once: false }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-1 bg-blue-400 blur-lg opacity-0 hover:opacity-30 transition-all duration-300"
            ></motion.div>

            {/* Key Image */}
            <div className="w-full h-48 relative mb-6">
              <Image
                src={key.image}
                alt={key.title}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>

            {/* Key Content */}
            <h2 className="text-2xl font-bold text-white mb-4">{key.title}</h2>
            <p className="text-blue-400 text-3xl font-bold mb-6">{key.price}</p>
            <ul className="text-white/80 mb-6">
              {key.features.map((feature: string, index: number) => (
                <li key={index} className="mb-2">
                  ✔️ {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleBuyNow(key)}
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all relative z-10"
            >
              Buy Now
            </button>
          </motion.div>
        ))}
      </div>

      {/* Key Details Modal */}
      {selectedKey && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
          <motion.div
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 backdrop-blur-md border border-blue-400/20 w-full max-w-md mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              {selectedKey.title}
            </h2>
            <p className="text-blue-400 text-3xl font-bold mb-6">
              {selectedKey.price}
            </p>
            <ul className="text-white/80 mb-6">
              {selectedKey.features.map((feature: string, index: number) => (
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
              onClick={() => setSelectedKey(null)}
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

export default KeysPage;