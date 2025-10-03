import { useState, useEffect, useCallback } from "react";
import { Menu, X, Search, Globe, User, Loader2, ChevronRight } from "lucide-react";
import { supabase } from '@/lib/supabaseClient';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useAuth } from '@/hooks/use-Auth';

type Language = {
  code: string;
  name: string;
  flag: string;
};

type Product = {
  id: string;
  name: string;
  images?: string[];
  price?: number;
  category_id?: string;
};

type Category = {
  id: string;
  name: string;
  parent_id: string | null;
  created_at?: string;
  description?: string;
  image_url?: string | null;
  is_active?: boolean;
  sort_order?: number;
  updated_at?: string;
};

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

// Helper function to create a slug from a name
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoSpinning, setIsLogoSpinning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { i18n } = useTranslation();
  const { isAdmin } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const navigate = useNavigate();

  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages.find(lang => lang.code === i18n.language) || languages[0]
  );

  // Fetch categories with parent-child structure
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true });
        
        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const getMainCategories = () => categories.filter(c => c.parent_id === null);
  const getSubcategories = (id: string) => categories.filter(c => c.parent_id === id);

  const buildCategoryPath = useCallback((category: Category): string => {
    if (!category || !category.name) {
      console.error('Invalid category in buildCategoryPath:', category);
      return '';
    }
    
    // If category has no parent, return just its slug
    if (!category.parent_id) {
      return createSlug(category.name);
    }
    
    // If category has a parent, we need to build the full path
    const buildPath = (cat: Category, path: string[] = []): string[] => {
      path.unshift(createSlug(cat.name));
      
      if (cat.parent_id) {
        const parent = categories.find(c => c.id === cat.parent_id);
        if (parent) {
          return buildPath(parent, path);
        }
      }
      
      return path;
    };
    
    return buildPath(category).join('/');
  }, [categories]);

  const handleCategoryClick = useCallback((category: Category) => {
    if (!category || !category.name) {
      console.error('Invalid category in handleCategoryClick:', category);
      return;
    }
    
    const path = buildCategoryPath(category);
    if (!path) {
      console.error('Failed to build category path for:', category);
      return;
    }
    
    navigate(`/category/${path}`);
    setIsMenuOpen(false);
  }, [buildCategoryPath, navigate]);

  const handleLogoClick = () => {
    setIsLogoSpinning(true);
    setTimeout(() => setIsLogoSpinning(false), 1000);
    navigate('/');
  };

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language.code).then(() => {
      setCurrentLanguage(language);
      localStorage.setItem("i18nextLng", language.code);
    });
  };

  const debouncedSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, images, price, category_id')
        .ilike('name', `%${query}%`)
        .limit(8);

      if (error) throw error;
      setSearchResults(data || []);
    } catch (err: any) {
      setSearchError(err.message || 'Failed to search products');
      console.error('Search error:', err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => debouncedSearch(searchQuery), 350);
    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearch]);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchError(null);
  };

  // Create click handler for each category
  const createCategoryClickHandler = (category: Category) => () => {
    handleCategoryClick(category);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top announcement bar */}
      <div className="bg-gradient-primary text-center py-2 text-sm text-primary-foreground font-medium">
        🚀 72-Hour Global Sampling | ISO Certified | Free Design Consultation
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
            <div 
              className={`w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center transition-transform duration-1000 ${
                isLogoSpinning ? 'rotate-[360deg]' : ''
              }`}
            >
              <span className="text-primary-foreground font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-gradient">StitchArc</h1>
              <p className="text-xs text-muted-foreground">Sports</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>

            {isLoadingCategories ? (
              <div className="text-foreground">Loading...</div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="text-foreground hover:text-primary transition-colors font-medium focus:outline-none">
                  <Button variant="ghost" className="hover:bg-transparent hover:text-primary px-0">
                    Categories
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56 bg-background border border-border"
                  onMouseEnter={(e) => e.preventDefault()}
                >
                  {getMainCategories().map((category) => {
                    const subcategories = getSubcategories(category.id);
                    const hasChildren = subcategories.length > 0;

                    if (hasChildren) {
                      return (
                        <DropdownMenuSub key={category.id}>
                          <DropdownMenuSubTrigger className="hover:bg-muted cursor-pointer">
                            <span>{category.name}</span>
                            <ChevronRight className="ml-auto h-4 w-4" />
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent 
                              className="w-56 bg-background border border-border ml-1"
                              alignOffset={-5}
                            >
                              <DropdownMenuItem 
                                className="hover:bg-muted cursor-pointer"
                                onClick={createCategoryClickHandler(category)}
                              >
                                All {category.name}
                              </DropdownMenuItem>
                              {subcategories.map((subcategory) => (
                                <DropdownMenuItem 
                                  key={subcategory.id} 
                                  className="hover:bg-muted cursor-pointer"
                                  onClick={createCategoryClickHandler(subcategory)}
                                >
                                  {subcategory.name}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      );
                    }

                    return (
                      <DropdownMenuItem 
                        key={category.id} 
                        className="hover:bg-muted cursor-pointer"
                        onClick={createCategoryClickHandler(category)}
                      >
                        {category.name}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
            <Link to="/kit-configurator" className="text-foreground hover:text-primary transition-colors font-medium">
              Kit Configurator
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-foreground hover:text-primary transition-colors font-medium">
                Admin
              </Link>
            )}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center relative">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-10 pr-8 bg-muted/50 border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
              
              {searchQuery && !isSearching && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              
              {isSearching && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              )}
              
              {(isSearchFocused && (searchResults.length > 0 || searchError)) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto transition-all duration-200">
                  {searchError ? (
                    <div className="p-3 text-center">
                      <p className="text-sm text-destructive">{searchError}</p>
                      <button
                        onClick={() => debouncedSearch(searchQuery)}
                        className="mt-1 text-xs text-blue-500 hover:underline"
                      >
                        Retry search
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="p-2 border-b border-border text-xs text-muted-foreground">
                        {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                      </div>
                      {searchResults.map((product) => {
                        const category = categories.find(c => c.id === product.category_id);
                        
                        return (
                          <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            className="flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                            onClick={clearSearch}
                          >
                            {product.images?.[0] && (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded mr-3"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{product.name}</p>
                              <div className="flex items-center gap-2">
                                {product.price && (
                                  <p className="text-xs text-muted-foreground">
                                    ${product.price.toFixed(2)}
                                  </p>
                                )}
                                {category && (
                                  <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                    {category.name}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                <Globe className="h-4 w-4" />
                <span className="text-sm">{currentLanguage.code.toUpperCase()}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border border-border">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    className={`hover:bg-muted cursor-pointer ${
                      currentLanguage.code === language.code ? "bg-muted" : ""
                    }`}
                    onClick={() => changeLanguage(language)}
                  >
                    {language.flag} {language.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Button */}
            <div className="hidden md:block">
              <Link to="/login" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-background py-4 space-y-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {isLoadingCategories ? (
              <div className="text-center py-4">Loading categories...</div>
            ) : (
              <>
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground">
                    Categories
                  </h3>
                  <div className="pl-4 space-y-2">
                    {getMainCategories().map((category) => (
                      <div key={category.id}>
                        <div
                          onClick={createCategoryClickHandler(category)}
                          className="block text-sm text-muted-foreground hover:text-primary cursor-pointer py-1"
                        >
                          {category.name}
                        </div>
                        <div className="pl-4 space-y-1">
                          {getSubcategories(category.id).map((subcategory) => (
                            <div
                              key={subcategory.id}
                              onClick={createCategoryClickHandler(subcategory)}
                              className="block text-sm text-muted-foreground hover:text-primary cursor-pointer py-1"
                            >
                              {subcategory.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            <div className="pt-4 border-t space-y-2">
              <Link 
                to="/" 
                className="block text-sm text-muted-foreground hover:text-primary cursor-pointer py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="block text-sm text-muted-foreground hover:text-primary cursor-pointer py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="block text-sm text-muted-foreground hover:text-primary cursor-pointer py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/kit-configurator" 
                className="block text-sm text-muted-foreground hover:text-primary cursor-pointer py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Kit Configurator
              </Link>
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="block text-sm text-muted-foreground hover:text-primary cursor-pointer py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              <div className="pt-2">
                <Link 
                  to="/login" 
                  className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;