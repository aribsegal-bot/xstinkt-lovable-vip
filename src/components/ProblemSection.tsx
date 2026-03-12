import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AlertCircle } from "lucide-react";

export const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div ref={ref} className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
                Garbage Cans Haven't Changed in Decades
              </h2>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Every home and every commercial facility deals with the same problem: garbage cans smell terrible, they're disgusting to clean, and bacteria builds up constantly. It's a universal frustration that everyone has simply accepted.
                </p>
                <p>
                  For homeowners, it's a daily nuisance that forces you to take out the trash early or deal with unpleasant smells permeating your kitchen. For facility managers at stadiums, malls, airports, and hospitals, it's an operational headache — constant odor complaints, expensive cleaning crews, and hygiene compliance risks that never seem to go away.
                </p>
                <p className="font-medium text-foreground">
                  The entire industry has accepted this as normal. Xstinkt didn't.
                </p>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Abstract geometric illustration */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary rounded-3xl" />
                <div className="absolute inset-8 bg-gradient-to-br from-accent/50 to-muted rounded-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <AlertCircle className="w-16 h-16 text-primary/60 mx-auto mb-4" />
                    <p className="text-lg font-medium text-muted-foreground">
                      Decades of the same problems
                    </p>
                    <div className="mt-6 space-y-2">
                      <div className="h-2 bg-primary/20 rounded-full w-full" />
                      <div className="h-2 bg-primary/15 rounded-full w-4/5" />
                      <div className="h-2 bg-primary/10 rounded-full w-3/5" />
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/40 rounded-full blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
