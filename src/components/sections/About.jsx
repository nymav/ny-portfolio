import { useEffect, useState } from "react";

export const About = () => {
  const mlSkills = [
    "Python", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow",
    "PyTorch", "OpenCV", "XGBoost", "Matplotlib", "Seaborn"
  ];

  const dataSkills = [
    "SQL", "MongoDB", "AWS", "Apache Spark", "Flask", "Docker", "Git"
  ];

  return (
    <section id="about" className="pt-12 bg-white text-black">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-black">About Me</h2>

        {/* Intro Card */}
        <div className="p-8 rounded-2xl border border-gray-300 bg-white shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 mb-10">
          <p className="text-gray-800 mb-8 text-lg leading-relaxed">
            I'm <strong>Nikhil Yarra</strong>, a graduate student in Data Science at NJIT.
            My academic background blends applied statistics, machine learning, and modern computing systems.
            I’ve explored everything from LLMs and deep learning to big data pipelines and visualization tools.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-black">AI & ML Tools</h3>
              <div className="flex flex-wrap gap-2">
                {mlSkills.map((skill, idx) => (
                  <a
                    key={idx}
                    href={`https://www.google.com/search?q=${encodeURIComponent(skill)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 text-black py-1 px-3 rounded-full text-sm font-normal hover:bg-gray-200 transition"
                  >
                    {skill}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-black">Data Engineering</h3>
              <div className="flex flex-wrap gap-2">
                {dataSkills.map((skill, idx) => (
                  <a
                    key={idx}
                    href={`https://www.google.com/search?q=${encodeURIComponent(skill)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 text-black py-1 px-3 rounded-full text-sm font-normal hover:bg-gray-200 transition"
                  >
                    {skill}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Education & Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Education */}
          <div className="col-span-1 lg:col-span-1 p-6 rounded-xl border border-gray-300 bg-white shadow-md hover:-translate-y-1 hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold mb-4 text-black">🎓 Education</h3>
            <ul className="list-disc list-inside text-gray-800 space-y-2">
              <li>
                <a
                  href="https://www.njit.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-black hover:underline"
                >
                  MS in Data Science
                </a>{" "}
                – NJIT (2024)
              </li>
              <li>
                <a
                  href="https://www.gitam.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-black hover:underline"
                >
                  B.Tech in CSE
                </a>{" "}
                – GITAM
              </li>
              <li>
                Focused on <strong>Machine Learning, Deep Learning, Reinforcement Learning, Artificial Intelligence, Cloud Computing, Big Data,</strong> and <strong>Applied Statistics</strong>.
              </li>
            </ul>
          </div>

          {/* Experience */}
          <div className="col-span-1 lg:col-span-2 p-6 rounded-xl border border-gray-300 bg-white shadow-md hover:-translate-y-1 hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold mb-4 text-black">💼 Experience</h3>
            <div className="space-y-4 text-gray-800">
              <div>
                <h4 className="font-semibold">Data Analytics Intern – Phoenix Global</h4>
                <p>
                  Led a team of interns to design and deploy a sentiment analysis dashboard using customer feedback data. 
                  Built automated pipelines and dashboards for business reporting and decision support.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Technical Team Member – CYSEC, GITAM</h4>
                <p>
                  Contributed to cybersecurity efforts using ML and OSINT tools for threat detection. Helped organize Capture The Flag (CTF) events to promote hands-on learning in ethical hacking and cybersecurity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};