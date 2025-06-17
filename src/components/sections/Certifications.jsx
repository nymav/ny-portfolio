import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FEATURE_KEYWORDS = ["AI", "Machine", "TensorFlow", "Deep", "Generative", "Language Model"];

const platformIcons = {
  Coursera: "public/icons/coursera.svg",
  "Coursera ": "public/icons/coursera.svg",
  Google: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  LinkedIn: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  "LinkedIn Learning": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  IBM: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ibm/ibm-original.svg",
  Forage: "public/icons/forage.png",
  "Forage ": "public/icons/forage.png",
};

// Mock certifications data for demonstration
const mockCerts = [ 
  {
    "id": 1,
    "title": "BCG - Data Science Job Simulation",
    "platform": "Forage",
    "url": "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/SKZxezskWgmFjRvj9/Tcz8gTtprzAS4xSoK_SKZxezskWgmFjRvj9_KEEmPn4ZYGWJoA8mp_1734817743873_completion_certificate.pdf"
  },
  {
    "id": 2,
    "title": "Artificial Intelligence Foundations: Machine Learning",
    "platform": "LinkedIn",
    "url": "https://www.linkedin.com/learning/certificates/8720e1629613cf33224c94ee3822411e434bd9341b3b96f0c389d8050ab07adf?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BorEUSc%2BUSTOVRBuCkZ19vA%3D%3D"
  },
  {
    "id": 3,
    "title": "Artificial Intelligence Foundations: Thinking Machines",
    "platform": "LinkedIn",
    "url": "https://www.linkedin.com/learning/certificates/ffcb6601c4d0fffe6f564bd9ea8cf7bcd606261a9dc468d27121bbf965fb5869?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BorEUSc%2BUSTOVRBuCkZ19vA%3D%3D"
  },
  {
    "id": 4,
    "title": "Learning Data Analytics: 1 Foundations",
    "platform": "LinkedIn",
    "url": "https://www.linkedin.com/learning/certificates/f40f76b0415cc80a5b11e82ca457f4bcea5f69fe7d8d24cc0ff0f05c501002bf?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BorEUSc%2BUSTOVRBuCkZ19vA%3D%3D"
  },
  {
    "id": 5,
    "title": "Data Analysis with R Programming",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/8DZR3BC9HYY4"
  },
  {
    "id": 6,
    "title": "Digital Transformation with Google Cloud",
    "platform": "Google",
    "url": "https://www.cloudskillsboost.google/public_profiles/72997271-a919-4b80-a955-8762c9b0959b/badges/6385595?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share"
  },
  {
    "id": 7,
    "title": "Infrastructure and Application Modernization with Google Cloud",
    "platform": "Google",
    "url": "https://www.cloudskillsboost.google/public_profiles/72997271-a919-4b80-a955-8762c9b0959b/badges/6429794?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share"
  },
  {
    "id": 8,
    "title": "Innovating with Data and Google Cloud",
    "platform": "Google",
    "url": "https://www.cloudskillsboost.google/public_profiles/72997271-a919-4b80-a955-8762c9b0959b/badges/6385772?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share"
  },
  {
    "id": 9,
    "title": "Introduction to Generative AI",
    "platform": "Google",
    "url": "https://www.cloudskillsboost.google/public_profiles/72997271-a919-4b80-a955-8762c9b0959b/badges/6385519?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share"
  },
  {
    "id": 10,
    "title": "Introduction to Large Language Models",
    "platform": "Google",
    "url": "https://www.cloudskillsboost.google/public_profiles/72997271-a919-4b80-a955-8762c9b0959b/badges/6385471?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share"
  },
  {
    "id": 11,
    "title": "Introduction to Responsible AI",
    "platform": "Google",
    "url": "https://www.cloudskillsboost.google/public_profiles/72997271-a919-4b80-a955-8762c9b0959b/badges/6385566?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share"
  },
  {
    "id": 12,
    "title": "Introduction to Big Data with Spark and Hadoop",
    "platform": "Coursera ",
    "url": "https://www.coursera.org/account/accomplishments/certificate/5W648WMSEGL9"
  },
  {
    "id": 13,
    "title": "Cybersecurity Roles, Processes & Operating System",
    "platform": "Coursera ",
    "url": "https://www.coursera.org/account/accomplishments/certificate/REY8TVY256CV"
  },
  {
    "id": 14,
    "title": "Introduction to Cybersecurity Tools & Cyber Attacks",
    "platform": "Coursera ",
    "url": "https://www.coursera.org/account/accomplishments/certificate/ZXWNWRYMEPKX"
  },
  {
    "id": 15,
    "title": "J.P. Morgan - Software Engineering Job Simulation",
    "platform": "Forage",
    "url": "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/J.P.%20Morgan/R5iK7HMxJGBgaSbvk_J.P.%20Morgan_KEEmPn4ZYGWJoA8mp_1669486482093_completion_certificate.pdf"
  },
  {
    "id": 16,
    "title": "Agile Projects: Creating User Stories with Value in Tagia",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/DURKH4FYCZ89"
  },
  {
    "id": 17,
    "title": "Automate tasks and processes with Jira",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/MWB37CLA2H8X"
  },
  {
    "id": 18,
    "title": "Getting Started with Azure DevOps Boards",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/T9QGZ3JWX7N8"
  },
  {
    "id": 19,
    "title": "Organisational behaviour: Know your people",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/AUQYPKFH4GH3"
  },
  {
    "id": 20,
    "title": "Scrum Team Building Using Games and Interactive Tools",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/S2RP78SRP2KM"
  },
  {
    "id": 21,
    "title": "Cameras, Exposure, and Photography",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/7PMHWRD4CP35"
  },
  {
    "id": 22,
    "title": "How to use roadmaps in Jira",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/UNSHB2R2WQX3"
  },
  {
    "id": 23,
    "title": "Introduction to Software Testing",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/PR79QEXQMJ5M"
  },
  {
    "id": 24,
    "title": "Create User Stories in Jira",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/MDFFMRTE5ZGB"
  },
  {
    "id": 25,
    "title": "Get started with Jira",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/SC7Q4QSA66SA"
  },
  {
    "id": 26,
    "title": "How to create a Jira Scrum Project",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/2L3S278Z7LAF"
  },
  {
    "id": 27,
    "title": "Cloud Computing Basics (Cloud 101)",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/KDP8W6X58CUV"
  },
  {
    "id": 28,
    "title": "Cloud Computing Foundations",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/U6HV5VGTKFAE"
  },
  {
    "id": 29,
    "title": "Control Flow in RPA",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/XVT656HQEZCA"
  },
  {
    "id": 30,
    "title": "Data Manipulation in RPA",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/W28VE69FRMDZ"
  },
  {
    "id": 31,
    "title": "Ethics, Technology and Engineering",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/3EW5TBU5MYRV"
  },
  {
    "id": 32,
    "title": "RPA Basics and Introduction to UiPath",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/GQTP35BCS3KF"
  },
  {
    "id": 33,
    "title": "UI Automation and Selectors",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/ELVSHQCB6XWY"
  },
  {
    "id": 34,
    "title": "Operation Research (3): Theory",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/EUGCTSDVURA9"
  },
  {
    "id": 35,
    "title": "Software Architecture",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/9SB3ADF8HQ6Q"
  },
  {
    "id": 36,
    "title": "Software Development Processes and Methodologies",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/KCNGUZ264VXT"
  },
  {
    "id": 37,
    "title": "Database Management Essentials",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/YHGZSGDLJPR5"
  },
  {
    "id": 38,
    "title": "Introduction to R Programming for Data Science",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/N5H8JUFEJ8X9"
  },
  {
    "id": 39,
    "title": "Introduction to the Internet of Things and Embedded Systems",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/Q7PHQ7JEAR2Z"
  },
  {
    "id": 40,
    "title": "Operating Systems and You: Becoming a Power User",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/LBUKXT6SMLQT"
  },
  {
    "id": 41,
    "title": "The Bits and Bytes of Computer Networking",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/8NP4F6CVDE28"
  },
  {
    "id": 42,
    "title": "Design Thinking for Innovation",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/EYZUUTQ9WVV5"
  },
  {
    "id": 43,
    "title": "Introduction to Graph Theory",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/HJCC8UZM49RP"
  },
  {
    "id": 44,
    "title": "Data Structures",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/ZLDXVX9QJ9Y9"
  },
  {
    "id": 45,
    "title": "TCP/IP and Advanced Topics",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/NVKYND7BQMYR"
  },
  {
    "id": 46,
    "title": "Basic Image Classification with TensorFlow",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/88QTSMUW5KPK"
  },
  {
    "id": 47,
    "title": "Building Smart Business Assistants with IBM Watson",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/BUXTXSYHWPLQ"
  },
  {
    "id": 48,
    "title": "Global Environmental Management",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/JMVU3VWKB4ED"
  },
  {
    "id": 49,
    "title": "Introduction to Artificial Intelligence (AI)",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/DK9845M2PVPQ"
  },
  {
    "id": 50,
    "title": "Programming for Everybody (Getting Started with Python)",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/K6J5DFGNS3JW"
  },
  {
    "id": 51,
    "title": "Technical Support Fundamentals",
    "platform": "Coursera",
    "url": "https://www.coursera.org/account/accomplishments/certificate/8JCCDY44U7PX"
  },
  {
    "id": 52,
    "title": "AI Workshop: Advanced Chatbot Development",
    "platform": "LinkedIn",
    "url": "https://www.linkedin.com/learning/certificates/203ae5ba0b800f72e37b3cdb6fb9f3c2de3b3d59757f8e5f063a92d814f0fe28"
  },
  {
    "id": 53,
    "title": "Generative AI: Working with Large Language Models",
    "platform": "LinkedIn",
    "url": "https://www.linkedin.com/learning/certificates/7eb012cbb634969f76c0e586c18c3e0bce20cfc01255b9789b4b5030f0954132"
  }
]

