import { motion, useScroll, useTransform } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useRef } from "react";

export const Home = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      id="home"
      className="min-h-[90vh] flex items-center justify-center bg-white text-black px-6"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <div
        ref={ref}
        className="flex flex-col-reverse md:flex-row items-center justify-center max-w-6xl w-full gap-10"
      >
        {/* Text Section */}
        <motion.div
          className="text-center md:text-left max-w-xl"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Hi, I'm Nikhil Yarra
          </h1>

          <h2 className="text-xl sm:text-2xl font-mono text-gray-700 mb-6">
            <Typewriter
              words={[
                "Data Science Maverick",
                "Machine Learning Enthusiast",
                "Artificial Intelligence Explorer",
                "LLM & NLP Practitioner",
                "Deep Learning Tinkerer",
                "Pythonic Problem Solver",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1200}
            />
          </h2>

          <p className="text-gray-700 text-base sm:text-lg mb-8 leading-relaxed">
            I’m a curious data science graduate exploring machine learning, deep learning, and AI. I enjoy experimenting with models and building small projects that help me learn and grow.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <a
              href="#projects"
              className="bg-black text-white py-3 px-6 rounded-lg font-medium transition hover:scale-105 hover:bg-gray-900"
            >
              🚀 View Projects
            </a>
            <a
              href="mailto:nikhilyarra@gmail.com?subject=Portfolio Inquiry&body=Hi Nikhil,"
              className="border border-black text-black py-3 px-6 rounded-lg font-medium transition hover:scale-105 hover:bg-gray-100"
            >
              ✉️ Let’s Connect
            </a>
          </div>
        </motion.div>

        {/* Circular Profile Image */}
        <motion.div
          style={{ y }}
          className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          {/* Gradient Blur Behind */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 opacity-30 blur-2xl z-0"></div>

          {/* Profile Image */}
          <img
  src={`${import.meta.env.BASE_URL}pfp1.jpg`}
  alt="Profile of Nikhil Yarra"
  className="relative z-10 w-60 h-60 md:w-64 md:h-64 object-cover rounded-full border-4 border-white shadow-lg"
/>
        </motion.div>
      </div>
    </section>
  );
};