import { motion, type Variants } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, ArrowDown } from "lucide-react";

export const HeroSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        className="section-container relative z-10 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl">
          <motion.p
            variants={itemVariants}
            className="font-mono text-primary mb-4 text-sm md:text-base"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4"
          >
            <span className="text-foreground">Rishav Kumar</span>
            <br />
            <span className="text-gradient">Mishra.</span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-muted-foreground mb-6"
          >
            I build the future of banking.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground max-w-xl text-base md:text-lg mb-8 leading-relaxed"
          >
            Program Manager & AI/ML Expert with{" "}
            <span className="text-primary">3.5+ years</span> of experience in
            Digital Banking, API Banking, and Fintech Strategy. Currently
            leading{" "}
            <span className="text-primary">Generative AI initiatives</span> at
            HDFC Bank while pursuing{" "}
            <span className="text-primary">MTech in AI & Data Science</span>{" "}
            from IIT Patna.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-muted-foreground mb-8 font-mono text-sm"
          >
            <MapPin size={16} className="text-primary" />
            <span>Noida, India</span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="px-6 py-3 bg-primary text-primary-foreground font-mono text-sm rounded-lg hover:bg-primary/90 transition-all duration-300 hover-glow glow-primary"
            >
              Get In Touch
            </a>
            <div className="flex items-center gap-3">
              <SocialLink href="https://github.com/RishavMishraRM" icon={<Github size={20} />} label="GitHub" />
              <SocialLink href="https://linkedin.com/in/rishavkumarmishra" icon={<Linkedin size={20} />} label="LinkedIn" />
              <SocialLink href="mailto:rishav.mishra.rkm@gmail.com" icon={<Mail size={20} />} label="Email" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="text-muted-foreground" size={24} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="p-3 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
  </motion.a>
);