export default function Certifications() {
  const [certs, setCerts] = useState(mockCerts);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState("highlighted");
  const [selectedCert, setSelectedCert] = useState(0);
  const [coins, setCoins] = useState(0);
  const [experience, setExperience] = useState(0);
  const [showPowerUp, setShowPowerUp] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [scanLine, setScanLine] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState({ width: 1000, height: 1000 });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    // Try to fetch real data, fallback to mock data
    fetch("/certifications.v2.json")
      .then((res) => res.json())
      .then((data) => setCerts(data))
      .catch((err) => {
        console.error("Failed to load certifications:", err);
        setCerts(mockCerts);
      });
  }, []);

  const isFeatured = useCallback((title) =>
    FEATURE_KEYWORDS.some((kw) => title.toLowerCase().includes(kw.toLowerCase())), []);

  const categoryMap = useMemo(() => ({
    highlighted: (title) => isFeatured(title),
    "software-cert": (title) =>
      ["jira", "scrum", "testing", "architecture"].some((kw) => title.toLowerCase().includes(kw)),
    "cloud-cert": (title) =>
      ["cloud", "devops", "azure"].some((kw) => title.toLowerCase().includes(kw)),
    "cyber-cert": (title) =>
      ["cyber", "security", "attacks"].some((kw) => title.toLowerCase().includes(kw)),
  }), [isFeatured]);

  // Filter certifications based on active filter and query
  const filteredCerts = useMemo(() => {
    let filtered = certs.filter((cert) =>
      (cert.title + cert.platform).toLowerCase().includes(query.toLowerCase())
    );
    if (activeCategory && categoryMap[activeCategory]) {
      filtered = filtered.filter((c) => categoryMap[activeCategory](c.title));
    }
    return filtered;
  }, [certs, query, activeCategory, categoryMap]);

  // Get display certifications based on showAll and category
  const displayCerts = useMemo(() => {
    if (activeCategory === null) {
      // For "All Achievements", show only 4 initially
      return showAll ? filteredCerts : filteredCerts.slice(0, 4);
    }
    // For specific categories, show all
    return filteredCerts;
  }, [filteredCerts, showAll, activeCategory]);

  const stats = useMemo(() => {
    return {
      "highlighted": certs.filter(c => isFeatured(c.title)).length,
      "software-cert": certs.filter(c => categoryMap["software-cert"](c.title)).length,
      "cloud-cert": certs.filter(c => categoryMap["cloud-cert"](c.title)).length,
      "cyber-cert": certs.filter(c => categoryMap["cyber-cert"](c.title)).length
    };
  }, [certs, isFeatured, categoryMap]);

  // Reset selected cert when filter changes
  useEffect(() => {
    setSelectedCert(0);
    setShowAll(false); // Reset showAll when category changes
  }, [activeCategory, query]);

  // Experience counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setExperience(prev => (prev + 1) % 100);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Power-up effect
  useEffect(() => {
    const powerUpInterval = setInterval(() => {
      setShowPowerUp(true);
      setTimeout(() => setShowPowerUp(false), 2000);
    }, 10000);
    return () => clearInterval(powerUpInterval);
  }, []);

  // Glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 7000);
    return () => clearInterval(glitchInterval);
  }, []);

  // Scan line effect
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(scanInterval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      const totalCerts = displayCerts.length;
      
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          if (totalCerts > 0) {
            setSelectedCert(prev => (prev - 1 + totalCerts) % totalCerts);
          }
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          if (totalCerts > 0) {
            setSelectedCert(prev => (prev + 1) % totalCerts);
          }
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (totalCerts > 0 && displayCerts[selectedCert] && displayCerts[selectedCert].url) {
            window.open(displayCerts[selectedCert].url, "_blank");
            setCoins(prev => prev + 10);
          }
          break;
        case "1":
          setActiveCategory("highlighted");
          break;
        case "2":
          setActiveCategory("software-cert");
          break;
        case "3":
          setActiveCategory("cloud-cert");
          break;
        case "4":
          setActiveCategory("cyber-cert");
          break;
        case "0":
          setActiveCategory(null);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [displayCerts, selectedCert]);

  const collectCoin = useCallback(() => {
    setCoins(prev => prev + 1);
  }, []);

  const handleCertClick = useCallback((index, e) => {
    setSelectedCert(index);
    e.stopPropagation();
  }, []);

  const handleLaunchClick = useCallback((cert, e) => {
    e.stopPropagation();
    if (cert.url) {
      window.open(cert.url, "_blank");
      setCoins(prev => prev + 10);
    }
  }, []);

  const getCategoryButtonClasses = useCallback((categoryKey, isActive) => {
    const baseClasses = "px-3 py-2 rounded border-2 font-mono transition-all duration-200";
    
    if (isActive) {
      switch (categoryKey) {
        case "highlighted":
          return `${baseClasses} border-green-400 bg-green-900 bg-opacity-20 text-green-400 transform scale-105`;
        case "software-cert":
          return `${baseClasses} border-blue-400 bg-blue-900 bg-opacity-20 text-blue-400 transform scale-105`;
        case "cloud-cert":
          return `${baseClasses} border-cyan-400 bg-cyan-900 bg-opacity-20 text-cyan-400 transform scale-105`;
        case "cyber-cert":
          return `${baseClasses} border-red-400 bg-red-900 bg-opacity-20 text-red-400 transform scale-105`;
        case null:
          return `${baseClasses} border-purple-400 bg-purple-900 bg-opacity-20 text-purple-400 transform scale-105`;
        default:
          return `${baseClasses} border-gray-400 bg-gray-900 bg-opacity-20 text-gray-400 transform scale-105`;
      }
    }
    
    return `${baseClasses} border-gray-600 text-gray-300 hover:border-gray-400`;
  }, []);

  // Get title color based on active category
  const getTitleColor = useCallback(() => {
    switch (activeCategory) {
      case "highlighted":
        return "text-green-400";
      case "software-cert":
        return "text-blue-400";
      case "cloud-cert":
        return "text-cyan-400";
      case "cyber-cert":
        return "text-red-400";
      case null:
        return "text-purple-400";
      default:
        return "text-purple-400";
    }
  }, [activeCategory]);

  return (
    <>
      <style>
        {`
          @keyframes moveBackground {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }
          
          .pixel-text {
            text-shadow: 
              2px 2px 0px #000,
              4px 4px 0px rgba(0,0,0,0.5);
            letter-spacing: 2px;
          }
          
          .glitch {
            animation: glitch 0.3s ease-in-out;
          }
          
          @keyframes glitch {
            0% { transform: translateX(0); }
            10% { transform: translateX(-2px); }
            20% { transform: translateX(2px); }
            30% { transform: translateX(-2px); }
            40% { transform: translateX(2px); }
            50% { transform: translateX(-2px); }
            60% { transform: translateX(2px); }
            70% { transform: translateX(-2px); }
            80% { transform: translateX(2px); }
            90% { transform: translateX(-2px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
      <section
        id="certifications"
        className="w-full min-h-screen py-8 px-4 text-white relative overflow-hidden"
        style={{
          fontFamily: "'Courier New', monospace",
          background: "linear-gradient(45deg, #0f0f23 25%, #1a1a2e 25%, #1a1a2e 50%, #0f0f23 50%, #0f0f23 75%, #1a1a2e 75%)",
          backgroundSize: "20px 20px",
          animation: "moveBackground 20s linear infinite",
        }}
      >
        {/* Retro grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={`grid-${i}`} className="border border-cyan-500 border-opacity-30"></div>
            ))}
          </div>
        </div>

        {/* Scan line effect */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `linear-gradient(0deg, transparent ${scanLine - 1}%, rgba(0, 255, 65, 0.1) ${scanLine}%, transparent ${scanLine + 1}%)`
          }}
        />

        {/* Floating coins */}
        <AnimatePresence>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`coin-${i}`}
              initial={{ x: Math.random() * windowDimensions.width, y: -50 }}
              animate={{ y: windowDimensions.height + 50 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: Math.random() * 4 + 3, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute text-xl cursor-pointer z-20 hover:scale-125 transition-transform"
              onClick={collectCoin}
              style={{ left: Math.random() * (windowDimensions.width - 50) }}
            >
              🏆
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Power-up notification */}
        <AnimatePresence>
          {showPowerUp && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-4 right-4 bg-yellow-400 text-black p-2 rounded font-bold z-30"
            >
              🚀 ACHIEVEMENT UNLOCKED! 🚀
            </motion.div>
          )}
        </AnimatePresence>

        {/* HUD */}
        <div className="absolute top-4 left-4 text-green-400 font-mono text-sm z-30">
          <div className="bg-black bg-opacity-80 p-2 rounded border border-green-400">
            <div>XP: {experience}%</div>
            <div>STATUS: CERT VIEWER</div>
            <div>TOTAL: {certs.length} ACHIEVEMENTS</div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl relative z-20 pt-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className={`text-4xl md:text-6xl font-bold mb-4 pixel-text ${glitchEffect ? 'glitch' : ''}`}>
              <span className="text-green-400">🏆</span>{" "}
              <span className="text-purple-400">ACHIEVEMENTS</span>{" "}
              <span className="text-cyan-400">UNLOCKED</span>
            </h2>
            <div className="text-xl text-yellow-400">◤ 50+ CERTIFICATIONS COLLECTED ◥</div>
          </motion.div>

          {/* Stats Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black bg-opacity-40 backdrop-blur border-2 border-purple-400 rounded-xl p-4 mb-8"
          >
            <div className="text-center">
              <div className="text-sm font-semibold text-purple-400 mb-2">📊 ACHIEVEMENT STATS</div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-green-900 bg-opacity-20 border border-green-400 rounded p-2">
                  <div className="text-green-400 font-bold">🤖 AI/ML MASTER</div>
                  <div className="text-white">{stats["highlighted"]} Certs</div>
                </div>
                <div className="bg-blue-900 bg-opacity-20 border border-blue-400 rounded p-2">
                  <div className="text-blue-400 font-bold">💻 DEV EXPERT</div>
                  <div className="text-white">{stats["software-cert"]} Certs</div>
                </div>
                <div className="bg-cyan-900 bg-opacity-20 border border-cyan-400 rounded p-2">
                  <div className="text-cyan-400 font-bold">☁️ CLOUD NINJA</div>
                  <div className="text-white">{stats["cloud-cert"]} Certs</div>
                </div>
                <div className="bg-red-900 bg-opacity-20 border border-red-400 rounded p-2">
                  <div className="text-red-400 font-bold">🔐 CYBER GUARDIAN</div>
                  <div className="text-white">{stats["cyber-cert"]} Certs</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Game Menu Style Filters */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black bg-opacity-60 border-2 border-gray-700 rounded-lg p-4 mb-8"
          >
            <div className="text-sm font-semibold text-purple-400 mb-3">🎮 SELECT ACHIEVEMENT CATEGORY:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-xs">
              {[
                { key: "highlighted", label: "🤖 AI/ML WIZARD", index: 9 },
                { key: "software-cert", label: "💻 CODE MASTER", index: 8 },
                { key: "cloud-cert", label: "☁️ CLOUD SAGE", index: 6 },
                { key: "cyber-cert", label: "🔐 CYBER KNIGHT", index: 2 },
                { key: null, label: "🌟 ALL ACHIEVEMENTS", index: 54 }
              ].map((category) => (
                <motion.button
                  key={category.key || 'all'}
                  onClick={() => {
                    setActiveCategory(category.key);
                    setCoins(prev => prev + 2);
                  }}
                  className={getCategoryButtonClasses(category.key, activeCategory === category.key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category.label}
                  <div className="text-xs opacity-60">[{category.index}]</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Search Console */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-black bg-opacity-80 border-2 border-green-400 rounded-lg p-4">
              <div className="text-green-400 font-mono text-sm mb-2">
                SEARCH_ACHIEVEMENTS.EXE
              </div>
              <input
                type="text"
                placeholder="> Enter search query (AI, Google, DevOps)..."
                className="w-full bg-transparent text-green-400 placeholder-green-400 placeholder-opacity-60 border-none outline-none font-mono"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Certifications Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid gap-6"
          >
            {displayCerts.map((cert, index) => (
              <motion.div
                key={`${cert.id}-${activeCategory}-${index}`}
                className={`
                  border-2 rounded-xl p-5 transition-all duration-300 bg-black bg-opacity-40 backdrop-blur cursor-pointer relative
                  ${selectedCert === index 
                    ? 'border-yellow-400 bg-yellow-900 bg-opacity-20 shadow-lg shadow-yellow-400/20' 
                    : 'border-gray-700 hover:border-purple-400'
                  }
                `}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04, duration: 0.4 }}
                onClick={(e) => handleCertClick(index, e)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {selectedCert === index && (
                  <div className="absolute -top-2 -left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold animate-pulse">
                    SELECTED
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className="text-3xl">
                    {isFeatured(cert.title) ? "🏆" : "🎖️"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-lg sm:text-xl font-bold pixel-text ${getTitleColor()}`}>
                        {cert.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded border font-bold ${
                        isFeatured(cert.title) 
                          ? 'text-orange-400 border-orange-400 bg-orange-900 bg-opacity-20' 
                          : 'text-blue-400 border-blue-400 bg-blue-900 bg-opacity-20'
                      }`}>
                        {isFeatured(cert.title) ? "LEGENDARY" : "EARNED"}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      {platformIcons[cert.platform] && (
                        <img src={platformIcons[cert.platform]} alt={cert.platform} width={20} height={20} />
                      )}
                      <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded border border-gray-600">
                        {cert.platform}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        CATEGORY: <span className="text-cyan-400 uppercase">
                          {activeCategory === "highlighted" ? "AI/ML" : 
                           activeCategory === "software-cert" ? "SOFTWARE DEV" :
                           activeCategory === "cloud-cert" ? "CLOUD" :
                           activeCategory === "cyber-cert" ? "CYBERSECURITY" : "GENERAL"}
                        </span>
                      </div>
                      
                      <div>
                        {cert.url ? (
                          <button
                            onClick={(e) => handleLaunchClick(cert, e)}
                            className="text-sm text-purple-400 hover:text-white transition flex items-center gap-2 bg-purple-900 bg-opacity-20 border border-purple-400 px-3 py-1 rounded hover:bg-purple-900 hover:bg-opacity-40"
                          >
                            <span>🎯 View Certificate</span>
                            <span className="animate-bounce">→</span>
                          </button>
                        ) : (
                          <span className="text-sm text-gray-500 italic">
                            🔒 Private Certificate
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Show More/Less Button - Only for "All Achievements" */}
          {activeCategory === null && !showAll && filteredCerts.length > 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-6"
            >
              <button
                onClick={() => {
                  setShowAll(true);
                  setCoins(prev => prev + 1);
                }}
                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-mono border-2 border-purple-400 transition-all duration-200 hover:scale-105"
              >
                ▼ EXPAND VAULT ({filteredCerts.length - 4} more)
              </button>
            </motion.div>
          )}

          {/* No Results */}
          {displayCerts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mt-8 bg-red-900 bg-opacity-40 border-2 border-red-600 rounded-lg p-6"
            >
              <div className="text-4xl mb-2">❌</div>
              <p className="text-red-400 font-mono">
                SEARCH FAILED: No achievements match your criteria
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your search terms or select a different category
              </p>
            </motion.div>
          )}

          {/* Controls Guide */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 text-gray-400 text-xs border-t border-gray-700 pt-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>↑↓ NAVIGATE • ENTER LAUNCH</div>
              <div>1-4 QUICK CATEGORIES • 54 SHOW ALL</div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}