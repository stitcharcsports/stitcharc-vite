import { useState } from "react";
import { Star, ChevronLeft, Heart, Share2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Product = {
  id: number;
  name: string;
  category: string;
  image: string;
  price: string;
  moq: string;
  features: string[];
  badge: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
  rating?: number;
  reviews?: Review[];
};

type Review = {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
};

const ProductPreview = ({ product, onClose, relatedProducts }: { 
  product: Product, 
  onClose: () => void,
  relatedProducts: Product[]
}) => {
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [review, setReview] = useState({
    rating: 0,
    name: "",
    comment: ""
  });
  const [reviews, setReviews] = useState<Review[]>(product.reviews || []);

  // Default product details if not provided
  const fullProduct: Product = {
    ...product,
    description: product.description || "High-quality performance wear designed for professional athletes and teams. Made with premium moisture-wicking fabric that keeps you dry and comfortable during intense gameplay.",
    sizes: product.sizes || ["XS", "S", "M", "L", "XL", "XXL"],
    colors: product.colors || ["Red", "Blue", "Black", "White", "Green"],
    rating: product.rating || 4.5,
    reviews: product.reviews || [
      {
        id: 1,
        name: "Alex Johnson",
        rating: 5,
        date: "2023-10-15",
        comment: "Excellent quality! Our team loves the jerseys. The fabric is breathable and the colors are vibrant.",
        verified: true
      },
      {
        id: 2,
        name: "Sarah Miller",
        rating: 4,
        date: "2023-09-28",
        comment: "Great product overall. The sizing was slightly larger than expected but the material is top-notch.",
        verified: true
      },
      {
        id: 3,
        name: "Team Sports Inc.",
        rating: 5,
        date: "2023-08-10",
        comment: "We've ordered multiple times from this supplier. Consistent quality and excellent customer service.",
        verified: true
      }
    ]
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: reviews.length + 1,
      name: review.name,
      rating: review.rating,
      date: new Date().toISOString().split('T')[0],
      comment: review.comment,
      verified: false
    };
    setReviews([...reviews, newReview]);
    setReview({ rating: 0, name: "", comment: "" });
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

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="container mx-auto p-4 py-8">
        <div className="bg-background rounded-xl shadow-2xl overflow-hidden">
          {/* Header with back button */}
          <div className="p-4 border-b flex justify-between items-center">
            <Button variant="ghost" onClick={onClose}>
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Products
            </Button>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div>
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src={activeImage} 
                  alt={fullProduct.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(`https://images.unsplash.com/photo-${product.image.split('/photo-')[1].split('?')[0]}?w=200&h=200&fit=crop&crop=center&${i}`)}
                    className={`rounded-md overflow-hidden border-2 ${activeImage.includes(`&${i}`) ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img 
                      src={`https://images.unsplash.com/photo-${product.image.split('/photo-')[1].split('?')[0]}?w=200&h=200&fit=crop&crop=center&${i}`}
                      alt={`${fullProduct.name} view ${i}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Badge className={`mb-2 ${getBadgeVariant(fullProduct.badge)}`}>
                    {fullProduct.badge}
                  </Badge>
                  <h1 className="text-3xl font-bold">{fullProduct.name}</h1>
                  <p className="text-muted-foreground">{fullProduct.category}</p>
                </div>
                <div className="text-2xl font-bold text-primary">{fullProduct.price}</div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`w-5 h-5 ${star <= Math.floor(fullProduct.rating!) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {fullProduct.rating} ({fullProduct.reviews?.length || 0} reviews)
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{fullProduct.description}</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                <ul className="space-y-2">
                  {fullProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {fullProduct.sizes?.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[40px]"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {fullProduct.colors?.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      onClick={() => setSelectedColor(color)}
                      className="min-w-[80px]"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              {/* MOQ */}
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <p className="font-medium">Minimum Order Quantity: <span className="text-primary">{fullProduct.moq}</span></p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  Download Tech Pack
                </Button>
                <Button className="w-full btn-gradient">
                  Request Sample
                </Button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t p-6">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            
            {/* Review Stats */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-4xl font-bold mb-2">{fullProduct.rating}</div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`w-5 h-5 ${star <= Math.floor(fullProduct.rating!) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">Average Rating</p>
              </div>
              
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = reviews.filter(r => Math.floor(r.rating) === rating).length;
                  const percentage = (count / reviews.length) * 100;
                  return (
                    <div key={rating} className="flex items-center">
                      <div className="w-10 text-sm">{rating} Star</div>
                      <div className="flex-1 mx-2 h-2 bg-muted rounded-full">
                        <div 
                          className="h-2 bg-yellow-500 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="w-10 text-sm text-right">{count}</div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex items-center justify-center">
                <Button className="btn-gradient">
                  Write a Review
                </Button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6 mb-8">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-0">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{review.name}</h4>
                      {review.verified && (
                        <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/20">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="text-muted-foreground text-sm">{review.date}</div>
                  </div>
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Review Form */}
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Write a Review
              </h3>
              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block mb-2">Your Rating</label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReview({...review, rating: star})}
                        className="focus:outline-none"
                      >
                        <Star 
                          className={`w-8 h-8 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2">Your Name</label>
                  <Input
                    id="name"
                    value={review.name}
                    onChange={(e) => setReview({...review, name: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="comment" className="block mb-2">Your Review</label>
                  <Textarea
                    id="comment"
                    value={review.comment}
                    onChange={(e) => setReview({...review, comment: e.target.value})}
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit">Submit Review</Button>
              </form>
            </div>
          </div>

          {/* Related Products */}
          <div className="border-t p-6">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <div key={product.id} className="border rounded-lg overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge className={`absolute top-2 left-2 ${getBadgeVariant(product.badge)}`}>
                      {product.badge}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">{product.price}</span>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;