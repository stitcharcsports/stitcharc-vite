import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Building, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '@/lib/supabaseClient';

// Type definitions
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  country: string;
  businessType: string;
  subscribeNewsletter: boolean;
};

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Africa', 'Pakistan', 'Others'];
  const businessTypes = ['Manufacturer', 'Retailer', 'Brand', 'Distributor', 'Other'];

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    country: "",
    businessType: "",
    subscribeNewsletter: false
  });

  // Determine role based on email domain
  const getRoleFromEmail = (email: string): string => {
    const adminDomains = [
      '@yourcompany.com',
      'burhankhan.ceo@gmail.com'
      // Add other admin domains as needed
    ];
    return adminDomains.some(domain => email.endsWith(domain)) ? 'admin' : 'user';
  };

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthLabel = (strength: number) => {
    switch (strength) {
      case 0:
      case 1: return { label: "Weak", color: "text-red-500" };
      case 2:
      case 3: return { label: "Fair", color: "text-yellow-500" };
      case 4: return { label: "Good", color: "text-blue-500" };
      case 5: return { label: "Strong", color: "text-green-500" };
      default: return { label: "Weak", color: "text-red-500" };
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please ensure both passwords match.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to our terms and conditions.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Determine user role
      const userRole = getRoleFromEmail(formData.email);

      // Step 1: Sign up the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            full_name: `${formData.firstName} ${formData.lastName}`,
            role: userRole // Store role in auth metadata
          }
        }
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error("User creation failed");
      }

      // Step 2: Manually create the user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          full_name: `${formData.firstName} ${formData.lastName}`,
          role: userRole, // Set role in profiles table
          company: formData.company,
          phone: formData.phone,
          country: formData.country,
          business_type: formData.businessType,
          newsletter_subscribed: formData.subscribeNewsletter,
          created_at: new Date().toISOString()
        });

      if (profileError) throw profileError;

      // Step 3: Set role claim for RLS
      await supabase.rpc('set_claim', {
        claim: 'role',
        value: userRole,
        user_id: authData.user.id
      });

      // Step 4: Create company if provided
      if (formData.company) {
        await supabase
          .from('companies')
          .insert({
            name: formData.company,
            owner_id: authData.user.id,
            business_type: formData.businessType,
            country: formData.country,
            created_at: new Date().toISOString()
          });
      }

      navigate('/signup-success', { replace: true });
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message || 'Unable to create account',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { 
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Google Signup Failed",
        description: error.message || 'Unable to sign up with Google',
        variant: 'destructive'
      });
    }
  };

  const strength = passwordStrength(formData.password);
  const strengthInfo = getStrengthLabel(strength);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-gradient">StitchArc</h1>
              <p className="text-xs text-muted-foreground">Sports</p>
            </div>
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">Create Your Account</h2>
          <p className="text-muted-foreground">Join thousands of brands manufacturing with StitchArc</p>
        </div>

        {/* Form */}
        <div className="card-brand p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Names */}
            <div className="grid md:grid-cols-2 gap-4">
              {['firstName', 'lastName'].map((field) => (
                <div key={field}>
                  <Label htmlFor={field}>{field === 'firstName' ? 'First Name' : 'Last Name'}</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id={field}
                      value={formData[field as keyof FormData] as string}
                      onChange={(e) => handleInputChange(field as keyof FormData, e.target.value)}
                      placeholder={field === 'firstName' ? 'John' : 'Doe'}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="john@company.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <Label htmlFor="company">Company</Label>
              <div className="relative mt-1">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Your company name"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (123) 456-7890"
                required
              />
            </div>

            {/* Country */}
            <div>
              <Label>Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleInputChange("country", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Business Type */}
            <div>
              <Label>Business Type</Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) => handleInputChange("businessType", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Passwords */}
            <div className="grid md:grid-cols-2 gap-4">
              {["password", "confirmPassword"].map((field) => {
                const isConfirm = field === "confirmPassword";
                const show = isConfirm ? showConfirmPassword : showPassword;
                const setShow = isConfirm ? setShowConfirmPassword : setShowPassword;
                return (
                  <div key={field}>
                    <Label htmlFor={field}>{isConfirm ? "Confirm Password" : "Password"}</Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id={field}
                        type={show ? "text" : "password"}
                        value={formData[field as keyof FormData] as string}
                        onChange={(e) => handleInputChange(field as keyof FormData, e.target.value)}
                        placeholder={isConfirm ? "Confirm password" : "Create password"}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                      {isConfirm && formData.confirmPassword && (
                        <div className="absolute right-10 top-3">
                          {formData.password === formData.confirmPassword ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <div className="h-5 w-5 rounded-full bg-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {!isConfirm && formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-2 bg-muted rounded-full">
                            <div
                              className={`h-full rounded-full transition-all ${
                                strength <= 2
                                  ? "bg-red-500"
                                  : strength <= 3
                                  ? "bg-yellow-500"
                                  : strength <= 4
                                  ? "bg-blue-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${(strength / 5) * 100}%` }}
                            />
                          </div>
                          <span className={`text-xs ${strengthInfo.color}`}>
                            {strengthInfo.label}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Minimum 8 characters with uppercase, lowercase, and number
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                  I agree to the <Link to="/terms" className="text-primary">Terms</Link> and <Link to="/privacy" className="text-primary">Privacy Policy</Link>
                  <span className="text-red-500">*</span>
                </Label>
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="newsletter"
                  checked={formData.subscribeNewsletter}
                  onCheckedChange={(checked) => handleInputChange("subscribeNewsletter", checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="newsletter" className="text-sm cursor-pointer leading-relaxed">
                  Subscribe to our newsletter
                </Label>
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full btn-gradient" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Social */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-border"></div>
            <div className="px-4 text-sm text-muted-foreground">or sign up with</div>
            <div className="flex-1 border-t border-border"></div>
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogleSignup}>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account? <Link to="/login" className="text-primary">Sign in here</Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            By creating an account, you're joining a community of 500+ global brands who trust StitchArc Sports.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;