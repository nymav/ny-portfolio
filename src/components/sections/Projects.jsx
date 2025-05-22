export const Projects = () => {
  const projects = [
    {
      title: "Flight Data Analysis with MapReduce",
      description:
        "Analyzed 22 years of flight data using dual MapReduce jobs to rank airlines by punctuality and airports by taxi time.",
      tech: ["Hadoop", "MapReduce", "Java", "AWS EMR"],
    },
    {
      title: "Web Scraping Neural Development Research",
      description:
        "Built an R-based scraper to extract and analyze article metadata from Neural Development for keyword and trend insights.",
      tech: ["R", "rvest", "dplyr", "ggplot2"],
    },
    {
      title: "Face Emotion Detection Using CNNs",
      description:
        "Built and compared CNN models (VGG, ResNet, DenseNet) for facial emotion detection with 99.89% accuracy using SMOTE and augmentation.",
      tech: ["Python", "TensorFlow", "Keras", "OpenCV", "SMOTE", "Scikit-learn"],
      link: "https://github.com/nymav/Face-Emotion-Detection-Using-CNNs",
    },
    {
      title: "Causal Inference in Healthcare",
      description:
        "Estimated treatment effects from MIMIC-III data using DoWhy and SHAP for interpretability.",
      tech: ["Python", "DoWhy", "EconML", "SHAP", "Pandas"],
    },
    {
      title: "Bank Campaign Response Prediction",
      description:
        "Forecasted client responses using XGBoost and SVM, achieving 98% accuracy with SHAP for insights.",
      tech: ["Python", "XGBoost", "SVM", "SHAP", "Scikit-learn"],
      link: "https://github.com/nymav/Bank-Campaign",
    },
    {
      title: "Apple Stock Price Forecasting",
      description:
        "Used LSTM and smoothing models to predict Apple stock prices with high accuracy.",
      tech: ["Python", "TensorFlow", "LSTM", "SQL", "Pandas"],
    },
    {
      title: "DDoS Attack Detection Tool",
      description:
        "Created a classifier using AdaBoost and Naive Bayes to detect DDoS attacks, reducing load by 40%.",
      tech: ["Python", "Scikit-learn", "AdaBoost", "PyQt"],
    },
    {
      title: "Sentiment Analysis on Uber & Ola",
      description:
        "Built a deep learning model using Word2Vec and CNN to classify user sentiments from tweets.",
      tech: ["TensorFlow", "Keras", "Word2Vec", "CNN"],
    },
  ];

  return (
    <section
      id="projects"
      className="min-h-[90vh] w-full bg-black text-white py-20 px-4"
    >
      <div className="max-w-7xl w-full mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
          My Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#0a0a0a] shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-800"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <a
                    key={i}
                    href={`https://www.google.com/search?q=${tech}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white py-1 px-3 rounded-full text-sm hover:bg-gray-700 transition"
                  >
                    {tech}
                  </a>
                ))}
              </div>
              <a
                href={project.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 font-medium hover:text-white transition"
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
