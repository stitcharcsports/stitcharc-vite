import { useState, useEffect } from "react";
import { Save, Download, Share2, Undo, Redo, Upload, Sparkles, Camera, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";c
import { useAuth } from '@/hooks/use-Auth';
import { supabase } from "@/integrations/supabase/client";

interface Kit {
  id: string;
  name: string;
  category: string;
  image_url: string;
  colors: any;
  design_data: any;
}

interface KitConfig {
  type: 'predefined' | 'custom';
  kitId?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fabric: string;
  style: string;
  logo: string | null;
  logoPosition: string;
  logoSize: number;
  text: string;
  textPosition: string;
  collar: string;
  sleeves: string;
  pattern: string;
  customKitUpload?: string;
}

const KitConfiguratorAI = () => {
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const [predefinedKits, setPredefinedKits] = useState<Kit[]>([]);
  const [config, setConfig] = useState<KitConfig>({
    type: 'predefined',
    primaryColor: "#0033A0",
    secondaryColor: "#D1FF00",
    accentColor: "#FFFFFF",
    fabric: "polyester",
    style: "modern",
    logo: null,
    logoPosition: "center",
    logoSize: 50,
    text: "",
    textPosition: "bottom",
    collar: "crew",
    sleeves: "short",
    pattern: "solid"
  });
  
  const [headshotFile, setHeadshotFile] = useState<File | null>(null);
  const [headshotPreview, setHeadshotPreview] = useState<string | null>(null);
  const [aiPreviewUrl, setAiPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load predefined kits
  useEffect(() => {
    const loadKits = async () => {
      const { data, error } = await supabase
        .from('kits')
        .select('*')
        .eq('is_active', true);
      
      if (error) {
        console.error('Error loading kits:', error);
        return;
      }
      
      setPredefinedKits(data || []);
    };
    
    loadKits();
  }, []);

  const colors = [
    "#0033A0", "#D1FF00", "#FF6B35", "#8B5CF6", "#EF4444", 
    "#10B981", "#F59E0B", "#EC4899", "#6366F1", "#14B8A6",
    "#000000", "#FFFFFF", "#6B7280", "#DC2626", "#059669"
  ];

  const updateConfig = (updates: Partial<KitConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleKitSelection = (kit: Kit) => {
    updateConfig({
      type: 'predefined',
      kitId: kit.id,
      primaryColor: kit.colors?.primary || "#0033A0",
      secondaryColor: kit.colors?.secondary || "#D1FF00",
      pattern: kit.design_data?.pattern || "solid",
      style: kit.design_data?.style || "modern"
    });
  };

  const handleCustomKitUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to upload custom kit designs.",
        variant: "destructive",
      });
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/custom-kit-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('kit-uploads')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('kit-uploads')
        .getPublicUrl(fileName);

      updateConfig({
        type: 'custom',
        customKitUpload: publicUrl
      });

      toast({
        title: "Kit Uploaded",
        description: "Your custom kit design has been uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleHeadshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setHeadshotFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setHeadshotPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const generateAIPreview = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to generate AI previews.",
        variant: "destructive",
      });
      return;
    }

    if (!headshotFile) {
      toast({
        title: "Headshot Required",
        description: "Please upload a headshot photo to generate the preview.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Upload headshot first
      const fileExt = headshotFile.name.split('.').pop();
      const fileName = `${user.id}/headshot-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('headshots')
        .upload(fileName, headshotFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('headshots')
        .getPublicUrl(fileName);

      // Prepare kit request data
      const kitRequestData = {
        user_id: user.id,
        kit_design: {
          type: config.type,
          colors: {
            primary: config.primaryColor,
            secondary: config.secondaryColor,
            accent: config.accentColor
          },
          designId: config.kitId || null,
          uploadedKitUrl: config.customKitUpload || null,
          fabric: config.fabric,
          style: config.style,
          pattern: config.pattern
        },
        headshot_url: publicUrl,
        status: 'processing'
      };

      // Save kit request to database
      const { data: kitRequest, error: dbError } = await supabase
        .from('kit_requests')
        .insert(kitRequestData)
        .select()
        .single();

      if (dbError) throw dbError;

      // Call n8n webhook (simulated for now)
      const webhookData = {
        userId: user.id,
        kitDesign: kitRequestData.kit_design,
        headshotUrl: publicUrl
      };

      // Simulate n8n response
      setTimeout(() => {
        const mockPreviewUrl = "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop";
        setAiPreviewUrl(mockPreviewUrl);
        
        // Update kit request with preview URL
        supabase
          .from('kit_requests')
          .update({ 
            preview_image_url: mockPreviewUrl,
            status: 'completed'
          })
          .eq('id', kitRequest.id);

        toast({
          title: "Preview Generated!",
          description: "Your AI-powered kit preview is ready.",
        });
        setIsGenerating(false);
      }, 3000);

    } catch (error: any) {
      console.error('Error generating preview:', error);
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  const downloadPreview = () => {
    if (!aiPreviewUrl) return;
    
    const link = document.createElement('a');
    link.href = aiPreviewUrl;
    link.download = 'kit-preview.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Started",
      description: "Your kit preview is downloading.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">AI Kit Configurator</h1>
            <p className="text-muted-foreground">Design your perfect sportswear kit with AI-powered previews</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Kit Selection */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-display font-semibold mb-4">Choose Your Base</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant={config.type === 'predefined' ? 'default' : 'outline'}
                      onClick={() => updateConfig({ type: 'predefined' })}
                      className="h-auto flex-col p-4"
                    >
                      <FileImage className="w-6 h-6 mb-2" />
                      <span className="text-sm">Predefined Kit</span>
                    </Button>
                    
                    <Button
                      variant={config.type === 'custom' ? 'default' : 'outline'}
                      onClick={() => updateConfig({ type: 'custom' })}
                      className="h-auto flex-col p-4"
                    >
                      <Upload className="w-6 h-6 mb-2" />
                      <span className="text-sm">Upload Custom</span>
                    </Button>
                  </div>

                  {config.type === 'predefined' && (
                    <div className="space-y-3">
                      <Label>Select Kit Design</Label>
                      {predefinedKits.map((kit) => (
                        <div
                          key={kit.id}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            config.kitId === kit.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => handleKitSelection(kit)}
                        >
                          <div className="font-medium text-foreground">{kit.name}</div>
                          <div className="text-sm text-muted-foreground capitalize">{kit.category}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {config.type === 'custom' && (
                    <div>
                      <Label htmlFor="custom-kit-upload">Upload Your Kit Design</Label>
                      <div className="mt-2">
                        <Input
                          id="custom-kit-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleCustomKitUpload}
                          className="cursor-pointer"
                        />
                      </div>
                      {config.customKitUpload && (
                        <div className="mt-3">
                          <img 
                            src={config.customKitUpload} 
                            alt="Custom kit" 
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Color Customization */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-display font-semibold mb-4">Colors & Pattern</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Primary Color</Label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={config.primaryColor}
                        onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                        className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                      />
                      <div className="flex flex-wrap gap-2">
                        {colors.slice(0, 6).map((color) => (
                          <button
                            key={color}
                            className="w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110"
                            style={{ 
                              backgroundColor: color,
                              borderColor: config.primaryColor === color ? '#0033A0' : 'transparent'
                            }}
                            onClick={() => updateConfig({ primaryColor: color })}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Secondary Color</Label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={config.secondaryColor}
                        onChange={(e) => updateConfig({ secondaryColor: e.target.value })}
                        className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                      />
                      <div className="flex flex-wrap gap-2">
                        {colors.slice(6).map((color) => (
                          <button
                            key={color}
                            className="w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110"
                            style={{ 
                              backgroundColor: color,
                              borderColor: config.secondaryColor === color ? '#0033A0' : 'transparent'
                            }}
                            onClick={() => updateConfig({ secondaryColor: color })}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Pattern</Label>
                    <Select value={config.pattern} onValueChange={(value) => updateConfig({ pattern: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solid">Solid Color</SelectItem>
                        <SelectItem value="stripes">Stripes</SelectItem>
                        <SelectItem value="gradient">Gradient</SelectItem>
                        <SelectItem value="geometric">Geometric</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Headshot Upload */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-display font-semibold mb-4">Upload Headshot</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="headshot-upload">Upload Your Photo</Label>
                    <div className="mt-2">
                      <Input
                        id="headshot-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleHeadshotUpload}
                        className="cursor-pointer"
                      />
                    </div>
                    {headshotPreview && (
                      <div className="mt-3">
                        <img 
                          src={headshotPreview} 
                          alt="Headshot preview" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={generateAIPreview}
                    disabled={isGenerating || !headshotFile}
                    className="w-full btn-gradient"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"></div>
                        Generating Preview...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate AI Preview
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8 h-full min-h-[600px]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-display font-semibold">AI Preview</h3>
                  <div className="flex space-x-2">
                    {aiPreviewUrl && user && (
                      <Button onClick={downloadPreview} variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download Preview
                      </Button>
                    )}
                    <Badge variant="outline">AI Generated</Badge>
                  </div>
                </div>

                <div className="relative flex justify-center items-center h-full">
                  {aiPreviewUrl ? (
                    <div className="max-w-md mx-auto">
                      <img 
                        src={aiPreviewUrl} 
                        alt="AI Generated Kit Preview" 
                        className="w-full h-auto rounded-xl shadow-2xl"
                      />
                      <p className="text-center text-sm text-muted-foreground mt-4">
                        AI-generated preview with your headshot
                      </p>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center">
                        <Sparkles className="w-16 h-16 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-foreground">AI Preview Not Generated</h4>
                        <p className="text-muted-foreground">
                          Upload a headshot and generate your AI-powered kit preview
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitConfiguratorAI;