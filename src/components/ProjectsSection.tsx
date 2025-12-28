import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Bot, CreditCard, Smartphone, Shield, TrendingUp, MessageSquare } from "lucide-react";

const projects = [
  {
    title: "Generative AI Calling Bot",
    description:
      "Engineered a prompt-based conversational AI bot to automate customer interactions for Lending (Loans on Credit Cards) and Credit Collections, facilitating natural language dialogue and process automation.",
    tech: ["GenAI", "LLMs", "Prompt Engineering", "Multi-modal AI"],
    icon: <Bot className="w-6 h-6" />,
    featured: true,
    impact: "Automating millions of customer interactions",
  },
  {
    title: "Loan on Credit Card Platform",
    description:
      "Designed and implemented multiple customer journeys across various banking platforms. Handling over 5M+ hits, 3M+ unique visitors, and ₹400B+ monthly disbursals.",
    tech: ["API Banking", "Vision Plus", "Multi-channel Integration"],
    icon: <CreditCard className="w-6 h-6" />,
    featured: true,
    impact: "₹400B+ monthly disbursals",
  },
  {
    title: "Smart EMI on WhatsApp",
    description:
      "Launched India's first end-to-end financial transaction over chat, increasing customer engagement and satisfaction while setting a benchmark for conversational banking.",
    tech: ["WhatsApp API", "Payment Gateway", "Real-time Processing"],
    icon: <MessageSquare className="w-6 h-6" />,
    featured: true,
    impact: "Industry-first Innovation",
  },
  {
    title: "Net Banking & Mobile Banking Modernization",
    description:
      "Spearheaded integration of legacy credit card services into modern digital platforms, delivering new customer-facing features and enhanced UX across multiple channels.",
    tech: ["React", "API Orchestration", "UX Design"],
    icon: <Smartphone className="w-6 h-6" />,
    featured: false,
    impact: "₹250+ Cr/month revenue",
  },
  {
    title: "Fraud Risk Management (FRM) System",
    description:
      "Conducted comprehensive testing and validation of ML-powered fraud risk management rules to detect suspicious credit card transactions.",
    tech: ["Machine Learning", "SQL", "Risk Analytics"],
    icon: <Shield className="w-6 h-6" />,
    featured: false,
    impact: "Enhanced fraud detection accuracy",
  },
  {
    title: "GTM Analytics Dashboard",
    description:
      "Developed real-time, interactive dashboards using Tableau, providing crucial insights for Go-To-Market business decision-making at HighRadius.",
    tech: ["Tableau", "Snowflake", "ETL", "Salesforce"],
    icon: <TrendingUp className="w-6 h-6" />,
    featured: false,
    impact: "Improved GTM operations",
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-display font-bold mb-12">
            <span className="text-primary font-mono text-lg md:text-xl">04.</span>
            Notable Projects
            <span className="h-px bg-border flex-1 max-w-xs" />
          </h2>

          {/* Featured Projects */}
          <div className="space-y-16 mb-16">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`grid md:grid-cols-12 gap-4 items-center ${
                  index % 2 === 1 ? "md:text-right" : ""
                }`}
              >
                {/* Project Image/Visual */}
                <div
                  className={`md:col-span-7 ${
                    index % 2 === 1 ? "md:col-start-6 md:order-2" : ""
                  }`}
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-primary/20 rounded-lg group-hover:bg-transparent transition-all duration-500" />
                    <div className="bg-glass rounded-lg p-8 md:p-12 aspect-video flex items-center justify-center">
                      <div className="text-center">
                        <motion.div
                          className="inline-flex p-4 rounded-xl bg-primary/10 text-primary mb-4"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {project.icon}
                        </motion.div>
                        <p className="font-mono text-xs text-primary">{project.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div
                  className={`md:col-span-6 md:row-start-1 ${
                    index % 2 === 1
                      ? "md:col-start-1 md:text-right"
                      : "md:col-start-6"
                  }`}
                >
                  <p className="font-mono text-sm text-primary mb-2">Featured Project</p>
                  <h3 className="text-xl md:text-2xl font-display font-bold mb-4">
                    {project.title}
                  </h3>
                  <div className="bg-card p-6 rounded-lg shadow-xl mb-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div
                    className={`flex flex-wrap gap-2 ${
                      index % 2 === 1 ? "md:justify-end" : ""
                    }`}
                  >
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other Projects Grid */}
          <h3 className="text-center font-display font-semibold text-lg mb-8">
            Other Noteworthy Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="bg-glass rounded-lg p-6 card-hover group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    {project.icon}
                  </div>
                </div>
                <h4 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="font-mono text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
