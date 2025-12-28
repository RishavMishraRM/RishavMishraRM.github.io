import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.a
            href="https://github.com/RishavMishraRM"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ y: -2 }}
          >
            <span className="text-primary">&lt;</span>
            Designed & Built by Rishav Kumar Mishra
            <span className="text-primary"> /&gt;</span>
          </motion.a>

          <div className="flex items-center gap-4">
            <SocialIcon href="https://github.com/RishavMishraRM" icon={<Github size={18} />} />
            <SocialIcon href="https://linkedin.com/in/rishavkumarmishra" icon={<Linkedin size={18} />} />
            <SocialIcon href="mailto:rishav.mishra.rkm@gmail.com" icon={<Mail size={18} />} />
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-primary transition-colors"
    whileHover={{ y: -3 }}
  >
    {icon}
  </motion.a>
);
