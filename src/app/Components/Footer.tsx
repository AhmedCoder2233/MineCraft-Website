"use client";

const Footer = () => {
  return (
    <footer className="bg-black py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-white/80 text-sm">
            &copy; {new Date().getFullYear()} OceanSMP. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex gap-6">
            <a
              href="#" // Replace with your link
              className="text-white/80 text-sm hover:text-blue-400 transition-all"
            >
              Privacy Policy
            </a>
            <a
              href="#" // Replace with your link
              className="text-white/80 text-sm hover:text-blue-400 transition-all"
            >
              Terms of Service
            </a>
            <a
              href="#" // Replace with your link
              className="text-white/80 text-sm hover:text-blue-400 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;