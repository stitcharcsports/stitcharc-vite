import { useState, useEffect } from "react";
import { 
  Eye, Download, Info, ArrowRight, ChevronLeft, Heart, Share2, 
  Star, MessageSquare, X, Check, Package, Box, Truck, CreditCard,
  Percent, Calendar, Tag, Globe, Factory, ClipboardList, User, Mail, Phone, Home, Image as ImageIcon,
  Search, Filter, SlidersHorizontal, ChevronDown, ChevronUp
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

// Placeholder image as SVG data URI
const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2NjYyIgc3Ryb2tlLXdpZHRoPSIxIj48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHg9IjIiIHk9IjIiIHJ4PSIyIi8+PGxpbmUgeDE9IjgiIHkxPSI4IiB4Mj0iMTYiIHkyPSIxNiIvPjxsaW5lIHgxPSIxNiIgeTE9IjgiIHgyPSI4IiB5Mj0iMTYiLz48L3N2Zz4=';

// Improved image URL handling
const getImageUrl = (imagePath: string | string[] | undefined | null): string => {
  // Handle undefined/null cases
  if (!imagePath) {
    console.warn('No image path provided, using placeholder');
    return placeholderImage;
  }
  
  // If it's an array, take the first element
  const path = Array.isArray(imagePath) ? imagePath[0] : imagePath;
  
  if (!path) {
    console.warn('No valid image path found in array, using placeholder');
    return placeholderImage;
  }
  
  // If it's already a full URL or data URI, return as-is
  if (typeof path === 'string' && (path.startsWith('http') || path.startsWith('data:'))) {
    return path;
  }
  
  // Handle base64 images directly
  if (typeof path === 'string' && path.startsWith('data:image')) {
    return path;
  }
  
  // Handle Supabase storage paths
  if (typeof path === 'string') {
    try {
      const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(path);
      return publicUrl;
    } catch (err) {
      console.error('Error getting image URL:', err);
      return placeholderImage;
    }
  }
  
  console.warn('Unrecognized image path format:', path);
  return placeholderImage;
};

type Product = {
  id: number;
  name: string;
  category: string;
  image: string | string[];
  price: string;
  moq: string;
  features: string[];
  badge: string;
  is_trending?: boolean;
  description?: string;
  sizes?: string[];
  colors?: string[];
  rating?: number;
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
          
          // Skip preloading for data URIs (placeholder images or base64)
          if (url.startsWith('data:')) {
            setImageLoading(false);
            setImageError(false);
            return;
          }

          // Preload the actual image
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

  // Special handling for data URI images (both placeholder and base64)
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

  // Main render for regular image URLs
  return (
    <div className={`relative ${className}`}>
      {/* Loading state */}
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
          <div className="animate-pulse flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
      )}

      {/* Error state */}
      {imageError ? (
        <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
          <ImageIcon className="w-8 h-8 text-muted-foreground" />
          <span className="sr-only">Image failed to load</span>
        </div>
      ) : (
        /* Successfully loaded image */
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
}

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

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-muted-foreground">{product.category}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
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

            {/* Product Details */}
            <div>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`w-4 h-4 ${star <= (product.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    ({reviews.length} reviews)
                  </span>
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  {product.moq} MOQ
                </Badge>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="text-2xl font-bold">{product.price}</h3>
                <p className="text-muted-foreground">{product.description || "No description available."}</p>
                
                {product.features && product.features.length > 0 && (
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Color and Size Selectors */}
              <div className="space-y-4 mb-6">
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <Label>Color</Label>
                    <div className="flex space-x-2 mt-2">
                      {product.colors.map((color) => (
                        <Button 
                          key={color}
                          variant={selectedColor === color ? "default" : "outline"}
                          size="sm" 
                          className="flex items-center"
                          onClick={() => setSelectedColor(color)}
                        >
                          <span 
                            className="w-4 h-4 rounded-full mr-2" 
                            style={{ backgroundColor: color.toLowerCase() }}
                          />
                          {color}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <Label>Size</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.sizes.map((size) => (
                        <Button 
                          key={size} 
                          variant={selectedSize === size ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label>Quantity</Label>
                  <div className="flex items-center mt-2 space-x-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="font-medium">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
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

          {/* Reviews Section */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Customer Reviews</h3>
            
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
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
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
            )}

            {/* Review Form */}
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
                      >
                        <Star 
                          className={`w-5 h-5 ${star <= newReview.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
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

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6">Related Products</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div 
                    key={relatedProduct.id} 
                    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
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
                        <span className="font-bold">{relatedProduct.price}</span>
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

          {/* Pricing Tiers */}
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
            {/* Production Time */}
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

            {/* Minimum Order */}
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

          {/* Shipping Options */}
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

          {/* Payment Terms */}
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

          {/* Additional Notes */}
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
    // Here you would typically send the form data to your backend
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

          {/* Progress Steps */}
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
            {/* Step 1: Contact Information */}
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

            {/* Step 2: Sample Details */}
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

            {/* Step 3: Payment and Submission */}
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
    case "Trending": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
    case "Best Seller": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    case "Premium": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    case "New": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    case "Featured": return "bg-accent/20 text-accent border-accent/30";
    case "Eco": return "bg-green-500/20 text-green-300 border-green-500/30";
    default: return "bg-muted/20 text-muted-foreground border-muted/30";
  }
};

const ProductsPage = ({ 
  products, 
  setPreviewProduct,
  setMoqProduct,
  setSampleRequestProduct,
  favorites,
  toggleFavorite
}: { 
  products: Product[];
  setPreviewProduct: (product: Product) => void;
  setMoqProduct: (product: Product) => void;
  setSampleRequestProduct: (product: Product) => void;
  favorites: number[];
  toggleFavorite: (productId: number) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('featured');

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Filter products based on search, category, and price range
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const productPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));
    const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
      case 'price-high':
        return parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, ''));
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'newest':
        // Assuming products have a createdAt field - you'll need to add this to your Product type
        return 0; // Replace with actual sorting logic
      default: // 'featured'
        return (b.is_trending ? 1 : 0) - (a.is_trending ? 1 : 0);
    }
  });

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">
          Browse our complete catalog of high-quality products
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            <Select onValueChange={setSortOption} value={sortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="bg-muted/50 p-4 rounded-lg mb-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="mb-2 block">Category</Label>
              <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block">Price Range</Label>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={1000}
                  step={10}
                  minStepsBetweenThumbs={1}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange([0, 1000]);
                }}
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No Products Found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
          <Button 
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setPriceRange([0, 1000]);
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div key={product.id} className="card-brand group overflow-hidden">
                <div className="relative overflow-hidden rounded-t-lg">
                  <ProductImage 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 md:h-64"
                  />
                  <div className="absolute top-2 md:top-4 right-2 md:right-4">
                    <Badge className={getBadgeVariant(product.badge)}>
                      {product.badge}
                    </Badge>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="absolute bottom-2 md:bottom-4 left-2 md:left-4 opacity-0 group-hover:opacity-100 transition-opacity text-xs md:text-sm"
                    onClick={() => setPreviewProduct(product)}
                  >
                    <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    Quick View
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 md:top-4 left-2 md:left-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart 
                      className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </Button>
                </div>
                <div className="p-4 md:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-sm md:text-lg line-clamp-1">{product.name}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <span className="font-bold text-primary text-sm md:text-base">{product.price}</span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center mb-3 md:mb-4">
                    <div className="flex items-center mr-1 md:mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`w-3 h-3 md:w-4 md:h-4 ${star <= (product.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product.reviews?.length || 0} reviews
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full hover:bg-primary/10 hover:text-primary transition-colors text-xs md:text-sm"
                      onClick={() => setMoqProduct(product)}
                    >
                      <Info className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      MOQ Info
                    </Button>
                    <Button 
                      className="w-full btn-gradient text-xs md:text-sm hover:opacity-90 transition-opacity"
                      onClick={() => setSampleRequestProduct(product)}
                    >
                      Request Sample
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination would go here */}
          {/* <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div> */}
        </>
      )}
    </div>
  );
};

