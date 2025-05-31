import { motion } from "framer-motion";

export const About = () => {
  const mlSkills = [
    "Python", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow",
    "PyTorch", "OpenCV", "XGBoost", "Matplotlib", "Seaborn"
  ];

  const dataSkills = [
    "SQL", "MongoDB", "AWS", "Apache Spark", "Flask", "Docker", "Git"
  ];

  return (
    <section
      id="about"
      className="w-full py-8 sm:py-10 px-4 sm:px-6 text-white"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div className="mx-auto w-full max-w-[90rem]">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-left border-b border-gray-700 pb-3">
          🧠 About Me
        </h2>

        <div className="space-y-6">
          {/* Intro */}
          <motion.div
            className="bg-black/20 backdrop-blur border border-gray-700 rounded-xl p-4 sm:p-6 hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.15 }}
          >
            <p className="text-gray-300 text-sm sm:text-base mb-4">
              I’m <strong className="text-white">Nikhil Yarra</strong>, a passionate Data Science graduate from NJIT. My focus spans
              machine learning, deep learning, and AI applications in real-world systems. I enjoy working with LLMs,
              data pipelines, and visual storytelling using statistics and code.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            className="bg-black/20 backdrop-blur border border-gray-700 rounded-xl p-4 sm:p-6 hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.15 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-purple-400">🧰 Technical Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm text-white font-medium mb-2">🔬 AI & ML Toolkit</h4>
                <div className="flex flex-wrap gap-2">
                  {mlSkills.map((skill, idx) => (
                    <span key={idx} className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm text-white font-medium mb-2">⚙️ Data Engineering</h4>
                <div className="flex flex-wrap gap-2">
                  {dataSkills.map((skill, idx) => (
                    <span key={idx} className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            className="bg-black/20 backdrop-blur border border-gray-700 rounded-xl p-4 sm:p-6 hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.15 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-purple-400">🎓 Education</h3>
            <ul className="text-gray-300 text-sm sm:text-base space-y-2">
              <li>
                <span className="text-white font-semibold">MS in Data Science</span> —{" "}
                <a href="https://www.njit.edu" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  NJIT (2024)
                </a>
              </li>
              <li>
                <span className="text-white font-semibold">B.Tech in CSE</span> —{" "}
                <a href="https://www.gitam.edu" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  GITAM
                </a>
              </li>
              <li>Specialized in ML, DL, RL, AI, Cloud, Big Data, and Applied Stats.</li>
            </ul>
          </motion.div>

          {/* Experience */}
          <motion.div
            className="bg-black/20 backdrop-blur border border-gray-700 rounded-xl p-4 sm:p-6 hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.15 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-purple-400">💼 Experience</h3>
            <div className="text-gray-300 text-sm sm:text-base space-y-4">
              <div>
                <h4 className="text-white font-medium">Data Analytics Intern — Phoenix Global</h4>
                <p>
                  Built a sentiment analysis dashboard using AWS, Pandas, and Plotly.
                  Automated reporting pipelines for executive insights.
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium">Technical Team Member — CYSEC, GITAM</h4>
                <p>
                  Worked on ML-based threat detection using OSINT.
                  Supported CTF events and cybersecurity research initiatives.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};