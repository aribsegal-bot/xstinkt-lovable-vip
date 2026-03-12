import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Wind, Clock, Building2, Shield, ArrowRight, Lock, Box, Sparkles } from "lucide-react";

const features = [
  {
    icon: Wind,
    title: "Airflow-Based Elimination",
    description: "Our patent-pending airflow design creates an environment where odors and bacteria simply can't thrive. Not a filter. Not a fragrance. Prevention at the source.",
  },
  {
    icon: Clock,
    title: "30-Second Clean",
    description: "The interior is designed so the entire can cleans in under 30 seconds. Simple disassembly, quick rinse, done.",
  },
  {
    icon: Building2,
    title: "Built for Any Scale",
    description: "From your kitchen counter to a 50,000-seat stadium. Xstinkt is designed in three tiers for home, office, and industrial environments.",
  },
  {
    icon: Shield,
    title: "Patent-Pending Design",
    description: "Protected by a US provisional patent. This isn't an accessory — it's a fundamentally new approach to waste containment.",
  },
];

const steps = [
  { icon: Lock, label: "Seal" },
  { icon: Box, label: "Contain" },
  { icon: Sparkles, label: "Clean" },
];

export const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Engineered to Eliminate, Not Mask
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A fundamental rethinking of how garbage cans should work.
            </p>
          </motion.div>

          {/* Feature cards grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* How it works steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card rounded-3xl p-8 lg:p-12 border border-border"
          >
            <h3 className="text-xl font-semibold text-foreground text-center mb-10">
              How It Works
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-20">
              {steps.map((step, index) => (
                <div key={step.label} className="flex items-center gap-6 md:gap-12 lg:gap-20">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-accent flex items-center justify-center mb-4">
                      <step.icon className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden md:block w-8 h-8 text-muted-foreground/40" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