const TrendingProducts = () => {
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [moqProduct, setMoqProduct] = useState<Product | null>(null);
  const [sampleRequestProduct, setSampleRequestProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_trending', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedProducts = data?.map((product: any) => ({
          ...product,
          image: product.images?.[0] || null,
          features: product.features || [],
          sizes: product.sizes || [],
          colors: product.colors || [],
          reviews: product.reviews || [],
          moqDetails: product.moqDetails || null
        })) || [];

        setProducts(formattedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const handleViewAll = () => {
    setShowAllProducts(true);
  };

  const handleBackToTrending = () => {
    setShowAllProducts(false);
  };

  if (loading) {
    return (
      <section className="section-padding bg-gradient-subtle">
        <div className="container mx-auto text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading trending products...</p>
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
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </section>
    );
  }

  if (showAllProducts) {
    return (
      <ProductsPage
        products={products}
        setPreviewProduct={setPreviewProduct}
        setMoqProduct={setMoqProduct}
        setSampleRequestProduct={setSampleRequestProduct}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    );
  }

  // Only show first 6 products in trending section
  const displayedProducts = products.slice(0, 6);

  return (
    <section className="section-padding bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular products this season. High quality, competitive prices, and fast delivery.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Trending Products Found</h3>
            <p className="text-muted-foreground mb-6">Check back later for our featured products</p>
            <Button variant="outline">View All Products</Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
              {displayedProducts.map((product) => (
                <div key={product.id} className="card-brand group overflow-hidden">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <ProductImage 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 md:h-64"
                    />
                    <div className="absolute top-2 md:top-4 right-2 md:right-4">
                      <Badge className={getBadgeVariant(product.badge)}>
                        {product.badge}
                      </Badge>
                    </div>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="absolute bottom-2 md:bottom-4 left-2 md:left-4 opacity-0 group-hover:opacity-100 transition-opacity text-xs md:text-sm"
                      onClick={() => setPreviewProduct(product)}
                    >
                      <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      Quick View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 md:top-4 left-2 md:left-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart 
                        className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                      />
                    </Button>
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-sm md:text-lg line-clamp-1">{product.name}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground">{product.category}</p>
                      </div>
                      <span className="font-bold text-primary text-sm md:text-base">{product.price}</span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center mb-3 md:mb-4">
                      <div className="flex items-center mr-1 md:mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className={`w-3 h-3 md:w-4 md:h-4 ${star <= (product.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {product.reviews?.length || 0} reviews
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full hover:bg-primary/10 hover:text-primary transition-colors text-xs md:text-sm"
                        onClick={() => setMoqProduct(product)}
                      >
                        <Info className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        MOQ Info
                      </Button>
                      <Button 
                        className="w-full btn-gradient text-xs md:text-sm hover:opacity-90 transition-opacity"
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
                className="btn-hero group"
                onClick={handleViewAll}
              >
                View All Products
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </>
        )}
      </div>

      {previewProduct && (
        <ProductPreview 
          product={previewProduct} 
          onClose={() => setPreviewProduct(null)}
          relatedProducts={products.filter(p => p.id !== previewProduct.id).slice(0, 3)}
          setPreviewProduct={setPreviewProduct}
        />
      )}

      {moqProduct && (
        <MOQInfoModal 
          product={moqProduct}
          onClose={() => setMoqProduct(null)}
        />
      )}

      {sampleRequestProduct && (
        <SampleRequestForm 
          product={sampleRequestProduct}
          onClose={() => setSampleRequestProduct(null)}
        />
      )}
    </section>
  );
};

export default TrendingProducts;