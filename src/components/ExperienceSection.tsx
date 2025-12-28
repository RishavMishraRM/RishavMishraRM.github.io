import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const experiences = [
  {
    company: "HDFC Bank",
    role: "System Analyst",
    period: "July 2022 – Present",
    location: "Noida, India",
    highlights: [
      "Leading the development of a Generative AI-powered Conversational Agent for Lending and Credit Collections, facilitating natural language dialogue and process automation.",
      "Managing Core Credit Card Platform & API Banking initiatives, driving end-to-end digital journey creation with ₹400B+ monthly disbursals.",
      "Spearheaded Net Banking & Mobile Banking Modernization, integrating legacy credit card services into modern digital platforms.",
      "Led Fraud Prevention ML project, conducting POCs on diverse datasets and enhancing the Proactive Risk Manager (PRM) system.",
      "Launched Smart EMI on WhatsApp — India's first end-to-end financial transaction over chat, setting a benchmark for conversational banking.",
      "Delivered enhancement projects driving ₹120+ Cr/month in incremental revenue and ₹250+ Cr/month from new platform expansions.",
    ],
  },
  {
    company: "HighRadius",
    role: "Data Analyst Trainee",
    period: "August 2021 – July 2022",
    location: "Remote",
    highlights: [
      "Developed real-time, interactive dashboards using Tableau for Go-To-Market business decision-making.",
      "Streamlined data pipelines by fetching data from Salesforce via ETL, transforming with SQL, and building analytical tables in Snowflake.",
      "Conducted POCs for machine learning models focused on predicting project costs and estimations.",
      "Independently led data analysis projects from development through implementation with global teams.",
    ],
  },
  {
    company: "Wipro",
    role: "Turbo Trainee",
    period: "March 2022 – July 2022",
    location: "Remote",
    highlights: [
      "Developed a web-based ATM simulator for B2B transaction payments using HTML, CSS, JavaScript, and SQL.",
      "Designed and implemented a Java-based movie ticket booking system showcasing object-oriented programming skills.",
    ],
  },
];

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-display font-bold mb-12">
            <span className="text-primary font-mono text-lg md:text-xl">02.</span>
            Experience
            <span className="h-px bg-border flex-1 max-w-xs" />
          </h2>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            {/* Tab Navigation */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-border">
              {experiences.map((exp, index) => (
                <button
                  key={exp.company}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-3 text-left font-mono text-sm whitespace-nowrap transition-all duration-300 relative ${
                    activeTab === index
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {exp.company}
                  {activeTab === index && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 md:bottom-auto md:left-0 left-0 right-0 md:right-auto h-0.5 md:h-full md:w-0.5 bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 min-h-[400px]">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-display font-semibold mb-1">
                  {experiences[activeTab].role}{" "}
                  <span className="text-primary">@ {experiences[activeTab].company}</span>
                </h3>
                <p className="font-mono text-sm text-muted-foreground mb-6">
                  {experiences[activeTab].period} • {experiences[activeTab].location}
                </p>
                <ul className="space-y-4">
                  {experiences[activeTab].highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-3 text-muted-foreground"
                    >
                      <span className="text-primary mt-1.5 flex-shrink-0">▹</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
