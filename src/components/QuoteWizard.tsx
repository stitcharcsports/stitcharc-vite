import { useState } from "react";
import { ArrowRight, ArrowLeft, Calculator, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface QuoteData {
  product: string;
  quantity: number;
  material: string;
  country: string;
  customOptions: string[];
}

const QuoteWizard = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [quoteData, setQuoteData] = useState<QuoteData>({
    product: "",
    quantity: 0,
    material: "",
    country: "",
    customOptions: []
  });

  const products = [
    { id: "football-kit", name: "Football Kit", basePrice: 12.50, image: "⚽" },
    { id: "gym-wear", name: "Gym Wear", basePrice: 8.75, image: "🏋️" },
    { id: "cricket-jersey", name: "Cricket Jersey", basePrice: 15.00, image: "🏏" },
    { id: "basketball-uniform", name: "Basketball Uniform", basePrice: 11.25, image: "🏀" },
  ];

  const materials = [
    { id: "polyester", name: "100% Polyester", multiplier: 1.0, description: "Standard performance fabric" },
    { id: "cotton-blend", name: "Cotton Blend", multiplier: 1.2, description: "Comfort & breathability" },
    { id: "performance", name: "Performance Tech", multiplier: 1.5, description: "Moisture-wicking & UV protection" },
    { id: "eco-friendly", name: "Eco-Friendly", multiplier: 1.3, description: "Sustainable materials" },
  ];

  const countries = [
    { code: "UAE", name: "United Arab Emirates", shipping: 2.50 },
    { code: "UK", name: "United Kingdom", shipping: 3.75 },
    { code: "USA", name: "United States", shipping: 4.25 },
    { code: "DE", name: "Germany", shipping: 3.50 },
    { code: "AU", name: "Australia", shipping: 5.00 },
    { code: "CA", name: "Canada", shipping: 4.00 },
  ];

  const customOptions = [
    { id: "custom-design", name: "Custom Design", price: 2.00 },
    { id: "embroidery", name: "Embroidery", price: 1.50 },
    { id: "sublimation", name: "Sublimation Printing", price: 1.75 },
    { id: "rush-order", name: "Rush Order (48h)", price: 3.00 },
  ];

  const getTieredDiscount = (quantity: number) => {
    if (quantity >= 1000) return 0.8; // 20% discount
    if (quantity >= 500) return 0.85; // 15% discount
    if (quantity >= 200) return 0.9; // 10% discount
    if (quantity >= 100) return 0.95; // 5% discount
    return 1.0; // No discount
  };

  const calculatePrice = () => {
    const selectedProduct = products.find(p => p.id === quoteData.product);
    const selectedMaterial = materials.find(m => m.id === quoteData.material);
    const selectedCountry = countries.find(c => c.code === quoteData.country);
    
    if (!selectedProduct || !selectedMaterial || !selectedCountry || !quoteData.quantity) {
      return { unitPrice: 0, totalPrice: 0, shipping: 0 };
    }

    const basePrice = selectedProduct.basePrice;
    const materialMultiplier = selectedMaterial.multiplier;
    const discountMultiplier = getTieredDiscount(quoteData.quantity);
    
    const customOptionsCost = quoteData.customOptions.reduce((total, optionId) => {
      const option = customOptions.find(o => o.id === optionId);
      return total + (option?.price || 0);
    }, 0);

    const unitPrice = (basePrice * materialMultiplier + customOptionsCost) * discountMultiplier;
    const subtotal = unitPrice * quoteData.quantity;
    const shipping = selectedCountry.shipping * Math.ceil(quoteData.quantity / 50); // Per 50 units
    const totalPrice = subtotal + shipping;

    return { unitPrice, totalPrice, shipping };
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitQuote = () => {
    const pricing = calculatePrice();
    toast({
      title: "Quote Request Sent!",
      description: `Your quote for ${quoteData.quantity} units has been sent to our team. We'll respond within 2 hours.`,
    });
    
    // Reset wizard
    setCurrentStep(1);
    setQuoteData({
      product: "",
      quantity: 0,
      material: "",
      country: "",
      customOptions: []
    });
  };

  const pricing = calculatePrice();
  const isStepValid = () => {
    switch (currentStep) {
      case 1: return quoteData.product !== "";
      case 2: return quoteData.quantity > 0;
      case 3: return quoteData.material !== "";
      case 4: return quoteData.country !== "";
      default: return false;
    }
  };

  return (
    <section id="quote-wizard" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            <Calculator className="w-4 h-4 mr-2" />
            Instant Quote
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Get Your <span className="text-gradient">Instant Quote</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Configure your perfect sportswear order and get real-time pricing in 4 simple steps.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step <= currentStep 
                      ? 'bg-gradient-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-12 h-1 mx-2 ${
                      step < currentStep ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card-brand p-8">
            {/* Step 1: Product Selection */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">Select Your Product</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        quoteData.product === product.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setQuoteData({...quoteData, product: product.id})}
                    >
                      <div className="text-4xl mb-3">{product.image}</div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">{product.name}</h4>
                      <p className="text-accent font-bold">From ${product.basePrice}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Quantity */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">Enter Quantity</h3>
                <div className="max-w-md mx-auto">
                  <Label htmlFor="quantity" className="text-base font-medium">Number of Units</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="e.g. 100"
                    value={quoteData.quantity || ""}
                    onChange={(e) => setQuoteData({...quoteData, quantity: parseInt(e.target.value) || 0})}
                    className="text-lg p-4 mt-2"
                  />
                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div>• 50-99 units: Standard pricing</div>
                    <div>• 100-199 units: 5% discount</div>
                    <div>• 200-499 units: 10% discount</div>
                    <div>• 500-999 units: 15% discount</div>
                    <div>• 1000+ units: 20% discount</div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Material Selection */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">Choose Material</h3>
                <RadioGroup 
                  value={quoteData.material} 
                  onValueChange={(value) => setQuoteData({...quoteData, material: value})}
                  className="space-y-4"
                >
                  {materials.map((material) => (
                    <div key={material.id} className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors">
                      <RadioGroupItem value={material.id} id={material.id} />
                      <div className="flex-1">
                        <Label htmlFor={material.id} className="text-base font-medium cursor-pointer">
                          {material.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">{material.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-accent font-medium">
                          {material.multiplier === 1.0 ? 'Standard' : `+${((material.multiplier - 1) * 100).toFixed(0)}%`}
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                <div className="mt-6">
                  <Label className="text-base font-medium mb-3 block">Custom Options (Optional)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {customOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border">
                        <input
                          type="checkbox"
                          id={option.id}
                          checked={quoteData.customOptions.includes(option.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setQuoteData({...quoteData, customOptions: [...quoteData.customOptions, option.id]});
                            } else {
                              setQuoteData({...quoteData, customOptions: quoteData.customOptions.filter(id => id !== option.id)});
                            }
                          }}
                          className="rounded border-border"
                        />
                        <Label htmlFor={option.id} className="text-sm cursor-pointer flex-1">
                          {option.name}
                        </Label>
                        <span className="text-xs text-accent font-medium">+${option.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Country & Final Quote */}
            {currentStep === 4 && (
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">Shipping & Final Quote</h3>
                
                <div className="mb-6">
                  <Label className="text-base font-medium mb-2 block">Destination Country</Label>
                  <Select value={quoteData.country} onValueChange={(value) => setQuoteData({...quoteData, country: value})}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select destination country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name} (${country.shipping}/50 units shipping)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quote Summary */}
                {isStepValid() && (
                  <div className="bg-gradient-subtle p-6 rounded-xl">
                    <h4 className="text-xl font-display font-bold text-foreground mb-4">Quote Summary</h4>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Product:</span>
                        <span className="font-medium">{products.find(p => p.id === quoteData.product)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span className="font-medium">{quoteData.quantity} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <span className="font-medium">{materials.find(m => m.id === quoteData.material)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Unit Price:</span>
                        <span className="font-medium">${pricing.unitPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span className="font-medium">${pricing.shipping.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between text-lg font-bold text-primary">
                        <span>Total:</span>
                        <span>${pricing.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="btn-gradient flex items-center"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitQuote}
                  disabled={!isStepValid()}
                  className="btn-gradient flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Quote Request
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteWizard;