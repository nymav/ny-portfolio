import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import {
  PiBracketsCurlyBold,
  PiCertificateBold,
  PiHouseBold,
  PiUserBold,
} from "react-icons/pi";

export const Home = ({ handleNavClick }) => {
  const navLinks = [
    { id: "home", icon: <PiHouseBold />, label: "Home" },
    { id: "projects", icon: <PiBracketsCurlyBold />, label: "Projects" },
    { id: "certifications", icon: <PiCertificateBold />, label: "Certs" },
    { id: "about", icon: <PiUserBold />, label: "Me" },
  ];

  const socialLinks = [
    { href: "https://github.com/nymav", icon: <FaGithub />, label: "Git" },
    { href: "https://linkedin.com/in/nikhil-yarra", icon: <FaLinkedinIn />, label: "LIn" },
    { href: "https://instagram.com/ny.mav", icon: <FaInstagram />, label: "Insta" },
  ];

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <aside
      id="home"
      className="flex flex-col justify-between items-center min-h-screen w-full px-6 py-12 text-white cursor-default"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        background: "radial-gradient(ellipse at top, #3b0066 0%, #0d001a 60%, #000000 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Profile */}
      <div className="text-center w-full max-w-xs">
        <motion.div
          className="relative mx-auto w-48 h-48 mb-6"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute inset-0 rounded-full bg-purple-800 blur-2xl opacity-40 scale-150" />
          <img
            src={`${import.meta.env.BASE_URL}pfp1.jpg`}
            alt="Nikhil Yarra"
            className="relative z-10 w-48 h-48 object-cover rounded-full border-4 border-white shadow-2xl"
          />
        </motion.div>

        <h1 className="text-3xl font-bold mb-1">Hi, I’m Nikhil Yarra</h1>
        <h2 className="text-base text-purple-400 font-mono mb-4">
          <Typewriter
            words={[
              "AI + LLM Explorer",
              "Machine Learning Enthusiast",
              "Data Science Maverick",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={40}
            delaySpeed={1000}
          />
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          Data Science grad building ML, DL & AI projects. Passionate about model tinkering, learning, and innovation.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 mt-8 w-full max-w-xs">
        <button
          onClick={() => handleNavClick("projects")}
          className="bg-purple-600 text-white border border-purple-400 py-2 px-4 rounded-md text-sm font-semibold transition hover:bg-black hover:border-white w-full cursor-pointer"
        >
          🚀 View Projects
        </button>
        <a
          href="mailto:nikhilyarra@gmail.com?subject=Portfolio Inquiry"
          className="bg-black text-white border border-purple-400 py-2 px-4 rounded-md text-sm font-semibold transition hover:bg-purple-600 hover:text-white text-center w-full cursor-pointer"
        >
          ✉️ Let’s Connect
        </a>
      </div>

      {/* Staggered Animated Icons */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="mt-12 grid grid-cols-3 gap-6 max-w-sm mx-auto text-xs text-center"
      >
        {[...navLinks, ...socialLinks].map((item, index) => {
          const isExternal = item.href !== undefined;

          return (
            <motion.div
              key={index}
              custom={index}
              variants={iconVariants}
              whileHover={{ scale: 1.12, rotate: 1 }}
              className="flex flex-col items-center group cursor-pointer col-span-1"
            >
              {isExternal ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-11 h-11 flex items-center justify-center border border-purple-400 rounded-full shadow-md"
                >
                  {item.icon}
                </a>
              ) : (
                <button
                  onClick={() => handleNavClick(item.id)}
                  aria-label={item.label}
                  className="w-11 h-11 flex items-center justify-center border border-purple-400 rounded-full shadow-md"
                >
                  {item.icon}
                </button>
              )}
              <span className="mt-2 text-gray-300 group-hover:text-white font-medium">
                {item.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </aside>
  );
};
