import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    degree: "Master of Technology (MTech.)",
    field: "Artificial Intelligence & Data Science",
    institution: "Indian Institute of Technology, Patna",
    year: "2026 (Pursuing)",
    status: "current",
  },
  {
    degree: "Bachelor of Technology (B.Tech.)",
    field: "Computer Science & Engineering",
    institution: "SRM Institute of Science & Technology, Chennai",
    year: "2022",
    grade: "9 CGPA",
    status: "completed",
  },
];

const awards = [
  "Propelled Loan on Card Business through innovative module implementations",
  "Seamless integration of credit cards into new Mobile Banking and Net Banking",
  "Go-Live of BBPS for HDFC Bank Credit Card in 9 days",
  "Gold Star Award recipient (2x) for exceptional performance",
];

export const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative bg-secondary/30">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="section-container relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <h2 className="flex items-center gap-3 text-xl md:text-2xl font-display font-bold mb-8">
                <GraduationCap className="text-primary" />
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="relative pl-6 border-l-2 border-border hover:border-primary transition-colors"
                  >
                    <div
                      className={`absolute left-0 top-0 w-3 h-3 rounded-full -translate-x-[7px] ${
                        edu.status === "current"
                          ? "bg-primary animate-pulse"
                          : "bg-muted-foreground"
                      }`}
                    />
                    <div className="bg-glass rounded-lg p-4">
                      <h3 className="font-display font-semibold">{edu.degree}</h3>
                      <p className="text-primary text-sm">{edu.field}</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        {edu.institution}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="font-mono text-xs text-muted-foreground">
                          {edu.year}
                        </span>
                        {edu.grade && (
                          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded font-mono text-xs">
                            {edu.grade}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div>
              <h2 className="flex items-center gap-3 text-xl md:text-2xl font-display font-bold mb-8">
                <Award className="text-primary" />
                Awards & Recognition
              </h2>
              <div className="space-y-4">
                {awards.map((award, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    className="flex items-start gap-3 bg-glass rounded-lg p-4 card-hover"
                  >
                    <span className="text-primary mt-1 flex-shrink-0">★</span>
                    <p className="text-sm text-muted-foreground">{award}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
