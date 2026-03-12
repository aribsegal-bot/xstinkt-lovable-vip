import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FileCheck, Handshake } from "lucide-react";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 bg-secondary/30 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8">
        <div ref={ref} className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Serious Innovation, Not a Side Project
            </h2>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-3xl p-8 lg:p-12 border border-border"
          >
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-10">
              <p>
                Xstinkt was born from a simple observation: the garbage can is one of the most universally used products in the world, and no one has meaningfully improved it in decades. We filed a provisional patent with the United States Patent and Trademark Office and set out to change that.
              </p>
              <p>
                We're currently in discussions with leading waste management solutions providers serving Fortune 500 venues. Xstinkt is designed to scale from a single household to the largest commercial facilities in the country.
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex items-center gap-3 px-5 py-3 bg-primary/5 rounded-full border border-primary/20"
              >
                <FileCheck className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">Patent Pending</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex items-center gap-3 px-5 py-3 bg-primary/5 rounded-full border border-primary/20"
              >
                <Handshake className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">In Partnership Discussions</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
