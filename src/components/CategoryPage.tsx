import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import Header from './Header';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  parent_id: string | null;
  created_at?: string;
  description?: string;
  image_url?: string | null;
  is_active?: boolean;
  sort_order?: number;
  updated_at?: string;
}

interface Product {
  id: string;
  name: string;
  images?: string[];
  price?: number;
  category_id?: string;
}

// Helper function to create a slug from a name
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

const CategoryPage = () => {
  const { '*': path } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchAllCategories = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching categories:', err);
      throw err;
    }
  }, []);

  const findCategoryByNameSlug = useCallback((slug: string, categories: Category[]) => {
    return categories.find(c => createSlug(c.name) === slug);
  }, []);

  const buildFullCategoryPath = useCallback((category: Category, categories: Category[]) => {
    if (!category || !category.name) return '';
    
    const pathParts = [createSlug(category.name)];
    let currentCategory = category;
    
    while (currentCategory.parent_id) {
      const parent = categories.find(c => c.id === currentCategory.parent_id);
      if (!parent) break;
      pathParts.unshift(createSlug(parent.name));
      currentCategory = parent;
    }
    
    return pathParts.join('/');
  }, []);

  const validateCategoryPath = useCallback((slugs: string[], categories: Category[]) => {
    let currentCategory: Category | null = null;
    const parents: Category[] = [];
    const validatedSlugs: string[] = [];

    for (const slug of slugs) {
      const foundCategory = findCategoryByNameSlug(slug, categories);
      if (!foundCategory) {
        throw new Error(`Category "${slug}" not found`);
      }

      // Check hierarchy if this isn't the first category
      if (currentCategory && foundCategory.parent_id !== currentCategory.id) {
        throw new Error(`Invalid hierarchy: "${slug}" is not a subcategory of "${currentCategory.name}"`);
      }

      // If this is the first category and it has a parent, we need to build the full path
      if (!currentCategory && foundCategory.parent_id !== null) {
        const fullPath = buildFullCategoryPath(foundCategory, categories);
        return { redirect: fullPath };
      }

      if (currentCategory) {
        parents.push(currentCategory);
      }
      currentCategory = foundCategory;
      validatedSlugs.push(slug);
    }

    if (!currentCategory) {
      throw new Error('Category not found after processing path');
    }

    return { 
      currentCategory, 
      parentCategories: parents,
      validatedSlugs 
    };
  }, [findCategoryByNameSlug, buildFullCategoryPath]);

  const fetchCategoryData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setCategory(null);
      setProducts([]);
      setSubcategories([]);
      setParentCategories([]);

      if (!path) {
        throw new Error('Category path is required');
      }

      const categories = await fetchAllCategories();
      setAllCategories(categories);

      const slugs = path.split('/').filter(slug => slug.trim() !== '');
      if (slugs.length === 0) {
        throw new Error('Invalid category path format');
      }

      const validationResult = validateCategoryPath(slugs, categories);
      
      if ('redirect' in validationResult) {
        navigate(`/category/${validationResult.redirect}`, { replace: true });
        return;
      }

      const { currentCategory, parentCategories } = validationResult;

      setCategory(currentCategory);
      setParentCategories(parentCategories);

      const subs = categories.filter(c => c.parent_id === currentCategory.id);
      setSubcategories(subs);

      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', currentCategory.id);

      if (productsError) throw productsError;
      setProducts(products || []);

    } catch (error: any) {
      console.error('Error loading category data:', error.message);
      setError(error.message || 'Failed to load category data');
    } finally {
      setIsLoading(false);
    }
  }, [path, navigate, fetchAllCategories, validateCategoryPath]);

  useEffect(() => {
    if (path !== undefined) {
      fetchCategoryData();
    }
  }, [path, fetchCategoryData]);

  // Handle the case where path is undefined
  if (path === undefined) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The category path is missing or invalid.
          </p>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3 mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Error Loading Category</h1>
        <p className="text-muted-foreground mb-2">{error}</p>
        <p className="text-sm text-muted-foreground mb-6">
          Path: {path || 'undefined'}
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );

  if (!category) return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The requested category could not be found.
        </p>
        <Button onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {parentCategories.map((parent) => (
              <div key={parent.id} className="flex items-center">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/category/${buildFullCategoryPath(parent, allCategories)}`}>
                      {parent.name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </div>
            ))}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="font-medium">{category.name}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
        
        {subcategories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Subcategories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {subcategories.map((sub) => {
                const subPath = buildFullCategoryPath(sub, allCategories);
                return (
                  <Link
                    key={sub.id}
                    to={`/category/${subPath}`}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors block"
                  >
                    <h3 className="font-medium">{sub.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">View all</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group block"
              >
                <div className="aspect-square overflow-hidden rounded-lg bg-muted/50 mb-3 relative">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <span className="text-muted-foreground">No image</span>
                    </div>
                  )}
                </div>
                <h3 className="font-medium">{product.name}</h3>
                {product.price && (
                  <p className="text-primary font-semibold mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center border rounded-lg bg-muted/50">
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              This category currently has no products.
            </p>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back to categories
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;