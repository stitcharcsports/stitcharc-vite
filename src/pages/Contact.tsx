import { useState } from "react";
import { Send, Phone, Mail, MapPin, Clock, MessageCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    inquiry: "",
    budget: "",
    message: "",
    timeline: ""
  });

  const inquiryTypes = [
    { value: "quote", label: "Request Quote" },
    { value: "samples", label: "Order Samples" },
    { value: "oem", label: "OEM Partnership" },
    { value: "private-label", label: "Private Label" },
    { value: "bulk-order", label: "Bulk Order" },
    { value: "other", label: "Other" }
  ];

  const budgetRanges = [
    { value: "5k-25k", label: "$5,000 - $25,000" },
    { value: "25k-100k", label: "$25,000 - $100,000" },
    { value: "100k-500k", label: "$100,000 - $500,000" },
    { value: "500k+", label: "$500,000+" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent Successfully!",
      description: "Our team will respond within 2-4 hours during business hours.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      country: "",
      inquiry: "",
      budget: "",
      message: "",
      timeline: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-6 bg-accent/20 text-accent-foreground border-accent/30">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
              Let's Create Something{" "}
              <span className="text-accent">Amazing</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Ready to transform your sportswear vision into reality? Our expert team 
              is here to guide you through every step of the manufacturing process.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="card-brand p-6 text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-muted-foreground text-sm mb-2">24/7 Support Available</p>
              <p className="text-foreground font-medium">+92 331 4077129</p>
            </div>

            <div className="card-brand p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground text-sm mb-2">Quick Response Guaranteed</p>
              <p className="text-foreground font-medium">info@stitcharcsports.com</p>
            </div>

            <div className="card-brand p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">WhatsApp</h3>
              <p className="text-muted-foreground text-sm mb-2">Instant Communication</p>
              <p className="text-foreground font-medium">+92 331 4077129</p>
            </div>

            <div className="card-brand p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">Schedule Call</h3>
              <p className="text-muted-foreground text-sm mb-2">Book a Consultation</p>
              <Button variant="outline" size="sm" className="mt-1">Book Now</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Form & Info */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card-brand p-8">
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                  Start Your Project
                </h2>
                <p className="text-muted-foreground mb-8">
                  Tell us about your requirements and we'll provide a customized solution 
                  with competitive pricing and fast turnaround times.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="John Smith"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="ABC Sports Ltd."
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        placeholder="United States"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Type of Inquiry *</Label>
                      <Select value={formData.inquiry} onValueChange={(value) => handleInputChange("inquiry", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="timeline">Project Timeline</Label>
                    <Input
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => handleInputChange("timeline", e.target.value)}
                      placeholder="e.g., 6-8 weeks"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Project Details *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please describe your project requirements, quantities, specifications, and any other relevant details..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full btn-gradient">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information & Office */}
            <div className="space-y-6">
              {/* Office Information */}
              <div className="card-brand p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="w-5 h-5 text-accent" />
                  <h3 className="font-display font-semibold text-foreground">Head Office</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <p className="text-foreground font-medium">StitchArc Sports (Pvt) Ltd.</p>
                  <p className="text-muted-foreground">
                    Industrial Estate, Sialkot<br />
                    Punjab, Pakistan 51310
                  </p>
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground font-medium">Business Hours</span>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Monday - Friday: 9:00 AM - 6:00 PM PKT<br />
                      Saturday: 9:00 AM - 2:00 PM PKT<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Response */}
              <div className="card-brand p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Quick Response</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email Response:</span>
                    <span className="text-foreground font-medium">2-4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quote Delivery:</span>
                    <span className="text-foreground font-medium">24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sample Delivery:</span>
                    <span className="text-foreground font-medium">7-10 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Production Lead Time:</span>
                    <span className="text-foreground font-medium">4-6 weeks</span>
                  </div>
                </div>
              </div>

              {/* Global Presence */}
              <div className="card-brand p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Global Presence</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">Middle East: UAE, Saudi Arabia</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-muted-foreground">Europe: UK, Germany, Netherlands</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-muted-foreground">North America: USA, Canada</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-muted-foreground">Asia Pacific: Australia, Japan</span>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="card-brand p-6 bg-gradient-subtle">
                <h3 className="font-display font-semibold text-foreground mb-3">Urgent Inquiries?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For time-sensitive projects or urgent support needs
                </p>
                <div className="space-y-2">
                  <Button className="w-full" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now: +92 300 1234567
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about our manufacturing process and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: "What is your minimum order quantity (MOQ)?",
                a: "Our MOQ varies by product type: 50 pieces for basic items, 100 pieces for custom designs."
              },
              {
                q: "How long does production take?",
                a: "Standard production time is 4-6 weeks after order confirmation and sample approval."
              },
              {
                q: "Do you provide samples?",
                a: "Yes, we provide samples within 7-10 days. Sample cost is refundable with bulk orders."
              },
              {
                q: "What are your payment terms?",
                a: "We accept 30% advance, 70% before shipment via bank transfer, LC, or PayPal."
              },
              {
                q: "Do you handle shipping and logistics?",
                a: "Yes, we provide complete logistics support including FOB, CIF, and door-to-door delivery."
              },
              {
                q: "Can you customize existing designs?",
                a: "Absolutely! We specialize in custom modifications including colors, logos, and sizing."
              }
            ].map((faq, index) => (
              <div key={index} className="card-brand p-6">
                <h4 className="font-display font-semibold text-foreground mb-3">{faq.q}</h4>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;