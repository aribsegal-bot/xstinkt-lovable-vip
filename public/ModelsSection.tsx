import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Home, Building, Factory } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const models = [
  {
    icon: Home,
    name: "Xstinkt Home",
    subtitle: "For kitchens, garages, and laundry rooms",
    description: "Compact, aesthetic, family-friendly. Fits seamlessly into your home while eliminating odors completely. No more taking the trash out early just because it smells.",
    badge: "Coming Soon",
    badgeVariant: "secondary" as const,
  },
  {
    icon: Building,
    name: "Xstinkt Office",
    subtitle: "For corporate spaces, break rooms, and shared floors",
    description: "Professional appearance, zero maintenance headaches. Designed for shared spaces where odor complaints are common and cleaning budgets are tight.",
    badge: "Coming Soon",
    badgeVariant: "secondary" as const,
  },
  {
    icon: Factory,
    name: "Xstinkt Industrial",
    subtitle: "For stadiums, malls, airports, and hospitals",
    description: "High-capacity, commercial-grade durability. Built for high-traffic venues where hygiene compliance matters and maintenance costs add up fast. Currently in partnership discussions with leading waste management infrastructure providers.",
    badge: "Enterprise — Contact Us",
    badgeVariant: "default" as const,
  },
];

export const ModelsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="models" className="py-24 lg:py-32 bg-background relative">
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
              One Innovation. Three Solutions.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed to scale from households to the largest commercial venues.
            </p>
          </motion.div>

          {/* Product cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {models.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-card rounded-2xl border border-border overflow-hidden card-hover flex flex-col"
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-muted to-secondary flex items-center justify-center relative">
                  <model.icon className="w-16 h-16 text-primary/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground font-medium">
                      Product Image Coming Soon
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8 flex flex-col flex-1">
                  <Badge
                    variant={model.badgeVariant}
                    className={`w-fit mb-4 ${
                      model.badgeVariant === "default"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {model.badge}
                  </Badge>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {model.name}
                  </h3>
                  <p className="text-sm font-medium text-primary mb-4">
                    {model.subtitle}
                  </p>
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    {model.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
