"use client";

import { motion } from "framer-motion";
import { FaDiscord, FaEnvelope, FaCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";

const ContactSection = () => {
  const serverIP = "play.oceansmp.com"; // Replace with your server IP

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverIP);
    toast.success("Server IP copied to clipboard!");
  };

  return (
    <section className="relative py-20 px-6 md:px-20 bg-black/90 overflow-hidden">
      {/* Background Particles */}
      {[...Array(30)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-blue-400 rounded-full blur-sm"
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
          Contact Us
        </motion.h2>

        {/* Server IP Card (Full Width) */}
        <motion.div
          className="bg-gradient-to-br from-black to-gray-900 rounded-lg p-8 backdrop-blur-md border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 relative overflow-hidden mb-12"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }} // Trigger every time in view
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute -inset-1 bg-blue-400 blur-lg opacity-0 hover:opacity-30 transition-all duration-300"
          ></motion.div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-white mb-4">Server IP</h3>
          <p className="text-white/80 text-lg mb-6">
            Copy the IP below to join our server:
          </p>
          <motion.div
            className="flex items-center justify-between bg-black/20 p-4 rounded-lg border border-blue-400/20 cursor-pointer hover:bg-blue-400/10 transition-all"
            onClick={copyToClipboard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <code className="text-blue-400 font-mono text-xl">{serverIP}</code>
            <FaCopy className="text-blue-400 text-2xl z-50" />
          </motion.div>
        </motion.div>

        {/* Discord and Mail Us Cards (Below Server IP Card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Discord Card */}
          <motion.div
            className="bg-gradient-to-br from-black to-gray-900 rounded-lg p-8 backdrop-blur-md border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: false }} // Trigger every time in view
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-1 bg-blue-400 blur-lg opacity-0 hover:opacity-30 transition-all duration-300"
            ></motion.div>

            {/* Icon */}
            <FaDiscord className="text-6xl text-blue-400 mx-auto mb-6" />

            {/* Content */}
            <h3 className="text-2xl font-bold text-white text-center mb-4">
              Join Our Discord
            </h3>
            <p className="text-white/80 text-center mb-6">
              Connect with the community, get updates, and participate in events!
            </p>
            <motion.a
              href="#" // Replace with your Discord invite link
              className="block w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg text-center hover:bg-blue-700 transition-all relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Discord
            </motion.a>
          </motion.div>

          {/* Mail Us Card */}
          <motion.div
            className="bg-gradient-to-br from-black to-gray-900 rounded-lg p-8 backdrop-blur-md border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: false }} // Trigger every time in view
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-1 bg-blue-400 blur-lg opacity-0 hover:opacity-30 transition-all duration-300"
            ></motion.div>

            {/* Icon */}
            <FaEnvelope className="text-6xl text-blue-400 mx-auto mb-6" />

            {/* Content */}
            <h3 className="text-2xl font-bold text-white text-center mb-4">
              Mail Us
            </h3>
            <p className="text-white/80 text-center mb-6">
              Have questions? Reach out to us, and we'll get back to you soon!
            </p>
            <motion.a
              href="mailto:example@oceansmp.com" // Replace with your email
              className="block w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg text-center hover:bg-blue-700 transition-all relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Email
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;