import { Shield, Users, Globe, Award, Clock, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TrustSection = () => {
  const certifications = [
    { name: "ISO 9001", description: "Quality Management", icon: Shield },
    { name: "WRAP", description: "Responsible Production", icon: Users },
    { name: "CE", description: "European Conformity", icon: Award },
    { name: "BSCI", description: "Social Compliance", icon: Leaf },
  ];

  const countries = [
    { name: "UAE", flag: "🇦🇪", clients: "150+" },
    { name: "UK", flag: "🇬🇧", clients: "120+" },
    { name: "USA", flag: "🇺🇸", clients: "200+" },
    { name: "Germany", flag: "🇩🇪", clients: "80+" },
    { name: "Australia", flag: "🇦🇺", clients: "60+" },
    { name: "Canada", flag: "🇨🇦", clients: "45+" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Marcus Johnson",
      company: "SportsTech UK",
      country: "United Kingdom",
      text: "StitchArc's quality and delivery speed are exceptional. They've been our go-to partner for 3 years.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah Al-Rashid",
      company: "Dubai Sports Co.",
      country: "UAE", 
      text: "The custom designs and fast sampling have helped us launch 5 successful product lines.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Hans Mueller",
      company: "Athletic Pro Germany",
      country: "Germany",
      text: "Outstanding manufacturing quality. Their attention to detail matches European standards perfectly.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
    }
  ];

  const stats = [
    { icon: Users, label: "Global Clients", value: "500+" },
    { icon: Globe, label: "Countries Served", value: "25+" },
    { icon: Clock, label: "Years Experience", value: "15+" },
    { icon: Award, label: "Quality Rating", value: "99.8%" },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            Trusted Worldwide
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Trusted by <span className="text-gradient">Global Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join hundreds of successful brands worldwide who trust StitchArc for their sportswear manufacturing needs.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-3xl font-display font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-display font-bold text-center text-foreground mb-8">
            Certified Excellence
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="card-brand p-6 text-center group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <cert.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-display font-semibold text-foreground mb-2">{cert.name}</h4>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Countries we export to */}
        <div className="mb-16">
          <h3 className="text-2xl font-display font-bold text-center text-foreground mb-8">
            Global Reach
          </h3>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-6">
            {countries.map((country, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {country.flag}
                </div>
                <h4 className="font-semibold text-foreground mb-1">{country.name}</h4>
                <p className="text-sm text-accent font-medium">{country.clients}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials carousel */}
        <div>
          <h3 className="text-2xl font-display font-bold text-center text-foreground mb-8">
            What Our Clients Say
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card-brand p-6">
                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-accent text-lg">★</span>
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                {/* Author */}
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    <p className="text-xs text-accent">{testimonial.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp support */}
        <div className="mt-16 text-center">
          <div className="card-brand p-8 max-w-md mx-auto bg-gradient-primary text-primary-foreground">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-xl font-display font-bold mb-2">24/7 WhatsApp Support</h3>
            <p className="mb-4 opacity-90">Get instant answers to your queries</p>
            <a 
              href="https://wa.me/923314077129" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl text-primary-foreground font-semibold transition-colors"
            >
              Start Chat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;