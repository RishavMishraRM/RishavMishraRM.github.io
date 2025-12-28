import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    "Digital Banking & API Banking",
    "Generative AI & LLMs",
    "Credit Card Platforms",
    "Fraud Prevention ML",
    "Payment Ecosystems",
    "Program Management",
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-display font-bold mb-12">
            <span className="text-primary font-mono text-lg md:text-xl">01.</span>
            About Me
            <span className="h-px bg-border flex-1 max-w-xs" />
          </h2>

          <div className="grid md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-3 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                I'm a technology professional passionate about the intersection of{" "}
                <span className="text-foreground">finance and innovation</span>. With over 3.5 years at{" "}
                <span className="text-primary">HDFC Bank</span>, I've led transformative projects
                in digital banking, from building credit card platforms handling{" "}
                <span className="text-primary">₹400B+ monthly disbursals</span> to launching
                India's first WhatsApp-based financial transaction.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently, I'm spearheading the development of{" "}
                <span className="text-foreground">Generative AI-powered conversational agents</span>{" "}
                for lending and collections, while pursuing my{" "}
                <span className="text-primary">MTech in AI & Data Science</span> at IIT Patna.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My expertise spans end-to-end{" "}
                <span className="text-foreground">program management</span>,{" "}
                <span className="text-foreground">API integrations</span>, and building
                ML-powered fraud prevention systems that protect millions of transactions daily.
              </p>

              <div className="pt-6">
                <p className="font-mono text-sm text-primary mb-4">
                  Areas of expertise:
                </p>
                <div className="flex flex-wrap gap-2">
                  {highlights.map((item, index) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-mono"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-500" />
                <div className="relative bg-glass rounded-lg p-1 transform group-hover:-translate-y-1 transition-transform duration-500">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="text-6xl font-display font-bold text-gradient mb-2">RKM</div>
                      <p className="font-mono text-sm text-muted-foreground">System Analyst</p>
                      <p className="font-mono text-xs text-primary">HDFC Bank</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <StatCard value="3.5+" label="Years Exp." />
                <StatCard value="₹400B+" label="Monthly Volume" />
                <StatCard value="5M+" label="User Hits" />
                <StatCard value="4" label="Gold Awards" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-glass rounded-lg p-4 text-center card-hover">
    <div className="text-xl md:text-2xl font-display font-bold text-primary">{value}</div>
    <div className="text-xs font-mono text-muted-foreground">{label}</div>
  </div>
);
