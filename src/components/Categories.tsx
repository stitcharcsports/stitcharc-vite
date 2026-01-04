// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   Shirt, Trophy, Users, Globe, Zap, Shield, 
//   Sparkles, TrendingUp, Award, Star, Target, Heart,
//   Cloud, Sun, Snowflake, Droplets, Wind, Thermometer
// } from 'lucide-react';
// import { supabase } from '@/lib/supabase';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Button } from '@/components/ui/button';

// interface Category {
//   id: string;
//   name: string;
//   description: string;
//   slug: string;
//   icon_name: string;
//   product_count: number;
//   image_url: string;
//   color: string;
//   is_featured: boolean;
//   order: number;
// }

// const CategoriesShowcase = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

//   const iconMap: Record<string, React.ReactNode> = {
//     'shirt': <Shirt className="w-6 h-6" />,
//     'trophy': <Trophy className="w-6 h-6" />,
//     'users': <Users className="w-6 h-6" />,
//     'globe': <Globe className="w-6 h-6" />,
//     'zap': <Zap className="w-6 h-6" />,
//     'shield': <Shield className="w-6 h-6" />,
//     'sparkles': <Sparkles className="w-6 h-6" />,
//     'trending': <TrendingUp className="w-6 h-6" />,
//     'award': <Award className="w-6 h-6" />,
//     'star': <Star className="w-6 h-6" />,
//     'target': <Target className="w-6 h-6" />,
//     'heart': <Heart className="w-6 h-6" />,
//     'cloud': <Cloud className="w-6 h-6" />,
//     'sun': <Sun className="w-6 h-6" />,
//     'snowflake': <Snowflake className="w-6 h-6" />,
//     'droplets': <Droplets className="w-6 h-6" />,
//     'wind': <Wind className="w-6 h-6" />,
//     'thermometer': <Thermometer className="w-6 h-6" />,
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from('categories')
//         .select('*')
//         .eq('is_active', true)
//         .order('order', { ascending: true })
//         .limit(12);

//       if (error) throw error;

//       // Agar Supabase empty hai to default data use karo
//       if (!data || data.length === 0) {
//         setCategories(getDefaultCategories());
//       } else {
//         setCategories(data as Category[]);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setCategories(getDefaultCategories());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDefaultCategories = (): Category[] => [
//     {
//       id: '1',
//       name: 'Team Jerseys',
//       description: 'Custom team uniforms & jerseys',
//       slug: 'team-jerseys',
//       icon_name: 'shirt',
//       product_count: 150,
//       image_url: '/categories/jerseys.jpg',
//       color: '#3b82f6',
//       is_featured: true,
//       order: 1
//     },
//     {
//       id: '2',
//       name: 'Training Wear',
//       description: 'Professional training gear',
//       slug: 'training-wear',
//       icon_name: 'zap',
//       product_count: 89,
//       image_url: '/categories/training.jpg',
//       color: '#10b981',
//       is_featured: true,
//       order: 2
//     },
//     {
//       id: '3',
//       name: 'Outdoor Sports',
//       description: 'All-weather outdoor sportswear',
//       slug: 'outdoor-sports',
//       icon_name: 'sun',
//       product_count: 67,
//       image_url: '/categories/outdoor.jpg',
//       color: '#f59e0b',
//       is_featured: true,
//       order: 3
//     },
//     {
//       id: '4',
//       name: 'Premium Collection',
//       description: 'High-end sportswear collection',
//       slug: 'premium-collection',
//       icon_name: 'award',
//       product_count: 45,
//       image_url: '/categories/premium.jpg',
//       color: '#8b5cf6',
//       is_featured: true,
//       order: 4
//     },
//     {
//       id: '5',
//       name: 'Eco-Friendly',
//       description: 'Sustainable & recycled materials',
//       slug: 'eco-friendly',
//       icon_name: 'globe',
//       product_count: 56,
//       image_url: '/categories/eco.jpg',
//       color: '#10b981',
//       is_featured: false,
//       order: 5
//     },
//     {
//       id: '6',
//       name: 'Compression Wear',
//       description: 'Performance enhancing wear',
//       slug: 'compression-wear',
//       icon_name: 'target',
//       product_count: 34,
//       image_url: '/categories/compression.jpg',
//       color: '#ef4444',
//       is_featured: false,
//       order: 6
//     },
//     {
//       id: '7',
//       name: 'Winter Sports',
//       description: 'Cold weather sportswear',
//       slug: 'winter-sports',
//       icon_name: 'snowflake',
//       product_count: 42,
//       image_url: '/categories/winter.jpg',
//       color: '#0ea5e9',
//       is_featured: false,
//       order: 7
//     },
//     {
//       id: '8',
//       name: 'Fan Merchandise',
//       description: 'Team fan apparel & merchandise',
//       slug: 'fan-merchandise',
//       icon_name: 'heart',
//       product_count: 78,
//       image_url: '/categories/fan.jpg',
//       color: '#ec4899',
//       is_featured: false,
//       order: 8
//     }
//   ];

//   const getGradient = (color: string) => {
//     const gradients: Record<string, string> = {
//       '#3b82f6': 'from-blue-500 to-cyan-500',
//       '#10b981': 'from-emerald-500 to-green-500',
//       '#f59e0b': 'from-amber-500 to-orange-500',
//       '#8b5cf6': 'from-purple-500 to-violet-500',
//       '#ef4444': 'from-red-500 to-pink-500',
//       '#0ea5e9': 'from-sky-500 to-blue-400',
//       '#ec4899': 'from-pink-500 to-rose-500',
//       '#000000': 'from-gray-800 to-gray-900',
//     };
//     return gradients[color] || 'from-blue-500 to-cyan-500';
//   };

