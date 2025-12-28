import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Database, 
  Bot, 
  CreditCard, 
  Shield, 
  Code2, 
  GitBranch,
  Layers,
  Brain
} from "lucide-react";

const skillCategories = [
  {
    title: "Domain Expertise",
    icon: <CreditCard className="w-5 h-5" />,
    skills: [
      "Credit Cards & API Banking",
      "Digital Payments (UPI, BBPS, PG)",
      "Core Banking Systems",
      "Fraud Prevention & Risk",
      "Compliance & Governance",
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: <Brain className="w-5 h-5" />,
    skills: [
      "Generative AI & LLMs",
      "Prompt Engineering",
      "Supervised & Unsupervised ML",
      "Ensemble Methods",
      "NLP & Conversational AI",
    ],
  },
  {
    title: "Programming & Tools",
    icon: <Code2 className="w-5 h-5" />,
    skills: [
      "Python (Pandas, NumPy, Flask)",
      "SQL & Database Management",
      "Postman / SOAP UI",
      "HTML, CSS, JavaScript",
      "Java (OOP)",
    ],
  },
  {
    title: "Data & Infrastructure",
    icon: <Database className="w-5 h-5" />,
    skills: [
      "MySQL & Snowflake",
      "ETL Processes",
      "Tableau Dashboards",
      "Vision Plus APIs (VMX)",
      "Data Pipelines",
    ],
  },
  {
    title: "Project Management",
    icon: <Layers className="w-5 h-5" />,
    skills: [
      "Program & Project Management",
      "JIRA & Confluence",
      "Agile/Scrum & Waterfall",
      "Stakeholder Management",
      "Vendor Management",
    ],
  },
  {
    title: "DevOps & Security",
    icon: <GitBranch className="w-5 h-5" />,
    skills: [
      "GitHub & Version Control",
      "PCI/DSS Compliance",
      "Cybersecurity",
      "System Integrations",
      "Solution Architecture",
    ],
  },
];

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32 relative bg-secondary/30">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="section-container relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-display font-bold mb-12">
            <span className="text-primary font-mono text-lg md:text-xl">03.</span>
            Skills & Technologies
            <span className="h-px bg-border flex-1 max-w-xs" />
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-glass rounded-xl p-6 card-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {category.icon}
                  </div>
                  <h3 className="font-display font-semibold">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12"
          >
            <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Certifications
            </h3>
            <div className="flex flex-wrap gap-3">
              {["Data Science and AI", "Deep Learning", "Machine Learning in Depth", "Data Science"].map(
                (cert) => (
                  <span
                    key={cert}
                    className="px-4 py-2 bg-glass rounded-full font-mono text-sm text-foreground border border-border hover:border-primary/50 transition-colors"
                  >
                    {cert}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
