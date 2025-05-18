import { useState } from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaUserFriends,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const SocialBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    {
      href: "https://github.com/nymav",
      icon: <FaGithub />,
      label: "GitHub",
    },
    {
      href: "https://linkedin.com/in/nikhil-yarra",
      icon: <FaLinkedinIn />,
      label: "LinkedIn",
    },
    {
      href: "https://instagram.com/ny.mav",
      icon: <FaInstagram />,
      label: "Instagram",
    },
    {
      href: "mailto:nikhilyarra@gmail.com?subject=Opportunity%20to%20Collaborate%20with%20You&body=Hi%20Nikhil,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect.",
      icon: <FaEnvelope />,
      label: "Email",
    },
  ];

  return (
    <>
      {/* 👉 Floating Button on Mobile */}
      <div className="md:hidden fixed bottom-20 right-4 z-[999]">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition"
          aria-label="Open Socials"
        >
          <FaUserFriends className="text-xl" />
        </button>
      </div>

      {/* 👉 Social Bottom Sheet on Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-end justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white w-full max-w-sm rounded-t-xl p-6 shadow-lg"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-lg">Connect with me</span>
                <button
                  className="text-gray-500 hover:text-black"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Socials"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {socials.map((social, idx) => (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-gray-700 hover:text-black transition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <div className="bg-gray-100 p-3 rounded-full shadow text-xl mb-1">
                      {social.icon}
                    </div>
                    <span className="text-sm font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 👉 Desktop Sidebar */}
      <motion.nav
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="hidden md:flex fixed top-1/2 right-6 -translate-y-1/2 z-50 flex-col gap-4"
      >
        {socials.map((social, idx) => (
          <motion.a
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full
              bg-white text-gray-800 border border-gray-200 shadow hover:shadow-lg hover:scale-105
              transition-all duration-300"
          >
            <span className="text-lg">{social.icon}</span>
            <span className="absolute right-14 bg-black text-white text-xs font-medium rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {social.label}
            </span>
          </motion.a>
        ))}
      </motion.nav>
    </>
  );
};