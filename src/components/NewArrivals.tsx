// import { Eye, Download, Info, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// const NewArrivals = () => {
//   const products = [
//     {
//       id: 1,
//       name: "Premium Football Kit",
//       category: "Football",
//       image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&crop=center",
//       price: "From $12.50",
//       moq: "50 pcs",
//       features: ["Moisture-wicking", "Custom design", "Quick delivery"],
//       badge: "Trending"
//     },
//     {
//       id: 2,
//       name: "Performance Gym Wear",
//       category: "Gym Wear", 
//       image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
//       price: "From $8.75",
//       moq: "100 pcs",
//       features: ["Breathable fabric", "Flexible fit", "Eco-friendly"],
//       badge: "Best Seller"
//     },
//     {
//       id: 3,
//       name: "Cricket Team Jersey",
//       category: "Cricket",
//       image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
//       price: "From $15.00",
//       moq: "30 pcs",
//       features: ["UV protection", "Lightweight", "Professional grade"],
//       badge: "Premium"
//     },
//     {
//       id: 4,
//       name: "Basketball Uniform Set",
//       category: "Basketball",
//       image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=400&h=300&fit=crop&crop=center",
//       price: "From $11.25",
//       moq: "40 pcs",
//       features: ["Sweat-resistant", "Durable", "Custom branding"],
//       badge: "New"
//     },
//     {
//       id: 5,
//       name: "Training Tracksuit",
//       category: "Training",
//       image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop&crop=center",
//       price: "From $18.50",
//       moq: "25 pcs",
//       features: ["All-season", "Comfort fit", "Team colors"],
//       badge: "Featured"
//     },
//     {
//       id: 6,
//       name: "Running Apparel",
//       category: "Running",
//       image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop&crop=center",
//       price: "From $9.99",
//       moq: "60 pcs",
//       features: ["Lightweight", "Quick-dry", "Reflective details"],
//       badge: "Eco"
//     }
//   ];

//   const getBadgeVariant = (badge: string) => {
//     switch (badge) {
//       case "Trending": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
//       case "Best Seller": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
//       case "Premium": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
//       case "New": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
//       case "Featured": return "bg-accent/20 text-accent border-accent/30";
//       case "Eco": return "bg-green-500/20 text-green-300 border-green-500/30";
//       default: return "bg-muted/20 text-muted-foreground border-muted/30";
//     }
//   };

//   return (
//     <section className="section-padding bg-gradient-subtle">
//       <div className="container mx-auto">
//         {/* Section header */}
//         <div className="text-center mb-16">
//           <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
//             Product Showcase
//           </Badge>
//           <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
//             New <span className="text-gradient">Arrivals</span> 
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//            Discover our new Arrival Products 
//           </p>
//         </div>

//         {/* Product grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//           {products.map((product) => (
//             <div key={product.id} className="card-brand group overflow-hidden">
//               {/* Product image */}
//               <div className="relative overflow-hidden">
//                 <img 
//                   src={product.image} 
//                   alt={product.name}
//                   className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
                
//                 {/* Badge */}
//                 <Badge className={`absolute top-4 left-4 ${getBadgeVariant(product.badge)}`}>
//                   {product.badge}
//                 </Badge>

//                 {/* Quick actions overlay */}
//                 <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
//                   <Button size="sm" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
//                     <Eye className="w-4 h-4 mr-2" />
//                     Preview
//                   </Button>
//                   <Button size="sm" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
//                     <Download className="w-4 h-4 mr-2" />
//                     Tech Pack
//                   </Button>
//                 </div>
//               </div>

//               {/* Product info */}
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm text-muted-foreground font-medium">{product.category}</span>
//                   <span className="text-sm text-accent font-semibold">{product.moq} MOQ</span>
//                 </div>
                
//                 <h3 className="text-xl font-display font-semibold text-foreground mb-2">{product.name}</h3>
                
//                 <div className="text-2xl font-bold text-primary mb-4">{product.price}</div>

