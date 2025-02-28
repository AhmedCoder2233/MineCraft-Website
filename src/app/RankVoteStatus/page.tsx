"use client";

import { motion } from "framer-motion";
import { FaServer, FaUser, FaVoteYea } from "react-icons/fa";

const ServerStatus = () => {
  const serverStatus = "Offline"; // Server status
  const onlinePlayers = 0; // Currently online players

  const voteLinks = [
    { name: "Vote Site 1", link: "#", icon: <FaVoteYea className="text-4xl" /> },
    { name: "Vote Site 2", link: "#", icon: <FaVoteYea className="text-4xl" /> },
    { name: "Vote Site 3", link: "#", icon: <FaVoteYea className="text-4xl" /> },
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
          Server Status & Vote Links
        </motion.h2>

        {/* Server Status and Online Players */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Server Status */}
          <motion.div
            className="bg-gradient-to-br from-blue-500/10 to-blue-900/10 rounded-lg p-8 text-center backdrop-blur-md border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 relative overflow-hidden"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false }} // Trigger every time in view
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-1 bg-blue-400 blur-lg opacity-0 hover:opacity-30 transition-all duration-300"
            ></motion.div>
            <FaServer className="text-6xl text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Server Status</h3>
            <p
              className="text-lg font-semibold text-red-400"
            >
              {serverStatus}
            </p>
          </motion.div>

          {/* Online Players */}
          <motion.div
            className="bg-gradient-to-br from-blue-500/10 to-blue-900/10 rounded-lg p-8 text-center backdrop-blur-md border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 relative overflow-hidden"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false }} // Trigger every time in view
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-1 bg-blue-400 blur-lg opacity-0 hover:opacity-30 transition-all duration-300"
            ></motion.div>
            <FaUser className="text-6xl text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Currently Online
            </h3>
            <p className="text-lg font-semibold text-white">
              {onlinePlayers} Players Online
            </p>
          </motion.div>
        </div>

        {/* Vote Links */}
        <motion.div
          className="bg-gradient-to-br from-blue-500/10 to-blue-900/10 rounded-lg p-8 backdrop-blur-md border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 relative overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }} // Trigger every time in view
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute -inset-1 bg-blue-400 blur-lg opacity-0 hover:opacity-30 transition-all duration-300"
          ></motion.div>
          <h3 className="text-2xl font-bold text-white mb-6">Vote for Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {voteLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.link}
                className="group flex flex-col items-center justify-center bg-blue-400/10 rounded-lg p-6 text-center text-white hover:bg-blue-400/20 transition-all duration-300 relative overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
                viewport={{ once: false }} // Trigger every time in view
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute -inset-1 bg-blue-400 blur-lg opacity-0 group-hover:opacity-30 transition-all duration-300"
                ></motion.div>
                {/* Icon */}
                <div className="text-blue-400 mb-4">{link.icon}</div>
                {/* Text */}
                <span className="text-lg font-semibold">{link.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
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

export default ServerStatus;