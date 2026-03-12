import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    try {
      const response = await fetch("https://formspree.io/f/xyzkqgjb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (response.ok) {
        setSubmitted(true);
        setEmail("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-background/80" />
      
      <div className="container px-4 md:px-6 relative z-10 text-center animate-fade-up">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium mb-8">
          <span className="text-primary-foreground">Patent Pending Design</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6">
          Odors Extinct. <br className="hidden md:block" />
          <span className="text-primary/80">Forever.</span>
        </h1>
        
        <p className="mx-auto max-w-[700px] text-lg md:text-xl text-muted-foreground mb-12">
          The patent-pending garbage can system that eliminates odors permanently. Engineered to eliminate, not mask.
        </p>
        
        <div className="max-w-md mx-auto bg-black/40 border border-white/10 p-8 rounded-2xl backdrop-blur-md mb-12">
          <h3 className="text-2xl font-bold mb-2 text-white">Join the VIP List</h3>
          <p className="text-gray-400 mb-6 text-sm">Drop your email to get 40% off the Super Early Bird tier when we launch on Kickstarter.</p>
          
          {submitted ? (
            <div className="bg-green-500/20 border border-green-500/50 text-green-400 p-4 rounded-lg">
              You're on the list! We'll notify you when we launch.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="bg-black/60 border-white/20 h-12 text-white"
              />
              <Button type="submit" size="lg" className="w-full font-bold h-12">
                Get 40% Off Access <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
