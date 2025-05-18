import { useEffect, useState } from "react";

export const Certifications = () => {
  const [certs, setCerts] = useState({});
  const [collapsed, setCollapsed] = useState({});

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "certifications.json")
      .then((res) => res.json())
      .then((data) => {
        const priorityKeywords = ["Data", "AI", "Machine", "Deep", "TensorFlow", "ML"];
        const sorted = [...data].sort((a, b) => {
          const aPriority = priorityKeywords.some((kw) => a.title.includes(kw));
          const bPriority = priorityKeywords.some((kw) => b.title.includes(kw));
          return bPriority - aPriority;
        });

        const grouped = sorted.reduce((acc, cert) => {
          const key = cert.platform.trim();
          if (!acc[key]) acc[key] = [];
          acc[key].push(cert);
          return acc;
        }, {});

        const initialCollapse = Object.keys(grouped).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {});

        setCerts(grouped);
        setCollapsed(initialCollapse);
      })
      .catch((err) => console.error("Failed to load certifications:", err));
  }, []);

  const toggleCollapse = (platform) => {
    setCollapsed((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  return (
    <section id="certifications" className="py-20 bg-black text-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Certifications</h2>

        {Object.keys(certs).length === 0 ? (
          <p className="text-center text-gray-400">Loading certifications...</p>
        ) : (
          Object.entries(certs).map(([platform, list]) => (
            <div key={platform} className="mb-12">
              <button
                onClick={() => toggleCollapse(platform)}
                className="text-left w-full mb-6 text-xl font-semibold text-white hover:underline"
              >
                {platform} {collapsed[platform] ? "▼" : "▲"}
              </button>

              {!collapsed[platform] && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {list.map(({ id, title, url }) => (
                    <div
                      key={id}
                      className="p-6 rounded-xl border border-gray-800 bg-[#0a0a0a] shadow-sm hover:shadow-md transition hover:-translate-y-1"
                    >
                      <h3 className="text-base font-bold mb-2">{title}</h3>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 text-sm hover:text-white transition"
                      >
                        View Certificate →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};