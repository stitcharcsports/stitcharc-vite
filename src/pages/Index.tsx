import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import QuoteWizard from "@/components/QuoteWizard";
import TrustSection from "@/components/TrustSection";
import { MessageCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Product Showcase */}
      <ProductShowcase />
      
      {/* Quote Wizard */}
      <QuoteWizard />
      
      {/* Trust Section */}
      <TrustSection />
      
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/923001234567"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
      
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
                <p>📞 +92 300 1234567</p>
                <p>📧 info@stitcharcsports.com</p>
                <p>⏰ 24/7 Support Available</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; {new Date().getFullYear()} StitchArc Sports. All rights reserved. | Made with ❤️ in Pakistan</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