//   if (loading) {
//     return (
//       <section className="py-16 bg-gradient-to-b from-white to-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <Skeleton className="h-10 w-48 mx-auto mb-4" />
//             <Skeleton className="h-6 w-96 mx-auto" />
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <Skeleton key={i} className="h-64 rounded-2xl" />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 bg-gradient-to-b from-white to-gray-50">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-sm font-medium mb-4">
//             <Sparkles className="w-4 h-4" />
//             EXPLORE CATEGORIES
//           </div>
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Premium <span className="text-blue-600">Sportswear Collections</span>
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Browse through our specialized categories designed for every sport and occasion. 
//             From team jerseys to training gear, we have it all.
//           </p>
//         </div>

//         {/* Categories Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {categories.map((category) => (
//             <Link
//               key={category.id}
//               to={`/categories/${category.slug}`}
//               className="group relative"
//               onMouseEnter={() => setHoveredCategory(category.id)}
//               onMouseLeave={() => setHoveredCategory(null)}
//             >
//               <div className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
//                 hoveredCategory === category.id 
//                   ? 'shadow-2xl scale-[1.02]' 
//                   : 'shadow-lg hover:shadow-xl'
//               }`}>
//                 {/* Background Gradient */}
//                 <div 
//                   className={`absolute inset-0 bg-gradient-to-br ${getGradient(category.color)} opacity-90`}
//                 />
                
//                 {/* Pattern Overlay */}
//                 <div className="absolute inset-0 opacity-10">
//                   <div className="absolute inset-0" style={{
//                     backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
//                     backgroundSize: '100px 100px'
//                   }} />
//                 </div>
                
//                 {/* Content */}
//                 <div className="relative p-6 h-64 flex flex-col justify-between">
//                   {/* Icon */}
//                   <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm w-fit mb-4 transition-transform ${
//                     hoveredCategory === category.id ? 'scale-110' : ''
//                   }`}>
//                     <div className="text-white">
//                       {iconMap[category.icon_name] || <Shirt className="w-6 h-6" />}
//                     </div>
//                   </div>
                  
//                   {/* Text Content */}
//                   <div>
//                     <h3 className="text-xl font-bold text-white mb-2">
//                       {category.name}
//                     </h3>
//                     <p className="text-white/80 text-sm mb-4">
//                       {category.description}
//                     </p>
                    
//                     {/* Product Count */}
//                     <div className="flex items-center justify-between">
//                       <span className="text-white/60 text-sm">
//                         {category.product_count}+ Products
//                       </span>
//                       {category.is_featured && (
//                         <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
//                           Featured
//                         </span>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Hover Indicator */}
//                   <div className={`absolute bottom-0 left-0 right-0 h-1 bg-white transform transition-transform duration-300 ${
//                     hoveredCategory === category.id ? 'scale-x-100' : 'scale-x-0'
//                   }`} />
//                 </div>
                
//                 {/* Shine Effect */}
//                 <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-opacity duration-500 ${
//                   hoveredCategory === category.id ? 'opacity-100' : 'opacity-0'
//                 }`} />
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Featured Categories */}
//         <div className="mb-12">
//           <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
//             Most Popular Collections
//           </h3>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {categories
//               .filter(cat => cat.is_featured)
//               .slice(0, 3)
//               .map((category) => (
//                 <div
//                   key={category.id}
//                   className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
//                 >
//                   <div className="flex items-start gap-4">
//                     <div 
//                       className="p-4 rounded-xl"
//                       style={{ backgroundColor: `${category.color}20` }}
//                     >
//                       <div style={{ color: category.color }}>
//                         {iconMap[category.icon_name] || <Shirt className="w-8 h-8" />}
//                       </div>
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="text-lg font-bold text-gray-900 mb-2">
//                         {category.name}
//                       </h4>
//                       <p className="text-gray-600 text-sm mb-4">
//                         {category.description}
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-500">
//                           {category.product_count} products available
//                         </span>
//                         <Link
//                           to={`/categories/${category.slug}`}
//                           className="text-blue-600 hover:text-blue-700 font-medium text-sm"
//                         >
//                           Explore →
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             <div className="text-center">
//               <div className="text-3xl font-bold mb-2">50+</div>
//               <div className="text-blue-100">Categories</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold mb-2">500+</div>
//               <div className="text-blue-100">Products</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold mb-2">100+</div>
//               <div className="text-blue-100">Teams Served</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold mb-2">15</div>
//               <div className="text-blue-100">Years Experience</div>
//             </div>
//           </div>
//         </div>

//         {/* CTA */}
//         <div className="mt-12 text-center">
//           <h3 className="text-2xl font-bold text-gray-900 mb-4">
//             Can't Find What You're Looking For?
//           </h3>
//           <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
//             We specialize in custom manufacturing. Tell us your requirements and 
//             we'll create the perfect sportswear solution for your team.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
//               Request Custom Quote
//             </Button>
//             <Button variant="outline">
//               View All Categories
//             </Button>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
        
//         .category-card {
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }
        
//         .category-card:hover {
//           transform: translateY(-8px);
//         }
//       `}</style>
//     </section>
//   );
// };

// export default CategoriesShowcase;