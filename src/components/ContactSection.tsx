import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="font-mono text-primary text-sm mb-4">05. What's Next?</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Get In Touch
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            I'm always open to discussing new opportunities, innovative projects,
            or just having a conversation about technology and fintech. Whether
            you have a question or just want to say hello, feel free to reach
            out!
          </p>

          <motion.a
            href="mailto:rishav.mishra.rkm@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary font-mono rounded-lg hover:bg-primary/10 transition-all duration-300 hover-glow mb-12"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={18} />
            Say Hello
          </motion.a>

          <div className="flex flex-wrap justify-center gap-6">
            <ContactLink
              href="mailto:rishav.mishra.rkm@gmail.com"
              icon={<Mail size={18} />}
              label="rishav.mishra.rkm@gmail.com"
            />
            <ContactLink
              href="tel:+918507886461"
              icon={<Phone size={18} />}
              label="+91-8507886461"
            />
            <ContactLink
              href="https://linkedin.com/in/rishavkumarmishra"
              icon={<Linkedin size={18} />}
              label="LinkedIn"
            />
            <ContactLink
              href="https://github.com/RishavMishraRM"
              icon={<Github size={18} />}
              label="GitHub"
            />
          </div>

          <div className="flex items-center justify-center gap-2 mt-8 text-muted-foreground text-sm">
            <MapPin size={16} />
            <span>Noida, India</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactLink = ({
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
    target={href.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
    whileHover={{ y: -2 }}
  >
    {icon}
    <span className="font-mono">{label}</span>
  </motion.a>
);
