import { useState, useEffect } from "react";
import { ArrowRight, Play, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  const rotatingPhrases = [
    "OEM Experts",
    "Private Label Ready", 
    "72hr Global Sampling",
    "ISO Certified Excellence",
    "Premium Quality Guaranteed"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-glow/25 rounded-full blur-2xl animate-glow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <Badge className="mb-6 bg-accent/20 text-accent-foreground border-accent/30 hover:bg-accent/30 transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-2" />
              #1 Pakistani Sportswear Exporter
            </Badge>

            {/* Main headline */}
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-primary-foreground mb-6 leading-tight">
              Pakistan's Premier{" "}
              <span className="text-accent animate-glow">Sportswear</span>{" "}
              Exporter
            </h1>

            {/* Dynamic rotating phrase */}
            <div className="h-16 mb-8 flex items-center justify-center lg:justify-start">
              <div className="text-2xl lg:text-3xl font-medium text-primary-foreground/90 transition-all duration-500">
                <Zap className="inline w-8 h-8 mr-3 text-accent" />
                <span key={currentPhrase} className="animate-fade-in">
                  {rotatingPhrases[currentPhrase]}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Transform your sportswear business with our premium OEM manufacturing. 
              From concept to delivery, we power global brands with exceptional quality and lightning-fast turnaround.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/kit-configurator">
                <Button className="btn-hero group">
                  Start Your Kit
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="bg-white/10 text-primary-foreground border-white/20 hover:bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 text-lg transition-all duration-300"
                onClick={() => document.getElementById('quote-wizard')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2 w-5 h-5" />
                Get Instant Quote
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-6 justify-center lg:justify-start text-primary-foreground/70">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">ISO 9001 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span className="text-sm font-medium">500+ Global Clients</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-sm font-medium">25+ Countries</span>
              </div>
            </div>
          </div>

          {/* Right side - Kit configurator preview */}
          <div className="lg:block">
            <div className="card-brand bg-white/10 backdrop-blur-lg border-white/20 p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-display font-bold text-primary-foreground mb-6 text-center">
                Kit Configurator Preview
              </h3>
              
              <div className="space-y-6">
                {/* Color picker */}
                <div>
                  <label className="block text-sm font-medium text-primary-foreground/80 mb-3">
                    Primary Color
                  </label>
                  <div className="flex space-x-3">
                    {['#0033A0', '#D1FF00', '#FF6B35', '#8B5CF6', '#EF4444'].map((color) => (
                      <button
                        key={color}
                        className="w-10 h-10 rounded-xl border-2 border-white/30 hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Fabric selection */}
                <div>
                  <label className="block text-sm font-medium text-primary-foreground/80 mb-3">
                    Fabric Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Polyester', 'Cotton Blend', 'Performance', 'Eco-Friendly'].map((fabric) => (
                      <button
                        key={fabric}
                        className="px-3 py-2 text-xs bg-white/10 text-primary-foreground rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                      >
                        {fabric}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logo upload */}
                <div>
                  <label className="block text-sm font-medium text-primary-foreground/80 mb-3">
                    Upload Logo
                  </label>
                  <div className="border-2 border-dashed border-white/30 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-accent/20 rounded-xl mx-auto mb-2 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-accent" />
                    </div>
                    <p className="text-sm text-primary-foreground/70">Drag & drop or click</p>
                  </div>
                </div>

                <Button className="w-full btn-gradient">
                  Preview Your Kit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;