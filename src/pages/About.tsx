import { useState } from "react";
import { ArrowRight, Award, Globe, Users, Factory, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const About = () => {
  const [activeTab, setActiveTab] = useState("story");

  const stats = [
    { value: "24+", label: "Years Experience" },
    { value: "500+", label: "Global Clients" },
    { value: "25+", label: "Countries Served" },
    { value: "1M+", label: "Garments Produced" }
  ];

  const certifications = [
    { name: "ISO 9001:2015", description: "Quality Management" },
    { name: "WRAP Certified", description: "Worldwide Responsible Accredited Production" },
    { name: "BSCI Audited", description: "Business Social Compliance Initiative" },
    { name: "CE Marking", description: "Conformité Européenne" }
  ];

  const team = [
    { name: "Burhan Mehmood Khan", role: "CEO & Founder", experience: "20+ years in textile exports" },
    { name: "Sarah Khan", role: "Head of Design", experience: "15+ years in sportswear design" },
    { name: "Mehmood Ahmad Khan", role: "Production Manager", experience: "24+ years in manufacturing" },
    { name: "Fatima Sheikh", role: "Quality Assurance Director", experience: "12+ years in QA" }
  ];

  const timeline = [
    { year: "2008", event: "Founded StitchArc Sports in Sialkot", description: "Started with a small team of 10 dedicated professionals" },
    { year: "2012", event: "First International Export", description: "Successfully exported to UAE and Middle East markets" },
    { year: "2015", event: "ISO Certification Achieved", description: "Obtained ISO 9001:2015 quality management certification" },
    { year: "2018", event: "European Market Expansion", description: "Expanded operations to UK, Germany, and other EU countries" },
    { year: "2020", event: "Digital Transformation", description: "Launched online platform and digital design services" },
    { year: "2023", event: "Sustainability Initiative", description: "Introduced eco-friendly materials and sustainable practices" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-accent/20 text-accent-foreground border-accent/30">
              <Globe className="w-4 h-4 mr-2" />
              About StitchArc Sports
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
              Crafting Excellence in{" "}
              <span className="text-accent">Sportswear</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              From the heart of Pakistan's textile capital, Sialkot, we've been pioneering 
              premium sportswear manufacturing for over 15 years, serving global brands 
              with unmatched quality and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-display font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="flex justify-center mb-12">
            <div className="flex space-x-4 bg-muted/50 p-2 rounded-xl">
              {[
                { id: "story", label: "Our Story" },
                { id: "mission", label: "Mission & Vision" },
                { id: "team", label: "Leadership Team" },
                { id: "certifications", label: "Certifications" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Our Story */}
            {activeTab === "story" && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                    From Sialkot to the World
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    The journey of transforming traditional craftsmanship into global excellence
                  </p>
                </div>

                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center">
                          <span className="text-primary-foreground font-bold text-lg">{item.year}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                          {item.event}
                        </h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mission & Vision */}
            {activeTab === "mission" && (
              <div className="space-y-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="card-brand p-8">
                    <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-4">Our Mission</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To deliver world-class sportswear manufacturing solutions that empower 
                      global brands and athletes to achieve their peak performance. We combine 
                      traditional Pakistani craftsmanship with cutting-edge technology and 
                      sustainable practices.
                    </p>
                  </div>

                  <div className="card-brand p-8">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-4">Our Vision</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To be the world's most trusted and innovative sportswear manufacturing 
                      partner, setting new standards for quality, sustainability, and customer 
                      satisfaction while proudly representing Pakistan on the global stage.
                    </p>
                  </div>
                </div>

                <div className="card-brand p-8">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-6">Core Values</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { title: "Quality Excellence", description: "Uncompromising commitment to the highest standards" },
                      { title: "Innovation", description: "Continuous improvement and technological advancement" },
                      { title: "Sustainability", description: "Responsible manufacturing for a better future" },
                      { title: "Customer Focus", description: "Your success is our primary objective" },
                      { title: "Integrity", description: "Honest, transparent, and ethical business practices" },
                      { title: "Cultural Pride", description: "Celebrating Pakistani heritage and craftsmanship" }
                    ].map((value, index) => (
                      <div key={index} className="text-center">
                        <div className="w-3 h-3 bg-accent rounded-full mx-auto mb-3"></div>
                        <h4 className="font-semibold text-foreground mb-2">{value.title}</h4>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Leadership Team */}
            {activeTab === "team" && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                    Leadership Team
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Meet the visionaries driving StitchArc Sports forward
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {team.map((member, index) => (
                    <div key={index} className="card-brand p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                          <Users className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                            {member.name}
                          </h3>
                          <div className="text-accent font-medium mb-3">{member.role}</div>
                          <p className="text-muted-foreground text-sm">{member.experience}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card-brand p-8 text-center">
                  <Factory className="w-16 h-16 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                    Our Manufacturing Excellence
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Our state-of-the-art facility in Sialkot houses over 200 skilled artisans 
                    and modern machinery, capable of producing 50,000+ garments monthly while 
                    maintaining the highest quality standards.
                  </p>
                  <Button className="btn-gradient">
                    Schedule Facility Tour
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Certifications */}
            {activeTab === "certifications" && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                    Certifications & Compliance
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    International standards that guarantee our commitment to quality and responsibility
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {certifications.map((cert, index) => (
                    <div key={index} className="card-brand p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                            {cert.name}
                          </h3>
                          <p className="text-muted-foreground text-sm">{cert.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card-brand p-8">
                  <h3 className="text-xl font-display font-semibold text-foreground mb-6">
                    Compliance & Standards
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Quality Standards</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• ISO 9001:2015 Quality Management System</li>
                        <li>• AQL 2.5 Inspection Standards</li>
                        <li>• Pre-production and inline quality checks</li>
                        <li>• Final inspection before shipment</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Social Compliance</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• WRAP (Worldwide Responsible Accredited Production)</li>
                        <li>• BSCI (Business Social Compliance Initiative)</li>
                        <li>• Fair labor practices and worker rights</li>
                        <li>• Environmental sustainability measures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-6">
            Ready to Partner with Excellence?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of global brands who trust StitchArc Sports for their 
            premium sportswear manufacturing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-hero">
              Start Your Project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="bg-white/10 text-primary-foreground border-white/20 hover:bg-white/20">
              Download Company Profile
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;