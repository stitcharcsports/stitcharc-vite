import { useState, useEffect } from "react";
import { ArrowRight, Play, CheckCircle, Shield, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  const rotatingPhrases = [
    "Premium Quality Sportswear",
    "Custom OEM Manufacturing", 
    "Fast Global Shipping",
    "Competitive Pricing",
    "ISO 9001 Certified"
  ];

  const features = [
    { icon: <CheckCircle className="w-5 h-5" />, text: "Custom Designs & Logos" },
    { icon: <Shield className="w-5 h-5" />, text: "Quality Guaranteed" },
    { icon: <Clock className="w-5 h-5" />, text: "Fast Turnaround" },
    { icon: <Truck className="w-5 h-5" />, text: "Worldwide Delivery" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-gray-900 to-blue-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-block mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white text-sm font-medium shadow-lg">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                  Leading Sportswear Manufacturer
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Premium{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Sportswear
                </span>{" "}
                Manufacturing
              </h1>

              {/* Rotating Phrase */}
              <div className="mb-8">
                <div className="text-xl lg:text-2xl text-white font-medium h-12 flex items-center justify-center lg:justify-start">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span>{rotatingPhrases[currentPhrase]}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Transform your sportswear brand with Pakistan's premier manufacturer. 
                We deliver exceptional quality, custom designs, and reliable delivery 
                for brands worldwide.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-white">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      {feature.icon}
                    </div>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                  <span className="flex items-center">
                    Request Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </span>
                </Button>
                
                <Button 
                  variant="outline"
                  className="bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white/50 rounded-lg px-8 py-6 text-lg transition-all hover:scale-105"
                >
                  <Play className="mr-2 w-5 h-5" />
                  View Products
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-white/70 text-sm">Global Brands</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-white mb-1">25+</div>
                  <div className="text-white/70 text-sm">Countries</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-white mb-1">10K+</div>
                  <div className="text-white/70 text-sm">Monthly Production</div>
                </div>
              </div>
            </div>

            {/* Right - Product Card */}
            <div className="relative">
              {/* Main Product Card */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                {/* Product Image */}
                <div className="relative rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-8">
                  <div className="relative mx-auto w-48 h-48">
                    {/* Jersey Design */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-xl transform rotate-12" />
                    <div className="absolute inset-4 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-lg transform -rotate-6" />
                    
                    {/* Jersey Number */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="text-6xl font-bold text-white">07</div>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Custom Team Jerseys</h3>
                  <p className="text-white/70 mb-6">Premium quality with custom designs</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-blue-400 text-xs font-medium mb-1">MOQ</div>
                      <div className="text-white font-bold">100+ Pcs</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-cyan-400 text-xs font-medium mb-1">Lead Time</div>
                      <div className="text-white font-bold">15-25 Days</div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all">
                    Request Sample
                  </Button>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/30 rounded-full blur-md" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-cyan-500/30 rounded-full blur-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;