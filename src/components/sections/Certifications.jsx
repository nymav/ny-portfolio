import { useEffect, useState } from "react";

export const Certifications = () => {
  const [certs, setCerts] = useState({});
  const [collapsed, setCollapsed] = useState({});

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "certifications.v2.json")
      .then((res) => res.json())
      .then((data) => {
        const priority = ["Data", "AI", "Machine", "Deep", "TensorFlow", "ML"];
        const sorted = [...data].sort((a, b) => {
          const aP = priority.some((kw) => a.title.includes(kw));
          const bP = priority.some((kw) => b.title.includes(kw));
          return bP - aP;
        });

        const grouped = sorted.reduce((acc, cert) => {
          const platform = cert.platform.trim();
          acc[platform] = acc[platform] || [];
          acc[platform].push(cert);
          return acc;
        }, {});

        const initCollapsed = Object.keys(grouped).reduce(
          (acc, p) => ({ ...acc, [p]: false }),
          {}
        );
        setCerts(grouped);
        setCollapsed(initCollapsed);
      })
      .catch((err) => console.error("Failed to load certifications:", err));
  }, []);

  const toggleCollapse = (platform) =>
    setCollapsed((prev) => ({ ...prev, [platform]: !prev[platform] }));

  return (
    <section
  id="certifications"
  className="w-full min-h-[60vh] py-10 sm:py-14 px-4 sm:px-6 bg-black text-white"
  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
>
      <div className="mx-auto w-full max-w-[90rem]">
        <h2 className="text-4xl font-bold mb-12 text-left border-b border-gray-700 pb-4">
          📜 Certifications
        </h2>

        <div className="space-y-12">
          {Object.entries(certs).map(([platform, list]) => (
            <div key={platform}>
              <div
                onClick={() => toggleCollapse(platform)}
                className="flex items-center justify-between cursor-pointer hover:text-purple-400 transition"
              >
                <h3 className="text-xl font-semibold mb-2">{platform}</h3>
                <span className="text-xl">{collapsed[platform] ? "▲" : "▼"}</span>
              </div>

              {!collapsed[platform] && (
                <div className="space-y-6">
                  {list.map(({ id, title, url }) => (
                    <div key={id}>
                      <h4 className="text-md font-semibold text-purple-400 mb-1">
                        {title}
                      </h4>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white hover:text-purple-300 transition"
                      >
                        View Certificate →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
