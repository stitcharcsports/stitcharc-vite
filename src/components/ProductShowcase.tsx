import { Eye, Download, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProductShowcase = () => {
  const products = [
    {
      id: 1,
      name: "Premium Football Kit",
      category: "Football",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&crop=center",
      price: "From $12.50",
      moq: "50 pcs",
      features: ["Moisture-wicking", "Custom design", "Quick delivery"],
      badge: "Trending"
    },
    {
      id: 2,
      name: "Performance Gym Wear",
      category: "Gym Wear", 
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      price: "From $8.75",
      moq: "100 pcs",
      features: ["Breathable fabric", "Flexible fit", "Eco-friendly"],
      badge: "Best Seller"
    },
    {
      id: 3,
      name: "Cricket Team Jersey",
      category: "Cricket",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      price: "From $15.00",
      moq: "30 pcs",
      features: ["UV protection", "Lightweight", "Professional grade"],
      badge: "Premium"
    },
    {
      id: 4,
      name: "Basketball Uniform Set",
      category: "Basketball",
      image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=400&h=300&fit=crop&crop=center",
      price: "From $11.25",
      moq: "40 pcs",
      features: ["Sweat-resistant", "Durable", "Custom branding"],
      badge: "New"
    },
    {
      id: 5,
      name: "Training Tracksuit",
      category: "Training",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop&crop=center",
      price: "From $18.50",
      moq: "25 pcs",
      features: ["All-season", "Comfort fit", "Team colors"],
      badge: "Featured"
    },
    {
      id: 6,
      name: "Running Apparel",
      category: "Running",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop&crop=center",
      price: "From $9.99",
      moq: "60 pcs",
      features: ["Lightweight", "Quick-dry", "Reflective details"],
      badge: "Eco"
    }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Trending": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "Best Seller": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Premium": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "New": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Featured": return "bg-accent/20 text-accent border-accent/30";
      case "Eco": return "bg-green-500/20 text-green-300 border-green-500/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <section className="section-padding bg-gradient-subtle">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Product Showcase
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Premium <span className="text-gradient">Sportswear</span> Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our extensive range of high-quality sportswear designed for performance, 
            comfort, and style. Each product is crafted with precision and attention to detail.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div key={product.id} className="card-brand group overflow-hidden">
              {/* Product image */}
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Badge */}
                <Badge className={`absolute top-4 left-4 ${getBadgeVariant(product.badge)}`}>
                  {product.badge}
                </Badge>

                {/* Quick actions overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <Button size="sm" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    <Download className="w-4 h-4 mr-2" />
                    Tech Pack
                  </Button>
                </div>
              </div>

              {/* Product info */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm text-muted-foreground font-medium truncate">{product.category}</span>
                  <span className="text-xs sm:text-sm text-accent font-semibold truncate">{product.moq} MOQ</span>
                </div>
                
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">{product.name}</h3>
                
                <div className="text-2xl font-bold text-primary mb-4">{product.price}</div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" className="w-full px-4 py-2 text-sm sm:text-base">
                    <Info className="w-4 h-4 mr-2" />
                    MOQ Info
                  </Button>
                  <Button className="w-full btn-gradient px-4 py-2 text-sm sm:text-base">
                    Request Sample
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all products CTA */}
        <div className="text-center">
          <Button className="btn-hero group">
            View All Products
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;