import { useEffect, useState } from "react";

const FEATURE_KEYWORDS = ["AI", "Machine", "TensorFlow", "Deep", "Generative", "Language Model"];

const platformIcons = {
  Coursera: "public/icons/coursera.svg", // Official Coursera icon
  "Coursera ": "public/icons/coursera.svg",
  Google: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  LinkedIn: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  "LinkedIn Learning": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  IBM: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ibm/ibm-original.svg",
  Forage: "public/icons/forage.png",
  "Forage ": "public/icons/forage.png", // Verified PNG fallback
};

export const Certifications = () => {
  const [certs, setCerts] = useState([]);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState("highlighted");

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "certifications.v2.json")
      .then((res) => res.json())
      .then((data) => setCerts(data))
      .catch((err) => console.error("Failed to load certifications:", err));
  }, []);

  const isFeatured = (title) =>
    FEATURE_KEYWORDS.some((kw) => title.toLowerCase().includes(kw.toLowerCase()));

  const categoryMap = {
    highlighted: (title) => isFeatured(title),
    "software-cert": (title) =>
      ["jira", "scrum", "testing", "architecture"].some((kw) => title.toLowerCase().includes(kw)),
    "cloud-cert": (title) =>
      ["cloud", "devops", "azure"].some((kw) => title.toLowerCase().includes(kw)),
    "cyber-cert": (title) =>
      ["cyber", "security", "attacks"].some((kw) => title.toLowerCase().includes(kw)),
  };

  const filterCerts = (certs) => {
    let filtered = certs.filter((cert) =>
      (cert.title + cert.platform).toLowerCase().includes(query.toLowerCase())
    );
    if (activeCategory && categoryMap[activeCategory]) {
      filtered = filtered.filter((c) => categoryMap[activeCategory](c.title));
    }
    return filtered;
  };

  const filtered = filterCerts(certs);
  const featuredCerts = filtered.filter((c) => isFeatured(c.title));
  const otherCerts = filtered.filter((c) => !isFeatured(c.title));

  return (
    <section
      id="certifications"
      className="w-full py-10 sm:py-14 px-4 sm:px-6 bg-black text-white"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <div className="mx-auto w-full max-w-[90rem]">
        <h2 className="text-4xl font-bold mb-6 text-left border-b border-gray-700 pb-4">
          📜 Certifications
        </h2>

        <p className="text-sm text-gray-400 mb-4">
          ✅ <strong>50+ certifications</strong> across AI, Data Science, Cloud, DevOps, and Software Engineering.
        </p>

        <div className="bg-neutral-900 border border-gray-700 rounded-lg p-4 mb-8 text-xs text-purple-300 space-y-2">
          <p className="text-sm font-semibold text-purple-400">🚀 Hiring Cheat Sheet:</p>
          <p>
            🤖 <strong>Need an AI/ML brainiac?</strong>{" "}
            <button onClick={() => setActiveCategory("highlighted")} className="underline hover:text-white">
              See below the highlights
            </button>
          </p>
          <p>
            🧑‍💻 <strong>Looking for a solid Software Engineer?</strong>{" "}
            <button onClick={() => setActiveCategory("software-cert")} className="underline hover:text-white">
              Peek at dev & testing certs
            </button>
          </p>
          <p>
            ☁️ <strong>Hiring for Cloud, Infra, or DevOps?</strong>{" "}
            <button onClick={() => setActiveCategory("cloud-cert")} className="underline hover:text-white">
              View cloud & tools certs
            </button>
          </p>
          <p>
            🔐 <strong>Cybersecurity your thing?</strong>{" "}
            <button onClick={() => setActiveCategory("cyber-cert")} className="underline hover:text-white">
              See security-focused certs
            </button>
          </p>
          <p>
            🧹 <button onClick={() => setActiveCategory(null)} className="text-gray-400 hover:text-white underline">
              Clear filter & show all
            </button>
          </p>
        </div>

        <input
          type="text"
          placeholder="Search certifications (e.g. AI, Google, DevOps)..."
          className="w-full mb-8 px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {featuredCerts.length > 0 && activeCategory === "highlighted" && (
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-purple-400 mb-4">
              🌟 Highlighted Certifications (AI / ML / GenAI)
            </h3>
            <div className="space-y-4">
              {featuredCerts.map(({ id, title, url, platform }) => (
                <div
                  key={id}
                  className="bg-purple-950 border border-purple-700 rounded-md px-4 py-3"
                >
                  <h4 className="text-sm font-semibold text-purple-200">{title}</h4>
                  <div className="flex items-center gap-2 text-xs text-purple-300 mb-1">
                    {platformIcons[platform] && (
                      <img src={platformIcons[platform]} alt={platform} width={20} height={20} />

                    )}
                    <span>{platform}</span>
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple-300 hover:text-white transition"
                  >
                    View Certificate →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {(showAll ? otherCerts : otherCerts.slice(0, 10)).map(({ id, title, url, platform }) => (
            <div
              key={id}
              className="bg-neutral-900 border border-gray-700 rounded-md px-4 py-3"
            >
              <h4 className="text-sm font-semibold text-purple-300">{title}</h4>
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                {platformIcons[platform] && (
                  <img src={platformIcons[platform]} alt={platform} width={20} height={20} />

                )}
                <span>{platform}</span>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-purple-400 hover:text-white transition"
              >
                View Certificate →
              </a>
            </div>
          ))}

          {otherCerts.length > 10 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-sm text-purple-400 hover:text-white transition"
              >
                {showAll ? "▲ Show Less" : "▼ Show All Certifications"}
              </button>
            </div>
          )}

          {filtered.length === 0 && (
            <p className="text-sm text-gray-500 italic mt-6">
              No certifications match your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};