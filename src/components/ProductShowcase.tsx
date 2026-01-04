import { useState, useRef, useEffect } from "react";
import { 
  Shirt, Palette, ZoomIn, ZoomOut, RotateCw,
  Download, Share2, Layers, Truck, Globe,
  Shield, Users, Package, CheckCircle,
  TrendingUp, Clock, Droplets, Wind,
  Thermometer, Weight, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const FabricTextureCustomizer = () => {
  const [activeFabric, setActiveFabric] = useState('dryfit');
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [textureIntensity, setTextureIntensity] = useState(50);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const fabrics = [
    {
      id: 'dryfit',
      name: 'DRY-FIT PRO',
      description: 'Advanced moisture-wicking technology',
      properties: ['Quick Dry', 'Breathable', '4-Way Stretch'],
      stats: { weight: 'Light', warmth: 'Cool', durability: 'High' },
      price: '$4.50/yd',
      color: '#3b82f6'
    },
    {
      id: 'mesh',
      name: 'PERFORATED MESH',
      description: 'Maximum ventilation for intense workouts',
      properties: ['High Airflow', 'Lightweight', 'Fast Drying'],
      stats: { weight: 'Ultra Light', warmth: 'Very Cool', durability: 'Medium' },
      price: '$3.75/yd',
      color: '#10b981'
    },
    {
      id: 'compression',
      name: 'COMPRESSION',
      description: 'Muscle support & recovery fabric',
      properties: ['Graduated Compression', 'Anti-Odor', 'UV Protection'],
      stats: { weight: 'Medium', warmth: 'Warm', durability: 'High' },
      price: '$6.25/yd',
      color: '#8b5cf6'
    },
    {
      id: 'thermal',
      name: 'THERMAL PRO',
      description: 'Heat retention for cold weather',
      properties: ['Heat Retention', 'Wind Resistant', 'Water Repellent'],
      stats: { weight: 'Heavy', warmth: 'Very Warm', durability: 'High' },
      price: '$5.90/yd',
      color: '#ef4444'
    },
    {
      id: 'eco',
      name: 'ECO-BLEND',
      description: 'Sustainable recycled materials',
      properties: ['Recycled Polyester', 'Biodegradable', 'Low Impact Dye'],
      stats: { weight: 'Medium', warmth: 'Moderate', durability: 'Medium' },
      price: '$4.25/yd',
      color: '#f59e0b'
    },
    {
      id: 'satin',
      name: 'TEAM SATIN',
      description: 'Premium finish for professional uniforms',
      properties: ['Luxury Finish', 'Color Rich', 'Smooth Feel'],
      stats: { weight: 'Light', warmth: 'Cool', durability: 'Medium' },
      price: '$7.50/yd',
      color: '#ec4899'
    }
  ];

  const colors = [
    { name: 'Team Blue', value: '#3b82f6' },
    { name: 'Sport Red', value: '#ef4444' },
    { name: 'Forest Green', value: '#10b981' },
    { name: 'Violet', value: '#8b5cf6' },
    { name: 'Sunset Orange', value: '#f59e0b' },
    { name: 'Charcoal', value: '#4b5563' },
    { name: 'Pure White', value: '#ffffff' },
    { name: 'Jet Black', value: '#000000' },
  ];

  // Draw fabric texture
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = zoom / 100;
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    
    // Background
    ctx.fillStyle = selectedColor;
    ctx.fillRect(-150, -150, 300, 300);
    
    // Draw fabric texture based on type
    const fabric = fabrics.find(f => f.id === activeFabric);
    if (!fabric) return;
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    
    switch(activeFabric) {
      case 'dryfit':
        // Wicking texture - dots pattern
        for (let i = -140; i < 140; i += 20) {
          for (let j = -140; j < 140; j += 20) {
            const size = 2 + Math.sin(i * 0.1 + j * 0.1) * 1.5;
            ctx.beginPath();
            ctx.arc(i, j, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + textureIntensity/100})`;
            ctx.fill();
          }
        }
        break;
        
      case 'mesh':
        // Mesh pattern
        for (let i = -140; i < 140; i += 15) {
          for (let j = -140; j < 140; j += 15) {
            ctx.beginPath();
            ctx.arc(i, j, 3, 0, Math.PI * 2);
            ctx.stroke();
            // Connect dots
            if (i < 120) {
              ctx.beginPath();
              ctx.moveTo(i, j);
              ctx.lineTo(i + 15, j);
              ctx.stroke();
            }
            if (j < 120) {
              ctx.beginPath();
              ctx.moveTo(i, j);
              ctx.lineTo(i, j + 15);
              ctx.stroke();
            }
          }
        }
        break;
        
      case 'compression':
        // Wave pattern for compression
        for (let i = -140; i < 140; i += 5) {
          const y = Math.sin(i * 0.05) * 10;
          ctx.beginPath();
          ctx.moveTo(i, -140 + y);
          ctx.lineTo(i, 140 + y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + textureIntensity/200})`;
          ctx.stroke();
        }
        break;
        
      case 'thermal':
        // Fleece-like texture
        for (let i = -140; i < 140; i += 8) {
          for (let j = -140; j < 140; j += 8) {
            const length = 4 + Math.random() * 4;
            const angle = Math.random() * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(i, j);
            ctx.lineTo(
              i + Math.cos(angle) * length,
              j + Math.sin(angle) * length
            );
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + textureIntensity/150})`;
            ctx.stroke();
          }
        }
        break;
        
      case 'eco':
        // Recycled material texture
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + textureIntensity/100})`;
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * 300 - 150;
          const y = Math.random() * 300 - 150;
          const size = 2 + Math.random() * 6;
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
        
      case 'satin':
        // Satin sheen effect
        const gradient = ctx.createLinearGradient(-150, -150, 150, 150);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.1 + textureIntensity/100})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.3 + textureIntensity/100})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${0.1 + textureIntensity/100})`);
        
        ctx.fillStyle = gradient;
        for (let i = -140; i < 140; i += 30) {
          ctx.fillRect(i, -140, 25, 280);
        }
        break;
    }
    
    // Add subtle border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 2;
    ctx.strokeRect(-150, -150, 300, 300);
    
    ctx.restore();
    
    // Add shadow effect
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
  }, [activeFabric, zoom, rotation, selectedColor, textureIntensity]);

  const currentFabric = fabrics.find(f => f.id === activeFabric);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            FABRIC INNOVATION STUDIO
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our <span className="text-blue-600">Premium Sportswear Fabrics</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Interact with different fabric textures, colors, and properties. 
            Perfect visualizer for bulk fabric selection.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Fabric Swatches */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Fabric Texture Preview</h2>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setZoom(Math.min(zoom + 20, 200))}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setZoom(Math.max(zoom - 20, 50))}
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setRotation(rotation + 90)}
                  >
                    <RotateCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Main Canvas */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden mb-6">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={600}
                  className="w-full h-full"
                />
                
                {/* Zoom Level Indicator */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {zoom}% Zoom
                </div>
                
                {/* Rotation Indicator */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {rotation}° Rotation
                </div>
              </div>

              {/* Texture Controls */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Texture Intensity</span>
                    <span className="text-sm text-gray-600">{textureIntensity}%</span>
                  </div>
                  <Slider
                    value={[textureIntensity]}
                    onValueChange={([value]) => setTextureIntensity(value)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
                
                {/* Color Selector */}
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-3">Select Color</div>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={`w-8 h-8 rounded-full transition-transform ${
                          selectedColor === color.value ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:scale-110'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Fabric Details */}
          <div className="space-y-6">
            {/* Fabric Selection Grid */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Available Fabrics</h3>
              <div className="grid grid-cols-2 gap-3">
                {fabrics.map((fabric) => (
                  <button
                    key={fabric.id}
                    onClick={() => {
                      setActiveFabric(fabric.id);
                      setSelectedColor(fabric.color);
                    }}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      activeFabric === fabric.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-gray-900">{fabric.name}</div>
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: fabric.color }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mb-2">{fabric.description}</div>
                    <div className="text-sm font-bold text-blue-600">{fabric.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Fabric Details */}
            {currentFabric && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{currentFabric.name}</h3>
                  <div className="text-2xl font-bold text-blue-600">{currentFabric.price}</div>
                </div>
                
                <p className="text-gray-600 mb-6">{currentFabric.description}</p>
                
                {/* Properties */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Key Properties</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentFabric.properties.map((prop, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {prop}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Weight className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">{currentFabric.stats.weight}</div>
                    <div className="text-xs text-gray-500">Weight</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Thermometer className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">{currentFabric.stats.warmth}</div>
                    <div className="text-xs text-gray-500">Warmth</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Layers className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">{currentFabric.stats.durability}</div>
                    <div className="text-xs text-gray-500">Durability</div>
                  </div>
                </div>
                
                {/* Features */}
                <div className="mt-6 space-y-2">
                  {[
                    { icon: <Droplets className="w-4 h-4" />, text: 'Moisture Wicking' },
                    { icon: <Wind className="w-4 h-4" />, text: 'Breathable' },
                    { icon: <Shield className="w-4 h-4" />, text: 'UV Protection' },
                    { icon: <CheckCircle className="w-4 h-4" />, text: 'Easy to Cut & Sew' },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="text-blue-600">{feature.icon}</div>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                <Package className="w-4 h-4 mr-2" />
                Request Fabric Samples
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Tech Specs
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl text-center border border-gray-200">
                <Truck className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-xs font-medium text-gray-900">Global Shipping</div>
              </div>
              <div className="bg-white p-4 rounded-xl text-center border border-gray-200">
                <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-xs font-medium text-gray-900">Quality Guarantee</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Countries Served</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">200+</div>
                <div className="text-sm text-gray-600">Team Clients</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">15</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border border-orange-100">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">2M+</div>
                <div className="text-sm text-gray-600">Yards Supplied</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FabricTextureCustomizer;