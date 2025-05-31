import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  const projects = [
    {
      title: "Flight Data Analysis with MapReduce",
      description:
        "Analyzed 22 years of flight data using MapReduce jobs to rank airlines and airports.",
      tech: ["Hadoop", "MapReduce", "Java", "AWS EMR"],
      link: "https://github.com/nymav/Fligh-Data-Analysis-with-MapReduce",
    },
    {
      title: "Web Scraping Neural Development Research",
      description:
        "Extracted metadata from articles using R and visualized keyword trends.",
      tech: ["R", "rvest", "dplyr", "ggplot2"],
      link: "https://github.com/nymav/Web-Scraping-Articles",
    },
    {
      title: "Face Emotion Detection Using CNNs",
      description:
        "Compared VGG, ResNet, DenseNet for facial emotion recognition with SMOTE.",
      tech: ["Python", "TensorFlow", "Keras", "OpenCV", "SMOTE"],
      link: "https://github.com/nymav/Face-Emotion-Detection-Using-CNNs",
    },
    {
      title: "Causal Inference in Healthcare",
      description:
        "Estimated treatment effects using DoWhy and SHAP on MIMIC-III data.",
      tech: ["Python", "DoWhy", "EconML", "SHAP"],
    },
    {
      title: "Bank Campaign Response Prediction",
      description:
        "Built XGBoost & SVM models to predict marketing outcomes with SHAP insights.",
      tech: ["Python", "XGBoost", "SVM", "SHAP"],
      link: "https://github.com/nymav/Predictive-Modeling-for-Optimizing-Bank-Marketing-Campaigns-Using-Machine-Learning",
    },
    {
      title: "Apple Stock Price Forecasting",
      description:
        "Predicted Apple stock prices using LSTM and smoothing techniques.",
      tech: ["TensorFlow", "LSTM", "SQL", "Pandas"],
    },
    {
      title: "DDoS Attack Detection Tool",
      description:
        "Built a tool using AdaBoost & Naive Bayes to detect DDoS with 40% load cut.",
      tech: ["Scikit-learn", "AdaBoost", "PyQt"],
      link: "https://github.com/nymav/DDoS-Attack-Detection-using-Machine-Learning",
    },
    {
      title: "Sentiment Analysis on Uber & Ola",
      description:
        "Classified tweets using Word2Vec and CNN for ride-sharing sentiment.",
      tech: ["Word2Vec", "CNN", "TensorFlow"],
      link: "https://github.com/nymav/Sentiment-Analysis-on-Uber-and-Ola",
    },
    {
      title: "Role-Based VIP Access Portal (Flask + MySQL)",
      description:
        "Built a role-based VIP login system using Flask and MySQL, featuring user authentication, dashboard views, and secure backend logic.",
      tech: ["Flask", "Python", "SQLAlchemy", "MySQL", "HTML/CSS"],
    },
    {
      title: "Diet of the Deep – Fish Trophic Data Analysis",
      description:
        "Exploratory analysis on 54K+ freshwater fish diet records using R and Python to reveal trophic patterns, gaps, and sampling bias.",
      tech: ["Python", "R", "Tidyverse", "GeoPandas", "Data Visualization"],
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
  id="projects"
  className="w-full py-8 sm:py-10 px-4 sm:px-6 text-white bg-transparent"
  style={{
    fontFamily: "'Space Grotesk', sans-serif",
    background: "transparent", // REMOVE this line
  }}
>

      <div className="mx-auto w-full max-w-[90rem]">
        <h2 className="text-4xl font-bold mb-10 text-left border-b border-gray-700 pb-3">
          🛠️ Featured Projects
        </h2>

        <div className="grid gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="border border-gray-700 rounded-xl p-5 hover:shadow-xl transition duration-300 bg-black/20 backdrop-blur"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.4 }}

            >
              <h3 className="text-lg sm:text-xl font-semibold text-purple-400">
                {project.title}
              </h3>
              <p className="text-sm text-gray-300 mt-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-3">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-400 hover:text-white transition"
                  >
                    View Project →
                  </a>
                ) : (
                  <span className="text-sm text-gray-500 italic">
                    Coming soon...
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