//                 {/* Features */}
//                 <div className="space-y-2 mb-6">
//                   {product.features.map((feature, index) => (
//                     <div key={index} className="flex items-center text-sm text-muted-foreground">
//                       <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
//                       {feature}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Action buttons */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <Button variant="outline" size="sm" className="w-full">
//                     <Info className="w-4 h-4 mr-2" />
//                     MOQ Info
//                   </Button>
//                   <Button className="w-full btn-gradient text-sm">
//                     Request Sample
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* View all products CTA */}
//         <div className="text-center">
//           <Button className="btn-hero group">
//             View All Products
//             <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewArrivals;

import { useState, useEffect } from "react";
import { 
  Eye, Download, Info, ArrowRight, ChevronLeft, Heart, Share2, 
  Star, MessageSquare, X, Check, Package, Box, Truck, CreditCard,
  Percent, Calendar, Tag, Globe, Factory, ClipboardList, User, Mail, Phone, Home, Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Price formatting helper function
const formatPrice = (price: string | number): string => {
  if (typeof price === 'string') {
    // Remove existing dollar signs and format properly
    const numericPrice = price.replace(/[^\d.-]/g, '');
    const priceNum = parseFloat(numericPrice);
    if (isNaN(priceNum)) return price;
    
    // Format with thousand separators
    return priceNum.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  
  // If price is number
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// Calculate discount percentage
const calculateDiscount = (original: string | number, current: string | number): number => {
  const originalNum = typeof original === 'string' ? parseFloat(original.replace(/[^\d.-]/g, '')) : original;
  const currentNum = typeof current === 'string' ? parseFloat(current.replace(/[^\d.-]/g, '')) : current;
  
  if (isNaN(originalNum) || isNaN(currentNum) || originalNum <= currentNum) return 0;
  
  return Math.round(((originalNum - currentNum) / originalNum) * 100);
};

// Placeholder image as SVG data URI
const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2NjYyIgc3Ryb2tlLXdpZHRoPSIxIj48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHg9IjIiIHk9IjIiIHJ4PSIyIi8+PGxpbmUgeDE9IjgiIHkxPSI4IiB4Mj0iMTYiIHkyPSIxNiIvPjxsaW5lIHgxPSIxNiIgeTE9IjgiIHgyPSI4IiB5Mj0iMTYiLz48L3N2Zz4=';

// Improved image URL handling
const getImageUrl = (imagePath: string | string[] | undefined | null): string => {
  if (!imagePath) return placeholderImage;
  const path = Array.isArray(imagePath) ? imagePath[0] : imagePath;
  if (!path) return placeholderImage;
  
  if (typeof path === 'string' && (path.startsWith('http') || path.startsWith('data:'))) {
    return path;
  }
  
  if (typeof path === 'string' && path.startsWith('data:image')) {
    return path;
  }
  
  if (typeof path === 'string') {
    try {
      const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(path);
      return publicUrl;
    } catch (err) {
      console.error('Error getting image URL:', err);
      return placeholderImage;
    }
  }
  
  return placeholderImage;
};

type Product = {
  id: number;
  name: string;
  category: string;
  image: string | string[];
  price: string;
  originalPrice?: string;
  moq: string;
  features: string[];
  badge: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
  rating?: number;
  created_at: string;
  reviews?: {
    id: number;
    name: string;
    rating: number;
    date: string;
    comment: string;
    verified: boolean;
  }[];
  moqDetails?: {
    tiers: {
      quantity: string;
      price: string;
      discount?: string;
    }[];
    notes?: string[];
    shippingOptions?: string[];
    paymentTerms?: string[];
    productionTime?: string;
  };
};

type Review = {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
};

const ProductImage = ({ src, alt, className }: { src: string | string[]; alt: string; className?: string }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    let isMounted = true;
    
    const loadImage = async () => {
      try {
        const url = getImageUrl(src);
        if (isMounted) {
          setImageUrl(url);
          
          if (url.startsWith('data:')) {
            setImageLoading(false);
            setImageError(false);
            return;
          }

          const img = new Image();
          img.src = url;
          img.onload = () => {
            if (isMounted) {
              setImageLoading(false);
              setImageError(false);
            }
          };
          img.onerror = () => {
            if (isMounted) {
              setImageError(true);
              setImageLoading(false);
              console.error('Failed to load image:', url);
            }
          };
        }
      } catch (err) {
        if (isMounted) {
          setImageError(true);
          setImageLoading(false);
          console.error('Error processing image URL:', err);
        }
      }
    };
    
    loadImage();
    
    return () => {
      isMounted = false;
    };
  }, [src]);

  if (imageUrl.startsWith('data:')) {
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`}>
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
          <div className="animate-pulse flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
      )}

      {imageError ? (
        <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
          <ImageIcon className="w-8 h-8 text-muted-foreground" />
          <span className="sr-only">Image failed to load</span>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
          decoding="async"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
};

const ProductPreview = ({ 
  product, 
  onClose, 
  relatedProducts,
  setPreviewProduct
}: { 
  product: Product; 
  onClose: () => void; 
  relatedProducts: Product[];
  setPreviewProduct: (product: Product) => void;
}) => {
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(product.reviews || []);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}, ${selectedColor}) x${quantity} has been added to your cart`,
    });
  };

  const handleAddToWishlist = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      description: isFavorite 
        ? `${product.name} has been removed from your wishlist` 
        : `${product.name} has been added to your wishlist`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name} on our store!`,
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied",
          description: "Product link has been copied to your clipboard",
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Product link has been copied to your clipboard",
      });
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment || newReview.rating === 0) {
      toast({
        title: "Error",
        description: "Please fill all fields and select a rating",
        variant: "destructive",
      });
      return;
    }

    const review: Review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      verified: false,
    };

    setReviews([...reviews, review]);
    setNewReview({ name: "", rating: 0, comment: "" });
    
    toast({
      title: "Review submitted",
      description: "Thank you for your review! It will be visible after verification.",
    });
  };

  // Handle modal background click
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackgroundClick}
    >
      <div className="bg-background rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-muted-foreground">{product.category}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-muted rounded-lg overflow-hidden">
              <ProductImage 
                src={product.image} 
                alt={product.name}
                className="aspect-square"
              />
              <div className="p-4 flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleAddToWishlist}
                    className={isFavorite ? "text-red-500 border-red-500/30" : ""}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500" : ""}`} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                <Badge variant="secondary" className={getBadgeVariant(product.badge)}>
                  {product.badge}
                </Badge>
              </div>
            </div>

            <div>
              {/* UPDATED PRICE SECTION - More Professional */}
              <div className="mb-6 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border">
                {/* Price with discount if available */}
                {product.originalPrice && (
                  <div className="flex items-center mb-2">
                    <span className="text-gray-500 line-through text-sm mr-3">
                      ${formatPrice(product.originalPrice)}
                    </span>
                    <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">
                      Save {calculateDiscount(product.originalPrice, product.price)}%
                    </Badge>
                  </div>
                )}
                
                {/* Main Price */}
                <div className="flex items-baseline">
                  <span className="text-gray-600 dark:text-gray-400 text-lg mr-1 font-medium">USD</span>
                  <span className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                    ${formatPrice(product.price)}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">per unit</span>
                </div>
                
                {/* MOQ and Rating */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-medium">
                      <Package className="w-3 h-3 mr-1" />
                      MOQ: {product.moq}
                    </Badge>
                    <span className="text-xs text-gray-500 ml-2 hidden sm:inline">
                      • Bulk discounts available
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`w-4 h-4 ${star <= (product.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ({reviews.length} reviews)
                    </span>
                  </div>
                </div>
                
                {/* Free shipping notice */}
                <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center">
                  <Check className="w-3 h-3 mr-1" />
                  Free shipping on orders above $500
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description || "No description available."}
                </p>
                
                {product.features && product.features.length > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 mr-2 flex-shrink-0"></div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <Label className="font-medium mb-2 block">Color Selection</Label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <Button 
                          key={color}
                          variant={selectedColor === color ? "default" : "outline"}
                          size="sm" 
                          className="flex items-center px-3"
                          onClick={() => setSelectedColor(color)}
                        >
                          <span 
                            className="w-3 h-3 rounded-full mr-2 border border-gray-300" 
                            style={{ backgroundColor: color.toLowerCase() }}
                          />
                          {color}
                          {selectedColor === color && (
                            <Check className="w-3 h-3 ml-1" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <Label className="font-medium mb-2 block">Size Options</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {product.sizes.map((size) => (
                        <Button 
                          key={size} 
                          variant={selectedSize === size ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedSize(size)}
                          className="text-sm"
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label className="font-medium mb-2 block">Quantity</Label>
                  <div className="flex items-center max-w-xs">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-r-none border-r-0"
                    >
                      -
                    </Button>
                    <div className="flex-1 border-y py-2 text-center">
                      <span className="font-medium text-lg">{quantity}</span>
                      <div className="text-xs text-gray-500 mt-1">units</div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-l-none border-l-0"
                    >
                      +
                    </Button>
                    <div className="ml-4 text-sm">
                      <div className="font-medium">Total: ${(parseFloat(product.price.replace(/[^\d.-]/g, '')) * quantity).toFixed(2)}</div>
                      {quantity >= parseInt(product.moq) ? (
                        <div className="text-emerald-600 text-xs">MOQ requirement met ✓</div>
                      ) : (
                        <div className="text-amber-600 text-xs">Add {parseInt(product.moq) - quantity} more for MOQ</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => {}}
                >
                  <Info className="w-4 h-4 mr-2" />
                  MOQ Info
                </Button>
                <Button 
                  className="w-full btn-gradient text-sm hover:opacity-90 transition-opacity"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Customer Reviews</h3>
            
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <div className="flex items-center mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                            />
                          ))}
                          {review.verified && (
                            <Badge variant="outline" className="ml-2 bg-blue-500/10 text-blue-500 border-blue-500/20 text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border rounded-lg bg-gray-50 dark:bg-gray-900/50">
                <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
              </div>
            )}

            <div className="mt-8 border-t pt-8">
              <h4 className="font-medium mb-4">Write a Review</h4>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="review-name">Your Name</Label>
                  <Input
                    id="review-name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>Rating</Label>
                  <div className="flex space-x-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setNewReview({...newReview, rating: star})}
                        className="hover:bg-yellow-50 hover:text-yellow-500"
                      >
                        <Star 
                          className={`w-5 h-5 ${star <= newReview.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                        />
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="review-comment">Your Review</Label>
                  <Textarea
                    id="review-comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    required
                    rows={4}
                  />
                </div>
                <Button type="submit">Submit Review</Button>
              </form>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6">Related Products</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div 
                    key={relatedProduct.id} 
                    className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer hover:border-primary/50"
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        setPreviewProduct(relatedProduct);
                      }, 300);
                    }}
                  >
                    <ProductImage 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="w-full h-48"
                    />
                    <div className="p-4">
                      <h4 className="font-medium">{relatedProduct.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{relatedProduct.category}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-lg">${formatPrice(relatedProduct.price)}</div>
                          <div className="text-xs text-gray-500">MOQ: {relatedProduct.moq}</div>
                        </div>
                        <Badge variant="secondary" className={getBadgeVariant(relatedProduct.badge)}>
                          {relatedProduct.badge}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MOQInfoModal = ({ product, onClose }: { product: Product, onClose: () => void }) => {
  const defaultMoqDetails = {
    tiers: [
      { quantity: "50-99 pcs", price: "$12.50", discount: "0%" },
      { quantity: "100-249 pcs", price: "$11.25", discount: "10%" },
      { quantity: "250-499 pcs", price: "$10.00", discount: "20%" },
      { quantity: "500+ pcs", price: "$8.75", discount: "30%" },
    ],
    notes: [
      "Prices are FOB (Free On Board) from our factory",
      "Custom designs and branding available at no additional cost",
      "Sample lead time: 5-7 business days"
    ],
    shippingOptions: [
      "Express Shipping (3-5 days) - $25",
      "Standard Shipping (7-10 days) - $15",
      "Sea Freight (20-30 days) - $8"
    ],
    paymentTerms: [
      "30% deposit, 70% before shipment",
      "50% deposit, 50% before shipment",
      "100% upfront for orders under $1,000",
      "Letter of Credit (L/C) available"
    ],
    productionTime: "15-20 business days after approval"
  };

  const moqDetails = product.moqDetails || defaultMoqDetails;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <Package className="w-5 h-5 mr-2 text-primary" />
                MOQ Information for {product.name}
              </h2>
              <p className="text-muted-foreground">{product.category}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="mb-8 bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Tag className="w-5 h-5 mr-2 text-primary" />
              Quantity Pricing
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary/10">
                  <tr>
                    <th className="p-3 text-left font-medium">Quantity Range</th>
                    <th className="p-3 text-left font-medium">Unit Price</th>
                    <th className="p-3 text-left font-medium">Discount</th>
                  </tr>
                </thead>
                <tbody>
                  {moqDetails.tiers.map((tier, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-primary/5'}>
                      <td className="p-3 font-medium">{tier.quantity}</td>
                      <td className="p-3">{tier.price}</td>
                      <td className="p-3 text-emerald-500 font-medium">
                        {tier.discount ? (
                          <span className="inline-flex items-center">
                            <Percent className="w-4 h-4 mr-1" />
                            {tier.discount}
                          </span>
                        ) : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Production Time
              </h3>
              <div className="flex items-center text-lg">
                <span className="font-bold text-blue-500">{moqDetails.productionTime}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">After final approval and deposit</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-purple-500" />
                Minimum Order
              </h3>
              <div className="flex items-center text-lg">
                <span className="font-bold text-purple-500">{product.moq}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Customizable options available</p>
            </div>
          </div>

          <div className="mb-8 bg-gradient-to-br from-amber-500/5 to-amber-500/10 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Truck className="w-5 h-5 mr-2 text-amber-500" />
              Shipping Options
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {moqDetails.shippingOptions?.map((option, index) => (
                <div key={index} className="border p-4 rounded-lg hover:border-amber-500/50 transition-colors bg-background">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                    <span className="font-medium">{option.split(' - ')[0]}</span>
                  </div>
                  <span className="text-sm text-amber-500 font-medium">{option.split(' - ')[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-emerald-500" />
              Payment Terms
            </h3>
            <ul className="space-y-3">
              {moqDetails.paymentTerms?.map((term, index) => (
                <li key={index} className="flex items-start bg-background p-3 rounded-lg">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <ClipboardList className="w-5 h-5 mr-2 text-secondary" />
              Additional Information
            </h3>
            <ul className="space-y-3">
              {moqDetails.notes?.map((note, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2 mt-2"></div>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex justify-end">
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SampleRequestForm = ({ product, onClose }: { product: Product, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    address: "",
    quantity: "1",
    color: product.colors?.[0] || "",
    size: product.sizes?.[0] || "",
    message: "",
    shippingMethod: "express",
    paymentMethod: "bank-transfer"
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sample request submitted:", formData);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-background rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-4">
            <Check className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your sample request. Our team will contact you within 24 hours to confirm your order and discuss next steps.
          </p>
          <div className="flex justify-center">
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <Box className="w-5 h-5 mr-2 text-primary" />
                Request Sample - {product.name}
              </h2>
              <p className="text-muted-foreground">{product.category}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 h-1 bg-muted w-full -z-10"></div>
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                    {step}
                  </div>
                  <span className={`text-xs mt-2 ${currentStep >= step ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    {step === 1 ? 'Contact Info' : step === 2 ? 'Sample Details' : 'Payment'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-500" />
                    Contact Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="review-name">Full Name *</Label>
                      <Input
                        id="review-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Shipping Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                  >
                    Next: Sample Details
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-purple-500" />
                    Sample Details
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Select
                        onValueChange={(value) => setFormData({...formData, quantity: value})}
                        value={formData.quantity}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select quantity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 piece</SelectItem>
                          <SelectItem value="2">2 pieces</SelectItem>
                          <SelectItem value="3">3 pieces</SelectItem>
                          <SelectItem value="5">5 pieces</SelectItem>
                          <SelectItem value="10">10 pieces</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="color">Color</Label>
                      <Select
                        onValueChange={(value) => setFormData({...formData, color: value})}
                        value={formData.color}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.colors?.map((color) => (
                            <SelectItem key={color} value={color}>
                              <span className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color.toLowerCase() }}></span>
                                {color}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="size">Size</Label>
                      <Select
                        onValueChange={(value) => setFormData({...formData, size: value})}
                        value={formData.size}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.sizes?.map((size) => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-500/5 to-amber-500/10 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-amber-500" />
                    Shipping Method
                  </h3>
                  <RadioGroup 
                    onValueChange={(value) => setFormData({...formData, shippingMethod: value})}
                    value={formData.shippingMethod}
                    className="grid md:grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="express" id="express" className="peer sr-only" />
                      <Label
                        htmlFor="express"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all"
                      >
                        <Truck className="mb-2 h-6 w-6 text-amber-500" />
                        <span className="font-medium">Express</span>
                        <span className="text-sm text-muted-foreground">3-5 days</span>
                        <span className="text-sm font-medium text-amber-500 mt-1">$25</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="standard" id="standard" className="peer sr-only" />
                      <Label
                        htmlFor="standard"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all"
                      >
                        <Truck className="mb-2 h-6 w-6 text-amber-500" />
                        <span className="font-medium">Standard</span>
                        <span className="text-sm text-muted-foreground">7-10 days</span>
                        <span className="text-sm font-medium text-amber-500 mt-1">$15</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="economy" id="economy" className="peer sr-only" />
                      <Label
                        htmlFor="economy"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all"
                      >
                        <Truck className="mb-2 h-6 w-6 text-amber-500" />
                        <span className="font-medium">Economy</span>
                        <span className="text-sm text-muted-foreground">15-20 days</span>
                        <span className="text-sm font-medium text-amber-500 mt-1">$8</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-between">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    <ChevronLeft className="mr-2 w-4 h-4" />
                    Back
                  </Button>
                  <Button 
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                  >
                    Next: Payment
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-emerald-500" />
                    Payment Method
                  </h3>
                  <RadioGroup 
                    onValueChange={(value) => setFormData({...formData, paymentMethod: value})}
                    value={formData.paymentMethod}
                    className="grid md:grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="bank-transfer" id="bank-transfer" className="peer sr-only" />
                      <Label
                        htmlFor="bank-transfer"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all"
                      >
                        <CreditCard className="mb-2 h-6 w-6 text-emerald-500" />
                        <span className="font-medium">Bank Transfer</span>
                        <span className="text-sm text-muted-foreground">Recommended for large orders</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                      <Label
                        htmlFor="paypal"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all"
                      >
                        <CreditCard className="mb-2 h-6 w-6 text-emerald-500" />
                        <span className="font-medium">PayPal</span>
                        <span className="text-sm text-muted-foreground">Fast and secure</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-secondary" />
                    Additional Notes
                  </h3>
                  <Textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any special requests or instructions for your sample..."
                    className="mt-1"
                  />
                </div>

                <div className="flex justify-between">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    <ChevronLeft className="mr-2 w-4 h-4" />
                    Back
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                  >
                    Submit Sample Request
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const getBadgeVariant = (badge: string) => {
  switch (badge) {
    case "New Arrival": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    case "Best Seller": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    case "Premium": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    case "Trending": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
    case "Featured": return "bg-accent/20 text-accent border-accent/30";
    case "Eco": return "bg-green-500/20 text-green-300 border-green-500/30";
    default: return "bg-muted/20 text-muted-foreground border-muted/30";
  }
};

const NewArrivals = () => {
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [moqProduct, setMoqProduct] = useState<Product | null>(null);
  const [sampleRequestProduct, setSampleRequestProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Calculate date 30 days ago
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const isoDate = thirtyDaysAgo.toISOString();

        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
          .gte('created_at', isoDate) // Products created in the last 30 days
          .order('created_at', { ascending: false }) // Newest first
          .limit(6); // Only get 6 newest products

        if (supabaseError) throw supabaseError;

        const formattedProducts = (data || []).map((product: any) => ({
          ...product,
          image: product.images?.[0] || null,
          features: product.features || [],
          sizes: product.sizes || [],
          colors: product.colors || [],
          reviews: product.reviews || [],
          moqDetails: product.moqDetails || null,
          // Mark all these as "New Arrival" since they're recent
          badge: "New Arrival"
        }));

        setProducts(formattedProducts);
      } catch (err) {
        console.error('Error fetching new arrivals:', err);
        setError('Failed to load new arrivals. Please try again later.');
        toast({
          title: "Error",
          description: "Could not load new arrivals",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const handleViewAll = () => {
    navigate('/products');
  };

  if (loading) {
    return (
      <section className="section-padding bg-gradient-subtle">
        <div className="container mx-auto text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading new arrivals...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding bg-gradient-subtle">
        <div className="container mx-auto text-center py-12">
          <div className="bg-red-100 text-red-600 p-4 rounded-lg inline-flex items-center">
            <X className="w-5 h-5 mr-2" />
            {error}
          </div>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
          >
            Retry
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">New Arrivals</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Discover our newest products. Fresh designs and innovative features.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No New Arrivals</h3>
            <Button variant="outline" onClick={() => navigate('/products')}>
              Browse All Products
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-10">
              {products.map((product) => (
                <div key={product.id} className="card-brand group overflow-hidden flex flex-col h-full bg-card border rounded-xl hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[4/5] md:aspect-video overflow-hidden">
                    <ProductImage 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-blue-500/90 text-[10px] md:text-xs px-2 py-0">
                        New
                      </Badge>
                    </div>
                    
                    {/* QUICK VIEW BUTTON - NOW VISIBLE ON BOTH MOBILE AND DESKTOP */}
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="absolute bottom-2 left-2 opacity-90 md:opacity-0 group-hover:opacity-100 transition-opacity text-[10px] md:text-xs px-2 py-1 h-6 md:h-8"
                      onClick={() => setPreviewProduct(product)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      <span className="hidden xs:inline">Quick View</span>
                      <span className="xs:hidden">View</span>
                    </Button>
                    
                    {/* FAVORITE BUTTON */}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute top-2 left-2 bg-white/80 hover:bg-white rounded-full w-6 h-6 md:w-8 md:h-8"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart className={`w-3 h-3 md:w-4 md:h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </Button>
                  </div>

                  <div className="p-3 md:p-6 flex flex-col flex-grow">
                    <div className="mb-3">
                      <h3 className="font-bold text-sm md:text-lg line-clamp-1 mb-1">{product.name}</h3>
                      <p className="text-[10px] md:text-sm text-muted-foreground uppercase tracking-wider">{product.category}</p>
                    </div>

                    {/* UPDATED PRICE SECTION FOR PRODUCT CARDS */}
                    <div className="mb-4">
                      <div className="flex items-baseline">
                        <span className="text-gray-500 text-sm mr-1">$</span>
                        <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">/unit</span>
                      </div>
                      
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="text-[10px] px-2 py-0 bg-emerald-50 text-emerald-700 border-emerald-200">
                          MOQ: {product.moq}
                        </Badge>
                        <div className="hidden sm:flex items-center ml-2">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-0.5" />
                          <span className="text-[10px] text-gray-600">
                            {product.rating || 4.5}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Buttons Container */}
                    <div className="mt-auto space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full h-8 md:h-10 text-[10px] md:text-sm"
                        onClick={() => setMoqProduct(product)}
                      >
                        <Info className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        MOQ Info
                      </Button>
                      <Button 
                        className="w-full h-8 md:h-10 btn-gradient text-[10px] md:text-sm"
                        onClick={() => setSampleRequestProduct(product)}
                      >
                        Request Sample
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button 
                className="btn-hero group w-full md:w-auto"
                onClick={handleViewAll}
              >
                View All Products
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Modals - Ensure proper state management */}
      {previewProduct && (
        <ProductPreview 
          product={previewProduct} 
          onClose={() => {
            console.log('Closing preview modal');
            setPreviewProduct(null);
          }} 
          relatedProducts={products.filter(p => p.id !== previewProduct.id).slice(0, 3)}
          setPreviewProduct={setPreviewProduct}
        />
      )}

      {moqProduct && (
        <MOQInfoModal 
          product={moqProduct} 
          onClose={() => {
            console.log('Closing MOQ modal');
            setMoqProduct(null);
          }} 
        />
      )}

      {sampleRequestProduct && (
        <SampleRequestForm 
          product={sampleRequestProduct} 
          onClose={() => {
            console.log('Closing sample request modal');
            setSampleRequestProduct(null);
          }} 
        />
      )}
    </section>
  );
};

export default NewArrivals;