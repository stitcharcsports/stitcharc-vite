import { useState } from 'react';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import QuoteWizard from "@/components/QuoteWizard";
import TrustSection from "@/components/TrustSection";
import AIAssistant from '@/components/AIAssistant';
import NewArrivals from '@/components/NewArrivals';
import Trendingproducts from '@/components/TrendingProducts';
import { MessageCircle } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faBolt, faPalette, faGlobe, faComments, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Index = () => {
  const [showChat, setShowChat] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Product Showcase */}
      <ProductShowcase />

      {/* New Arrivals */}
      <NewArrivals/>

       {/* Trending Products */}
      <Trendingproducts/>
      
      {/* Quote Wizard */}
      <QuoteWizard />
      
      {/* Trust Section */}
      <TrustSection />
      
      {/* AI Assistant Section */}
     <AIAssistant/>
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground section-padding">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="font-bold text-accent-foreground">S</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">StitchArc Sports</h3>
                </div>
              </div>
              <p className="text-primary-foreground/80 mb-4">
                Pakistan's premier sportswear exporter, delivering quality and innovation to global markets.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">📧</a>
                <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">📱</a>
                <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">🌐</a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-accent transition-colors">Football Kits</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Gym Wear</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Cricket Jerseys</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Custom Design</a></li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="font-display font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-accent transition-colors">OEM Manufacturing</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Private Label</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Design Services</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Quality Assurance</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="font-display font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p>📍 Sialkot, Pakistan</p>
                <p>📞 +92 3314077129</p>
                <p>📧 info@stitcharcsports.com</p>
                <p>⏰ 24/7 Support Available</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; {new Date().getFullYear()} StitchArc Sports. All rights reserved. | Made with ❤️ in Sialkot, Pakistan</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
